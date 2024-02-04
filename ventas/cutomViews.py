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


def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None


class LeadCreationConfirmation(APIView):
    def post(self, request):
        response = {}
        lead_adecuado = []
        lead_inadecuado = []

        proyecto_id = request.data.get("proyecto_id")
        data = request.data.get("data", [])

        thirty_days = timezone.now() - timedelta(days=60)

        phone_numbers = set(
            Lead.objects.filter(horaRecepcion__gte=thirty_days,
                                estado="A", campania__proyecto__id=proyecto_id)
            .values_list('celular', flat=True)
            .distinct()
        )

        for i in data:

            lead_class = leadConfirmation(i, phone_numbers, proyecto_id)
            lead = lead_class.serialize_lead()

            if lead_class.errores:
                lead_inadecuado.append(lead)
            else:
                lead_adecuado.append(lead)

        response["adecuado"] = lead_adecuado
        response["inadecuado"] = lead_inadecuado

        return Response(response)


class leadConfirmation:
    def __init__(self, data, phone_numbers, proyecto_id):
        self.data = data
        self.errores = []
        self.check_numero(phone_numbers)
        self.check_asesor()
        self.check_campania(proyecto_id)

    def serialize_lead(self):
        lead = {}
        lead["data"] = self.data
        if self.errores:
            lead["errores"] = self.errores

        return lead

    def check_numero(self, phone_numbers):
        celular = self.data.get("celular")
        if not celular:
            self.errores.append("No se proporcionó el numero de celular.")

        else:
            if len(celular) != 9 or not celular.startswith('9') or not celular.isdigit():
                self.errores.append(
                    "El numero de celular no cumple con los requisitos.")

            elif celular in phone_numbers:
                self.errores.append(
                    "Este numero de celular ya esta registrado en el proyecto en un plazo de 60 dias.")

    def check_asesor(self):
        if "asesor" in self.data:
            asesor = get_or_none(
                User, codigoAsesor=self.data["asesor"], estado="A")
            if asesor is not None:
                self.data["asesor"] = asesor.id
            else:
                self.errores.append(
                    "No se encontro al asesor con la información proporcionada.")

    def check_campania(self, proyecto_id):
        if "campania" not in self.data:
            self.errores.append("No se proporcionó la campania.")

        else:
            campania = get_or_none(
                Campania, codigo=self.data["campania"], estado="A")
            if campania is not None:
                if campania.proyecto.id != proyecto_id:
                    self.errores.append(
                        "La campania no corresponde al proyecto especificado.")
                else:
                    self.data["campania"] = campania.id
            else:
                self.errores.append(
                    "No se encontró la campania con la informacion proporcionada.")


class leadCreation:
    def __init__(self, data, phone_numbers):
        self.data = data
        self.flag_campania = False
        self.flag_asignado = False
        self.errores = []
        self.check_date()
        self.check_campania()
        self.check_numero(phone_numbers)

    def serialize_lead(self):
        lead = {}
        lead["data"] = self.data
        if self.errores:
            lead["errores"] = self.errores

        return lead

    def check_numero(self, phone_numbers):

        celular = self.data.get("celular")

        if not celular:
            self.errores.append("No se proporcionó el numero de celular.")

        else:
            if len(celular) != 9 or not celular.startswith('9') or not celular.isdigit():
                self.errores.append(
                    "El numero de celular no cumple con los requisitos.")

            elif self.flag_campania == True:
                proyecto_id = get_or_none(
                    Campania, id=self.data["campania"]).proyecto.id
                filtered_numbers = {
                    phone for phone, proyecto in phone_numbers if proyecto == proyecto_id}

                if self.data['celular'] in filtered_numbers:
                    self.errores.append(
                        "Este numero de celular ya esta registrado en el proyecto en un plazo de 60 dias.")

    def check_asesor(self):
        if "asesor" in self.data:
            asesor = get_or_none(
                User, codigoAsesor=self.data["asesor"], estado="A")
            if asesor is not None:
                self.flag_asignado = True
                self.data["asesor"] = asesor.id
            else:
                self.errores.append(
                    "No se encontro al asesor con la información proporcionada.")

    def check_campania(self):
        if "campania" not in self.data:
            self.errores.append("No se proporcionó la campania.")
        else:
            campania = get_or_none(
                Campania, codigo=self.data["campania"], estado="A")
            if campania is not None:
                self.data["campania"] = campania.id
                self.flag_campania = True
            else:
                self.errores.append(
                    "No se encontró la campania con la informacion proporcionada.")

    def check_date(self):
        try:
            self.data["horaRecepcion"] = make_aware(
                datetime.strptime(self.data["horaRecepcion"], "%d/%m/%Y"))
        except (ValueError, KeyError):
            self.data["horaRecepcion"] = timezone.now()

    def put_asesor(self, asesor):
        if asesor is not None:
            self.flag_asignado = True
            self.data["asesor"] = asesor.id


