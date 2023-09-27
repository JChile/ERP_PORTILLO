from django.db import models
from cuenta.models import User, EstadoRegistro
from marketing.models import Campania


class Asesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(unique=True, blank=False, null=False)
    numeroLeads = models.IntegerField(null=True, blank=True, default=0)
    fechaCreado = models.DateTimeField(auto_now=True)
    fechaActualizado = models.DateTimeField(auto_now=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.user.username


class Objecion(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Lead(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    apellido = models.CharField(max_length=100, null=True)
    asignado = models.BooleanField(default=False)
    activo = models.BooleanField(default=False)
    celular = models.CharField(max_length=100, null=True)
    comentario = models.TextField(max_length=200, null=True, blank=True)
    horaEntrega = models.DateTimeField(null=True)
    mensajeMarketing = models.TextField(max_length=200, null=True, blank=True)
    llamar = models.BooleanField(default=False)

    asesor = models.ForeignKey(
        Asesor, on_delete=models.CASCADE, null=True, blank=True)
    campania = models.ForeignKey(
        Campania, on_delete=models.CASCADE, null=True, blank=True)

    objeciones = models.ForeignKey(
        Objecion, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class WhatsApp(models.Model):
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)


class Llamada(models.Model):
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE)
    detalle = models.TextField(max_length=200, null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
