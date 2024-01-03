
from .serializers import *
from cuenta.serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import permission_classes
from ventas.consts import RolesERP
from ventas.models import Lead
from ventas.serializers import LeadSerializer

def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None



@permission_classes([IsAuthenticated])
class ProyectoList(generics.ListCreateAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()


@permission_classes([IsAuthenticated])
class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()
    def retrieve(self, request, pk=None):
        #para asesor y jefe de ventas whatsapps, llamadas y eventos
        usuario = request.user

        proyecto = get_or_none(Proyecto, id = pk)
        if proyecto == None :
            return Response({"message" : "No existe proyecto o no tiene permisos el usuario"}, status=404)


        proyectoSerializer = ProyectoSerializer(proyecto)
        proyecto_data = proyectoSerializer.data

        userCreador_data = get_or_none(User, id=proyecto_data["usuarioCreador"])
        userActualizador_data = get_or_none(User, id=proyecto_data["usuarioActualizador"])
        asesor_queryset = User.objects.filter(proyecto = proyecto.pk)

        userCreadorSerializer = UserSerializer(userCreador_data,fields=(
        'id', 'first_name', 'last_name', 'username')) if userCreador_data else None
        userActualizadorializer = UserSerializer(userActualizador_data,fields=(
        'id', 'first_name', 'last_name', 'username')) if userActualizador_data else None
        asesor_data = UserSerializer(asesor_queryset,fields=(
        'id', 'first_name', 'last_name', 'username'), many = True).data

        proyecto_data["usuarioCreador"] = userCreadorSerializer.data if userCreadorSerializer else {}
        proyecto_data["usuarioActualizador"] = userActualizadorializer.data if userActualizadorializer else {}
        

        if RolesERP.JEFE_VENTAS == usuario.groups.first().name:
            for i in asesor_data:
                i["lead"] = LeadSerializer(Lead.objects.filter(asesor = i["id"]), many = True).data
            proyecto_data["asesor"] = asesor_data if asesor_data else []
        

        
        return Response(proyecto_data)

class CategoriaList(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()



class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()


class CampaniaList(generics.ListCreateAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

    def get(self, request):
        estado = request.query_params.get('estado')
        print(estado)
        if estado:
            campania_queryset = Campania.objects.filter(estado=estado)
        else:
            campania_queryset = Campania.objects.all()

        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        # users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            # user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"])
            permissionSerializer = ProyectoSerializer(permissions_data)
            # userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)
            i["proyecto"] = permissionSerializer.data
            # i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            # i["subCategoria"][0]["categoria"]= categoriaSerializer.data

        return Response(dataJson)

    def create(self, request):
        print(request.data)
        data = CampaniaSerializer(data=request.data)
        if data.is_valid():
            data.save()
        campania = Campania.objects.get(pk=data.data["id"])
        campania.codigo = (str(campania.nombre).replace(" ", "") + "_" + str(campania.categoria.nombre).replace(
            " ", "") + "_" + str(campania.fecha_creacion.month) + "_" + str(campania.pk)).lower()
        campania.save()
        return Response(CampaniaSerializer(campania).data)


class CampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

    def get(self, request, pk=None):
        campania_queryset = Campania.objects.all()
        campania = get_object_or_404(campania_queryset, pk=pk)
        campaniaSerializer = CampaniaSerializer(campania)
        dataJson = campaniaSerializer.data
        proyecto = Proyecto.objects.all().get(id=dataJson["proyecto"])
        # user = User.objects.all().get(id=dataJson["user"])
        categoria = Categoria.objects.all().get(id=dataJson["categoria"])
        proyectoSerializer = ProyectoSerializer(proyecto)
        # userSerializer = UserSerializer(user)
        categoriaSerializer = CategoriaSerializer(categoria)
        dataJson["proyecto"] = proyectoSerializer.data
        # dataJson["user"] = userSerializer.data
        dataJson["categoria"] = categoriaSerializer.data
        return Response(dataJson)


class CampaniaActivoList(APIView):
    def get(self, request):
        campania_queryset = Campania.objects.filter(estado='A')
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        # users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            # user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"])

            permissionSerializer = ProyectoSerializer(permissions_data)
            # userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)

            i["proyecto"] = permissionSerializer.data
            # i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            # i["subCategoria"][0]["categoria"]= categoriaSerializer.data

        return Response(dataJson)


class CampaniaInactivoList(APIView):
    def get(self, request):
        campania_queryset = Campania.objects.filter(estado='I')
        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        # users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_data = proyecto_queryset.get(id=i["proyecto"])
            # user_data = users.get(id=i["user"])
            categoria_data = categorias.get(id=i["categoria"])

            permissionSerializer = ProyectoSerializer(permissions_data)
            # userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)

            i["proyecto"] = permissionSerializer.data
            # i["user"] = userSerializer.data
            i["categoria"] = categoriaSerializer.data
            # i["subCategoria"][0]["categoria"]= categoriaSerializer.data

        return Response(dataJson)


class ProyectoCampaniaList(APIView):

    def get(self, request):

        campanias = Campania.objects.filter(estado="A")
        proyectos = Proyecto.objects.filter(estado="A")
        # Realiza una operación personalizada aquí, por ejemplo, obtener un objeto por su clave primaria (pk)
        # Serializa el objeto

        serializerProyectos = ProyectoSerializer(
            proyectos, many=True, fields=('id', 'nombre'))
        dataJson = serializerProyectos.data
        for i in dataJson:
            data = campanias.filter(proyecto=i['id'])
            i["campania"] = CampaniaSerializer(
                data, many=True, fields=('id', 'nombre')).data

        # Devuelve la respuesta en formato JSON
        return Response(dataJson)
