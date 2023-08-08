
from rest_framework import serializers
from .models import *

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class SubCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoria
        fields = '__all__'

class CampaniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campania
        fields = '__all__'