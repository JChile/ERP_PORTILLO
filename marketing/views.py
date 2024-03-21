
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
from ventas.consts import *
from ventas.models import Lead
from ventas.serializers import LeadSerializer, ProductoSerializer
from multimedia.models import *
from multimedia.serializers import *

from rest_framework import status


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


@permission_classes([IsAuthenticated])
class ProyectoList(generics.ListCreateAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()

    def get(self, request):
        estado = request.query_params.get('estado')
        proyecto_queryset = Proyecto.objects.all()

        if estado:
            proyecto_queryset = proyecto_queryset.filter(estado=estado)

        dataJson = ProyectoSerializer(proyecto_queryset, many=True).data

        for i in dataJson:
            i["producto"] = ProductoSerializer(
                Producto.objects.filter(proyecto=i["id"]), many=True).data
            i["videos"] = VideoProyectoSerializer(
                VideoProyecto.objects.filter(proyecto=i["id"]), many=True).data
            i["imagenes"] = ImagenProyectoSerializer(
                ImagenProyecto.objects.filter(proyecto=i["id"]), many=True).data

        return Response(dataJson)

    def post(self, request):
        serializer = ProyectoSerializer(data=request.data)

        if serializer.is_valid():
            lead = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()

    def retrieve(self, request, pk=None):
        # para asesor y jefe de ventas whatsapps, llamadas y eventos
        usuario = request.user

        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProyecto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver proyecto"}, status=403)

        proyecto = get_or_none(Proyecto, id=pk)
        if proyecto == None:
            return Response({"message": "No existe proyecto o no tiene permisos el usuario"}, status=404)

        desde = request.query_params.get('leadDesde')
        hasta = request.query_params.get('leadHasta')

        proyectoSerializer = ProyectoSerializer(proyecto)
        proyecto_data = proyectoSerializer.data

        userCreador_data = get_or_none(
            User, id=proyecto_data["usuarioCreador"])
        userActualizador_data = get_or_none(
            User, id=proyecto_data["usuarioActualizador"])

        proyecto_data["videos"] = VideoProyectoSerializer(
            VideoProyecto.objects.filter(proyecto=pk), many=True).data
        proyecto_data["imagenes"] = ImagenProyectoSerializer(
            ImagenProyecto.objects.filter(proyecto=pk), many=True).data
        try:
            campania_queryset = Campania.objects.filter(proyecto=proyecto.pk)
            campania_id_list = [int(campania.pk)
                                for campania in campania_queryset]
            lead_queryset = Lead.objects.filter(campania__in=campania_id_list)
            if desde and hasta:
                lead_queryset = lead_queryset.filter(
                    fecha_creacion__range=[desde, hasta])
            # lead_asesor_list =  [int(lead.asesor.pk) for lead in lead_queryset]
            # asesor_queryset = User.objects.filter(id__in = lead_asesor_list)

        except:
            lead_queryset = Lead.objects.filter(id=0)

        userCreadorSerializer = UserSerializer(userCreador_data, fields=(
            'id', 'first_name', 'last_name', 'username')) if userCreador_data else None
        userActualizadorializer = UserSerializer(userActualizador_data, fields=(
            'id', 'first_name', 'last_name', 'username')) if userActualizador_data else None

        if request.user.isAdmin == True:
            lead_datajson = LeadSerializer(lead_queryset, many=True).data
            for i in lead_datajson:
                asesor = get_or_none(User, id=i["asesor"])
                userSerializer = UserSerializer(asesor, fields=(
                    'id', 'first_name', 'last_name', 'username')) if asesor else None
                i["asesor"] = userSerializer.data if userSerializer else None
            proyecto_data["lead"] = lead_datajson
            # proyecto_data["asesor"] = asesor_data if asesor_data else []

        return Response(proyecto_data)


from django.db.models import Q

class PresupuestoProyectoList(generics.ListCreateAPIView):
    serializer_class = PresupuestoProyectoSerializer

    def get_queryset(self):
        proyecto_id = self.request.query_params.get('proyecto', None)
        
        if proyecto_id is not None:
            proyecto = get_object_or_404(Proyecto, id=proyecto_id)
            return PresupuestoProyecto.objects.filter(proyecto=proyecto)
        
        return PresupuestoProyecto.objects.all()

    def get(self, request):

        anio = request.query_params.get('anio')
        mes = request.query_params.get('mes')
        proyecto = request.query_params.get('proyecto')

        presupuestoProyecto_queryset = PresupuestoProyecto.objects.all()
        if anio != None and mes != None:
            anio = int(anio)
            mes = int(mes)
            presupuestoProyecto_queryset = PresupuestoProyecto.objects.filter(Q(fechaPresupuesto__month=mes) & Q(fechaPresupuesto__year=anio), proyecto=proyecto).first()
            if presupuestoProyecto_queryset == None :
                return Response({"message": "No se encontro presupuesto proyecto con los datos indicados"})
            presupuestoProyecto_data = PresupuestoProyectoSerializer(presupuestoProyecto_queryset)
            return Response(presupuestoProyecto_data.data)
        else:
            presupuestoProyecto_queryset = PresupuestoProyecto.objects.filter(proyecto=proyecto)

        presupuestoProyecto_data = PresupuestoProyectoSerializer(presupuestoProyecto_queryset, many = True)
        return Response(presupuestoProyecto_data.data)

class PresupuestoProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PresupuestoProyectoSerializer
    queryset = PresupuestoProyecto.objects.all()


class GastoCampaniaList(generics.ListCreateAPIView):
    serializer_class = GastoCampaniaSerializer
    queryset = GastoCampania.objects.all()
    def get(self, request):
        campania = request.query_params.get('campania')
        gastoCampania_queryset = GastoCampania.objects.all()
        if campania != None:
            gastoCampania_queryset = gastoCampania_queryset.filter(campania=campania)
        gastoCampania_data = GastoCampaniaSerializer(gastoCampania_queryset, many = True)        

        return Response(gastoCampania_data.data)
        

class GastoCampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GastoCampaniaSerializer
    queryset = GastoCampania.objects.all()


class CategoriaList(generics.ListCreateAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()


class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

from datetime import datetime

class CampaniaList(generics.ListCreateAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

    def get(self, request):
        estado = request.query_params.get('estado')
        print(estado)
        if estado:
            campania_queryset = Campania.objects.filter(estado=estado).order_by('-fecha_creacion')
        else:
            campania_queryset = Campania.objects.all().order_by('-fecha_creacion')

        groupserializer = CampaniaSerializer(campania_queryset, many=True)
        proyecto_queryset = Proyecto.objects.all()
        # users = User.objects.all()
        categorias = Categoria.objects.all()
        dataJson = groupserializer.data
        for i in dataJson:
            proyecto_data = proyecto_queryset.filter(id=i["proyecto"]).first()
            # user_data = users.get(id=i["user"])
            categoria_data = categorias.filter(id=i["categoria"]).first()
            proyectoSerializer = ProyectoSerializer(proyecto_data)
            # userSerializer = UserSerializer(user_data)
            categoriaSerializer = CategoriaSerializer(categoria_data)
            i["proyecto"] = proyectoSerializer.data
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
            campania.codigo = campania.nombre
            campania.save()
            
            return Response({"message" : "Campaña se creo correctamente"}, status=status.HTTP_201_CREATED)
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)


class CampaniaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CampaniaSerializer
    queryset = Campania.objects.all()

    def get(self, request, pk=None):
        campania_queryset = Campania.objects.all()
        campania = get_object_or_404(campania_queryset, pk=pk)
        campaniaSerializer = CampaniaSerializer(campania)
        dataJson = campaniaSerializer.data
        proyecto = Proyecto.objects.all().filter(
            id=dataJson["proyecto"]).first()
        # user = User.objects.all().get(id=dataJson["user"])
        categoria = Categoria.objects.all().filter(
            id=dataJson["categoria"]).first()
        proyectoSerializer = ProyectoSerializer(proyecto)
        # userSerializer = UserSerializer(user)
        categoriaSerializer = CategoriaSerializer(categoria)
        dataJson["proyecto"] = proyectoSerializer.data if proyecto != None else None
        # dataJson["user"] = userSerializer.data
        dataJson["categoria"] = categoriaSerializer.data if categoria != None else None
        return Response(dataJson)


class ProyectoCampaniaList(APIView):

    def get(self, request):

        campanias = Campania.objects.filter(estado="A").order_by('-fecha_creacion')
        proyectos = Proyecto.objects.filter(estado="A").order_by('-fecha_creacion')
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


import requests
import json

class CambioDolar(APIView):

    def get(self, request):
        dolar = requests.get("https://api.apis.net.pe/v1/tipo-cambio-sunat")
        return Response(dolar.json())
