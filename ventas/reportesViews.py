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
            for campaniaIter in proyectoIter["campanias"]:
                campaniaIter["leads"] = LeadListSerializer(Lead.objects.filter(campania = campaniaIter["id"]), many =True).data

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
        
        for campaniaIter in proyecto_data["campanias"]:
                campaniaIter["leads"] = LeadListSerializer(Lead.objects.filter(campania = campaniaIter["id"]), many =True).data

        return Response(proyecto_data, status.HTTP_200_OK)


class ReporteProporcionAsignadosDesasignadosByAsesor(APIView):
    def get(self, request, pk=None):
        try:
            proyecto = Proyecto.objects.get(id = pk)
        except:
            return Response({"detail":"No existe proyecto"}, status.HTTP_404_NOT_FOUND)
        
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')

        campaniasProyecto = proyecto.campania_set.all()
        leadsCampanias = Lead.objects.filter(campania__in = campaniasProyecto)
        asesores = leadsCampanias.values_list('asesor', flat=True)
        asesores_data = UserSerializer(User.objects.filter(id__in = asesores), fields=( 'id', 'first_name', 'last_name', 'username'), many = True).data
        if desde and hasta:
            historicoLeadAsesor = HistoricoLeadAsesor.objects.filter(usuario_id__in = asesores, fecha_creacion__range =[desde, hasta])
            desasignacionLeadAsesor = DesasignacionLeadAsesor.objects.filter(usuario_id__in = asesores, fecha__range =[desde, hasta])
        else :
            historicoLeadAsesor = HistoricoLeadAsesor.objects.filter(usuario_id__in = asesores)
            desasignacionLeadAsesor = DesasignacionLeadAsesor.objects.filter(usuario_id__in = asesores)
        
        for asesor_iter in asesores_data:
            asesor_iter["asignaciones"] = historicoLeadAsesor.filter(usuario_id = asesor_iter["id"]).count()
            asesor_iter["desasignaciones"] = desasignacionLeadAsesor.filter(usuario_id = asesor_iter["id"]).count()

 
        return Response(asesores_data, status.HTTP_200_OK)
    


class ReporteProporcionDesasignacionesByObjecion(APIView):
    def get(self, request, pk=None):
        try:
            proyecto = Proyecto.objects.get(id = pk)
        except:
            return Response({"detail":"No existe proyecto"}, status.HTTP_404_NOT_FOUND)
        
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')

        campaniasProyecto = proyecto.campania_set.all()
        if desde and hasta:
            leadsCampanias = Lead.objects.filter(campania__in = campaniasProyecto, fecha_desasignacion__range =[desde, hasta])

        else :
            leadsCampanias = Lead.objects.filter(campania__in = campaniasProyecto)


        desasignados_leads_ids = DesasignacionLeadAsesor.objects.filter(lead__in = leadsCampanias).values_list('lead', flat=True)
        lead_desasignados = Lead.objects.filter(id__in = desasignados_leads_ids)
        print("Desasignados : ", lead_desasignados)

        objeciones_data = ObjecionSerializer(Objecion.objects.all(), many = True).data

        for objeciones_iter in objeciones_data:
            objeciones_iter["desasignaciones"] = lead_desasignados.filter(objecion = objeciones_iter["id"]).count()

        return Response(objeciones_data, status.HTTP_200_OK)
    


class ReporteProporcionDesasignacionesByEstadoLead(APIView):
    def get(self, request, pk=None):
        try:
            proyecto = Proyecto.objects.get(id = pk)
        except:
            return Response({"detail":"No existe proyecto"}, status.HTTP_404_NOT_FOUND)
        
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')

        campaniasProyecto = proyecto.campania_set.all()
        if desde and hasta:
            leadsCampanias = Lead.objects.filter(campania__in = campaniasProyecto, fecha_desasignacion__range =[desde, hasta])

        else :
            leadsCampanias = Lead.objects.filter(campania__in = campaniasProyecto)


        desasignados_leads_ids = DesasignacionLeadAsesor.objects.filter(lead__in = leadsCampanias).values_list('lead', flat=True)
        lead_desasignados = Lead.objects.filter(id__in = desasignados_leads_ids)
        print("Desasignados : ", lead_desasignados)

        estadoLead_data = EstadoLeadSerializer(EstadoLead.objects.all(), many = True).data

        for estadoLead_iter in estadoLead_data:
            estadoLead_iter["desasignaciones"] = lead_desasignados.filter(estadoLead = estadoLead_iter["nombre"]).count()

        return Response(estadoLead_data, status.HTTP_200_OK)