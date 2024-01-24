

from django.http import HttpResponse
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from ventas.models import Lead
import json
from rest_framework.decorators import permission_classes
from ventas.consts import *

class GroupList(generics.ListCreateAPIView):
    serializer_class = GruopSerializer
    queryset = Group.objects.all()

    def list(self, request):
        groups_queryset = Group.objects.all()
        groupserializer = GruopSerializer(groups_queryset, many=True)
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_queryset = Permission.objects.all().filter(
                id__in=i["permissions"])
            permissionSerializer = PermissionSerializer(
                permissions_queryset, many=True)
            i["permissions"] = permissionSerializer.data
        return Response(dataJson)


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GruopSerializer

    def retrieve(self, request, pk=None):
        groups_queryset = Group.objects.all()
        group = get_object_or_404(groups_queryset, pk=pk)
        groupserializer = GruopSerializer(group)
        permissions_queryset = Permission.objects.all().filter(
            id__in=groupserializer.data["permissions"])
        permissionSerializer = PermissionSerializer(
            permissions_queryset, many=True)
        dataJson = groupserializer.data
        dataJson["permissions"] = permissionSerializer.data
        return Response(dataJson)


class PermissionList(generics.ListCreateAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()


class PermissionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer




class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def list(self, request):

        user_queryset = User.objects.all()
        userSerializer = UserSerializer(user_queryset, many=True)
        dataJson = userSerializer.data
        for i in dataJson:
            i.pop("password")
            i.pop("user_permissions")
            groups_queryset = Group.objects.all().filter(id__in=i["groups"])
            groupSerializer = GruopSerializer(groups_queryset, many=True)
            i["groups"] = groupSerializer.data
        return Response(dataJson)
    
    def create(self, request):
        print(request.data)
        data = UserSerializer(data=request.data)
        if not (bool(request.user.groups.first().permissions.filter(codename = PermissionUser.CAN_ADD) or request.user.is_superuser)) :
            return Response({"message" : "Usuario no tiene permisos para agregar usuarios"}, status=403)
        if data.is_valid():
            print("Entra aqui")
            data.save()
        return Response(data.data)

def mergePermissionsIdWithContentType(permissionSerializer, moduloSerializer, contentType_queryset):
    for a in permissionSerializer.data:
        for i in moduloSerializer.data:
            auxAdd = "add_" + \
                contentType_queryset.get(id=i.get("contentType")).model
            auxChange = "change_" + \
                contentType_queryset.get(id=i.get("contentType")).model
            auxDelete = "delete_" + \
                contentType_queryset.get(id=i.get("contentType")).model
            auxView = "view_" + \
                contentType_queryset.get(id=i.get("contentType")).model

            if a.get("codename") == auxAdd:
                i["can_add"] = a.get("id")
            elif a.get("codename") == auxChange:
                i["can_change"] = a.get("id")
            elif a.get("codename") == auxDelete:
                i["can_delete"] = a.get("id")
            elif a.get("codename") == auxView:
                i["can_view"] = a.get("id")


def function1(permissionSerializer, moduloSerializer, contentType_queryset):
    for a in permissionSerializer.data:
        for i in moduloSerializer.data:
            model_name = contentType_queryset.get(
                id=i.get("contentType")).model
            auxAdd = "add_"+model_name
            auxChange = "change_"+model_name
            auxDelete = "delete_"+model_name
            auxView = "view_"+model_name
            i["model"] = model_name
            if a.get("codename") == auxAdd:
                i["can_add"] = [False, a.get("id")]
            elif a.get("codename") == auxChange:
                i["can_change"] = [False, a.get("id")]
            elif a.get("codename") == auxDelete:
                i["can_delete"] = [False, a.get("id")]
            elif a.get("codename") == auxView:
                i["can_view"] = [False, a.get("id")]


def function2(permissions_dataSerializer, moduloSerializer, contentType_queryset):
    for j in permissions_dataSerializer.data:
        for k in moduloSerializer.data:
            model_name = contentType_queryset.get(
                id=k.get("contentType")).model
            auxAdd = "add_"+model_name
            auxChange = "change_"+model_name
            auxDelete = "delete_"+model_name
            auxView = "view_"+model_name
            if j.get("codename") == auxAdd:
                k["can_add"] = [True, j.get("id")]
            elif j.get("codename") == auxChange:
                k["can_change"] = [True, j.get("id")]
            elif j.get("codename") == auxDelete:
                k["can_delete"] = [True, j.get("id")]
            elif j.get("codename") == auxView:
                k["can_view"] = [True, j.get("id")]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #update desacioar, desacociar
    def update(self, request, pk = None, *args, **kwargs):

        #if not (bool(request.user.groups.first().permissions.filter(codename = PermissionUser.CAN_CHANGE) or request.user.is_superuser)) :
        #    return Response({"message" : "Usuario no tiene permisos para editar usuarios"}, status=403)

        try:
            desasociar = request.data.pop("desasociar")
        except:
            desasociar = False
        
        try:
            user = self.queryset.get(id = pk)
        except :
            return Response({"Message" : "User no existe"})
        
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            if desasociar :
                leads_queryset = Lead.objects.filter(asesor = user.pk)

                for i in leads_queryset :
                    i.asesor = None
                    i.asignado = False
                    i.save()
            serializer.save()
            return Response(serializer.data)

        return Response({"Message" : "No se actualizo"})
    
    #eliminar password en el envio
    def retrieve(self, request, pk=None):

        #if not (bool(request.user.groups.first().permissions.filter(codename = PermissionUser.CAN_VIEW) or request.user.is_superuser)) :
        #    return Response({"message" : "Usuario no tiene permisos para ver usuarios"}, status=403)


        user_queryset = User.objects.all()
        user = get_object_or_404(user_queryset, pk=pk)
        userSerializer = UserSerializer(user)
        dataJson = userSerializer.data
        permissions_queryset = Permission.objects.all().filter(
            id__in=userSerializer.data["user_permissions"])
        grops_queryset = Group.objects.all().filter(
            id__in=userSerializer.data["groups"])

        permissionSerializer = PermissionSerializer(
            permissions_queryset, many=True)
        groupSerializer = GruopSerializer(grops_queryset, many=True)

        dataJson["user_permissions"] = permissionSerializer.data


        dataJson.pop("password")
        dataJson.pop("user_permissions")
        print(type(userSerializer.data))

        if len(userSerializer.data) > 0 and len(userSerializer.data.get("groups")) > 0:
            queryset = Group.objects.all()
            group = get_object_or_404(
                queryset, pk=userSerializer.data["groups"][0])
            groupSerializer = GruopSerializer(group)
            dataJsonGroup = groupSerializer.data
            modulo_queryset = Modulo.objects.all()
            moduloSerializer = ModuloSerializer(modulo_queryset, many=True)
            permission_queryset = Permission.objects.all()
            permissionSerializer = PermissionSerializer(
                permission_queryset, many=True)
            contentType_queryset = ContentType.objects.all()
            function1(permissionSerializer,
                      moduloSerializer, contentType_queryset)
            dataJsonGroup["modulos"] = moduloSerializer.data
            permissions = dataJsonGroup.pop("permissions")
            permissions_data = permission_queryset.filter(id__in=permissions)
            permissions_dataSerializer = PermissionSerializer(
                permissions_data, many=True)
            function2(permissions_dataSerializer,
                      moduloSerializer, contentType_queryset)
            dataJson["groups"] = dataJsonGroup

        return Response(dataJson)




class ModuloList(generics.ListCreateAPIView):
    serializer_class = ModuloSerializer
    queryset = Modulo.objects.all()

    def list(self, request):
        queryset = Modulo.objects.all()
        moduloSerializer = ModuloSerializer(queryset, many=True)
        dataJson = moduloSerializer.data

        for i in dataJson:
            contentType_queryset = ContentType.objects.all().get(
                id=i["contentType"])
            contentTypeSerializer = ContentTypeSerializer(contentType_queryset)
            i["contentType"] = contentTypeSerializer.data
        return Response(dataJson)


class ModuloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer


class GroupModuloList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupModuloSerializer


class GroupModuloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupModuloSerializer

    def retrieve(self, request, pk=None):
        queryset = Group.objects.all()
        group = get_object_or_404(queryset, pk=pk)
        groupSerializer = GruopSerializer(group)
        dataJson = groupSerializer.data
        modulo_queryset = Modulo.objects.all()
        moduloSerializer = ModuloSerializer(modulo_queryset, many=True)
        permission_queryset = Permission.objects.all()
        permissionSerializer = PermissionSerializer(
            permission_queryset, many=True)
        contentType_queryset = ContentType.objects.all()
        function1(permissionSerializer, moduloSerializer, contentType_queryset)
        dataJson["modulos"] = moduloSerializer.data
        permissions = dataJson.pop("permissions")
        permissions_data = permission_queryset.filter(id__in=permissions)
        permissions_dataSerializer = PermissionSerializer(
            permissions_data, many=True)
        function2(permissions_dataSerializer,
                  moduloSerializer, contentType_queryset)
        return Response(dataJson)


class ModuloPermissions(generics.ListAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer

    def list(self, request):
        modulo_queryset = Modulo.objects.all()
        moduloSerializer = ModuloSerializer(modulo_queryset, many=True)
        permission_queryset = Permission.objects.all()
        permissionSerializer = PermissionSerializer(
            permission_queryset, many=True)
        contentType_queryset = ContentType.objects.all()
        mergePermissionsIdWithContentType(
            permissionSerializer, moduloSerializer, contentType_queryset)
        return Response(moduloSerializer.data)


'''
@api_view(['GET'])
def usuario_final_view(request):
    if request.method == 'GET':
        # first we get the querysets
        user = User.objects.all()
        usuario_detalle = Usuario_detalle.objects.all()
        # then we serializer the data
        user_ser = UserSerializer(user, many=True, context={'request': request})
        usuario_detalle_ser = UsuarioDetalleSerializer(usuario_detalle, many=True, context=  {'request': request})
        data = user_ser.data + usuario_detalle_ser.data
        return Response(data)
'''


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


class UserActivoList(APIView):
    def get(self, request):
        users = User.objects.filter(is_active=True)
        dataJson = UserSerializer(users, many=True, fields=(
            'id', 'first_name', 'last_name', 'username')).data
        return Response(dataJson)


class UserInactivoList(APIView):
    def get(self, request):
        users = User.objects.filter(is_active=False)
        dataJson = UserSerializer(users, many=True, fields=(
            'id', 'first_name', 'last_name', 'username')).data
        return Response(dataJson)

class UserAsesorList(APIView):
    def get(self, request):
        users = User.objects.filter(is_active=True).filter(groups__in = [1])
        dataJson = UserSerializer(users, many=True, fields=(
            'id', 'first_name', 'last_name', 'username','codigoAsesor')).data
        return Response(dataJson)