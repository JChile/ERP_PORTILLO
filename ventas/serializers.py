from rest_framework import serializers
from .models import *
from cuenta.models import *


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

class AsesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asesor
        fields = '__all__'

class AsesorActivoSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    class Meta:
        model = Asesor
        fields = ['user_id','first_name','last_name','activo']

class WhatsAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsApp
        fields = '__all__'

class LlamadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Llamada
        fields = '__all__'

class ObjecionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objecion
        fields = '__all__'

class AsesorProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesorProyecto
        fields = '__all__'
