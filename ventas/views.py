from django.shortcuts import render
from ventas.serializers import *
from rest_framework import generics

class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

class AsesorList(generics.ListCreateAPIView):
    serializer_class = AsesorSerializer
    queryset = Asesor.objects.all()

class AsesorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AsesorSerializer
    queryset = Asesor.objects.all()

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



