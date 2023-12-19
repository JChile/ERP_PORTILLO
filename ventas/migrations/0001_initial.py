# Generated by Django 4.2.2 on 2023-12-19 05:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('marketing', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cuenta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(unique=True)),
                ('numeroLeads', models.IntegerField(blank=True, default=0, null=True)),
                ('maximoLeads', models.IntegerField(blank=True, default=0, null=True)),
                ('fechaCreado', models.DateTimeField(auto_now_add=True)),
                ('fechaActualizado', models.DateTimeField(auto_now=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cotizacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('duracion', models.IntegerField(blank=True, default=0, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('proyecto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marketing.proyecto')),
            ],
        ),
        migrations.CreateModel(
            name='EstadoLead',
            fields=[
                ('nombre', models.CharField(max_length=2, primary_key=True, serialize=False)),
                ('descripcion', models.CharField(default=None, max_length=50, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='Lead',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('apellido', models.CharField(blank=True, max_length=100)),
                ('asignado', models.BooleanField(default=False)),
                ('celular', models.CharField(max_length=100)),
                ('celular2', models.CharField(blank=True, max_length=100)),
                ('comentario', models.TextField(blank=True, max_length=200)),
                ('horaEntrega', models.DateTimeField(auto_now_add=True)),
                ('horaRecepcion', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
                ('llamar', models.BooleanField(default=True)),
                ('asesor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.asesor')),
                ('campania', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marketing.campania')),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('estadoLead', models.ForeignKey(blank=True, default='EP', null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.estadolead')),
            ],
        ),
        migrations.CreateModel(
            name='WhatsApp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('detalle', models.TextField(blank=True, max_length=200, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('lead', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.lead')),
            ],
        ),
        migrations.CreateModel(
            name='TipoProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='TipoEvento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='TipoCuota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='TipoCotizacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='ProyectoTipoProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proyecto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marketing.proyecto')),
                ('tipo_producto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.tipoproducto')),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100)),
                ('codigo', models.CharField(blank=True, max_length=100, unique=True)),
                ('numero', models.IntegerField(blank=True, default=0, null=True)),
                ('area', models.FloatField(blank=True, default=0, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('proyecto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marketing.proyecto')),
                ('tipo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.tipoproducto')),
            ],
        ),
        migrations.CreateModel(
            name='Precio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('precio', models.FloatField(blank=True, default=0, null=True)),
                ('cotizacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.cotizacion')),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('tipoProducto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.tipoproducto')),
            ],
        ),
        migrations.CreateModel(
            name='Objecion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
            ],
        ),
        migrations.CreateModel(
            name='Llamada',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('detalle', models.TextField(blank=True, max_length=200, null=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('lead', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.lead')),
            ],
        ),
        migrations.AddField(
            model_name='lead',
            name='objecion',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.objecion'),
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=100, null=True)),
                ('duracion', models.IntegerField(blank=True, null=True)),
                ('fecha_visita', models.DateTimeField(blank=True, null=True)),
                ('ubicacion', models.CharField(max_length=100, null=True)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('asesor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.asesor')),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('lead', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.lead')),
                ('proyecto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='marketing.proyecto')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.tipoevento')),
            ],
        ),
        migrations.CreateModel(
            name='Cuota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.IntegerField(blank=True, null=True)),
                ('tiempo', models.IntegerField(blank=True, null=True)),
                ('porcentaje', models.FloatField(blank=True, default=0, null=True)),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('cotizacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.cotizacion')),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('tipo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.tipocuota')),
            ],
        ),
        migrations.AddField(
            model_name='cotizacion',
            name='tipo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.tipocotizacion'),
        ),
    ]
