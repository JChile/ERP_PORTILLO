from cuenta.serializers import *
from django.shortcuts import render
from ventas.serializers import *
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404




class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

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

class EstadoList(generics.ListCreateAPIView):
    serializer_class = EstadoSerializer
    queryset = Estado.objects.all()

class EstadoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoSerializer
    queryset = Estado.objects.all()

class ObjecionList(generics.ListCreateAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()

class ObjecionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()





