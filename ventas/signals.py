# En tu archivo signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password



@receiver(post_migrate)
def crear_datos(sender, **kwargs):
    from .models import EstadoEvento, EstadoLead, Objecion, TipoEvento, TipoCuota, TipoProducto, Evento, Lead, Producto
    from marketing.models import Campania, Proyecto
    from cuenta.models import EstadoRegistro, User, Modulo
    from django.contrib.auth.models import Group, Permission
    from django.contrib.contenttypes.models import ContentType

    # Verifica si las migraciones pertenecen a tu aplicación
    if sender.name == 'ventas':
        if True:
            estado_Activo = EstadoRegistro.objects.get(estado='A')
            EstadoEvento.objects.get_or_create(nombre='Creado', estado=estado_Activo)
            EstadoEvento.objects.get_or_create(nombre='En Proceso', estado=estado_Activo)
            EstadoEvento.objects.get_or_create(nombre='Finalizado', estado=estado_Activo)


            EstadoLead.objects.get_or_create(nombre='NR', color ="#949494",descripcion="No responde", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='EP', color ="#949494",descripcion="En proceso", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='FR', color ="#0044FF",descripcion="Frio", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='TB', color ="#FFEE00",descripcion="Tibio", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='CA', color ="#FF0000",descripcion="Caliente", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='SE', color ="#949494",descripcion="Separaciones", estado=estado_Activo)
            EstadoLead.objects.get_or_create(nombre='CI', color ="#19FF00",descripcion="Cierre", estado=estado_Activo)


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


            Modulo.objects.get_or_create(nombre='Gestion de campañas', url='campania', contentType=ContentType.objects.get(model='campania'), estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestión de proyectos', url='proyecto', contentType=ContentType.objects.get(model='proyecto'), estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestion de roles', url='rol', contentType=ContentType.objects.get(model='group'),estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestión de productos', url='producto', contentType=ContentType.objects.get(model='producto'),estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestión de leads', url='lead', contentType=ContentType.objects.get(model='lead'),estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestion de eventos', url='evento', contentType=ContentType.objects.get(model='evento'),estado=EstadoRegistro.objects.get(estado='A'))
            Modulo.objects.get_or_create(nombre='Gestion de usuarios', url='usuario', contentType=ContentType.objects.get(model='user'),estado=EstadoRegistro.objects.get(estado='A'))

            content_type_user = ContentType.objects.get_for_model(User)
            content_type_group = ContentType.objects.get_for_model(Group)
            content_type_lead = ContentType.objects.get_for_model(Lead)
            content_type_campania = ContentType.objects.get_for_model(Campania)
            content_type_evento = ContentType.objects.get_for_model(Evento)
            content_type_proyecto = ContentType.objects.get_for_model(Proyecto)
            content_type_producto = ContentType.objects.get_for_model(Producto)

            try : 
               userAdmin = User.objects.create(first_name = 'Administrador Portillo', username='portilloAdmin', password=make_password('portilloAdmin'), is_active = True, is_staff=True, is_superuser = True)
               grupo_administrador = Group.objects.get(name='administrador')
               userAdmin.groups.add(grupo_administrador)
               permisos = Permission.objects.filter(content_type__in=[content_type_user, content_type_group, content_type_lead, content_type_campania, content_type_evento,
                                                                      content_type_proyecto, content_type_producto])
               grupo_administrador.permissions.add(*permisos)

            except :
                print("Hubo problemas al crear usuario, desactiva los signals si no es tu primer migrate")

            try : 
                grupo_asesor = Group.objects.get(name='asesor')
                grupo_marketing = Group.objects.get(name='marketing')
                grupo_asesor.clean()
                grupo_marketing.clean()
                permisos_asesor = Permission.objects.filter(content_type__in=[content_type_lead, content_type_evento])
                permisos_marketing = Permission.objects.filter(content_type__in=[content_type_lead, content_type_campania])
                grupo_asesor.permissions.add(*permisos_asesor)
                grupo_marketing.permissions.add(*permisos_marketing)

            except:
                print("Hubo problemas al  añadir los permisos a los grupos de asesor y marketing")


