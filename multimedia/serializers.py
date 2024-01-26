
from rest_framework import serializers
from .models import *



class VideoProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoProyecto
        fields = '__all__'


class VideoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoProducto
        fields = '__all__'


class ImagenProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProyecto
        fields = '__all__'


class ImagenProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProducto
        fields = '__all__'