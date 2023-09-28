from cuenta.serializers import *
from ventas.serializers import *
from marketing.serializers import *

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from cuenta.models import User


class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def list(self, request):
        lead_queryset = Lead.objects.all()
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


class AsesorList(generics.ListCreateAPIView):
    serializer_class = AsesorSerializer
    queryset = Asesor.objects.all()

    def list(self, request):
        asesor_queryset = Asesor.objects.all()
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


class AsesorActivoList(generics.ListAPIView):
    serializer_class = AsesorActivoSerializer

    def get_queryset(self):
        return Asesor.objects.filter(estado='A')


class WhatsAppList(generics.ListCreateAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class WhatsAppDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class LlamadaList(generics.ListCreateAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class LlamadaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class ObjecionList(generics.ListCreateAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class ObjecionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class EstadoLeadList(generics.ListCreateAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()
