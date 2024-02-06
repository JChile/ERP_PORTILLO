from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


# Register your models here.


class CustomUserAdmin(UserAdmin):
    # Especifica los campos que deseas mostrar en la vista de administración
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('codigoAsesor','estado', 'isAdmin')}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Modulo)
admin.site.register(EstadoRegistro)



