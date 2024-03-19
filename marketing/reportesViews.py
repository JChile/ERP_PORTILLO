
from rest_framework.response import Response
from rest_framework.views import APIView
import calendar
from datetime import datetime, timedelta, date
import locale

from .models import Campania, GastoCampania, Proyecto, PresupuestoProyecto
from .serializers import CampaniaSerializer, GastoCampaniaSerializer
from cuenta.models import User
from cuenta.serializers import UserSerializer
from ventas.models import Lead, HistoricoLeadAsesor


def obtener_semanas_mes_año(mes, año):
    
    semanas_mes = {}
    num_dias_mes = calendar.monthrange(año, mes)[1]
    primer_dia_semana, _ = calendar.monthrange(año, mes)
    fecha = date(año, mes, 1)
    num_semana = 1
    for dia in range(1, num_dias_mes + 1):
        nombre_dia_semana = fecha.strftime("%A")
        if num_semana not in semanas_mes:
            semanas_mes[num_semana] = []
            
        semanas_mes[num_semana].append((nombre_dia_semana, fecha))
        fecha = fecha + timedelta(days=1)
        if nombre_dia_semana == 'Sunday':
            num_semana += 1
    
    for i in semanas_mes:
        semanas_mes[i] = {
            'desde' : semanas_mes[i][0][1],
            'hasta' : semanas_mes[i][-1][1]
        }


    return semanas_mes

import json
import numpy as np
import random


def ultimo_dia_mes(fecha):
    primer_dia_siguiente_mes = fecha.replace(day=28) + timedelta(days=4) 
    return primer_dia_siguiente_mes - timedelta(days=primer_dia_siguiente_mes.day)




class ReporteMarketing(APIView):
    def get(self, request, pk=None):
        mes = request.query_params.get('mes')
        anio = request.query_params.get('anio')
        proyecto_id = request.query_params.get('proyecto')
        if mes == None:
            mes = int(datetime.now().month)
        if anio == None:
            anio = int(datetime.now().year)

        proyecto = Proyecto.objects.filter(id = proyecto_id).first()
        print(proyecto)
        if proyecto == None:
            return Response({"detail" : "Proyecto no encontrado"})
        

        semanas = obtener_semanas_mes_año(int(mes), int(anio))
        campania_queryset = proyecto.campania_set.all()
        campania_data = CampaniaSerializer(campania_queryset, many = True, fields = ['id', 'nombre', 'codigo', 'organico'])
        gastoCampania_queryset = GastoCampania.objects.filter(campania__in = campania_queryset)
        asesor_queryset = User.objects.filter(is_active=True, estado='A').filter(groups__name="asesor")
        asesor_data = UserSerializer(asesor_queryset, many = True, fields = ['id', 'first_name', 'last_name', 'username','codigoAsesor'])

        fecha_inicio = datetime(int(anio), int(mes), 1,0,0,0)
        fecha_fin = ultimo_dia_mes(fecha_inicio).replace(hour=23, minute=59, second=59)
        lead_queryset = Lead.objects.filter(asignado = True, horaRecepcion__range = (fecha_inicio, fecha_fin))
        for i in semanas:
            desde = semanas[i]["desde"] 
            hasta = semanas[i]["hasta"] 
            semanas[i]["campanias"] = json.loads(json.dumps(campania_data.data))
            for j in semanas[i]["campanias"]:
                gastoSoles_array =  gastoCampania_queryset.filter(campania = j["id"] ,fechaGasto__range =(desde,hasta)).values_list('gastoSoles') 
                gastoDolares_array =  gastoCampania_queryset.filter(campania = j["id"] ,fechaGasto__range =(desde,hasta)).values_list('gastoDolares')       
                j["inversionSoles"] = np.sum(gastoSoles_array)
                j["inversionDolares"] = np.sum(gastoDolares_array)
                j["numeroLeads"] =  lead_queryset.filter(campania = j["id"], horaRecepcion__range = (str(desde)+" 00:00:00", str(hasta)+" 23:59:59") ).count()
            semanas[i]["asesores"] = json.loads(json.dumps(asesor_data.data))
            for k in semanas[i]["asesores"]:
                k["numeroLeads"] = lead_queryset.filter(asesor = k["id"], campania__in=campania_queryset, horaRecepcion__range = (str(desde)+" 00:00:00", str(hasta)+" 23:59:59") ).count()


        return Response(semanas)