from django.contrib.auth.models import Group, Permission
from . import views

from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.contenttypes.models import ContentType

import requests
"""
    Clases serializadoras, toman el modelo y retornan la data en fomato Json
"""


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class GruopSerializer(serializers.ModelSerializer):
    # permissions = PermissionSerializer(many=True, read_only = True)
    class Meta:
        model = Group
        fields = '__all__'


class ContentTypeSerializer(serializers.ModelSerializer):
    # permissions = PermissionSerializer(many=True, read_only = True)
    class Meta:
        model = ContentType
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        # Recibe el parámetro 'fields' que contiene los campos deseados
        fields = kwargs.pop('fields', None)
        super(UserSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Filtra los campos según los especificados en 'fields'
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        # Recibe el parámetro 'fields' que contiene los campos deseados
        fields = kwargs.pop('fields', None)
        super(ModuloSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Filtra los campos según los especificados en 'fields'
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class GroupModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        if user.groups.all():
            token['groups'] = str(user.groups.all()[0])
            token['groupsId'] = str(user.groups.all()[0].id)
            id = user.id

            #token['user'] = (requests.get(
             #   "http://127.0.0.1:8000/api/user/{}".format(id))).json()

        return token
