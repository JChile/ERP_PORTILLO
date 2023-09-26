
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



class CampaniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campania
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance:
            self.fields['proyecto'].required = False
            self.fields['categoria'].required = False