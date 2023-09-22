
from cuenta.models import User
from django.db import models

class Proyecto(models.Model):
    nombre = models.CharField(max_length=100,null=True)
    ubicacion = models.CharField(max_length=100,null=True,blank=True)
    descripcion = models.CharField(max_length=100,null=True,blank=True)
    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    nombre = models.CharField(max_length=100,null=True)
    def __str__(self):
        return self.nombre

'''
class SubCategoria(models.Model):
    nombre = models.CharField(max_length=100,null=True)
    categoria = models.ForeignKey(Categoria,on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre

'''

    
class Campania(models.Model):
    
    ESTADO = (
        ('A', 'Activo'),
        ('I', 'Inactivo'),
        ('E', 'Eliminado')
    )
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100,null=True)
    fecha_estimada = models.DateField(null=True,blank=True)
    fecha_cierre = models.DateField(null=True,blank=True)
    coste_estimado = models.FloatField(default=0)
    coste_real = models.FloatField(default=0)
    descripcion = models.TextField(null=True,blank=True)
    estado = models.CharField(max_length=20,default='A',choices=ESTADO,null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto,on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre
