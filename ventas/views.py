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
from rest_framework.views import APIView


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


class LeadCreationConfirmation(APIView):
    def post(self, request):
        response = {}
        lead_adecuado = []
        lead_inadecuado = []

        proyecto_id = request.data.get("proyecto_id")
        data = request.data.get("data", [])

        thirty_days = datetime.now() - timedelta(days=31)

        phone_numbers = set(
            Lead.objects.filter(horaRecepcion__gte=thirty_days,
                                estado="A", campania__proyecto__id=proyecto_id)
            .values_list('celular', flat=True)
            .distinct()
        )

        for i in data:

            lead_class = leadConfirmation(i, phone_numbers, proyecto_id)
            lead = lead_class.serialize_lead()

            if lead_class.errores:
                lead_inadecuado.append(lead)
            else:
                lead_adecuado.append(lead)

        response["adecuado"] = lead_adecuado
        response["inadecuado"] = lead_inadecuado

        return Response(response)


class leadConfirmation:
    def __init__(self, data, phone_numbers, proyecto_id):
        self.data = data
        self.errores = []
        self.check_numero(phone_numbers)
        self.check_asesor()
        self.check_campania(proyecto_id)

    def serialize_lead(self):
        lead = {}
        lead["data"] = self.data
        if self.errores:
            lead["errores"] = self.errores

        return lead

    def check_numero(self, phone_numbers):
        celular = self.data.get("celular")
        if not celular:
            self.errores.append(
                "El numero de celular no se envió en los datos.")
        else:
            if len(celular) != 9 or not celular.startswith('9') or not celular.isdigit():
                self.errores.append(
                    "El numero de celular no cumple con los requisitos.")
            elif celular in phone_numbers:
                self.errores.append(
                    "El numero de celular ya existe en la base de datos.")

    def check_asesor(self):
        if "asesor" in self.data:
            try:
                self.data["asesor"] = Asesor.objects.get(
                    codigo=self.data["asesor"], estado="A").id
            except Asesor.DoesNotExist:
                self.errores.append(
                    "El asesor especificado no existe en la base de datos.")

    def check_campania(self, proyecto_id):
        try:
            campania = Campania.objects.get(
                codigo=self.data["campania"], estado="A")

            if campania.proyecto.id != proyecto_id:
                self.errores.append(
                    "La campania no corresponde al proyecto especificado.")
            else:
                self.data["campania"] = campania.id

        except Campania.DoesNotExist:
            self.errores.append(
                "La campania especificada no existe en la base de datos.")

        except KeyError:
            self.errores.append("La campania no se envió en los datos.")


class leadMultipleCreationAutomatic(APIView):
    def post(self, request):
        response = {}
        data = request.data
        asesores = Asesor.objects.filter(estado='A')

        asignados = []
        no_asignados = []

        nextAsesor = LeadAssigner(asesores)

        for i in data:
            asesor = nextAsesor.get_asesor()
            lead = leadCreation(i)

            if asesor is None:
                no_asignados.append(lead.serialize_lead())

            else:
                lead.put_asesor(asesor)
                asignados.append(lead.serialize_lead())
                asesor.save()

        serializer = LeadListSerializer(
            data=asignados + no_asignados, many=True)
        if serializer.is_valid():
            response["asignados"] = asignados
            response["no_asignados"] = no_asignados
            serializer.save()
            return Response(response)

        response["error"] = "No se pudo guardar los datos importados."
        return Response(response)



class leadCreation:
    def __init__(self, data):
        self.data = data
        self.create_data()
    
    def serialize_lead(self):
        return self.data

    def create_data(self): 
        try:
            self.data["horaRecepcion"] = datetime.strptime(self.data["horaRecepcion"], "%d/%m/%Y")
        except (ValueError, KeyError):
            self.data["horaRecepcion"] = datetime.now()

        try:
            self.data["campania"] = Campania.objects.get(codigo = self.data["campania"]).id
        except:
            self.data["campania"] = None
            


    def put_asesor(self, asesor):
        self.data["asesor"] = asesor.id
        self.data["asignado"] = True
        asesor.numeroLeads += 1

class LeadAssigner:
    def __init__(self, asesores):
        self.last_asesor = 0
        self.asesores = asesores

    def get_asesor(self):
        num_asesores = len(self.asesores)
        if num_asesores == 0:
            return None

        for _ in range(num_asesores):
            next_asesor = self.asesores[self.last_asesor]

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


class LeadMultipleCreationManual(APIView):
    def post(self, request):
        object_no_saved = []
        print(request.data)

        for i in request.data:
            data_no_saved = {}
            flag_asignado = True
            flag_campania = True
            error_message = []

            try:
                i["horaRecepcion"] = datetime.strptime(
                i["horaRecepcion"], "%d/%m/%Y")
            except (ValueError, KeyError):
                i["horaRecepcion"] = datetime.now()

            try:
                i["asesor"] = Asesor.objects.get(codigo=i["asesor"]).id
            except:
                flag_asignado = False
                error_message.append("Asesor no existe en la bd")
                print("Campo de asesor no enviado o asesor no existe en : ", i)

            try:
                i["campania"] = Campania.objects.get(codigo=i["campania"]).id
            except:
                flag_campania = False
                error_message.append("Campaña no existe en la bd")
                print("Campo de campania no enviado o no existe en : ", i)

            thirty_days_ago = datetime.now() - timedelta(days=31)
            unique_mobiles = list(Lead.objects.filter(
                horaEntrega__gte=thirty_days_ago).values_list('celular', flat=True).distinct())
            print(unique_mobiles)

            data = LeadSerializer(data=i)
            if data.is_valid() and flag_campania:
                print("CELULAAAAAAAAAAAAAAar : ", i['celular'])
                if len(i['celular']) != 9 or not i['celular'] .startswith('9') or not i['celular'] .isdigit():
                    data_no_saved["data"] = i
                    error_message.append("Numero de celular no valido")
                elif i['celular'] in unique_mobiles:
                    data_no_saved["data"] = i
                    error_message.append(
                        "Se repite el numero telefonico con registro de hace 30 dias")
                
                data.save()
                lead = Lead.objects.get(id=data.data["id"])
                if flag_asignado:
                    lead.asignado = True
                else:
                    lead.asignado = False
                lead.save()
                print("Guardado : ", data.data)
            else:
                print("No Guardado : ", data.data)
                data_no_saved["data"] = i
                error_message.append("Formato no valido")

            if len(data_no_saved) > 0:
                data_no_saved["errores"] = error_message
                object_no_saved.append(data_no_saved)

        return Response(object_no_saved)


class AsesorAsignacion(APIView):
    def post(self, request):
        error_message = []
        leadsNoAsigandos = []
        idAsesor = request.data["idAsesor"]
        idLeads = request.data["idLead"]
        try:
            asesor = Asesor.objects.get(id=idAsesor)
        except:
            return Response({'message': f'El Asesor con ID {idAsesor} no existe'})
        for i in idLeads:
            try:
                lead = Lead.objects.get(id=int(i))
                if asesor.numeroLeads < asesor.maximoLeads or asesor.maximoLeads == -1:
                    if lead.asesor == None or lead.asesor.pk != asesor.pk:
                        lead.asesor = asesor
                        lead.asignado = True
                        asesor.numeroLeads = asesor.numeroLeads + 1
                        lead.save() 
                        asesor.save()                    
                else : 
                    error_message.append(f"Lead [{lead.pk}] no asignado porque asesor [{asesor.codigo}] alcanzo su capacidad") 
            except:
                leadsNoAsigandos.append(i)

        if len(leadsNoAsigandos) == 0:
            return Response({'detalle': error_message})
        return Response({'message': f"No se reasignaron los leads : {leadsNoAsigandos} porque no existen" , 'detalle': error_message})

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
