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
from multimedia.models import VideoProducto, ImagenProducto
from multimedia.serializers import VideoProductoSerializer, ImagenProductoSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters

import random


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


@permission_classes([IsAuthenticated])
class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def list(self, request):

        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status.HTTP_403_FORBIDDEN)

        fecha_limite = timezone.now() - timedelta(days=60)

        estado = request.query_params.get('estado')
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')
        asignado = request.query_params.get('asignado')
        recienCreado = request.query_params.get('recienCreado')


        flag_desasignado_asesor = False
        userId = request.user.id
        if asignado == "False":
            lead_queryset = Lead.objects.filter(asignado=False).order_by('-fecha_creacion')

            if request.user.groups.first().name == "marketing":
                if desde and hasta:
                    lead_queryset = lead_queryset.filter(
                        fecha_creacion__range=[desde, hasta]).order_by('-fecha_creacion')
                else:
                    lead_queryset = lead_queryset.filter(
                        fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')

            elif request.user.groups.first().name == "asesor":
                

                if request.user.isAdmin == True:
                    flag_desasignado_asesor = True
                    if desde and hasta:
                        lead_queryset = lead_queryset.filter(fecha_creacion__range=[
                                                            desde, hasta]).order_by('-fecha_creacion')
                    else:
                        lead_queryset = lead_queryset.filter(
                            fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')
                else :
                    if desde and hasta:
                        lead_queryset = lead_queryset.filter(fecha_creacion__range=[
                                                            desde, hasta], asesor = request.user.pk).order_by('-fecha_creacion')
                    else:
                        lead_queryset = lead_queryset.filter(
                            fecha_creacion__gte=fecha_limite,  asesor = request.user.pk).order_by('-fecha_creacion')
            else:
                if desde and hasta:
                    lead_queryset = lead_queryset.filter(fecha_creacion__range=[
                                                         desde, hasta]).order_by('-fecha_creacion')
                else:
                    lead_queryset = lead_queryset.filter(
                        fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')

        elif asignado == "True":
            lead_queryset = Lead.objects.filter(asignado=True).order_by('-fecha_creacion')
            if request.user.groups.first().name == "marketing":
                if desde and hasta:
                    lead_queryset = lead_queryset.filter(
                        fecha_creacion__range=[desde, hasta]).order_by('-fecha_creacion')
                else:
                    lead_queryset = lead_queryset.filter(
                        fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')

            elif request.user.groups.first().name == "asesor":
                if request.user.isAdmin == True:
                    if desde and hasta:
                        lead_queryset = lead_queryset.filter(
                            fecha_asignacion__range=[desde, hasta]).order_by('-fecha_asignacion')
                    else:
                        lead_queryset = lead_queryset.filter(
                            fecha_asignacion__gte=fecha_limite).order_by('-fecha_asignacion')
                else :
                    if desde and hasta:
                        lead_queryset =lead_queryset.filter(
                            fecha_asignacion__range=[desde, hasta],asesor = request.user.pk).order_by('-fecha_asignacion')
                    else:
                        lead_queryset = lead_queryset.filter(
                            fecha_asignacion__gte=fecha_limite,asesor = request.user.pk).order_by('-fecha_asignacion')
            else:
                if desde and hasta:
                    lead_queryset = lead_queryset.filter(
                        fecha_asignacion__range=[desde, hasta]).order_by('-fecha_asignacion')
                else:
                    lead_queryset = lead_queryset.filter(
                        fecha_asignacion__gte=fecha_limite).order_by('-fecha_asignacion')

        else:
            if request.user.groups.first().name == "marketing":
                if desde and hasta:
                    lead_queryset = Lead.objects.filter(
                        fecha_creacion__range=[desde, hasta]).order_by('-fecha_creacion')
                else:
                    lead_queryset = Lead.objects.filter(
                        fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')

            elif request.user.groups.first().name == "asesor":
                if request.user.isAdmin == True:
                    if desde and hasta:
                        lead_queryset = Lead.objects.filter(
                            fecha_creacion__range=[desde, hasta]).order_by('-fecha_creacion')
                    else:
                        lead_queryset = Lead.objects.filter(
                            fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')
                else :
                    if desde and hasta:
                        lead_queryset =Lead.objects.filter(
                            fecha_creacion__range=[desde, hasta],asesor = request.user.pk).order_by('-fecha_creacion')
                    else:
                        lead_queryset = Lead.objects.filter(
                            fecha_creacion__gte=fecha_limite,asesor = request.user.pk).order_by('-fecha_creacion')
            else:
                if desde and hasta:
                    lead_queryset = Lead.objects.filter(
                        fecha_creacion__range=[desde, hasta]).order_by('-fecha_creacion')
                else:
                    lead_queryset = Lead.objects.filter(
                        fecha_creacion__gte=fecha_limite).order_by('-fecha_creacion')

        if estado:
            lead_queryset = lead_queryset.filter(estado=estado)

        if recienCreado != None:
            if recienCreado == "False":
                lead_queryset = lead_queryset.filter(recienCreado=False)
            else:
                lead_queryset = lead_queryset.filter(recienCreado=True)

        if flag_desasignado_asesor:
            historico_desasignaciones = DesasignacionLeadAsesor.objects.filter(lead__in = lead_queryset)

        leadSerializer = LeadSerializer(lead_queryset, many=True)
        estadoLead_queryset = EstadoLead.objects.all()
        estadoSeparacion_queryset = EstadoSeparacionLead.objects.all()
        leadData = leadSerializer.data

        camapania_queryset = Campania.objects.all()
        objecion_queryset = Objecion.objects.all()
        estadoLead_queryset = EstadoLead.objects.all()
        user_queryset = User.objects.all()
        proyecto_queryset = Proyecto.objects.all()
        producto_queryset = Producto.objects.all()

        if request.user.groups.first().name == "asesor":
            if request.user.isAdmin == True:        
                llamada_queryset = Llamada.objects.all()
                mensaje_queryset = WhatsApp.objects.all()
                evento_queryset = Evento.objects.all()
            else:
                llamada_queryset = Llamada.objects.filter(asesor = userId)
                mensaje_queryset = WhatsApp.objects.filter(asesor = userId)
                evento_queryset = Evento.objects.filter(asesor = userId)


        for i in leadData:
            user_data = user_queryset.filter(id=i["asesor"]).first()
            campania_data = camapania_queryset.filter(id=i["campania"]).first()
            objecion_data =  objecion_queryset.filter(id=i["objecion"]).first()
            estadoLead_data = estadoLead_queryset.filter(nombre=i["estadoLead"]).first()
            producto_data = producto_queryset.filter(id=i["producto"]).first()


            userSerializer = UserSerializer(user_data, fields=(
                'id', 'first_name', 'last_name', 'username')) if user_data else None

            campaniaSerializer = CampaniaSerializer(
                campania_data) if campania_data else None
            objecionSerializer = ObjecionSerializer(
                objecion_data) if objecion_data else None
            productoSerializer = ProductoSerializer(
                producto_data) if producto_data else None
            estadoSerializer = EstadoLeadSerializer(
                estadoLead_data) if estadoLead_data else None
            
            estadoSeparacion = estadoSeparacion_queryset.filter(pk = i["estadoSeparacionLead"]).first()
            estadoSeparacionSerializer = EstadoSeparacionLeadSerializer(
                estadoSeparacion) if estadoSeparacion else None
            
            i["asesor"] = userSerializer.data if userSerializer else None
            i["campania"] = campaniaSerializer.data if campaniaSerializer else None
            i["producto"] = productoSerializer.data if productoSerializer else None
            i["estadoLead"] = estadoSerializer.data if estadoSerializer else None
            i["estadoSeparacionLead"] = estadoSeparacionSerializer.data if estadoSeparacionSerializer else None

            i["campania"]["proyecto"] = ProyectoSerializer(
                proyecto_queryset.filter(pk=i["campania"]["proyecto"]).first()).data
            i["objecion"] = objecionSerializer.data if objecionSerializer else None

            if request.user.groups.first().name == "asesor":                        
                i["numLlamandas"] = llamada_queryset.filter(lead = i["id"]).count()
                i["numWhatsapps"] =mensaje_queryset.filter(lead = i["id"]).count()
                i["numEventos"] = evento_queryset.filter(lead = i["id"]).count()

            if flag_desasignado_asesor:
                lead_lastAsesor = historico_desasignaciones.filter(lead = i["id"]).order_by('-fecha').first()
                asesor_desasignado = user_queryset.filter(pk = lead_lastAsesor.usuario.pk).first() if lead_lastAsesor != None else None
                i["penultimo_asesor"] = UserSerializer(asesor_desasignado, fields=(
                'id', 'first_name', 'last_name', 'username')).data if asesor_desasignado!=None else None
                
                if i["penultimo_asesor"] == None :
                    i["penultimo_asesor"] = {"first_name" : None }

        return Response(leadData)


    def post(self, request, format=None):
        data = request.data
        dos_meses_atras = timezone.now() - timezone.timedelta(days=60)

        campania = Campania.objects.get(id=data["campania"])
        proyecto = Proyecto.objects.get(campania=campania)
        lead_queryset = Lead.objects.filter(
            campania__in=proyecto.campania_set.all())
        registros_existentes = lead_queryset.filter(
            celular=request.data.get("celular"), fecha_creacion__gte=dos_meses_atras)
        if registros_existentes.exists():
            return Response({'celular': f'Ya existe el número: {data["celular"]} en el proyecto {proyecto.nombre} en los últimos dos meses.'}, status.HTTP_400_BAD_REQUEST)

        if data.get("asesor") != None:
            data["fecha_asignacion"] = timezone.now()
        
        print("aaaaaaaaaaaaaaa : ", data["celular2"])
        
        if data["celular"] != None:
            if data["celular"][:3] == "+51":
                data["celular"] = str(data["celular"][1:]).replace(" ", "")
        if data["celular2"] != None:
            if data["celular2"][:3] == "+51":
                data["celular2"] = str(data["celular2"][1:]).replace(" ", "") 
        serializer = LeadSerializer(data=data)

        if serializer.is_valid():
            lead = serializer.save()
            if lead.asesor != None:
                HistoricoLeadAsesor.objects.create(
                    lead=lead, usuario=lead.asesor)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def retrieve(self, request, pk=None):
        # para asesor y jefe de ventas whatsapps, llamadas y eventos
        usuario = request.user

        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status.HTTP_403_FORBIDDEN)

        if request.user.isAdmin == True or request.user.groups.first().name == "marketing" or "administrador":
            lead = get_or_none(Lead, id=pk)
            if lead == None:
                return Response({"message": "No existe lead"}, status=404)
        else:
            lead = Lead.objects.filter(id=pk, asesor=usuario.pk).first()
            if lead == None:
                return Response({"message": "No existe lead o lead no pertenece al usario"}, status=404)

        leadSerializer = LeadSerializer(lead)
        lead_data = leadSerializer.data

        user_data = get_or_none(User, id=lead_data["asesor"])
        campania_data = get_or_none(Campania, id=lead_data["campania"])
        objecion_data = get_or_none(Objecion, id=lead_data["objecion"])
        producto_data = get_or_none(Producto, id=lead_data["producto"])

        userSerializer = UserSerializer(user_data, fields=(
            'id', 'first_name', 'last_name', 'username')) if user_data else None

        campaniaSerializer = CampaniaSerializer(
            campania_data) if campania_data else None
        productoSerializer = ProductoSerializer(
            producto_data) if producto_data else None
        objecionSerializer = ObjecionSerializer(
            objecion_data) if objecion_data else None

        lead_data["asesor"] = userSerializer.data if userSerializer else None
        lead_data["campania"] = campaniaSerializer.data if campaniaSerializer else None
        lead_data["objecion"] = objecionSerializer.data if objecionSerializer else None
        lead_data["producto"] = productoSerializer.data if productoSerializer else None

        lead_data["whatsapps"] = WhatsAppSerializer(
            WhatsApp.objects.filter(lead=lead.pk), many=True).data

        # for i in lead_data["whatsapps"] :
        #     i["objecion"] = ObjecionSerializer(Objecion.objects.filter(pk = i["objecion"]).first()).data

        lead_data["llamadas"] = LlamadaSerializer(
            Llamada.objects.filter(lead=lead.pk), many=True).data

        # for i in lead_data["llamadas"]:
        #     i["objecion"] = ObjecionSerializer(
        #         Objecion.objects.filter(pk=i["objecion"]).first()).data

        lead_data["eventos"] = EventoSerializer(
            Evento.objects.filter(lead=lead.pk), many=True).data

        asesor_queryset = User.objects.all()
        estadoSeparacionLead_queryset = EstadoSeparacionLead.objects.all()
        
        usuarioCreador_data = asesor_queryset.filter(pk = lead_data["usuarioCreador"]).first()
        usuarioActualizador_data = asesor_queryset.filter(pk = lead_data["usuarioActualizador"]).first()
        estadoSeparacionLead_data = estadoSeparacionLead_queryset.filter(pk = lead_data["estadoSeparacionLead"]).first()
        usuarioCreador_data = asesor_queryset.filter(pk = lead_data["usuarioCreador"]).first()
        usuarioActualizador_data = asesor_queryset.filter(pk = lead_data["usuarioActualizador"]).first()
        

        usuarioCreadorSerializer = UserSerializer(
            usuarioCreador_data, fields=('id', 'first_name', 'last_name', 'username', 'codigoAsesor')) if usuarioCreador_data else None
        usuarioActualizadorSerializer = UserSerializer(
            usuarioActualizador_data,fields=('id', 'first_name', 'last_name', 'username', 'codigoAsesor')) if usuarioActualizador_data else None        
        estadoSeparacionSerializer = EstadoSeparacionLeadSerializer(estadoSeparacionLead_data) if estadoSeparacionLead_data else None

        lead_data["usuarioCreador"] = usuarioCreadorSerializer.data if usuarioCreadorSerializer else None
        lead_data["usuarioActualizador"]=  usuarioActualizadorSerializer.data if usuarioActualizadorSerializer else None
        lead_data["estadoSeparacionLead"]=  estadoSeparacionSerializer.data if estadoSeparacionSerializer else None

        tipoEvento_queryset = TipoEvento.objects.all()
        estadoEvento_queryset = EstadoEvento.objects.all()
        for eventoIter in lead_data["eventos"] :
            asesor =  asesor_queryset.filter(id = eventoIter["asesor"]).first()
            eventoIter["asesor"] = UserSerializer(asesor ,fields=('id', 'first_name', 'last_name', 'username', 'codigoAsesor')).data if asesor != None else None
            tipoEvento =  tipoEvento_queryset.filter(id = eventoIter["tipo"]).first()
            eventoIter["tipo"] = TipoEventoSerializer(tipoEvento).data if tipoEvento != None else None
            estadoEvento =  estadoEvento_queryset.filter(id = eventoIter["estadoEvento"]).first()
            eventoIter["estadoEvento"] = EstadoEventoSerializer(estadoEvento).data if estadoEvento != None else None

        return Response(lead_data)

    def put(self, request, pk):
        try:
            instancia = Lead.objects.get(pk=pk)
        except Lead.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = request.data

        if instancia.asesor != None:
            if data.get("asesor") != None and data.get("asesor") != instancia.asesor.pk:
                data["fecha_asignacion"] = timezone.now()
                data["fecha_desasignacion"] = timezone.now()
                DesasignacionLeadAsesor.objects.create(
                    lead=instancia, usuario=instancia.asesor)
                asesor = get_or_none(User, id=data["asesor"])
                HistoricoLeadAsesor.objects.create(
                    lead=instancia, usuario=asesor)
            else:
                data["fecha_desasignacion"] = timezone.now()
                DesasignacionLeadAsesor.objects.create(
                    lead=instancia, usuario=instancia.asesor)
        else:
            if data.get("asesor") != None:
                data["fecha_asignacion"] = timezone.now()
                asesor = get_or_none(User, id=data["asesor"])
                HistoricoLeadAsesor.objects.create(
                    lead=instancia, usuario=asesor)

        try :
            if data["celular"] != None:
                if data["celular"][:3] == "+51":
                    data["celular"] = str(data["celular"][1:]).replace(" ", "")
        except:
            pass

        try :
            if data["celular2"] != None:
                if data["celular2"][:3] == "+51":
                    data["celular2"] = str(data["celular2"][1:]).replace(" ", "") 
        except:
            pass
        
        serializer = LeadSerializer(instancia, data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        try:
            instancia = Lead.objects.get(pk=pk)
        except Lead.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        serializer = LeadSerializer(instancia, data=data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @permission_classes([IsAuthenticated])
# class LeadListSinFiltros(LeadList):
#     def list(self, request):
#         if not (bool(request.user.groups.first().permissions.filter(codename = PermissionLead.CAN_VIEW) or request.user.is_superuser)) :
#             return Response({"message" : "Usuario no tiene permisos para ver leads"}, status=403)

#         self.queryset = self.queryset.filter()
#         return super().list(request)


class LeadListSinFiltros(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    # Reemplaza 'TuSerializer' con el nombre real de tu serializer
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()  # Reemplaza 'TuModel' con el nombre real de tu modelo

    def get_queryset(self):
        queryset = super().get_queryset()
        # Obtener parámetros de la URL
        asesor_id = self.request.query_params.get('asesor', None)
        # Aplicar filtros según los parámetros
        if asesor_id is not None:
            queryset = queryset.filter(asesor=asesor_id)

        return queryset

    def list(self, request, *args, **kwargs):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        return super().list(request, *args, **kwargs)


@permission_classes([IsAuthenticated])
class LeadListAsignados(LeadList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        self.queryset = self.queryset.filter(estado="A", asignado=True)
        return super().list(request)


@permission_classes([IsAuthenticated])
class LeadListNoAsignados(LeadList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        self.queryset = self.queryset.filter(estado="A", asignado=False)
        return super().list(request)


@permission_classes([IsAuthenticated])
class LeadListActivos(LeadList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class LeadListInactivos(LeadList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status=403)

        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class WhatsAppList(generics.ListCreateAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


@permission_classes([IsAuthenticated])
class whatsappActivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class whatsappInactivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class WhatsAppDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


@permission_classes([IsAuthenticated])
class LlamadaList(generics.ListCreateAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


@permission_classes([IsAuthenticated])
class LlamadaActivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class LlamadaInactivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class LlamadaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


@permission_classes([IsAuthenticated])
class ObjecionList(generics.ListCreateAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


@permission_classes([IsAuthenticated])
class ObjecionActivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class ObjecionInactivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class ObjecionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


@permission_classes([IsAuthenticated])
class EstadoLeadList(generics.ListCreateAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()


@permission_classes([IsAuthenticated])
class EstadoLeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()

    def get_object(self):
        nombre = self.kwargs.get('nombre')
        estado_lead = EstadoLead.objects.filter(nombre=nombre).first()

        if estado_lead is None:
            raise Http404("EstadoLead no encontrado")

        return estado_lead


@permission_classes([IsAuthenticated])
class EstadoLeadActivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class EstadoLeadInactivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class EventoList(generics.ListCreateAPIView):
    serializer_class = EventoSerializer
    queryset = Evento.objects.all()

    def post(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionEvento.CAN_ADD) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para crear eventos"}, status.HTTP_403_FORBIDDEN)
        idUsuario = request.user.pk
        print("id user", idUsuario)
        try:
            request.data["asesor"] = idUsuario
            serializer = EventoSerializer(data=request.data)
        except:
            return Response({"message": "El asesor no existe"})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        usuarioId = request.user.pk

        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionEvento.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver eventos"}, status.HTTP_403_FORBIDDEN)

        evento_queryset = Evento.objects.all()
        estado = request.query_params.get('estado')
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')
        asesor =  request.query_params.get('asesor')

        if estado:
            evento_queryset = Evento.objects.all().filter(estado=estado)
        else:
            evento_queryset = Evento.objects.all()

        
        if asesor != None:
            evento_queryset = evento_queryset.filter(asesor=asesor)

        if desde and hasta:
            evento_queryset = evento_queryset.filter(
                fecha_visita__range=[desde, hasta])
        else:
            fecha_actual = timezone.now()
            fecha_hace_30_dias = fecha_actual - timedelta(days=30)
            fecha_dentro_de_30_dias = fecha_actual + timedelta(days=30)
            evento_queryset = evento_queryset.filter(
                fecha_visita__range=[fecha_hace_30_dias, fecha_dentro_de_30_dias])
        


        if request.user.isAdmin == False:
            evento_queryset = evento_queryset.filter(asesor=usuarioId)
        elif request.user.isAdmin == True:
            evento_queryset = evento_queryset


        print(evento_queryset)
        evento_data = EventoSerializer(evento_queryset, many=True).data
        for eventoIterador in evento_data:
            asesor = get_or_none(User, id=eventoIterador["asesor"])
            tipo = get_or_none(TipoEvento, id=eventoIterador["tipo"])
            lead = get_or_none(Lead, id=eventoIterador["lead"])
            estadoEvento = get_or_none(
                EstadoEvento, id=eventoIterador["estadoEvento"])

            estadoEventoSerializer = EstadoEventoSerializer(
                estadoEvento) if estadoEvento else None
            userAsesorSerializer = UserSerializer(asesor, fields=(
                'id', 'first_name', 'last_name', 'username','codigoAsesor')) if asesor else None
            tipoSerializer = TipoEventoSerializer(tipo) if tipo else None
            leadSerializer = LeadSerializer(lead) if lead else None

            eventoIterador["asesor"] = userAsesorSerializer.data if userAsesorSerializer else None
            eventoIterador["tipo"] = tipoSerializer.data if tipoSerializer else None
            eventoIterador["estadoEvento"] = estadoEventoSerializer.data if estadoEventoSerializer else None
            eventoIterador["lead"] = leadSerializer.data if leadSerializer else None

        return Response(evento_data)


@permission_classes([IsAuthenticated])
class EventoListSinFiltros(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


@permission_classes([IsAuthenticated])
class EventoListActivos(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


@permission_classes([IsAuthenticated])
class EventoListInactivos(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


@permission_classes([IsAuthenticated])
class EventoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventoSerializer
    queryset = Evento.objects.all()

    def retrieve(self, request, pk=None):
        print("entra aqui")
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionEvento.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver eventos"}, status.HTTP_403_FORBIDDEN)
        try:
            evento = Evento.objects.get(id=pk)
        except:
            return Response({"message": "El evento no existe"}, status.HTTP_404_NOT_FOUND)

        evento_dataJson = EventoSerializer(evento).data

        print(evento_dataJson)
        asesor = get_or_none(User, id=evento_dataJson["asesor"])
        tipo = get_or_none(TipoEvento, id=evento_dataJson["tipo"])
        estadoEvento =  get_or_none(EstadoEvento, id=evento_dataJson["estadoEvento"])


        asesorSerlializer = UserSerializer(asesor, fields=('id', 'first_name', 'last_name', 'username')) if asesor else None
        tipoSerializer = TipoEventoSerializer(tipo) if tipo else None
        estadoEventoSerializer = EstadoEventoSerializer(estadoEvento) if estadoEvento else None

        tipoSerializer = TipoEventoSerializer(tipo) if tipo else None
        estadoEventoSerializer = EstadoEventoSerializer(
            estadoEvento) if estadoEvento else None

        evento_dataJson["asesor"] = asesorSerlializer.data if asesorSerlializer else None
        evento_dataJson["tipo"] = tipoSerializer.data if tipoSerializer else None
        evento_dataJson["estadoEvento"] = estadoEventoSerializer.data if estadoEventoSerializer else None

        return Response(evento_dataJson)
    
    def put(self, request, pk):
        try:
            instancia = Evento.objects.get(pk=pk)
        except Evento.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = request.data
        print(data)
        serializer = EventoSerializer(instancia, data=data)



        if serializer.is_valid():
            serializer.save()
            tipoEvento_queryset = TipoEvento.objects.all()
            estadoEvento_queryset = EstadoEvento.objects.all()
            user_queryset = User.objects.all()
            
            tipoEvento =  tipoEvento_queryset.filter(id = data["tipo"]).first()
            data["tipo"] = TipoEventoSerializer(tipoEvento).data if tipoEvento != None else None
            
            estadoEvento =  estadoEvento_queryset.filter(id = data["estadoEvento"]).first()
            data["estadoEvento"] = EstadoEventoSerializer(estadoEvento).data if estadoEvento != None else None
            
            asesor =  user_queryset.filter(id = data["asesor"]).first()
            data["asesor"] = UserSerializer(asesor, fields =('id', 'first_name', 'last_name', 'username','codigoAsesor')).data if asesor != None else None

            print(data)
            return Response(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TipoEventoList(generics.ListCreateAPIView):
    serializer_class = TipoEventoSerializer
    queryset = TipoEvento.objects.all()


class TipoEventoListActivos(TipoEventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class TipoEventoListInactivos(TipoEventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class TipoEventoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TipoEventoSerializer
    queryset = TipoEvento.objects.all()


@permission_classes([IsAuthenticated])
class ProductoList(generics.ListCreateAPIView):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def list(self, request):

        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProducto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver productos"}, status.HTTP_403_FORBIDDEN)

        estado = request.query_params.get('estado')
        proyecto = request.query_params.get('proyecto')

        print(estado)
        if estado:
            producto_queryset = Producto.objects.all().filter(estado=estado).order_by('-fecha_creacion')
        else:
            producto_queryset = Producto.objects.all().order_by('-fecha_creacion')


        if proyecto:
            producto_queryset = producto_queryset.filter(proyecto=proyecto)
 
        try:
            producto_datajson = ProductoSerializer(
                producto_queryset, many=True).data
        except:
            return Response({"message": "El producto no existe"}, status=404)

        for i in producto_datajson:
            tipoProducto = get_or_none(TipoProducto, id=i["tipo"])
            proyecto = get_or_none(Proyecto, id=i["proyecto"])

            tipoProductoSerializer = TipoProductoSerializer(
                tipoProducto) if tipoProducto else None
            proyectoSerializer = ProyectoSerializer(
                proyecto) if proyecto else None

            i["tipo"] = tipoProductoSerializer.data if tipoProductoSerializer else None
            i["proyecto"] = proyectoSerializer.data if proyectoSerializer else None
            i["videos"] = VideoProductoSerializer(
                VideoProducto.objects.filter(producto=i["id"]), many=True).data
            i["imagenes"] = ImagenProductoSerializer(
                ImagenProducto.objects.filter(producto=i["id"]), many=True).data

        return Response(producto_datajson)


class ProductoListSinFiltros(ProductoList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProducto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver productos"}, status=403)
        self.queryset = self.queryset.filter()
        return super().list(request)


class ProductoListActivos(ProductoList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProducto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver productos"}, status=403)

        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class ProductoListInactivos(ProductoList):
    def list(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProducto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver productos"}, status=403)

        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def retrieve(self, request, pk=None):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionProducto.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver productos"}, status.HTTP_403_FORBIDDEN)

        try:
            producto = Producto.objects.get(id=pk)
            producto_datajson = ProductoSerializer(producto).data
        except:
            return Response({"message": "El producto no existe"}, status.HTTP_404_NOT_FOUND)

        tipoProducto =get_or_none(TipoProducto, id=producto_datajson["tipo"])
        proyecto = get_or_none(Proyecto, id=producto_datajson["proyecto"])

        tipoProductoSerializer = TipoProductoSerializer(
            tipoProducto) if tipoProducto else None
        proyectoSerializer = ProyectoSerializer(proyecto) if proyecto else None


        producto_datajson["tipo"] = tipoProductoSerializer.data if tipoProductoSerializer else None
        producto_datajson["proyecto"] = proyectoSerializer.data if proyectoSerializer else None

        producto_datajson["videos"] = VideoProductoSerializer(
            VideoProducto.objects.filter(producto=producto_datajson["id"]), many=True).data
        producto_datajson["imagenes"] = ImagenProductoSerializer(
            ImagenProducto.objects.filter(producto=producto_datajson["id"]), many=True).data

        return Response(producto_datajson)


class TipoProductoList(generics.ListCreateAPIView):
    serializer_class = TipoProductoSerializer
    queryset = TipoProducto.objects.all()


class TipoProductoListActivos(TipoProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class TipoProductoListInactivos(TipoProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class TipoProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TipoProductoSerializer
    queryset = TipoProducto.objects.all()


class CotizacionList(generics.ListCreateAPIView):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()

    def list(self, request):
        cotizacion_queryset = self.queryset
        tipo_queryset = TipoCotizacion.objects.all()
        proyecto_queryset = Proyecto.objects.all()
        asesor_queryset = User.objects.all()

        dataJson = CotizacionSerializer(cotizacion_queryset, many=True).data

        for i in dataJson:
            i["tipo"] = TipoCotizacionSerializer(
                tipo_queryset.get(id=i["tipo"])).data
            i["proyecto"] = ProyectoSerializer(
                proyecto_queryset.get(id=i["proyecto"])).data
            i["asesor"] = UserSerializer(
                asesor_queryset.get(id=i["asesor"])).data

        return Response(dataJson)


class CotizacionListSinFiltros(CotizacionList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class CotizacionListActivos(CotizacionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class CotizacionListInactivos(CotizacionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class CotizacionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()

    def retrieve(self, request, pk=None):
        cotizacion = Cotizacion.objects.get(id=pk)
        tipo_queryset = TipoCotizacion.objects.all()
        proyecto_queryset = Proyecto.objects.all()
        asesor_queryset = User.objects.all()

        dataJson = CotizacionSerializer(cotizacion).data
        dataJson["tipo"] = TipoCotizacionSerializer(
            tipo_queryset.get(id=cotizacion.tipo.pk)).data
        dataJson["proyecto"] = ProyectoSerializer(
            proyecto_queryset.get(id=cotizacion.proyecto.pk)).data
        dataJson["asesor"] = UserSerializer(
            asesor_queryset.get(id=cotizacion.asesor.pk)).data

        return Response(dataJson)


class TipoCotizacionList(generics.ListCreateAPIView):
    serializer_class = TipoCotizacionSerializer
    queryset = TipoCotizacion.objects.all()


class TipoCotizacionListActivos(TipoCotizacionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class TipoCotizacionListInactivos(TipoCotizacionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class TipoCotizacionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TipoCotizacionSerializer
    queryset = TipoCotizacion.objects.all()


class CuotaList(generics.ListCreateAPIView):
    serializer_class = CuotaSerializer
    queryset = Cuota.objects.all()

    def list(self, request):
        cuota_queryset = self.queryset
        cotizacion_queryset = Cotizacion.objects.all()
        tipo_queryset = TipoCuota.objects.all()
        dataJson = CuotaSerializer(cuota_queryset, many=True).data

        for i in dataJson:
            i["tipo"] = TipoCuotaSerializer(
                tipo_queryset.get(id=i["tipo"])).data
            i["cotizacion"] = CotizacionSerializer(
                cotizacion_queryset.get(id=i["cotizacion"])).data

        return Response(dataJson)


class CuotaListSinFiltros(CuotaList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class CuotaListActivos(CuotaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class CuotaListInactivos(CuotaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class CuotaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CuotaSerializer
    queryset = Cuota.objects.all()

    def retrieve(self, request, pk=None):
        cuota = Cuota.objects.get(id=pk)
        cotizacion_queryset = Cotizacion.objects.all()
        tipo_queryset = TipoCuota.objects.all()

        dataJson = CuotaSerializer(cuota).data
        dataJson["tipo"] = TipoCuotaSerializer(
            tipo_queryset.get(id=cuota.tipo.pk)).data
        dataJson["cotizacion"] = CotizacionSerializer(
            cotizacion_queryset.get(id=cuota.cotizacion.pk)).data

        return Response(dataJson)


class TipoCuotaList(generics.ListCreateAPIView):
    serializer_class = TipoCuotaSerializer
    queryset = TipoCuota.objects.all()


class TipoCuotaListActivos(TipoCuotaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class TipoCuotaListInactivos(TipoCuotaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class TipoCuotaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TipoCuotaSerializer
    queryset = TipoCuota.objects.all()


class PrecioList(generics.ListCreateAPIView):
    serializer_class = PrecioSerializer
    queryset = Precio.objects.all()

    def list(self, request):
        precio_queryset = self.queryset
        tipo_producto_queryset = TipoProducto.objects.all()
        cotizacion_queryset = Cotizacion.objects.all()
        dataJson = PrecioSerializer(precio_queryset, many=True).data

        for i in dataJson:
            i["tipoProducto"] = TipoProductoSerializer(
                tipo_producto_queryset.get(id=i["tipoProducto"])).data
            i["cotizacion"] = CotizacionSerializer(
                cotizacion_queryset.get(id=i["cotizacion"])).data

        return Response(dataJson)


class PrecioListSinFiltros(PrecioList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class PrecioListActivos(PrecioList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class PrecioListInactivos(PrecioList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class PrecioDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PrecioSerializer
    queryset = Precio.objects.all()

    def retrieve(self, request, pk=None):
        precio = Precio.objects.get(id=pk)
        tipo_producto_queryset = TipoProducto.objects.all()
        cotizacion_queryset = Cotizacion.objects.all()

        dataJson = PrecioSerializer(precio).data
        dataJson["tipoProducto"] = TipoProductoSerializer(
            tipo_producto_queryset.get(id=precio.tipoProducto.pk)).data
        dataJson["cotizacion"] = CotizacionSerializer(
            cotizacion_queryset.get(id=precio.cotizacion.pk)).data

        return Response(dataJson)


class HistoricoLeadAsesorList(generics.ListCreateAPIView):
    serializer_class = HistoricoLeadAsesorSerlializer
    queryset = HistoricoLeadAsesor.objects.all()

    def list(self, request):
        queryset = HistoricoLeadAsesor.objects.all()
        lead_queryset = Lead.objects.all()
        user_queryset = User.objects.all()

        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')

        if desde and hasta:
            queryset = queryset.filter(fecha_fecha_creacion__range=[desde, hasta])


        dataJson = HistoricoLeadAsesorSerlializer(queryset, many=True).data

        for i in dataJson:
            i["lead"] = LeadSerializer(lead_queryset.filter(pk=i["lead"]).first(), fields=[
                                       "nombre", "apellido", "celular"]).data
            i["usuario"] = UserSerializer(user_queryset.filter(
                pk=i["usuario"]).first(), fields=["username", "first_name", "last_name"]).data

        return Response(dataJson)


class DesasignacionLeadAsesorList(generics.ListCreateAPIView):
    serializer_class = DesasignacionLeadAsesorSerlializer
    queryset = DesasignacionLeadAsesor.objects.all()

    def list(self, request):
        desde = request.query_params.get('desde')
        hasta = request.query_params.get('hasta')

        queryset = DesasignacionLeadAsesor.objects.all()
        lead_queryset = Lead.objects.all()
        user_queryset = User.objects.all()

        if desde and hasta:
            queryset = queryset.filter(fecha__range=[desde, hasta])
        dataJson = DesasignacionLeadAsesorSerlializer(queryset, many=True).data

        for i in dataJson:
            i["lead"] = LeadSerializer(lead_queryset.filter(pk=i["lead"]).first(), fields=[
                                       "nombre", "apellido", "celular"]).data
            i["usuario"] = UserSerializer(user_queryset.filter(
                pk=i["usuario"]).first(), fields=["username", "first_name", "last_name"]).data

        return Response(dataJson)


class EstadoEventoList(generics.ListCreateAPIView):
    serializer_class = EstadoEventoSerializer
    queryset = EstadoEvento.objects.all()


class EstadoEventoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoEventoSerializer
    queryset = EstadoEvento.objects.all()

class DesasignacionConfiguracionList(generics.ListCreateAPIView):
    serializer_class = DesasignacionConfiguracionSerializer
    queryset = DesasignacionConfiguracion.objects.all()

class DesasignacionConfiguracionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DesasignacionConfiguracionSerializer
    queryset = DesasignacionConfiguracion.objects.all()

    def put(self, request, pk):
        try:
            instancia = DesasignacionConfiguracion.objects.get(pk=pk)
        except DesasignacionConfiguracion.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

        serializer = DesasignacionConfiguracionSerializer(instancia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class EstadoSeparacionLeadList(generics.ListCreateAPIView):
    serializer_class = EstadoSeparacionLeadSerializer
    queryset = EstadoSeparacionLead.objects.all()

class EstadoSeparacionLeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoSeparacionLeadSerializer
    queryset = EstadoSeparacionLead.objects.all()


from django_filters.rest_framework import DjangoFilterBackend

class ProductoView(generics.ListAPIView):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()  
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['proyecto','estado']




from django_filters import FilterSet, AllValuesFilter
from django_filters import CharFilter, NumberFilter, AllValuesFilter, BooleanFilter, DateFilter, DateFromToRangeFilter

class LeadFilter(FilterSet):
#941679269
    celular = CharFilter(lookup_expr='icontains')
    celular2 = CharFilter(lookup_expr='icontains')
    nombre = CharFilter(lookup_expr='icontains')
    apellido = CharFilter(lookup_expr='icontains')
    campania = AllValuesFilter(field_name='campania__id')
    asesor = AllValuesFilter(field_name='asesor__id')
    estado = AllValuesFilter(field_name='estado__estado')
    asignado = BooleanFilter(field_name='asignado')
    recienCreado = BooleanFilter(field_name='recienCreado')
    estadoLead = AllValuesFilter(field_name='estadoLead__nombre')
    estadoSeparacionLead = AllValuesFilter(field_name='estadoSeparacionLead__id')
    objecion = AllValuesFilter(field_name='objecion__id')
    proyecto = AllValuesFilter(field_name='campania__proyecto')
    importante =  BooleanFilter(field_name='importante')
    horaRecepcion = DateFilter(field_name='horaRecepcion', lookup_expr='date')
    fecha_creacion = DateFilter(field_name='fecha_creacion', lookup_expr='date')
    fecha_asignacion = DateFilter(field_name='fecha_asignacion', lookup_expr='date')
    fecha_desasignacion = DateFilter(field_name='fecha_desasignacion', lookup_expr='date')
    fecha_actualizacion = DateFilter(field_name='fecha_actualizacion', lookup_expr='date')
    horaRecepcion_range = DateFromToRangeFilter(field_name='horaRecepcion', lookup_expr='date')
    ultimoAsesor = NumberFilter(method='filtrar_valor_calculado')

    
    class Meta:
        model = Lead
        fields = ['ultimoAsesor']

    def filtrar_valor_calculado(self, queryset, name, value):
        historialDesasignacion = DesasignacionLeadAsesor.objects.all().order_by('lead_id','-fecha').distinct('lead_id').values_list('id', flat=True)
        historialDesasignacion = DesasignacionLeadAsesor.objects.filter(id__in = historialDesasignacion).filter(usuario = value)
        print(DesasignacionLeadAsesorSerlializer(historialDesasignacion, many = True).data)
        leads = historialDesasignacion.values_list('lead_id', flat=True)
        return queryset.filter(id__in=leads)

#@permission_classes([IsAuthenticated])
class LeadViewPagination(generics.ListAPIView):
    serializer_class = LeadBodySerializer
    queryset = Lead.objects.all() 
    pagination_class = LargeResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    #filterset_fields = ['campania','asesor','estado', 'asignado', 'recienCreado','estadoSeparacionLead','objecion']
    ordering_fields = ['fecha_creacion', 'fecha_actualizacion', 'fecha_asignacion','horaRecepcion']
    filterset_class = LeadFilter


    def get_queryset(self):
        user = self.request.user
        lead_queryset = super().get_queryset()
        try:
            if user.groups.first().name == "marketing":
                pass
            elif user.groups.first().name == "asesor":
                if user.isAdmin == True:
                    pass
                else:
                    lead_queryset = lead_queryset.filter(asesor=user.id)
            elif user.groups.first().name == "administrador":
                pass
            else:
                lead_queryset = {}
                pass
        except:
            pass
        
        return lead_queryset


