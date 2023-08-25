from django.db import models
from cuenta.models import User
from marketing.models import Campania


class Asesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class Lead(models.Model):
    ESTADO = (
        ('NR', 'No responde'),
        ('EP', 'En proceso'),
        ('FR', 'Frio'),
        ('TB', 'Tibio'),
        ('CH', 'Caliente'),
        ('SE', 'Separaciones'),
        ('CI', 'Cierre'),
    )

    OBJECIONES = (    
        ('NN', 'Ninguna'),
        ('PR', 'Precio'),
        ('NI', 'No indica / No Interesado'),
        ('OT', 'Ocupado / Trabajando'),
        ('UB', 'Ubicación'),
        ('SM', 'Solo mensajes / Wsp'),
        ('IM', 'Inmediatez'),
        ('NC', 'No contesta / Apagado'),
        ('EN', 'Equivocado / No existe'),
        ('PC', 'Playa/Campo / Casa'),
    )


    nombre = models.CharField(max_length=100,null=True)
    apellido = models.CharField(max_length=100, null=True)
    celular = models.CharField(max_length=100, null=True)
    comentario = models.TextField(max_length=200, null=True, blank=True)
    horaEntrega = models.DateTimeField(null=True)
    mensajeMarketing = models.TextField(max_length=200, null=True, blank=True)
    llamar = models.BooleanField(default=False)
    
    asesor = models.ForeignKey(Asesor, on_delete=models.CASCADE, null=True)
    campania = models.ForeignKey(Campania, on_delete=models.CASCADE, null=True)


    estado = models.CharField(max_length=30,choices=ESTADO,null=True, blank=True)
    objeciones = models.CharField(max_length=30, default='Ninguna', choices=OBJECIONES, null=True, blank=True)

    def __str__(self):
        return self.nombre

class WhatsApp(models.Model):
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE)
    detalle = models.TextField(max_length=200, null=True, blank=True)

class Llamada(models.Model):
    lead = models.OneToOneField(Lead, on_delete=models.CASCADE)
    detalle = models.TextField(max_length=200, null=True, blank=True)
