
from .serializers import *
from cuenta.serializers import *
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

    def list(self, request):
        queryset = Campania.objects.all()
        groupserializer = CampaniaSerializer(queryset, many=True)
        permissions = Proyecto.objects.all()
        users = User.objects.all()
        subCategorias = SubCategoria.objects.all()
        categorias = Categoria.objects.all()


        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = permissions.filter(id=i["proyecto"])
            user_data = users.filter(id=i["user"])
            subcategoria_data = subCategorias.filter(id=i["subCategoria"])
            categoria_data = categorias.filter(id=subcategoria_data[0].categoria.id)
            
            permissionSerializer = ProyectoSerializer(permissions_data,many = True)
            userSerializer = UserSerializer(user_data,many = True)
            subCategoriaSerializer = SubCategoriaSerializer(subcategoria_data,many = True)
            categoriaSerializer = CategoriaSerializer(categoria_data,many = True)


            i["proyecto"] = permissionSerializer.data
            i["user"] = userSerializer.data
            i["subCategoria"] = subCategoriaSerializer.data
            #i["subCategoria"][0]["categoria"]= categoriaSerializer.data
            i["categoria"] = categoriaSerializer.data
            
        return Response(dataJson)

class CampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()