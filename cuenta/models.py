from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType


class EstadoRegistro(models.Model):
    estado = models.CharField(max_length=1, primary_key=True)
    nombre = models.CharField(max_length=50, null=True, default=None)

    def __str__(self):
        return self.estado


class Profile(models.Model):

    FONDO_PENSIONES = (
        ('o', 'ONP'),
        ('a', 'AFP'),
        ('p', 'Pendiente'),
    )

    ESTADO_CIVIL = (
        ('s', 'Soltero'),
        ('c', 'Casado'),
        ('v', 'Viudo'),
        ('v', 'Divorciado'),
    )

    PAISES = (
        ('AF', 'Afganistán'),
        ('AL', 'Albania'),
        ('DE', 'Alemania'),
        ('AD', 'Andorra'),
        ('AO', 'Angola'),
        ('AG', 'Antigua y Barbuda'),
        ('SA', 'Arabia Saudita'),
        ('DZ', 'Argelia'),
        ('AR', 'Argentina'),
        ('AM', 'Armenia'),
        ('AU', 'Australia'),
        ('AT', 'Austria'),
        ('AZ', 'Azerbaiyán'),
        ('BS', 'Bahamas'),
        ('BH', 'Baréin'),
        ('BD', 'Bangladés'),
        ('BB', 'Barbados'),
        ('BE', 'Bélgica'),
        ('BZ', 'Belice'),
        ('BJ', 'Benín'),
        ('BM', 'Bermudas'),
        ('BY', 'Bielorrusia'),
        ('BO', 'Bolivia'),
        ('BA', 'Bosnia y Herzegovina'),
        ('BW', 'Botsuana'),
        ('BR', 'Brasil'),
        ('BN', 'Brunéi'),
        ('BG', 'Bulgaria'),
        ('BF', 'Burkina Faso'),
        ('BI', 'Burundi'),
        ('BT', 'Bután'),
        ('CV', 'Cabo Verde'),
        ('KH', 'Camboya'),
        ('CM', 'Camerún'),
        ('CA', 'Canadá'),
        ('QA', 'Catar'),
        ('TD', 'Chad'),
        ('CL', 'Chile'),
        ('CN', 'China'),
        ('CY', 'Chipre'),
        ('CO', 'Colombia'),
        ('KM', 'Comoras'),
        ('CG', 'Congo'),
        ('KP', 'Corea del Norte'),
        ('KR', 'Corea del Sur'),
        ('CI', 'Costa de Marfil'),
        ('CR', 'Costa Rica'),
        ('HR', 'Croacia'),
        ('CU', 'Cuba'),
        ('DK', 'Dinamarca'),
        ('DM', 'Dominica'),
        ('EC', 'Ecuador'),
        ('EG', 'Egipto'),
        ('SV', 'El Salvador'),
        ('AE', 'Emiratos Árabes Unidos'),
        ('ER', 'Eritrea'),
        ('SK', 'Eslovaquia'),
        ('SI', 'Eslovenia'),
        ('ES', 'España'),
        ('US', 'Estados Unidos'),
        ('EE', 'Estonia'),
        ('ET', 'Etiopía'),
        ('PH', 'Filipinas'),
        ('FI', 'Finlandia'),
        ('FJ', 'Fiyi'),
        ('FR', 'Francia'),
        ('GA', 'Gabón'),
        ('GM', 'Gambia'),
        ('GE', 'Georgia'),
        ('GH', 'Ghana'),
        ('GR', 'Grecia'),
        ('GD', 'Granada'),
        ('GT', 'Guatemala'),
        ('GN', 'Guinea'),
        ('GW', 'Guinea-Bisáu'),
        ('GQ', 'Guinea Ecuatorial'),
        ('GY', 'Guyana'),
        ('HT', 'Haití'),
        ('HN', 'Honduras'),
        ('HU', 'Hungría'),
        ('IN', 'India'),
        ('ID', 'Indonesia'),
        ('IR', 'Irán'),
        ('IQ', 'Iraq'),
        ('IE', 'Irlanda'),
        ('IS', 'Islandia'),
        ('IL', 'Israel'),
        ('IT', 'Italia'),
        ('JM', 'Jamaica'),
        ('JP', 'Japón'),
        ('JO', 'Jordania'),
        ('KZ', 'Kazajistán'),
        ('KE', 'Kenia'),
        ('KG', 'Kirguistán'),
        ('KI', 'Kiribati'),
        ('KW', 'Kuwait'),
        ('LA', 'Laos'),
        ('LS', 'Lesoto'),
        ('LV', 'Letonia'),
        ('LB', 'Líbano'),
        ('LR', 'Liberia'),
        ('LY', 'Libia'),
        ('LI', 'Liechtenstein'),
        ('LT', 'Lituania'),
        ('LU', 'Luxemburgo'),
        ('MG', 'Madagascar'),
        ('MY', 'Malasia'),
        ('MW', 'Malaui'),
        ('MV', 'Maldivas'),
        ('ML', 'Malí'),
        ('MT', 'Malta'),
        ('MA', 'Marruecos'),
        ('MU', 'Mauricio'),
        ('MR', 'Mauritania'),
        ('MX', 'México'),
        ('FM', 'Micronesia'),
        ('MD', 'Moldavia'),
        ('MC', 'Mónaco'),
        ('MN', 'Mongolia'),
        ('ME', 'Montenegro'),
        ('MZ', 'Mozambique'),
        ('MM', 'Myanmar'),
        ('NA', 'Namibia'),
        ('NR', 'Nauru'),
        ('NP', 'Nepal'),
        ('NI', 'Nicaragua'),
        ('NE', 'Níger'),
        ('NG', 'Nigeria'),
        ('NO', 'Noruega'),
        ('NZ', 'Nueva Zelanda'),
        ('OM', 'Omán'),
        ('NL', 'Países Bajos'),
        ('PK', 'Pakistán'),
        ('PW', 'Palaos'),
        ('PA', 'Panamá'),
        ('PG', 'Papúa Nueva Guinea'),
        ('PY', 'Paraguay'),
        ('PE', 'Perú'),
        ('PL', 'Polonia'),
        ('PT', 'Portugal'),
        ('GB', 'Reino Unido'),
        ('CF', 'República Centroafricana'),
        ('CZ', 'República Checa'),
        ('CD', 'República Democrática del Congo'),
        ('DO', 'República Dominicana'),
        ('RO', 'Rumania'),
        ('RW', 'Ruanda'),
        ('RU', 'Rusia'),
        ('KN', 'San Cristóbal y Nieves'),
        ('SM', 'San Marino'),
        ('VC', 'San Vicente y las Granadinas'),
        ('SH', 'Santa Elena'),
        ('LC', 'Santa Lucía'),
        ('ST', 'Santo Tomé y Príncipe'),
        ('SN', 'Senegal'),
        ('RS', 'Serbia'),
        ('SC', 'Seychelles'),
        ('SL', 'Sierra Leona'),
        ('SG', 'Singapur'),
        ('SY', 'Siria'),
        ('SO', 'Somalia'),
        ('LK', 'Sri Lanka'),
        ('SZ', 'Suazilandia'),
        ('ZA', 'Sudáfrica'),
        ('SD', 'Sudán'),
        ('SS', 'Sudán del Sur'),
        ('SE', 'Suecia'),
        ('CH', 'Suiza'),
        ('SR', 'Surinam'),
        ('TJ', 'Tayikistán'),
        ('TH', 'Tailandia'),
        ('TW', 'Taiwán'),
        ('TZ', 'Tanzania'),
        ('TL', 'Timor Oriental'),
        ('TG', 'Togo'),
        ('TO', 'Tonga'),
        ('TT', 'Trinidad y Tobago'),
        ('TN', 'Túnez'),
        ('TM', 'Turkmenistán'),
        ('TR', 'Turquía'),
        ('TV', 'Tuvalu'),
        ('UA', 'Ucrania'),
        ('UG', 'Uganda'),
        ('UY', 'Uruguay'),
        ('UZ', 'Uzbekistán'),
        ('VU', 'Vanuatu'),
        ('VE', 'Venezuela'),
        ('VN', 'Vietnam'),
        ('YE', 'Yemen'),
        ('DJ', 'Yibuti'),
        ('ZM', 'Zambia'),
        ('ZW', 'Zimbabue')
    )

    TALLAS = (
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('XXXL', 'XXXL')
    )

    GRUPOS_SANGUINEOS = (
        ('A+', 'A positivo'),
        ('A-', 'A negativo'),
        ('B+', 'B positivo'),
        ('B-', 'B negativo'),
        ('AB+', 'AB positivo'),
        ('AB-', 'AB negativo'),
        ('O+', 'O positivo'),
        ('O-', 'O negativo')
    )

    TRUE_FALSE_CHOICES = (
        (True, 'Si'),
        (False, 'No')
    )

    dni = models.CharField(max_length=8, null=True, default=None)
    fecha = models.DateTimeField(blank=True, null=True)
    nacionalidad = models.CharField(
        max_length=200, default='PE', choices=PAISES, blank=True, null=True)
    estadoCivil = models.CharField(
        max_length=200, default='s', choices=ESTADO_CIVIL, blank=True, null=True)
    correoElectronico = models.EmailField(
        max_length=200, blank=True, null=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="El número de teléfono debe ingresarse en el formato: '+999999999'. Se permiten hasta 15 dígitos.")
    celular = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    telefonoFijo = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    profesion = models.CharField(max_length=200, blank=True, null=True)
    talla_polo = models.CharField(
        max_length=200, default='', choices=TALLAS, blank=True, null=True)
    cuenta_ahorros = models.CharField(max_length=14, blank=True, null=True)
    contacto_caso_accidentes = models.CharField(
        max_length=200, blank=True, null=True)
    parentesco_contacto_caso_accidentes = models.CharField(
        max_length=200, blank=True, null=True)
    grupo_sanguineo = models.CharField(
        choices=GRUPOS_SANGUINEOS, max_length=200, blank=True, null=True)
    alergias = ArrayField(models.CharField(
        max_length=15), null=True, blank=True)
    fondo_pension = models.CharField(
        max_length=200, default='p', choices=FONDO_PENSIONES, blank=True, null=True)
    primerTrabajo = models.CharField(max_length=200, blank=True, null=True)
    hijos = models.PositiveIntegerField(blank=True, null=True)
    conyuge = models.CharField(max_length=200, blank=True, null=True)
    # a_penales = models.CharField(choices=TRUE_FALSE_CHOICES,max_length=200,blank=True, null=True)
    # a_policiales = models.CharField(choices=TRUE_FALSE_CHOICES,max_length=200,blank=True, null=True)
    # a_judiciales = models.CharField(choices=TRUE_FALSE_CHOICES,max_length=200,blank=True, null=True)
    p_mp = models.CharField(max_length=200, blank=True, null=True)
    fecha_inicio_contrato = models.DateField(
        max_length=200, blank=True, null=True)
    fecha_fin_contrato = models.DateField(
        max_length=200, blank=True, null=True)
    sueldo = models.FloatField(max_length=200, blank=True, null=True)
    horario = models.CharField(max_length=200, blank=True, null=True)
    # recibo_agua = models.CharField(choices=TRUE_FALSE_CHOICES,max_length=200,blank=True, null=True)
    # recibo_luz = models.CharField(choices=TRUE_FALSE_CHOICES,max_length=200,blank=True, null=True)
    documentos = models.FileField(
        upload_to='documentos/', blank=True, null=True)
    estado_registro = models.ForeignKey(
        EstadoRegistro, on_delete=models.CASCADE, default='A')
    # def __str__(self):
    # return self.dni


class User(AbstractUser):
    perfil = models.OneToOneField(
        Profile, on_delete=models.CASCADE, blank=True, null=True)

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
