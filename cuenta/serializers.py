from django.contrib.auth.models import User, Group , Permission
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""
    Clases serializadoras, toman el modelo y retornan la data en fomato Json
"""

class GruopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        if user.groups.all() :
            token['groups'] = str(user.groups.all()[0])
            token['groupsId'] = str(user.groups.all()[0].id)
        return token


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        #fields = ['id','last_login','is_superuser','username','first_name','last_name','email','is_staff','is_active','date_joined','groups','user_permissions']
        fields = '__all__'

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)
    

class UsuarioDetalleSerializer(serializers.ModelSerializer):
    """
        Serializador de los perfiles de los usuarios
    """
    class Meta:
        model = Usuario_detalle
        fields = '__all__'


class PruebasSerializer(serializers.ModelSerializer):
    """
        Serializador de los perfiles de los usuarios
    """
    class Meta:
        model = Prueba
        fields = '__all__'