class leadMultipleCreationAutomatic(APIView):
    def post(self, request):
        response = {}
        data = request.data

        asesores = User.objects.filter(
            estado='A').exclude(codigoAsesor__isnull=True)
        nextAsesor = LeadAssigner(asesores)

        guardados = []
        no_guardados = []

        thirty_days = timezone.now() - timedelta(days=60)
        phone_numbers = set(
            Lead.objects.filter(horaRecepcion__gte=thirty_days,
                                estado="A")
            .values_list('celular', 'campania__proyecto')
            .distinct()
        )

        for i in data:
            lead_class = leadCreation(i, phone_numbers)
            lead = lead_class.serialize_lead()

            if lead_class.errores:
                no_guardados.append(lead)

            else:
                asesor = nextAsesor.get_asesor()
                if asesor is not None:
                    lead_class.put_asesor(asesor)

                guardados.append(lead)
                saving = LeadSerializer(data=lead_class.data)
                if saving.is_valid():
                    lead_instance = saving.save()
                    HistoricoLeadAsesor.objects.create(
                        lead=lead_instance, usuario=asesor)

        response["guardados"] = guardados
        response["no guardados"] = no_guardados

        return Response(response)


class LeadAssigner:
    def __init__(self, asesores):
        self.last_asesor = 0
        self.asesores = asesores

    def get_asesor(self):
        num_asesores = len(self.asesores)
        if num_asesores == 0:
            return None

        for _ in range(num_asesores):
            next_asesor = self.asesores[self.last_asesor]
            self.last_asesor = (self.last_asesor + 1) % num_asesores

            return next_asesor

        return None


