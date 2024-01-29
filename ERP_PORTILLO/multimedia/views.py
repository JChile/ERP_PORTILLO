from django.shortcuts import render
from rest_framework import generics
from .serializers import *

# Create your views here.



class VideProductoList(generics.ListCreateAPIView):
    serializer_class = VideoProductoSerializer
    queryset = VideoProducto.objects.all()

class VideProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VideoProductoSerializer
    queryset = VideoProducto.objects.all()

class VideoProyectoList(generics.ListCreateAPIView):
    serializer_class = VideoProyectoSerializer
    queryset = VideoProyecto.objects.all()

class VideoProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VideoProyectoSerializer
    queryset = VideoProyecto.objects.all()

class ImagenProductoList(generics.ListCreateAPIView):
    serializer_class = ImagenProductoSerializer
    queryset = ImagenProducto.objects.all()

class ImagenProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ImagenProductoSerializer
    queryset = ImagenProducto.objects.all()

class ImagenProyectoList(generics.ListCreateAPIView):
    serializer_class = ImagenProyectoSerializer
    queryset = ImagenProyecto.objects.all()

class ImagenProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ImagenProyectoSerializer
    queryset = ImagenProyecto.objects.all()