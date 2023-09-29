from cuenta.serializers import *
from ventas.serializers import *
from marketing.serializers import *

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from cuenta.models import User
from rest_framework import status
from datetime import datetime, timedelta
from django.http import Http404


class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def list(self, request):
        lead_queryset = self.queryset
        groupserializer = LeadSerializer(lead_queryset, many=True)

        users = User.objects.all()
        asesores = Asesor.objects.all()
        campanias = Campania.objects.all()
        objeciones = Objecion.objects.all()

        dataJson = groupserializer.data
        user_fields = ["id", "username", "first_name", "last_name"]

        for i in dataJson:
            asesor_data = asesores.filter(id=i["asesor"]).first()
            campania_data = campanias.filter(id=i["campania"]).first()
            objecion_data = objeciones.filter(id=i["objecion"]).first()

            asesorSerializer = AsesorSerializer(
                asesor_data) if asesor_data else None
            campaniaSerializer = CampaniaSerializer(
                campania_data) if campania_data else None
            objecionSerializer = ObjecionSerializer(
                objecion_data) if objecion_data else None

            i["asesor"] = asesorSerializer.data if asesorSerializer else {}
            i["campania"] = campaniaSerializer.data if campaniaSerializer else {}
            i["objecion"] = objecionSerializer.data if objecionSerializer else {}

            if asesor_data:
                user_data = users.filter(id=asesor_data.user.id).first()
                userSerializer = UserSerializer(user_data)
                user_data_serialized = userSerializer.data
                i["asesor"]["user"] = {
                    field: user_data_serialized[field] for field in user_fields}

        return Response(dataJson)


