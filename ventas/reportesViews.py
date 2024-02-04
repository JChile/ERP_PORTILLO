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
        asesor_queryset = User.objects.all()
        asesor_data = UserSerializer(asesor_queryset, fields=( 'id', 'first_name', 'last_name', 'username'), many = True).data

        for asesor_iter in asesor_data:
            asesor_iter["leads"] = LeadSerializer(Lead.objects.filter(asesor = asesor_iter["id"]),fields=( 'id', 'nombre', "asesor",'apelldos', 'celular') ,many=True).data
            for leadIter in asesor_iter["leads"] :
                leadIter["numeroWhatsapps"]= WhatsApp.objects.filter(lead = leadIter["id"], asesor = leadIter["asesor"]).count()
                leadIter["numeroLlamadas"]= Llamada.objects.filter(lead = leadIter["id"], asesor = leadIter["asesor"]).count()

        return Response(asesor_data)



class ReporteProyectoCampaniaList(APIView):
    def get(self, request):

        proyecto_queryset = Proyecto.objects.all()
        estadoProyecto = request.query_params.get('estadoProyecto')
        estadoCampania = request.query_params.get('estadoCampania')

        if estadoProyecto:
            proyecto_queryset = proyecto_queryset.filter(estado=estadoProyecto)

        proyectoSerializer = ProyectoSerializer(proyecto_queryset, many=True)
        proyecto_data = proyectoSerializer.data

        for proyectoIter in proyecto_data:
            if estadoCampania:
                proyectoIter["campanias"] = CampaniaSerializer(Campania.objects.filter(proyecto = proyectoIter["id"], estado = estadoCampania), many = True).data
            else:    
                proyectoIter["campanias"] = CampaniaSerializer(Campania.objects.filter(proyecto = proyectoIter["id"]), many = True).data

        return Response(proyectoSerializer.data, status.HTTP_200_OK)

 


class ReporteProyectoCampaniaDetail(APIView):
    def get(self, request, pk=None):
        try:
            proyecto = Proyecto.objects.get(id = pk)
        except:
            return Response({"detail":"No existe proyecto"}, status.HTTP_404_NOT_FOUND)
        proyectoSerializer = ProyectoSerializer(proyecto)

        estadoCampania = request.query_params.get('estadoCampania')

        proyecto_data = proyectoSerializer.data


        if estadoCampania:
            proyecto_data["campanias"] = CampaniaSerializer(Campania.objects.filter(proyecto = proyecto.pk, estado = estadoCampania), many = True).data
        else:    
            proyecto_data["campanias"] = CampaniaSerializer(proyecto.campania_set.all(), many = True).data



        return Response(proyecto_data, status.HTTP_200_OK)
