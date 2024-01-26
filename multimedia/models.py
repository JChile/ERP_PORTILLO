from django.db import models
from ventas.models import Producto, Proyecto
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator

def validate_image(value):
    if not value.name.endswith(('.jpg', '.jpeg', '.png', '.gif')):
        raise ValidationError("Solo se permiten archivos de imagen (jpg, jpeg, png, gif)")

def validate_video(value):
    if not value.name.endswith(('.mp4', '.avi', '.mov', '.mkv')):
        raise ValidationError("Solo se permiten archivos de video (mp4, avi, mov, mkv)")



class VideoProyecto(models.Model):
    video = models.FileField(upload_to='videos/', validators=[validate_video], null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)

class VideoProducto(models.Model):
    video = models.FileField(upload_to='videos/', validators=[validate_video], null=True, blank=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)


class ImagenProyecto(models.Model):
    imagen = models.ImageField(upload_to='imagenes/', validators=[validate_image], null=True, blank=True)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)


class ImagenProducto(models.Model):
    imagen = models.ImageField(upload_to='imagenes/', validators=[validate_image], null=True, blank=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
