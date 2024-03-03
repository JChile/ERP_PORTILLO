# En tu archivo signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver



@receiver(post_migrate)
def crear_datos(sender, **kwargs):
    from .models import Categoria
    from cuenta.models import EstadoRegistro
    
    # Verifica si las migraciones pertenecen a tu aplicación
    if sender.name == 'marketing':
        if True:
            estado_Activo = EstadoRegistro.objects.get(estado='A')
            Categoria.objects.get_or_create(nombre='Fisico', codigo = 'CF', estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='Volante',  codigo = 'CV',estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='Facebook', codigo = 'CFB', estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='Instagram', codigo = 'CI', estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='TikTok',  codigo = 'CT',estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='WhatsApp',  codigo = 'CW',estado=estado_Activo)
            Categoria.objects.get_or_create(nombre='Desconocido',  codigo = 'CD',estado=estado_Activo)

        pass


