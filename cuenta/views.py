

from django.http import HttpResponse
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


def index(request):
    return HttpResponse("Vista de inicio de sesion ")

class GroupList(generics.ListCreateAPIView):
    serializer_class = GruopSerializer
    queryset = Group.objects.all()

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GruopSerializer


class PermissionList(generics.ListCreateAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()

class PermissionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


class UserList(generics.ListCreateAPIView):
    """
        Clase generica para  lectura y escritura de Users
    """
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

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

class ProfileList(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)