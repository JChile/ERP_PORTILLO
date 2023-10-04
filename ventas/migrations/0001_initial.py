# Generated by Django 4.2.2 on 2023-10-04 03:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('marketing', '0001_initial'),
        ('cuenta', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Asesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(unique=True)),
                ('numeroLeads', models.IntegerField(blank=True, default=0, null=True)),
                ('maximoLeads', models.IntegerField(blank=True, default=0, null=True)),
                ('fechaCreado', models.DateTimeField(auto_now=True)),
                ('fechaActualizado', models.DateTimeField(auto_now=True)),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
                ('llamar', models.BooleanField(default=False)),
                ('asesor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.asesor')),
                ('campania', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marketing.campania')),
                ('estado', models.ForeignKey(default='A', null=True, on_delete=django.db.models.deletion.SET_NULL, to='cuenta.estadoregistro')),
                ('estadoLead', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.estadolead')),
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
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventas.objecion'),
        ),
    ]
