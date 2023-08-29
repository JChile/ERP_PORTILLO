from rest_framework import serializers
from .models import *

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

class AsesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asesor
        fields = '__all__'

class WhatsAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsApp
        fields = '__all__'

class LlamadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Llamada
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class ObjecionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objecion
        fields = '__all__'

class AsesorProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesorProyecto
        fields = '__all__'
