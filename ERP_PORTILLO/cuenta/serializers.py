from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

import requests
"""
    Clases serializadoras, toman el modelo y retornan la data en fomato Json
"""



BACKEND = "http://3.144.105.189:8000"

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
    password = serializers.CharField(required=False)
    username = serializers.CharField(required=False)

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

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        if user.groups.all():
            token['groups'] = str(user.groups.all()[0])
            token['groupsId'] = str(user.groups.all()[0].id)
        
        
        userSerializer = UserSerializer(user)
        dataJson = userSerializer.data
        token['user'] = dataJson
        
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

    
        return token