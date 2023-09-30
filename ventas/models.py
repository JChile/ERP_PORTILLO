from django.db import models
from cuenta.models import User, EstadoRegistro
from marketing.models import Campania
from marketing.models import Proyecto


class Asesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(unique=True, blank=False, null=False)
    numeroLeads = models.IntegerField(null=True, blank=True, default=0)
    maximoLeads = models.IntegerField(null=True, blank=True, default=0)
    fechaCreado = models.DateTimeField(auto_now=True)
    fechaActualizado = models.DateTimeField(auto_now=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.codigo


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
    nombre = models.CharField(max_length=100, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=True, blank=True)
    asignado = models.BooleanField(default=False)
    celular = models.CharField(max_length=100, null=True, blank=False)
    celular2 = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=100, null=True, blank=True)
    comentario = models.TextField(max_length=200, null=True, blank=True)
    horaEntrega = models.DateTimeField(auto_now=True)
    llamar = models.BooleanField(default=False)
    asesor = models.ForeignKey(
        Asesor, on_delete=models.CASCADE, null=True, blank=True)
    campania = models.ForeignKey(
        Campania, on_delete=models.CASCADE, null=True, blank=True)
    objecion = models.ForeignKey(
        Objecion, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    estadoLead = models.ForeignKey(
        EstadoLead, on_delete=models.SET_NULL, null=True, blank=True)

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
