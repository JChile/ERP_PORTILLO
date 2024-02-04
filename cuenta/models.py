from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import is_password_usable


class EstadoRegistro(models.Model):
    estado = models.CharField(max_length=1, primary_key=True)
    nombre = models.CharField(max_length=50, null=True, default=None)

    def __str__(self):
        return self.estado

class User(AbstractUser):
    codigoAsesor = models.CharField(max_length=100, null=True, default=None, blank = False, unique = True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)
    isAdmin = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username

class Modulo(models.Model):
    nombre = models.CharField(max_length=100, null=True, default=None)
    url = models.CharField(max_length=50, null=True, default=None)
    contentType = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, blank=True, null=True)
    estado = models.ForeignKey(
        EstadoRegistro, on_delete=models.SET_NULL, default='A', null=True)

    def __str__(self):
        return self.nombre

# @receiver(post_save, sender=User)
# def create_usuario_detalle(sender, instance, created, **kwargs):
#     if created:
#         profile = Profile.objects.get_or_create(id=instance.id)
#         user = User.objects.get(id=instance.id)
#         print( '\033[91m'+"validated data ------------------------->", user,'\033[0m')
#         user.perfil = Profile.objects.get(id=profile[0].id)
#         user.save()
