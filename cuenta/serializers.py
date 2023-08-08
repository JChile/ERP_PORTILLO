from django.contrib.auth.models import Group , Permission

from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""
    Clases serializadoras, toman el modelo y retornan la data en fomato Json
"""


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class GruopSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only = True)
    class Meta:
        model = Group
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




class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    groups = GruopSerializer(many=True, read_only = True)
    class Meta:
        model = User
        fields = '__all__'
    
    '''
    def create(self, validated_data):
        user_data = validated_data.pop('user_id')
        print( '\033[91m'+"validated data ------------------------->", user_data,'\033[0m')
        user = User.objects.create(**validated_data)
        #UserProfile.objects.create(user=user, **profile_data)
        return user
    '''

class UserProfileSerializer(serializers.ModelSerializer):
    perfil = ProfileSerializer()
    #groups = GruopSerializer(many=True)

    class Meta:
        model = User
        #fields = ['id','last_login','is_superuser','username','first_name','last_name','email','is_staff','is_active','date_joined','groups','user_permissions']
        fields = '__all__'
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        profile_data = validated_data.pop('perfil')
        #print( '\033[91m'+"validated data ------------------------->", groups_data,'\033[0m')


        try:
            groups_data = validated_data.pop('groups')
            for i in groups_data:
                user.groups.add(i)        
        except :
            print("Error, no se envio el campo gropus")
        try:
            permission_data = validated_data.pop('user_permissions')
            for j in permission_data:
                user.user_permissions.add(j)
        except :
            print("Error, no se envio el campo user_permissions")

        
        user = User.objects.create(**validated_data)
        profile_data['id'] = user.id
        profile = Profile.objects.create(**profile_data)
        profile.save()
        user.perfil = profile 
        user.save()   
        '''
        profile = Profile.objects.create(id=user.id, **profile_data)
        current_user = CustomUser.objects.filter(id=user.id)
        current_user.update(perfil=profile.id)
        '''
        return user

    def update(self, instance ,validated_data):
        print("iNSTANCE ->>>>>>>>>>>>>>>>>>>",validated_data)
        user = User.objects.get(id = instance.id)                        
        profile_data = validated_data.pop('perfil')
        try:
            groups_data = validated_data.pop('groups')
            user.groups.clear()
            for i in groups_data:
                user.groups.add(i)        
        except :
            print("Error, no se envio el campo gropus")
        try:
            permission_data = validated_data.pop('user_permissions')
            user.user_permissions.clear() 
            for j in permission_data:
                user.user_permissions.add(j)
        except :
            print("Error, no se envio el campo user_permissions")
        print(profile_data)

        Profile.objects.filter(id=user.id).update(**profile_data)
        User.objects.filter(id=user.id).update(**validated_data)
        user = User.objects.get(id = user.id) 
        user.save()
        return user