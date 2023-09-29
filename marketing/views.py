
from .serializers import *
from cuenta.serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView


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


class CampaniaList(generics.ListCreateAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()
    def list(self, request):
        
        estado = request.query_params.get('estado')
        print(estado)
        if estado : 
            campania_queryset = Campania.objects.filter(estado = estado) 
        else : 
            campania_queryset = Campania.objects.all() 
        
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        #users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            #user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"]) 
            permissionSerializer = ProyectoSerializer(permissions_data)
            #userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)
            i["proyecto"] = permissionSerializer.data
            #i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            #i["subCategoria"][0]["categoria"]= categoriaSerializer.data
            
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
        #user = User.objects.all().get(id=dataJson["user"])
        categoria = Categoria.objects.all().get(id=dataJson["categoria"])
        proyectoSerializer = ProyectoSerializer(proyecto)
        #userSerializer = UserSerializer(user)
        categoriaSerializer = CategoriaSerializer(categoria)
        dataJson["proyecto"] = proyectoSerializer.data
        #dataJson["user"] = userSerializer.data
        dataJson["categoria"] = categoriaSerializer.data
        return Response(dataJson)


class CampaniaActivoList(APIView):
    def get(self, request):
        campania_queryset = Campania.objects.filter(estado='A')
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        #users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            #user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"])
            
            permissionSerializer = ProyectoSerializer(permissions_data)
            #userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)

            i["proyecto"] = permissionSerializer.data
            #i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            #i["subCategoria"][0]["categoria"]= categoriaSerializer.data
            
        return Response(dataJson)


class CampaniaInactivoList(APIView):
    def get(self, request):
        campania_queryset = Campania.objects.filter(estado='I')
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        #users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            #user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"])
            
            permissionSerializer = ProyectoSerializer(permissions_data)
            #userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)

            i["proyecto"] = permissionSerializer.data
            #i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            #i["subCategoria"][0]["categoria"]= categoriaSerializer.data
            
        return Response(dataJson)
    

class ProyectoCampaniaList(APIView):
    
    def get(self, request):
        _estado = request.query_params.get('estado')
        print(_estado)
        if _estado : 
            campanias = Campania.objects.filter(estado = _estado)
            proyectos = Proyecto.objects.filter(estado = _estado) 

        else : 
            proyectos = Proyecto.objects.all()
            campanias = Campania.objects.all()
        # Realiza una operación personalizada aquí, por ejemplo, obtener un objeto por su clave primaria (pk)
        # Serializa el objeto
        
        serializerProyectos = ProyectoSerializer(proyectos,many=True,fields=('id','nombre'))
        dataJson = serializerProyectos.data
        for i in dataJson :
            data = campanias.filter(proyecto = i['id'])
            i["campania"] = CampaniaSerializer(data,many=True,fields=('id','nombre')).data

        # Devuelve la respuesta en formato JSON
        return Response(dataJson)