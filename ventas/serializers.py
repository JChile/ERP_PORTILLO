from rest_framework import serializers
from .models import *
from cuenta.models import *



class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        # Recibe el parámetro 'fields' que contiene los campos deseados
        fields = kwargs.pop('fields', None)
        super(LeadSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Filtra los campos según los especificados en 'fields'
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

        
class MultipleLeadSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        return [Lead.objects.create(**item) for item in validated_data]
        
    def update(self, instance, validated_data):
        pass 

class LeadListSerializer(LeadSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
        list_serializer_class = MultipleLeadSerializer



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


class EstadoLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoLead
        fields = '__all__'



class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'


class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class TipoCotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCotizacion
        fields = '__all__'


class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = '__all__'

class TipoCuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuota
        fields = '__all__'


class CuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuota
        fields = '__all__'

class PrecioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Precio
        fields = '__all__'

class ProyectoTipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoTipoProducto
        fields = '__all__'

class HistoricoLeadAsesorSerlializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoLeadAsesor
        fields = '__all__'


class DesasignacionLeadAsesorSerlializer(serializers.ModelSerializer):
    class Meta:
        model = DesasignacionLeadAsesor
        fields = '__all__'