class LeadMultipleAssign(generics.UpdateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadListSerializer

    def update(self, request):
        data = request.data
        for assignment in data:

            lead_id = assignment.get('id')
            asesor_id = assignment.get('asesor')
            print(lead_id)

            if lead_id is not None and asesor_id is not None:
                try:
                    lead = Lead.objects.get(pk=lead_id)
                    asesor = User.objects.get(pk=asesor_id)

                    if lead.asesor != asesor:
                        if lead.asesor is not None:
                            old_asesor = lead.asesor
                            old_asesor.numeroLeads -= 1
                            old_asesor.save()

                        lead.asesor = asesor
                        lead.save()

                        asesor.numeroLeads += 1
                        asesor.save()

                except User.DoesNotExist:
                    return Response({'message': f'El Asesor con ID {asesor_id} no existe'}, status=status.HTTP_400_BAD_REQUEST)
                except Lead.DoesNotExist:
                    return Response({'message': f'El Lead con ID {lead_id} no existe'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Las asignaciones se han realizado correctamente'}, status=status.HTTP_200_OK)


class LeadMultipleCreationManual(APIView):
    def post(self, request):
        response = {}
        data = request.data

        guardados = []
        no_guardados = []

        thirty_days = timezone.now() - timedelta(days=60)
        phone_numbers = set(
            Lead.objects.filter(horaRecepcion__gte=thirty_days,
                                estado="A")
            .values_list('celular', 'campania__proyecto')
            .distinct()
        )

        for i in data:
            lead_class = leadCreation(i, phone_numbers)
            lead_class.check_asesor()
            lead = lead_class.serialize_lead()

            if lead_class.errores:
                no_guardados.append(lead)

            else:
                guardados.append(lead)
                saving = LeadSerializer(data=lead_class.data)
                if saving.is_valid():
                    lead_instance = saving.save()

                    if (lead_class.flag_asignado):
                        HistoricoLeadAsesor.objects.create(
                            lead=lead_instance, usuario=lead_instance.asesor)

        response["guardados"] = guardados
        response["no guardados"] = no_guardados

        return Response(response)


class AsesorAsignacion(APIView):
    def post(self, request):
        error_message = []
        leadsNoAsigandos = []
        idAsesor = request.data["idAsesor"]
        idLeads = request.data["idLead"]
        try:
            user = User.objects.get(id=idAsesor)
        except:
            return Response({'message': f'El Asesor con ID {idAsesor} no existe'})
        for i in idLeads:
            try:
                lead = Lead.objects.get(id=int(i))
                if lead.asesor == None or lead.asesor.pk != user.pk:
                    lead.asesor = user
                    lead.asignado = True
                    lead.save()
            except:
                leadsNoAsigandos.append(i)

        if len(leadsNoAsigandos) == 0:
            return Response({'detalle': error_message})
        return Response({'message': f"No se reasignaron los leads : {leadsNoAsigandos} porque no existen", 'detalle': error_message})

# Retorna los leads asociados a un asesor auntentificado


class AsesorLead(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (bool(request.user.groups.first().permissions.filter(codename=PermissionLead.CAN_VIEW) or request.user.is_superuser)):
            return Response({"message": "Usuario no tiene permisos para ver leads"}, status.HTTP_403_FORBIDDEN)

        pk = request.user.pk
        if request.user.isAdmin == True:
            try:
                asesor_queryset = User.objects.get(id=pk)
            except:
                return Response({"mesaje": "asesor no existe"})
            asesorSerializer = UserSerializer(asesor_queryset, fields=(
                'id', 'first_name', 'last_name', 'username'))
            dataJson = asesorSerializer.data
            dataJson["leads"] = LeadSerializer(
                Lead.objects.all(), many=True).data

            for leadIter in dataJson["leads"]:
                leadIter["campania"] = CampaniaSerializer(Campania.objects.filter(
                    pk=leadIter["campania"]).first()).data
                leadIter["campania"]["proyecto"] = ProyectoSerializer(
                    Proyecto.objects.filter(pk=leadIter["campania"]["proyecto"]).first()).data
                leadIter["objecion"] = ObjecionSerializer(Objecion.objects.filter(
                    pk=leadIter["objecion"]).first()).data
                leadIter["numeroWhatsapps"] = WhatsApp.objects.filter(
                    lead=leadIter["id"], asesor=leadIter["asesor"]).count()
                leadIter["numeroLlamadas"] = Llamada.objects.filter(
                    lead=leadIter["id"], asesor=leadIter["asesor"]).count()

            return Response(dataJson)
        else:
            try:
                asesor_queryset = User.objects.get(id=pk)
                print(asesor_queryset.pk)
            except:
                return Response({"mesaje": "asesor no existe"})
            asesorSerializer = UserSerializer(asesor_queryset, fields=(
                'id', 'first_name', 'last_name', 'username'))
            dataJson = asesorSerializer.data
            dataJson["leads"] = LeadSerializer(Lead.objects.filter(
                asesor=asesor_queryset.pk, estado="A"), many=True).data
            for leadIter in dataJson["leads"]:
                leadIter["campania"] = CampaniaSerializer(Campania.objects.filter(
                    pk=leadIter["campania"]).first()).data
                leadIter["campania"]["proyecto"] = ProyectoSerializer(
                    Proyecto.objects.filter(pk=leadIter["campania"]["proyecto"]).first()).data
                leadIter["objecion"] = ObjecionSerializer(Objecion.objects.filter(
                    pk=leadIter["objecion"]).first()).data
                leadIter["numeroWhatsapps"] = WhatsApp.objects.filter(
                    lead=leadIter["id"], asesor=leadIter["asesor"]).count()
                leadIter["numeroLlamadas"] = Llamada.objects.filter(
                    lead=leadIter["id"], asesor=leadIter["asesor"]).count()

            return Response(dataJson)


class ProyectoTipoProductoList(generics.ListCreateAPIView):
    serializer_class = ProyectoTipoProductoSerializer
    queryset = ProyectoTipoProducto.objects.all()

    def list(self, request):
        proyecto_tipo_producto_queryset = self.queryset
        proyecto_queryset = Proyecto.objects.all()
        tipo_producto_queryset = TipoProducto.objects.all()

        dataJson = ProyectoTipoProductoSerializer(
            proyecto_tipo_producto_queryset, many=True).data

        for i in dataJson:
            i["proyecto"] = ProyectoSerializer(
                proyecto_queryset.get(id=i["proyecto"])).data
            i["tipo_producto"] = TipoProductoSerializer(
                tipo_producto_queryset.get(id=i["tipo_producto"])).data

        return Response(dataJson)


class ProyectoTipoProductoListSinFiltros(ProyectoTipoProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class ProyectoTipoProductoDetail(APIView):
    def get(self, request, pk=None):

        try:
            proyecto_tipo_producto_queryset = ProyectoTipoProducto.objects.get(
                id=pk)
        except:
            return Response({"mesaje": "proyecto no existe"})

        proyectoTipoProductoSerializer = ProyectoTipoProductoSerializer(
            proyecto_tipo_producto_queryset)
        proyecto_queryset = Proyecto.objects.all()
        tipo_producto_queryset = TipoProducto.objects.all()

        dataJson = proyectoTipoProductoSerializer.data
        dataJson["proyecto"] = ProyectoSerializer(proyecto_queryset.get(
            id=proyecto_tipo_producto_queryset.proyecto.pk)).data
        dataProyecto = ProyectoTipoProductoSerializer(ProyectoTipoProducto.objects.filter(
            proyecto=proyecto_tipo_producto_queryset.proyecto.pk), many=True).data

        tipo_producto_data = []
        for i in dataProyecto:
            tipo_producto_id = i["tipo_producto"]
            intance = tipo_producto_queryset.get(id=tipo_producto_id)
            tipo_producto_data.append({
                'id': intance.id,
                'nombre': intance.nombre,
            })

        dataJson["tipo_producto"] = tipo_producto_data

        return Response(dataJson)


class ProyectoCotizaciones(APIView):
    def get(self, request, pk=None):

        try:
            proyecto_queryset = Proyecto.objects.get(id=pk)
        except:
            return Response({"mesaje": "proyecto no existe"})

        proyectoSerializer = ProyectoSerializer(proyecto_queryset).data
        proyectoTipoProducto_queryset = ProyectoTipoProducto.objects.all()
        cotizacion_queryset = Cotizacion.objects.all()
        cuota_queryset = Cuota.objects.all()
        precio_queryset = Precio.objects.all()
        tipoProducto_queryset = TipoProducto.objects.all()

        cotizacion_serializer = CotizacionSerializer(
            cotizacion_queryset.filter(proyecto=pk), many=True)
        tipoProducto_serializer = ProyectoTipoProductoSerializer(
            proyectoTipoProducto_queryset.filter(proyecto=pk), many=True)

        for i in tipoProducto_serializer.data:
            i["tipo"] = TipoProductoSerializer(
                tipoProducto_queryset.get(id=i["tipo_producto"])).data
        for i in cotizacion_serializer.data:
            i["cuota"] = CuotaSerializer(cuota_queryset.filter(
                cotizacion=i["id"]), many=True).data
            i["precio"] = PrecioSerializer(
                precio_queryset.filter(cotizacion=i["id"]), many=True).data

        proyectoSerializer["tipoProducto"] = tipoProducto_serializer.data
        proyectoSerializer["cotizacion"] = cotizacion_serializer.data

        return Response(proyectoSerializer)


class AsignacionMasivaAsesorLeadById(APIView):
    def post(self, request):
        request_data = request.data
        arrAsesor = request_data["asesor"]
        arrLead = request_data["lead"]

        user_queryset = User.objects.all()
        lead_queryset = Lead.objects.all()

        error = []
        iter = 0
        for i in arrLead:
            try:
                lead = lead_queryset.get(id=i)
                user = user_queryset.get(id=arrAsesor[iter])
                lead.asesor = user
                lead.fecha_actualizacion = timezone.now()
                lead.fecha_asignacion = timezone.now()

                lead.save()
                HistoricoLeadAsesor.objects.create(lead=lead, usuario=user)
            except:
                error.append(i)
                pass
            print(i, arrAsesor[iter])
            iter = -1 if iter == len(arrAsesor)-1 else iter
            iter = iter + 1

        print(arrAsesor)
        return Response({"Leads no asignados": error})


class DesAsignacionMasivaLeadsById(APIView):
    def post(self, request):
        request_data = request.data
        arrLead = request_data["lead"]

        user_queryset = User.objects.all()
        lead_queryset = Lead.objects.all()

        error = []
        for i in arrLead:
            try:
                lead = lead_queryset.get(id=i)
                user = user_queryset.get(id=lead.asesor.pk)
                # print(lead, user)
                lead.asesor = None
                lead.asignado = False
                lead.fecha_actualizacion = timezone.now()
                lead.fecha_desasignacion = timezone.now()
                lead.save()
                DesasignacionLeadAsesor.objects.create(lead=lead, usuario=user)
            except:
                error.append(i)
                pass

        return Response({"Leads no desasignados": error})
