from cuenta.serializers import *
from ventas.serializers import *
from marketing.serializers import *

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from cuenta.models import User
from rest_framework import status
from datetime import datetime, timedelta
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .consts import *
from django.utils import timezone
from django.utils.timezone import make_aware



class ReporteAsesorLead(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        if request.user.isAdmin == True:
            asesor_queryset = User.objects.filter(is_active=True).filter(groups__in=[1])
            asesor_data = UserSerializer(asesor_queryset, fields=( 'id', 'first_name', 'last_name', 'username'), many = True).data

            for asesor_iter in asesor_data:
                asesor_iter["leads"] = LeadSerializer(Lead.objects.filter(asesor = asesor_iter["id"]),fields=( 'id', 'nombre', "asesor",'apelldos', 'celular') ,many=True).data
                for leadIter in asesor_iter["leads"] :
                    leadIter["numeroWhatsapps"]= WhatsApp.objects.filter(lead = leadIter["id"], asesor = leadIter["asesor"]).count()
                    leadIter["numeroLlamadas"]= Llamada.objects.filter(lead = leadIter["id"], asesor = leadIter["asesor"]).count()

            return Response(asesor_data)
        else :
            return Response({"message": "Usuario no es admin"})
