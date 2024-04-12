from rest_framework import serializers
from .models import *
from cuenta.models import *
from .consts import *
from rest_framework import status
from marketing.serializers import ProyectoSerializer
from cuenta.serializers import *

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


class EstadoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoEvento
        fields = '__all__'


class DesasignacionConfiguracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesasignacionConfiguracion
        fields = '__all__'


class EstadoSeparacionLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoSeparacionLead
        fields = '__all__'




class LeadBodySerializer(serializers.ModelSerializer):
    numLlamadas = serializers.SerializerMethodField()
    numWhatsapps = serializers.SerializerMethodField()
    numEventos = serializers.SerializerMethodField()
    proyecto = serializers.SerializerMethodField()
    asesor = UserInfoSerializer()
    usuarioCreador= UserInfoSerializer()
    usuarioActualizador= UserInfoSerializer()
    ultimoAsesor= serializers.SerializerMethodField()

    class Meta:
        model = Lead
        fields =  '__all__'
        depth = 1
    
    def get_proyecto(self, obj):

        proyecto = Proyecto.objects.filter(id = obj.campania.proyecto.id).first()
        proyecto_data = ProyectoSerializer(proyecto).data if proyecto != None else None
        return proyecto_data
    
    def get_numLlamadas(self, obj):
        asesor_logueado = self.context['request'].user.id  # Obtener el asesor logueado
        if self.context["request"].user.isAdmin:
            num_llamadas = Llamada.objects.filter(lead=obj).count()
        else:
            num_llamadas = Llamada.objects.filter(asesor=asesor_logueado, lead=obj).count()
        
        return num_llamadas

    def get_numWhatsapps(self, obj):
        asesor_logueado = self.context['request'].user.id  # Obtener el asesor logueado
        
        if self.context["request"].user.isAdmin:
            num_llamadas = WhatsApp.objects.filter(lead=obj).count()
        else:
            num_llamadas = WhatsApp.objects.filter(asesor=asesor_logueado, lead=obj).count()
        
        return num_llamadas
    
    def get_numEventos(self, obj):
        asesor_logueado = self.context['request'].user.id  # Obtener el asesor logueado
        if self.context["request"].user.isAdmin:
            num_llamadas = Evento.objects.filter(lead=obj).count()
        else:
            num_llamadas = Evento.objects.filter(asesor=asesor_logueado, lead=obj).count()

        return num_llamadas
    def get_ultimoAsesor(self, obj):
        asesor_logueado = self.context['request'].user.id  # Obtener el asesor logueado
        ultimoAsesor = DesasignacionLeadAsesor.objects.filter(lead=obj).order_by('-fecha').first()
        if ultimoAsesor != None:
            ultimoAsesor_data = UserInfoSerializer(ultimoAsesor.usuario).data 
        else:
            ultimoAsesor_data = None

        return ultimoAsesor_data