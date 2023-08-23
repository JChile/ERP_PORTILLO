

from django.http import HttpResponse
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


def index(request):
    return HttpResponse("Vista de inicio de sesion ")

class GroupList(generics.ListCreateAPIView):
    serializer_class = GruopSerializer
    queryset = Group.objects.all()
    
    def list(self, request):
        groups_queryset = Group.objects.all()
        groupserializer = GruopSerializer(groups_queryset, many=True)
        dataJson = groupserializer.data
        for i in dataJson:
            permissions_queryset = Permission.objects.all().filter(id__in=i["permissions"])
            permissionSerializer = PermissionSerializer(permissions_queryset,many = True)
            i["permissions"] = permissionSerializer.data          
        return Response(dataJson)

 

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GruopSerializer
    def retrieve(self, request, pk=None):
        groups_queryset = Group.objects.all()
        group = get_object_or_404(groups_queryset, pk=pk)
        groupserializer = GruopSerializer(group)
        permissions_queryset = Permission.objects.all().filter(id__in=groupserializer.data["permissions"])
        permissionSerializer = PermissionSerializer(permissions_queryset,many = True)
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
            permissions_queryset = Permission.objects.all().filter(id__in=i["user_permissions"])
            groups_queryset = Group.objects.all().filter(id__in=i["groups"])

            permissionSerializer = PermissionSerializer(permissions_queryset,many = True)
            groupSerializer = GruopSerializer(groups_queryset,many = True)
            i["user_permissions"] = permissionSerializer.data  
            i["groups"] = groupSerializer.data       
        return Response(dataJson)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def retrieve(self, request, pk=None):
        user_queryset = User.objects.all()
        user = get_object_or_404(user_queryset, pk=pk)
        userSerializer = UserSerializer(user)
        dataJson = userSerializer.data
        permissions_queryset = Permission.objects.all().filter(id__in=userSerializer.data["user_permissions"])
        grops_queryset = Group.objects.all().filter(id__in=userSerializer.data["groups"])

        permissionSerializer = PermissionSerializer(permissions_queryset,many = True)
        groupSerializer = GruopSerializer(grops_queryset,many = True)
    
        dataJson["user_permissions"] = permissionSerializer.data
        dataJson["groups"] = groupSerializer.data

        return Response(dataJson)


class UserProfileList(generics.ListCreateAPIView):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()

class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


class ProfileList(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ModuloList(generics.ListCreateAPIView):
    serializer_class = ModuloSerializer
    queryset = Modulo.objects.all()
    
    def list(self, request):
        queryset = Modulo.objects.all()
        moduloSerializer = ModuloSerializer(queryset, many=True)
        dataJson = moduloSerializer.data

        for i in dataJson:
            contentType_queryset = ContentType.objects.all().get(id=i["contentType"])
            contentTypeSerializer = ContentTypeSerializer(contentType_queryset)
            i["contentType"] = contentTypeSerializer.data          
        return Response(dataJson)

class ModuloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer


class GroupModuloList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupModuloSerializer
    
    def list(self, request):
        queryset = Group.objects.all()
        groupSerializer = GruopSerializer(queryset, many=True)
        dataJson = groupSerializer.data

        modulo_queryset = Modulo.objects.all()
        moduloSerializer = ModuloSerializer(modulo_queryset, many=True)

        permission_queryset = Permission.objects.all()
        permissionSerializer = PermissionSerializer(permission_queryset, many=True)

        contentType_queryset = ContentType.objects.all()
        contentTypeSerializer = ContentTypeSerializer(contentType_queryset, many=True)
 
        for i in moduloSerializer.data:
            i["can_add"] = False
            i["can_change"] = False
            i["can_delete"] = False
            i["can_view"] = False

        for i in dataJson:
            permissions = i.pop("permissions")
            permissions_data = permission_queryset.filter(id__in = permissions)
            permissions_dataSerializer = PermissionSerializer(permissions_data, many=True)
            print(permissions_dataSerializer.data)
            i["modulos"] = moduloSerializer.data
            i["permissions_name"] = permissions_dataSerializer.data

                           
        return Response(dataJson)

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
        permissionSerializer = PermissionSerializer(permission_queryset, many=True)

        contentType_queryset = ContentType.objects.all()
        contentTypeSerializer = ContentTypeSerializer(contentType_queryset, many=True)


        for i in moduloSerializer.data:
            i["can_add"] = False
            i["can_change"] = False
            i["can_delete"] = False
            i["can_view"] = False
        
        dataJson["modulos"] = moduloSerializer.data
        permissions = dataJson.pop("permissions")
        permissions_data = permission_queryset.filter(id__in = permissions)
        permissions_dataSerializer = PermissionSerializer(permissions_data,many = True)

        for j in permissions_dataSerializer.data:
            for k in moduloSerializer.data:
                    
                auxAdd = "add_"+contentType_queryset.get(id = k.get("contentType")).model
                auxChange = "change_"+contentType_queryset.get(id = k.get("contentType")).model
                auxDelete = "delete_"+contentType_queryset.get(id = k.get("contentType")).model
                auxView = "view_"+contentType_queryset.get(id = k.get("contentType")).model
                    
                print(j.get("codename"))
                if j.get("codename") == auxAdd:
                    k["can_add"] = True     
                elif j.get("codename") == auxChange:
                    k["can_change"] = True
                elif j.get("codename") == auxDelete:
                    k["can_delete"] = True
                elif j.get("codename") == auxView:
                    k["can_view"] = True

        return Response(dataJson)



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