
from cuenta.models import User, EstadoRegistro
from django.db import models
from django.utils import timezone
import numpy as np
from datetime import date



    
class Proyecto(models.Model):
    nombre = models.CharField(max_length=100, null=True, unique=True)
    ubicacion = models.CharField(max_length=100, null=True, blank=True)
    codigo = models.CharField(max_length=10, unique = True)
    descripcion = models.TextField(null=True, blank=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioCreadorProyecto')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioActualizadorProyecto')
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):

        if not self.pk:
            super().save(*args, **kwargs)
            Campania.objects.create(nombre=str(self.nombre)+"_organico", codigo=str(
                self.nombre)+"_organico", proyecto=self, categoria=Categoria.objects.get(nombre="Desconocido"))
            return
        super().save(*args, **kwargs)


class PresupuestoProyecto(models.Model):
    presupuestoSoles = models.FloatField(default=0)
    gastoTotalCampaniasSoles = models.FloatField(default=0)
    presupuestoDolares = models.FloatField(default=0)
    gastoTotalCampaniasDolares = models.FloatField(default=0)
    tipoCambioSoles =  models.FloatField(default=0)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    fechaPresupuesto= models.DateField(default=date.today)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioCreadorPresupuestoProyecto')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioActualizadorPresupuestoProyecto')
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.proyecto.nombre + '-' + str(self.presupuestoDolares)

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    codigo = models.CharField(max_length=100, unique=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre


class Campania(models.Model):
    nombre = models.CharField(max_length=100, null=True, unique=True)
    organico = models.BooleanField(default = False)
    codigo = models.CharField(
        max_length=100, null=True, blank=True, unique=True)
    fecha_estimada = models.DateField(null=True, blank=True)
    fecha_cierre = models.DateField(null=True, blank=True)
    coste_realSoles = models.FloatField(default=0)
    coste_realDolares = models.FloatField(default=0)
    descripcion = models.TextField(null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioCreadorCampania')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarioActualizadorCampania')
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre


class GastoCampania(models.Model):
    gastoSoles = models.FloatField(default=0)
    gastoDolares = models.FloatField(default=0)
    tipoCambioSoles =  models.FloatField(default=0)
    campania = models.ForeignKey(Campania, on_delete= models.CASCADE)
    presupuestoProyecto = models.ForeignKey(PresupuestoProyecto, on_delete = models.CASCADE)
    fechaGasto = models.DateField(default=date.today)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    usuarioCreador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioCreadorGastoCampania')
    usuarioActualizador = models.ForeignKey(
        User, on_delete=models.SET_NULL,  null=True, blank=True, related_name='usuarioActualizadorGastoCampania')
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def actualizarGasto(self,*args, **kwargs):
        gasto_query_array = np.array(GastoCampania.objects.filter(presupuestoProyecto = self.presupuestoProyecto).values_list('gastoSoles', 'gastoDolares'))
        self.presupuestoProyecto.gastoTotalCampaniasSoles = np.sum([elem[0] for elem in gasto_query_array])
        self.presupuestoProyecto.gastoTotalCampaniasDolares = np.sum([elem[1] for elem in gasto_query_array])
        costeCampania_query_array = np.array(GastoCampania.objects.filter(campania = self.campania).values_list('gastoSoles', 'gastoDolares'))
        self.campania.coste_realSoles = np.sum([elem[0] for elem in costeCampania_query_array])
        self.campania.coste_realDolares = np.sum([elem[1] for elem in costeCampania_query_array])
        self.presupuestoProyecto.save()
        self.campania.save()
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.actualizarGasto()
    
    def delete(self):
        self.presupuestoProyecto.gastoTotalCampaniasSoles = self.presupuestoProyecto.gastoTotalCampaniasSoles - self.gastoSoles
        self.campania.coste_realSoles = self.campania.coste_realSoles  - self.gastoSoles
        self.presupuestoProyecto.gastoTotalCampaniasDolares = self.presupuestoProyecto.gastoTotalCampaniasDolares - self.gastoDolares
        self.campania.coste_realDolares = self.campania.coste_realDolares  - self.gastoDolares
        self.presupuestoProyecto.save()
        self.campania.save()
        super().delete()
