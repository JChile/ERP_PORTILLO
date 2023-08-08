
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated




class ProyectoList(generics.ListCreateAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()

class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()

class CategoriaList(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()


class SubCategoriaList(generics.ListCreateAPIView):
    serializer_class = SubCategoriaSerializer
    queryset = SubCategoria.objects.all()

class SubCategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubCategoriaSerializer
    queryset = SubCategoria.objects.all()

class CampaniaList(generics.ListCreateAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

class CampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()