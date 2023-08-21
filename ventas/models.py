from django.db import models

# Create your models here.
class Lead(models.Model):
    nombre = models.CharField(max_length=100,null=True)
