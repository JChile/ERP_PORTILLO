

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
        queryset = Group.objects.all()
        groupserializer = GruopSerializer(queryset, many=True)
        permissions = Permission.objects.all()
        permissionSerializer = PermissionSerializer(permissions, many = True)
        dataJson = groupserializer.data

        for i in dataJson:
            permissions = Permission.objects.all().filter(id__in=i["permissions"])
            permissionSerializer = PermissionSerializer(permissions,many = True)
            i["permissions"] = permissionSerializer.data
            
        return Response(dataJson)

 

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GruopSerializer
    def retrieve(self, request, pk=None):
        queryset = Group.objects.all()
        group = get_object_or_404(queryset, pk=pk)
        serializer = GruopSerializer(group)
        permissions = Permission.objects.all().filter(id__in=serializer.data["permissions"])
        permissionSerializer = PermissionSerializer(permissions,many = True)
        dataJson = serializer.data
        dataJson["permissions"] = permissionSerializer.data
        
        print( '\033[91m'+"------------------------->", dataJson,'\033[0m')

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

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer



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