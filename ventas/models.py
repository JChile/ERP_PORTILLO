from django.db import models
from cuenta.models import User, EstadoRegistro
from marketing.models import Campania
from marketing.models import Proyecto
from django.utils import timezone
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


class TipoEvento(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    color = models.CharField(max_length=100, null=True)


    def __str__(self):
        return self.nombre


class Objecion(models.Model):
    nombre = models.CharField(max_length=100, null=True, unique= True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class EstadoLead(models.Model):
    nombre = models.CharField(max_length=2, primary_key=True)
    descripcion = models.CharField(max_length=50, null=True, default=None)
    color =  models.CharField(max_length=10)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.descripcion


#Nuevo
class EstadoSeparacionLead(models.Model):
    nombre = models.CharField(max_length=20)
    color =  models.CharField(max_length=10)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Lead(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    apellido = models.CharField(max_length=100, null=False, blank=True)
    asignado = models.BooleanField(default=False)
    celular =  models.CharField(max_length=100)
    celular2 =  models.CharField(max_length=100,null = True,blank=True)
    comentario = models.TextField(max_length=200, null=False, blank=True)
    horaRecepcion = models.DateTimeField(
        default=timezone.now, null=True, blank=True)
    llamar = models.BooleanField(default=True)
    importante = models.BooleanField(default=False)
    asesor = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    campania = models.ForeignKey(
        Campania, on_delete=models.CASCADE)
    objecion = models.ForeignKey(
        Objecion, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    estadoLead = models.ForeignKey(
        EstadoLead, on_delete=models.SET_NULL, null=True, blank=True, default="EP")
    estadoSeparacionLead = models.ForeignKey(
        EstadoSeparacionLead, on_delete=models.SET_NULL, null=True, blank=True) #nuevo   
    fecha_asignacion = models.DateTimeField(blank=True, null=True)
    fecha_desasignacion = models.DateTimeField(blank=True, null=True)
    recienCreado = models.BooleanField(default=True)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioCreadorLead')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True,blank=True, related_name='usuarioActualizadorLead')
    fecha_creacion = models.DateTimeField(default = timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.nombre == "":
            return str(self.celular)
        return self.nombre + "-"+str(self.celular)
    
    def actualizar_estado_asignado(self):
        self.asignado = self.asesor is not None

    def actualizar_objecion(self):
        if not self.objecion:
            try:
                objecion = Objecion.objects.get(nombre="Ninguna")
                self.objecion = objecion 
            except:
                pass
        
    def save(self, *args, **kwargs):
        self.actualizar_estado_asignado()
        self.actualizar_objecion()
        if self.asesor != None:
            self.recienCreado = False
        super().save(*args, **kwargs)
        






class WhatsApp(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    asesor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    respondio = models.BooleanField(default=False)
    objecion = models.ForeignKey(Objecion, null=True, blank=True, on_delete=models.CASCADE)

    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioCreadorWhatsapp')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioActualizadorWhatsapp')
    fecha_creacion = models.DateTimeField(default = timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def actualizar_objecion(self):
        if not self.objecion:
            try:
                objecion = Objecion.objects.get(nombre="Ninguna")
                self.objecion = objecion 
            except:
                pass
    def save(self, *args, **kwargs):
        self.actualizar_objecion()
        super().save(*args, **kwargs)

class HistoricoLeadAsesor(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    fecha_creacion = models.DateTimeField(default = timezone.now)


class Llamada(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    asesor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    contesto = models.BooleanField(default=False)
    objecion = models.ForeignKey(Objecion, null=True, blank=True, on_delete=models.CASCADE)

    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True,  blank=True,related_name='usuarioCreadorLlamada')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioActualizadorLlamada')
    fecha_creacion = models.DateTimeField(default = timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def actualizar_objecion(self):
        if not self.objecion:
            try:
                objecion = Objecion.objects.get(nombre="Ninguna")
                self.objecion = objecion 
            except:
                pass
    def save(self, *args, **kwargs):
        self.actualizar_objecion()
        super().save(*args, **kwargs)

class EstadoEvento(models.Model):
    nombre = models.CharField(max_length=20, null=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Evento(models.Model):
    asesor = models.ForeignKey(
        User,  on_delete=models.CASCADE)
    lead = models.ForeignKey(
        Lead, on_delete=models.CASCADE, null=True, blank=True)

    titulo = models.CharField(max_length=100, null=True)
    duracion = models.IntegerField(default = 0)
    fecha_visita = models.DateTimeField()
    tipo = models.ForeignKey(TipoEvento,  null=True, blank=True, on_delete=models.CASCADE)
    observacion = models.TextField(null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    estadoEvento = models.ForeignKey(
        EstadoEvento,  null=True, blank=True, on_delete=models.SET_NULL)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioCreadorEvento')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True,  blank=True,related_name='usuarioActualizadorEvento')
    fecha_creacion = models.DateTimeField(default = timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    separado = models.BooleanField(default=False)
    objecion = models.ForeignKey(Objecion, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.objecion:  # Si no se ha asignado un objeto padre
            # Buscar el objeto padre por su nombre
            objecion = Objecion.objects.get(nombre="Ninguna")
            self.objecion = objecion 
        if not self.estadoEvento:  # Si no se ha asignado un objeto padre
            # Buscar el objeto padre por su nombre
            estadoEvento = EstadoEvento.objects.get(nombre="Creado")
            self.estadoEvento = estadoEvento  
        super().save(*args, **kwargs)


class TipoProducto(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    codigo = models.CharField(
        max_length=100, null=False, blank=True, unique=True)
    tipo = models.ForeignKey(
        TipoProducto, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(
        Proyecto, on_delete=models.CASCADE)
    reservado = models.BooleanField(default=False)
    numero = models.IntegerField(null=True, blank=True, default=0)
    area = models.FloatField(null=True, blank=True, default=0)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioCreadorProducto')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,related_name='usuarioActualizadorProducto')
    fecha_creacion = models.DateTimeField(default = timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre


class TipoCotizacion(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Cotizacion(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    tipo = models.ForeignKey(
        TipoCotizacion, on_delete=models.CASCADE, null=True, blank=True)
    proyecto = models.ForeignKey(
        Proyecto, on_delete=models.CASCADE, null=True, blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    duracion = models.IntegerField(null=True, blank=True, default=0)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class TipoCuota(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Cuota(models.Model):
    tipo = models.ForeignKey(
        TipoCuota, on_delete=models.CASCADE, null=True, blank=True)
    cotizacion = models.ForeignKey(
        Cotizacion, on_delete=models.CASCADE, null=True, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    tiempo = models.IntegerField(null=True, blank=True)
    porcentaje = models.FloatField(null=True, blank=True, default=0)
    fecha = models.DateTimeField(null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return f'{self.cotizacion.tipo.nombre} -  Cuota {str(self.numero)}: {self.tipo.nombre}'


class Precio(models.Model):
    tipoProducto = models.ForeignKey(
        TipoProducto, on_delete=models.CASCADE, null=True, blank=True)
    cotizacion = models.ForeignKey(
        Cotizacion, on_delete=models.CASCADE, null=True, blank=True)
    precio = models.FloatField(null=True, blank=True, default=0)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return f'{self.cotizacion.tipo.nombre} - {self.tipoProducto.nombre}'


class ProyectoTipoProducto(models.Model):
    proyecto = models.ForeignKey(
        Proyecto, on_delete=models.CASCADE, null=True, blank=True)
    tipo_producto = models.ForeignKey(
        TipoProducto, on_delete=models.CASCADE, null=True, blank=True)


class DesasignacionLeadAsesor(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    fecha = models.DateTimeField(default = timezone.now)

class DesasignacionConfiguracion(models.Model):
    rango = models.IntegerField()
    def save(self, *args, **kwargs):
        if not self.pk and DesasignacionConfiguracion.objects.exists():
        # if you'll not check for self.pk 
        # then error will also be raised in the update of exists model
            raise ValidationError('Sólo puede haber una instancia de DesasignacionConfiguracion')
        return super(DesasignacionConfiguracion, self).save(*args, **kwargs)