

from django.http import HttpResponse
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView


def index(request):
    return HttpResponse("Vista de inicio de sesion ")


class UserList(generics.ListCreateAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UsuarioList(generics.ListCreateAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    serializer_class = UsuariosSerializer
    queryset = Usuario.objects.all()

class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer

class PruebaList(generics.ListCreateAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    serializer_class = PruebasSerializer
    queryset = Prueba.objects.all()

class PruebaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
        Clase generica para  lectura y escritura de perfiles
    """
    queryset = Prueba.objects.all()
    serializer_class = PruebasSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)