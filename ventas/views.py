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
            asesor_data = asesores.get(id=i["asesor"])
            campania_data = campanias.get(id=i["campania"])                                   
            objecion_data = objeciones.get(id=i["objeciones"])   
            user_data = users.get(id=asesor_data.user.id)
                          
            asesorSerializer = AsesorSerializer(asesor_data)
            campaniaSerializer = CampaniaSerializer(campania_data)
            objecionSerializer = ObjecionSerializer(objecion_data)
            userSerializer = UserSerializer(user_data)
            user_data_serialized = userSerializer.data

            i["asesor"] = asesorSerializer.data
            i["campania"] = campaniaSerializer.data
            i["objeciones"] = objecionSerializer.data
            i["asesor"]["user"] = {field: user_data_serialized[field] for field in user_fields}
            
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

        asesor = Asesor.objects.all().get(id=dataJson["asesor"])
        campania = Campania.objects.all().get(id=dataJson["campania"])
        objecion = Objecion.objects.all().get(id=dataJson["objeciones"])
        user = User.objects.all().get(id=asesor.user.id)

        asesorSerializer = AsesorSerializer(asesor)
        campaniaSerializer = CampaniaSerializer(campania)
        objecionSerializer = ObjecionSerializer(objecion)
        userSerializer = UserSerializer(user)
        user_data_serialized = userSerializer.data

        dataJson["asesor"] = asesorSerializer.data
        dataJson["campania"] = campaniaSerializer.data
        dataJson["objeciones"] = objecionSerializer.data
        dataJson["asesor"]["user"] = {field: user_data_serialized[field] for field in user_fields}

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
            i["user"] = {field: user_data_serialized[field] for field in user_fields}
        
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
        dataJson["user"] = {field: user_data_serialized[field] for field in user_fields}

        return Response(dataJson)

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

class AsesorActivoList(generics.ListAPIView):
    serializer_class = AsesorActivoSerializer
    
    def get_queryset(self):
        return Asesor.objects.filter(activo=True)





