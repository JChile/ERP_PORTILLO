from django.db import models
from cuenta.models import User, EstadoRegistro
from marketing.models import Campania
from marketing.models import Proyecto


class Asesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fechaCreado = models.DateTimeField(null=True)
    fechaActualizado = models.DateTimeField(null=True)
    proyectos = models.ManyToManyField(Proyecto, through='AsesorProyecto', blank=True)
    estado = models.ForeignKey(EstadoRegistro,on_delete=models.SET_NULL, default='A',null=True)

    def __str__(self):
        return self.user.username

class AsesorProyecto(models.Model):
    asesor = models.ForeignKey(Asesor, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    

class Objecion(models.Model):
    nombre = models.CharField(max_length=100,null=True)
    estado = models.ForeignKey(EstadoRegistro,on_delete=models.SET_NULL, default='A',null=True)

    def __str__(self):
        return self.nombre

class Lead(models.Model):
    nombre = models.CharField(max_length=100,null=True)
    apellido = models.CharField(max_length=100, null=True)
    asignado = models.BooleanField(default=False)
    celular = models.CharField(max_length=100, null=True)
    comentario = models.TextField(max_length=200, null=True, blank=True)
    horaEntrega = models.DateTimeField(null=True)
    llamar = models.BooleanField(default=False)
    asesor = models.ForeignKey(Asesor, on_delete=models.CASCADE, null=True,blank=True)
    campania = models.ForeignKey(Campania, on_delete=models.CASCADE, null=True,blank=True)
    objecion = models.ForeignKey(Objecion, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.ForeignKey(EstadoRegistro,on_delete=models.SET_NULL, default='A',null=True)
    estadoLead = models.ForeignKey(EstadoLead,on_delete=models.SET_NULL, default='NP', null=True, blank=True)
    
    def __str__(self):
        return self.nombre

class WhatsApp(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(EstadoRegistro,on_delete=models.SET_NULL, default='A',null=True)


class Llamada(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(EstadoRegistro,on_delete=models.SET_NULL, default='A',null=True)


class EstadoLead(models.Model):
    estado = models.CharField(max_length=2, primary_key=True)
    nombre = models.CharField(max_length=50, null=True, default=None)
    def __str__(self):
        return self.estado


   
