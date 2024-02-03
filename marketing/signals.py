# En tu archivo signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver



@receiver(post_migrate)
def crear_datos(sender, **kwargs):
    from .models import Categoria
    from cuenta.models import EstadoRegistro
    
    # Verifica si las migraciones pertenecen a tu aplicación
    if sender.name == 'marketing':
        # Aquí puedes agregar lógica para crear datos en tus modelos referenciales
        # Ejemplo:

        # estado_Activo = EstadoRegistro.objects.get(estado='A')
        # Categoria.objects.get_or_create(nombre='Fisico', estado=estado_Activo)
        # Categoria.objects.get_or_create(nombre='Bolante', estado=estado_Activo)
        # Categoria.objects.get_or_create(nombre='Facebook', estado=estado_Activo)
        # Categoria.objects.get_or_create(nombre='Instagram', estado=estado_Activo)
        # Categoria.objects.get_or_create(nombre='TikTok', estado=estado_Activo)
        # Categoria.objects.get_or_create(nombre='Desconocido', estado=estado_Activo)

        pass