class LeadListSinFiltros(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class LeadListAsignados(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A", asignado=True)
        return super().list(request)


class LeadListNoAsignados(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A", asignado=False)
        return super().list(request)


class LeadListActivos(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class LeadListInactivos(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def retrieve(self, request, pk=None):
        lead_queryset = Lead.objects.all()
        lead = get_object_or_404(lead_queryset, pk=pk)
        leadSerializer = LeadSerializer(lead)
        dataJson = leadSerializer.data

        user_fields = ["id", "username", "first_name", "last_name"]

        asesor = Asesor.objects.all().filter(id=dataJson["asesor"]).first()
        campania = Campania.objects.all().filter(
            id=dataJson["campania"]).first()
        objecion = Objecion.objects.all().filter(
            id=dataJson["objecion"]).first()

        asesorSerializer = AsesorSerializer(asesor) if asesor else None
        campaniaSerializer = CampaniaSerializer(campania) if campania else None
        objecionSerializer = ObjecionSerializer(objecion) if objecion else None

        dataJson["asesor"] = asesorSerializer.data if asesorSerializer else {}
        dataJson["campania"] = campaniaSerializer.data if campaniaSerializer else {}
        dataJson["objecion"] = objecionSerializer.data if objecionSerializer else {}

        if asesor:
            user = User.objects.all().filter(id=asesor.user.id).first()
            userSerializer = UserSerializer(user)
            user_data_serialized = userSerializer.data
            dataJson["asesor"]["user"] = {
                field: user_data_serialized[field] for field in user_fields}

        return Response(dataJson)


class LeadMultipleCreation(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadListSerializer
    last_asesor = 0

    def post(self, request):
        data = request.data
        asesores = Asesor.objects.filter(estado='A')

        if not asesores.exists():
            return Response({'message': 'No hay asesores disponibles'}, status=status.HTTP_400_BAD_REQUEST)

        assigned_leads = []
        unassigned_leads = []
        duplicate_leads = []

        thirty_days_ago = datetime.now() - timedelta(days=31)
        unique_mobiles = Lead.objects.filter(
            horaEntrega__gte=thirty_days_ago).values_list('celular', flat=True).distinct()
        estado_lead = EstadoLead.objects.get(nombre="EP")

        for lead_data in data:
            asesor = self.get_next_asesor(asesores)

            if lead_data['celular'] in unique_mobiles:
                duplicate_leads.append(lead_data)
                continue

            if asesor is not None:
                lead_data['asesor'] = asesor.pk
                asesor.numeroLeads += 1
                asesor.save()

                lead_data['asignado'] = True
                lead_data['estadoLead'] = estado_lead.pk
                assigned_leads.append(lead_data)

            else:
                lead_data['asignado'] = False
                unassigned_leads.append(lead_data)

        serializer = LeadListSerializer(
            data=assigned_leads + unassigned_leads, many=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'assigned_leads': assigned_leads,
                'unassigned_leads': unassigned_leads,
                'duplicate_leads': duplicate_leads
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_next_asesor(self, asesores):
        num_asesores = len(asesores)
        if num_asesores == 0:
            return None

        for _ in range(num_asesores):
            next_asesor = asesores[self.last_asesor]

            if next_asesor.maximoLeads == -1 or next_asesor.numeroLeads < next_asesor.maximoLeads:
                self.last_asesor = (self.last_asesor + 1) % num_asesores
                return next_asesor

            self.last_asesor = (self.last_asesor + 1) % num_asesores

        return None


class LeadMultipleAssign(generics.UpdateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadListSerializer

    def update(self, request):
        data = request.data
        for assignment in data:

            lead_id = assignment.get('id')
            asesor_id = assignment.get('asesor')
            print(lead_id)

            if lead_id is not None and asesor_id is not None:
                try:
                    lead = Lead.objects.get(pk=lead_id)
                    asesor = Asesor.objects.get(pk=asesor_id)

                    if lead.asesor != asesor:
                        if lead.asesor is not None:
                            old_asesor = lead.asesor
                            old_asesor.numeroLeads -= 1
                            old_asesor.save()

                        lead.asesor = asesor
                        lead.save()

                        asesor.numeroLeads += 1
                        asesor.save()

                except Asesor.DoesNotExist:
                    return Response({'message': f'El Asesor con ID {asesor_id} no existe'}, status=status.HTTP_400_BAD_REQUEST)
                except Lead.DoesNotExist:
                    return Response({'message': f'El Lead con ID {lead_id} no existe'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Las asignaciones se han realizado correctamente'}, status=status.HTTP_200_OK)


class AsesorList(generics.ListCreateAPIView):
    serializer_class = AsesorSerializer
    queryset = Asesor.objects.all()

    def list(self, request):
        asesor_queryset = self.queryset
        users = User.objects.all()
        groupserializer = AsesorSerializer(asesor_queryset, many=True)
        dataJson = groupserializer.data
        user_fields = ["id", "username", "first_name", "last_name"]
        for i in dataJson:
            user_data = users.get(id=i["user"])
            userSerializer = UserSerializer(user_data)
            user_data_serialized = userSerializer.data
            i["user"] = {field: user_data_serialized[field]
                         for field in user_fields}

        return Response(dataJson)


class AsesorListSinFiltros(AsesorList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class AsesorListActivos(AsesorList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class AsesorListInactivos(AsesorList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class AsesorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AsesorSerializer
    queryset = Asesor.objects.all()

    def retrieve(self, request, pk=None):
        asesor_queryset = Asesor.objects.all()
        asesor = get_object_or_404(asesor_queryset, pk=pk)
        asesorserializer = AsesorSerializer(asesor)
        dataJson = asesorserializer.data
        user_fields = ["id", "username", "first_name", "last_name"]

        user = User.objects.all().get(id=dataJson["user"])
        userSerializer = UserSerializer(user)
        user_data_serialized = userSerializer.data
        dataJson["user"] = {field: user_data_serialized[field]
                            for field in user_fields}

        return Response(dataJson)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        leads_asignados = Lead.objects.filter(asesor=instance)
        for lead in leads_asignados:
            lead.update_estado()

        return Response(serializer.data)


class WhatsAppList(generics.ListCreateAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class whatsappActivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class whatsappInactivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class WhatsAppDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class LlamadaList(generics.ListCreateAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class LlamadaActivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class LlamadaInactivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class LlamadaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class ObjecionList(generics.ListCreateAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class ObjecionActivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class ObjecionInactivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class ObjecionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class EstadoLeadList(generics.ListCreateAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()


class EstadoLeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()

    def get_object(self):
        nombre = self.kwargs.get('nombre')
        estado_lead = EstadoLead.objects.filter(nombre=nombre).first()

        if estado_lead is None:
            raise Http404("EstadoLead no encontrado")

        return estado_lead


class EstadoLeadActivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class EstadoLeadInactivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)
