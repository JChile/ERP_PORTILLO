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




class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    
    '''
    def create(self, validated_data):
        user_data = validated_data.pop('user_id')
        print( '\033[91m'+"validated data ------------------------->", user_data,'\033[0m')

        user = User.objects.create(**validated_data)
        #UserProfile.objects.create(user=user, **profile_data)

        return user
    '''

class UserSerializer(serializers.ModelSerializer):

    perfil = ProfileSerializer()
    class Meta:
        model = CustomUser
        #fields = ['id','last_login','is_superuser','username','first_name','last_name','email','is_staff','is_active','date_joined','groups','user_permissions']
        fields = '__all__'

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        profile_data = validated_data.pop('perfil')
        groups_data = validated_data.pop('groups')
        #print( '\033[91m'+"validated data ------------------------->", groups_data,'\033[0m')
        user = CustomUser.objects.create(**validated_data)
        profile_data['id'] = user.id
        profile = Profile.objects.create(**profile_data)
        for i in groups_data:
            user.groups.add(i)
     
        profile.save()
        user.perfil = profile 
        user.save()

        '''
        profile = Profile.objects.create(id=user.id, **profile_data)
        current_user = CustomUser.objects.filter(id=user.id)
        current_user.update(perfil=profile.id)
        '''


        return user