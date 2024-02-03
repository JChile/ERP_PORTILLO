# En tu archivo signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group




@receiver(post_migrate)
def crear_datos(sender, **kwargs):
    from .models import EstadoRegistro, Modulo, User
    
    # Verifica si las migraciones pertenecen a tu aplicación
    if sender.name == 'cuenta':
        # Aquí puedes agregar lógica para crear datos en tus modelos referenciales
        # Ejemplo:
        EstadoRegistro.objects.get_or_create(estado='A', nombre='Activo')
        EstadoRegistro.objects.get_or_create(estado='I', nombre='Inactivo')

        Group.objects.get_or_create(name="administrador")
        Group.objects.get_or_create(name="asesor")
        Group.objects.get_or_create(name="marketing")

#portilloAdmin
#portilloAdmin
#permiisosTodo        
        pass



