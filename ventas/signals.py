# En tu archivo signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.hashers import make_password


@receiver(post_migrate)
def crear_datos(sender, **kwargs):
    from .models import EstadoEvento, EstadoLead, Objecion, TipoEvento, TipoCuota, TipoProducto
    from cuenta.models import EstadoRegistro, User, Modulo
    
    # Verifica si las migraciones pertenecen a tu aplicación
    if sender.name == 'ventas':
        # Aquí puedes agregar lógica para crear datos en tus modelos referenciales
        # Ejemplo:

        estado_Activo = EstadoRegistro.objects.get(estado='A')
        EstadoEvento.objects.get_or_create(nombre='Creado', estado=estado_Activo)
        EstadoEvento.objects.get_or_create(nombre='En Proceso', estado=estado_Activo)
        EstadoEvento.objects.get_or_create(nombre='Finalizado', estado=estado_Activo)


        EstadoLead.objects.get_or_create(nombre='NR',descripcion="No responde", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='EP',descripcion="En proceso", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='FR',descripcion="Frio", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='TB',descripcion="Tibio", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='CA',descripcion="Caliente", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='SE',descripcion="Separaciones", estado=estado_Activo)
        EstadoLead.objects.get_or_create(nombre='CI',descripcion="Cierre", estado=estado_Activo)


        Objecion.objects.get_or_create(nombre="Ninguna", estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='No estoy interesado', estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='Número equivocado', estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='Muy caro', estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='Yo les devuelvo la llamada', estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='Vuélveme a llamar', estado=estado_Activo)
        Objecion.objects.get_or_create(nombre='La ubicación no me gusta', estado=estado_Activo)


        TipoEvento.objects.get_or_create(nombre='Visita Campo', estado=estado_Activo)
        TipoEvento.objects.get_or_create(nombre='Visita Oficina', estado=estado_Activo)


        TipoCuota.objects.get_or_create(nombre='Pago Contado', estado=estado_Activo)

        TipoProducto.objects.get_or_create(nombre='Departamento', estado=estado_Activo)
        TipoProducto.objects.get_or_create(nombre='Lote', estado=estado_Activo)
        TipoProducto.objects.get_or_create(nombre='Cochera', estado=estado_Activo)
        TipoProducto.objects.get_or_create(nombre='Deposito', estado=estado_Activo)
        TipoProducto.objects.get_or_create(nombre='Condominio', estado=estado_Activo)


        try : 
            User.objects.get_or_create(username='portilloAdmin', password=make_password('portilloAdmin'), is_active = True, is_staff=True, is_superuser = True )
        except :
            pass



        Modulo.objects.get_or_create(nombre='Gestion de campañas', url='campania', contentType=ContentType.objects.get(model='campania'), estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestión de proyectos', url='proyecto', contentType=ContentType.objects.get(model='proyecto'), estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestion de roles', url='rol', contentType=ContentType.objects.get(model='group'),estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestión de productos', url='producto', contentType=ContentType.objects.get(model='producto'),estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestión de leads', url='lead', contentType=ContentType.objects.get(model='lead'),estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestion de eventos', url='evento', contentType=ContentType.objects.get(model='evento'),estado=EstadoRegistro.objects.get(estado='A'))
        Modulo.objects.get_or_create(nombre='Gestion de usuarios', url='usuario', contentType=ContentType.objects.get(model='user'),estado=EstadoRegistro.objects.get(estado='A'))


        pass

