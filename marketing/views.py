
from .serializers import *
from cuenta.serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404





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

    def list(self, request):
        campania_queryset = Campania.objects.all()
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        users = User.objects.all()
        subCategorias = SubCategoria.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            user_data = users.get(id=i["user"])
            subcategoria_data = subCategorias.get(id=i["subCategoria"])
            categoria_data = categorias.get(id=subcategoria_data.categoria.id)
            
            permissionSerializer = ProyectoSerializer(permissions_data)
            userSerializer = UserSerializer(user_data)
            subCategoriaSerializer = SubCategoriaSerializer(subcategoria_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)

            i["proyecto"] = permissionSerializer.data
            i["user"] = userSerializer.data
            i["subCategoria"] = subCategoriaSerializer.data
            #i["subCategoria"][0]["categoria"]= categoriaSerializer.data
            i["categoria"] = categoriaSerializer.data
            
        return Response(dataJson)

class CampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

    def retrieve(self, request, pk=None):
        campania_queryset = Campania.objects.all()
        campania = get_object_or_404(campania_queryset, pk=pk)
        campaniaSerializer = CampaniaSerializer(campania)
        dataJson = campaniaSerializer.data

        proyecto = Proyecto.objects.all().get(id=dataJson["proyecto"])
        user = User.objects.all().get(id=dataJson["user"])
        subCategoria = SubCategoria.objects.all().get(id=dataJson["subCategoria"])
        categoria = Categoria.objects.all().get(id=subCategoria.categoria.id)


        proyectoSerializer = ProyectoSerializer(proyecto)
        userSerializer = UserSerializer(user)
        subCategoriaSerializer = SubCategoriaSerializer(subCategoria)
        categoriaSerializer = CategoriaSerializer(categoria)

        dataJson["proyecto"] = proyectoSerializer.data
        dataJson["user"] = userSerializer.data
        dataJson["subCategoria"] = subCategoriaSerializer.data
        dataJson["categoria"] = categoriaSerializer.data

        return Response(dataJson)
