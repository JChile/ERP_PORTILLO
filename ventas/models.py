from django.db import models
from cuenta.models import User, EstadoRegistro
from marketing.models import Campania
from marketing.models import Proyecto
from django.utils import timezone


class Asesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(unique=True, blank=False, null=False)
    numeroLeads = models.IntegerField(null=True, blank=True, default=0)
    maximoLeads = models.IntegerField(null=True, blank=True, default=0)
    fechaCreado = models.DateTimeField(auto_now_add=True)
    fechaActualizado = models.DateTimeField(auto_now=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.codigo

class TipoEvento(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    def __str__(self):
        return self.nombre


class Objecion(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class EstadoLead(models.Model):
    nombre = models.CharField(max_length=2, primary_key=True)
    descripcion = models.CharField(max_length=50, null=True, default=None)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.descripcion


class Lead(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    apellido = models.CharField(max_length=100, null=False, blank=True)
    asignado = models.BooleanField(default=False)
    celular = models.CharField(max_length=100, null=False, blank=False)
    celular2 = models.CharField(max_length=100, null=False, blank=True)
    comentario = models.TextField(max_length=200, null=False, blank=True)
    horaEntrega = models.DateTimeField(auto_now_add=True)
    horaRecepcion = models.DateTimeField(
        default=timezone.now, null=True, blank=True)
    llamar = models.BooleanField(default=True)
    asesor = models.ForeignKey(
        Asesor, on_delete=models.CASCADE, null=True, blank=True)
    campania = models.ForeignKey(
        Campania, on_delete=models.CASCADE, null=True, blank=True)
    objecion = models.ForeignKey(
        Objecion, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    estadoLead = models.ForeignKey(
        EstadoLead, on_delete=models.SET_NULL, null=True, blank=True, default="EP")

    def __str__(self):
        return self.nombre

    def update_estado(self):
        if self.asesor.estado.estado == 'I':
            self.asesor = None

            if self.estadoLead.nombre == 'EP':
                self.asignado = False

            self.save()


class WhatsApp(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)


class Llamada(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)


class Evento(models.Model):
    asesor = models.ForeignKey(Asesor,  on_delete=models.CASCADE )
    lead = models.ForeignKey(Lead,  on_delete=models.CASCADE , null=True,blank=True)

    titulo = models.CharField(max_length=100, null=True )
    duracion = models.IntegerField(null=True,blank=True)
    fecha_visita = models.DateTimeField(null=True,blank=True)
    tipo = models.ForeignKey(TipoEvento,  on_delete=models.CASCADE)
    ubicacion = models.CharField(max_length=100, null=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    descripcion = models.TextField(null=True, blank=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.titulo


class TipoProducto(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    codigo = models.CharField(max_length=100, null=False, blank=True, unique=True)
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE , null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE , null=True, blank=True)
    numero = models.IntegerField(null=True, blank=True, default=0)
    area = models.FloatField(null=True, blank=True, default=0)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre
    
class TipoCotizacion(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    
    def __str__(self):
        return self.nombre

class Cotizacion(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    tipo = models.ForeignKey(TipoCotizacion, on_delete=models.CASCADE , null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE , null=True, blank=True)
    fecha = models.DateTimeField(null=True,blank=True)
    duracion = models.IntegerField(null=True, blank=True, default=0)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class TipoCuota(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    def __str__(self):
        return self.nombre
    
class Cuota(models.Model):
    tipo = models.ForeignKey(TipoCuota, on_delete=models.CASCADE , null=True, blank=True)
    cotizacion = models.ForeignKey(Cotizacion, on_delete=models.CASCADE , null=True, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    tiempo = models.IntegerField(null=True, blank=True)
    porcentaje = models.FloatField(null=True, blank=True, default=0)
    fecha = models.DateTimeField(null=True,blank=True)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

 


class Precio(models.Model):
    tipoProducto = models.ForeignKey(TipoCuota, on_delete=models.CASCADE , null=True, blank=True)
    cotizacion = models.ForeignKey(Cotizacion, on_delete=models.CASCADE , null=True, blank=True)
    precio = models.FloatField(null=True, blank=True, default=0)
    estado = models.ForeignKey(EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)









    
