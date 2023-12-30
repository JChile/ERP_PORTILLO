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

 
def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None

class LeadList(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def list(self, request):
        lead_queryset = self.queryset
        leadSerializer = LeadSerializer(lead_queryset, many=True)
        leadData = leadSerializer.data
     

        for i in leadData:
            user_data = get_or_none(User, id=i["asesor"])
            userCreador_data = get_or_none(User, id=i["usuarioCreador"])
            userActualizador_data = get_or_none(User, id=i["usuarioActualizador"])
            campania_data = get_or_none(Campania, id=i["campania"])
            objecion_data = get_or_none(Objecion, id=i["objecion"])
            
            userSerializer = UserSerializer(user_data,fields=(
            'id', 'first_name', 'last_name', 'username')) if user_data else None
            userCreadorSerializer = UserSerializer(userCreador_data,fields=(
            'id', 'first_name', 'last_name', 'username')) if userCreador_data else None
            userActualizadorializer = UserSerializer(userActualizador_data,fields=(
            'id', 'first_name', 'last_name', 'username')) if userActualizador_data else None
            campaniaSerializer = CampaniaSerializer(campania_data) if campania_data else None
            objecionSerializer = ObjecionSerializer(objecion_data) if objecion_data else None

            i["asesor"] = userSerializer.data if userSerializer else {}
            i["usuarioCreador"] = userCreadorSerializer.data if userCreadorSerializer else {}
            i["usuarioActualizador"] = userActualizadorializer.data if userActualizadorializer else {}
            i["campania"] = campaniaSerializer.data if campaniaSerializer else {}
            i["objecion"] = objecionSerializer.data if objecionSerializer else {}


        return Response(leadData)


class LeadListSinFiltros(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)


class LeadListAsignados(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A", asignado=True)
        return super().list(request)


class LeadListNoAsignados(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A", asignado=False)
        return super().list(request)


class LeadListActivos(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class LeadListInactivos(LeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()

    def retrieve(self, request, pk=None):
        lead_queryset = Lead.objects.all()
        lead = get_object_or_404(lead_queryset, pk=pk)
        leadSerializer = LeadSerializer(lead)
        lead_data = leadSerializer.data

        user_data = get_or_none(User, id=lead_data["asesor"])
        userCreador_data = get_or_none(User, id=lead_data["usuarioCreador"])
        userActualizador_data = get_or_none(User, id=lead_data["usuarioActualizador"])
        campania_data = get_or_none(Campania, id=lead_data["campania"])
        objecion_data = get_or_none(Objecion, id=lead_data["objecion"])

        userSerializer = UserSerializer(user_data,fields=(
        'id', 'first_name', 'last_name', 'username')) if user_data else None
        userCreadorSerializer = UserSerializer(userCreador_data,fields=(
        'id', 'first_name', 'last_name', 'username')) if userCreador_data else None
        userActualizadorializer = UserSerializer(userActualizador_data,fields=(
        'id', 'first_name', 'last_name', 'username')) if userActualizador_data else None
        campaniaSerializer = CampaniaSerializer(campania_data) if campania_data else None
        objecionSerializer = ObjecionSerializer(objecion_data) if objecion_data else None

        lead_data["asesor"] = userSerializer.data if userSerializer else {}
        lead_data["usuarioCreador"] = userCreadorSerializer.data if userCreadorSerializer else {}
        lead_data["usuarioActualizador"] = userActualizadorializer.data if userActualizadorializer else {}
        lead_data["campania"] = campaniaSerializer.data if campaniaSerializer else {}
        lead_data["objecion"] = objecionSerializer.data if objecionSerializer else {}

        return Response(lead_data)


class LeadCreationConfirmation(APIView):
    def post(self, request):
        response = {}
        lead_adecuado = []
        lead_inadecuado = []

        proyecto_id = request.data.get("proyecto_id")
        data = request.data.get("data", [])

        thirty_days = datetime.now() - timedelta(days=31)

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
            self.errores.append("El numero de celular no se envió en los datos.")
        else:
            if len(celular) != 9 or not celular.startswith('9') or not celular.isdigit():
                self.errores.append("El numero de celular no cumple con los requisitos.")
            elif celular in phone_numbers:
                self.errores.append("El numero de celular ya existe en el proyecto en un plazo de 30 dias.")

    def check_asesor(self):
        if "asesor" in self.data:
            try:
                self.data["asesor"] = User.objects.get(
                    codigo=self.data["asesor"], estado="A").id
            except User.DoesNotExist:
                self.errores.append(
                    "El asesor especificado no existe en la base de datos.")

    def check_campania(self, proyecto_id):
        try:
            campania = Campania.objects.get(
                codigo=self.data["campania"], estado="A")

            if campania.proyecto.id != proyecto_id:
                self.errores.append(
                    "La campania no corresponde al proyecto especificado.")
            else:
                self.data["campania"] = campania.id

        except Campania.DoesNotExist:
            self.errores.append(
                "La campania especificada no existe en la base de datos.")

        except KeyError:
            self.errores.append("La campania no se envió en los datos.")


class leadMultipleCreationAutomatic(APIView):
    def post(self, request):
        response = {}
        data = request.data
        asesores = User.objects.filter(estado='A')

        asignados = []
        no_asignados = []

        nextAsesor = LeadAssigner(asesores)

        for i in data:
            asesor = nextAsesor.get_asesor()
            lead = leadCreation(i)

            if asesor is None:
                no_asignados.append(lead.serialize_lead())

            else:
                lead.put_asesor(asesor)
                asignados.append(lead.serialize_lead())
                asesor.save()

        serializer = LeadListSerializer(
            data=asignados + no_asignados, many=True)
        if serializer.is_valid():
            response["asignados"] = asignados
            response["no_asignados"] = no_asignados
            serializer.save()
            return Response(response)

        response["error"] = "No se pudo guardar los datos importados."
        return Response(response)



class leadCreation:
    def __init__(self, data):
        self.data = data
        self.create_data()
    
    def serialize_lead(self):
        return self.data

    def create_data(self): 
        try:
            self.data["horaRecepcion"] = datetime.strptime(self.data["horaRecepcion"], "%d/%m/%Y")
        except (ValueError, KeyError):
            self.data["horaRecepcion"] = datetime.now()

        try:
            self.data["campania"] = Campania.objects.get(codigo = self.data["campania"]).id
        except:
            self.data["campania"] = None
            


    def put_asesor(self, asesor):
        self.data["asesor"] = asesor.id
        self.data["asignado"] = True
        asesor.numeroLeads += 1

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

            if next_asesor.maximoLeads == -1 or next_asesor.numeroLeads < next_asesor.maximoLeads:
                self.last_asesor = (self.last_asesor + 1) % num_asesores
                return next_asesor

            self.last_asesor = (self.last_asesor + 1) % num_asesores

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
        object_no_saved = []
        print(request.data)

        for i in request.data:
            data_no_saved = {}
            flag_asignado = True
            flag_campania = True
            error_message = []
            try:
                i["horaRecepcion"] = datetime.strptime(
                i["horaRecepcion"], "%d/%m/%Y")
            except (ValueError, KeyError):
                i["horaRecepcion"] = datetime.now()

            try:
                i["asesor"] = User.objects.get(codigoAsesor=i["asesor"]).id
            except:
                flag_asignado = False
                i["asesor"] = None
                error_message.append("Asesor no existe en la bd")
                print("Campo de asesor no enviado o asesor no existe en : ", i)

            try:
                i["campania"] = Campania.objects.get(codigo=i["campania"]).id
            except:
                flag_campania = False
                i["campania"] = None

                error_message.append("Campaña no existe en la bd")
                print("Campo de campania no enviado o no existe en : ", i)

            thirty_days_ago = datetime.now() - timedelta(days=31)
            unique_mobiles = list(Lead.objects.filter(
                fecha_creacion__gte=thirty_days_ago).values_list('celular', flat=True).distinct())
            print(unique_mobiles)

            data = LeadSerializer(data=i)
            if data.is_valid() and flag_campania:
                print("CELULAAAAAAAAAAAAAAar : ", i['celular'])
                if len(i['celular']) != 9 or not i['celular'] .startswith('9') or not i['celular'] .isdigit():
                    data_no_saved["data"] = i
                    error_message.append("Numero de celular no valido")
                elif i['celular'] in unique_mobiles:
                    data_no_saved["data"] = i
                    error_message.append(
                        "Se repite el numero telefonico con registro de hace 30 dias")
                
                data.save()
                lead = Lead.objects.get(id=data.data["id"])
                if flag_asignado:
                    lead.asignado = True
                else:
                    lead.asignado = False
                lead.save()
                print("Guardado : ", data.data)
            else:
                print("No Guardado : ", data.data)
                data_no_saved["data"] = i
                error_message.append("Formato no valido")

            if len(data_no_saved) > 0:
                data_no_saved["errores"] = error_message
                object_no_saved.append(data_no_saved)

        return Response(object_no_saved)


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
        return Response({'message': f"No se reasignaron los leads : {leadsNoAsigandos} porque no existen" , 'detalle': error_message})



class AsesorLeadList(APIView):
    def get(self, request):
        asesor_queryset = User.objects.all()
        asesorSerializer = UserSerializer(asesor_queryset, many=True)
        dataJson = asesorSerializer.data
        for i in dataJson:
            i["leads"] = LeadSerializer(Lead.objects.filter(asesor = i["id"]),many = True).data

        return Response(dataJson)



class AsesorLeadDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk=None):
        print(request.user.groups.first().name) 

        if "jefe_ventas" == request.user.groups.first().name : 
            try:
                asesor_queryset = User.objects.get(id = pk)
            except :
                return Response({"mesaje": "asesor no existe"})
            asesorSerializer = UserSerializer(asesor_queryset,fields=(
                'id', 'first_name', 'last_name', 'username'))
            dataJson = asesorSerializer.data
            dataJson["leads"] = LeadSerializer(Lead.objects.all(),many = True).data
            return Response(dataJson)
        elif "asesor" == request.user.groups.first().name :
            try:
                asesor_queryset = User.objects.get(id = pk)
            except :
                return Response({"mesaje": "asesor no existe"})
            asesorSerializer = UserSerializer(asesor_queryset,fields=(
                'id', 'first_name', 'last_name', 'username'))
            dataJson = asesorSerializer.data
            dataJson["leads"] = LeadSerializer(Lead.objects.filter(asesor = asesor_queryset.pk),many = True).data
            return Response(dataJson)
        
        return Response({"message" : "Usuario no tiene permimos"})



class WhatsAppList(generics.ListCreateAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class whatsappActivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class whatsappInactivos(WhatsAppList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class WhatsAppDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WhatsAppSerializer
    queryset = WhatsApp.objects.all()


class LlamadaList(generics.ListCreateAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class LlamadaActivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class LlamadaInactivos(LlamadaList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class LlamadaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LlamadaSerializer
    queryset = Llamada.objects.all()


class ObjecionList(generics.ListCreateAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class ObjecionActivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class ObjecionInactivos(ObjecionList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class ObjecionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObjecionSerializer
    queryset = Objecion.objects.all()


class EstadoLeadList(generics.ListCreateAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()


class EstadoLeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EstadoLeadSerializer
    queryset = EstadoLead.objects.all()

    def get_object(self):
        nombre = self.kwargs.get('nombre')
        estado_lead = EstadoLead.objects.filter(nombre=nombre).first()

        if estado_lead is None:
            raise Http404("EstadoLead no encontrado")

        return estado_lead


class EstadoLeadActivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)


class EstadoLeadInactivos(EstadoLeadList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)



class EventoList(generics.ListCreateAPIView):
    serializer_class = EventoSerializer
    queryset = Evento.objects.all()

    def post(self, request):

        idUsuario = request.data.pop("idUsuario")
        print("id userr", idUsuario)
        try:
            request.data["asesor"] = User.objects.get(user = idUsuario).pk
            serializer = EventoSerializer(data=request.data)
        except:
            return Response({"detail":"El asesor no existe"})
            print("errrrorrrr")


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        usuarioId = request.query_params.get('usuarioId')
        print(usuarioId)

        asesorId = -1
        
        if usuarioId:
            try:
                asesorId = User.objects.get(user = usuarioId).pk
            except:
                return Response({"detail":"El asesor no existe"})

        if asesorId != -1:
            evento_queryset = Evento.objects.filter(asesor=asesorId)
        else:
            evento_queryset = Evento.objects.all()

        
        asesor_queryset = User.objects.all()
        lead_queryset = Lead.objects.all()
        tipoEvento_queryset = TipoEvento.objects.all()

        dataJson = EventoSerializer(evento_queryset, many = True).data

        for i in dataJson:
            try :
                i["tipo"] = TipoEventoSerializer(tipoEvento_queryset.get(id = i["tipo"])).data
            except :
                pass

            try :
                i["lead"] = LeadSerializer(lead_queryset.get(id = i["lead"])).data
            except :
                pass

            try : 
                i["asesor"] = UserSerializer(asesor_queryset.get(id = i["asesor"])).data

            except :
                pass

        return Response(dataJson)




class EventoListSinFiltros(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)

class EventoListActivos(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)

class EventoListInactivos(EventoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)


class EventoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventoSerializer
    queryset = Evento.objects.all()

    def retrieve(self, request, pk=None):
        evento = Evento.objects.get(id = pk)
        asesor_queryset = User.objects.all()
        tipo_queryset = TipoEvento.objects.all()
        proyecto_queryset = Proyecto.objects.all()

        dataJson = EventoSerializer(evento).data
        dataJson["asesor"] = UserSerializer(asesor_queryset.get(id = evento.asesor.pk)).data
        dataJson["tipo"] = TipoEventoSerializer(tipo_queryset.get(id =  evento.tipo.pk)).data
        dataJson["proyecto"] = ProyectoSerializer(proyecto_queryset.get(id =  evento.proyecto.pk)).data
        return Response(dataJson)

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


class ProductoList(generics.ListCreateAPIView):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def list(self, request):
        producto_queryset = self.queryset
        tipo_queryset = TipoProducto.objects.all()
        dataJson = ProductoSerializer(producto_queryset, many = True).data

        for i in dataJson:        
            i["tipo"] = TipoEventoSerializer(tipo_queryset.get(id = i["tipo"])).data

        return Response(dataJson)

class ProductoListSinFiltros(ProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)

class ProductoListActivos(ProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="A")
        return super().list(request)

class ProductoListInactivos(ProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter(estado="I")
        return super().list(request)

class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    def retrieve(self, request, pk=None):
        producto = Producto.objects.get(id = pk)        
        tipo_queryset = TipoProducto.objects.all()
        dataJson = ProductoSerializer(producto).data
        dataJson["tipo"] = TipoProductoSerializer(tipo_queryset.get(id =  producto.tipo.pk)).data
        return Response(dataJson)


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

        dataJson = CotizacionSerializer(cotizacion_queryset, many = True).data

        for i in dataJson:        
            i["tipo"] = TipoCotizacionSerializer(tipo_queryset.get(id = i["tipo"])).data
            i["proyecto"] = ProyectoSerializer(proyecto_queryset.get(id = i["proyecto"])).data
            i["asesor"] = UserSerializer(asesor_queryset.get(id = i["asesor"])).data

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
        cotizacion = Cotizacion.objects.get(id = pk)        
        tipo_queryset = TipoCotizacion.objects.all()
        proyecto_queryset = Proyecto.objects.all()
        asesor_queryset = User.objects.all()

        dataJson = CotizacionSerializer(cotizacion).data
        dataJson["tipo"] = TipoCotizacionSerializer(tipo_queryset.get(id =  cotizacion.tipo.pk)).data
        dataJson["proyecto"] = ProyectoSerializer(proyecto_queryset.get(id =  cotizacion.proyecto.pk)).data
        dataJson["asesor"] = UserSerializer(asesor_queryset.get(id =  cotizacion.asesor.pk)).data

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
        dataJson = CuotaSerializer(cuota_queryset, many = True).data

        for i in dataJson:        
            i["tipo"] = TipoCuotaSerializer(tipo_queryset.get(id = i["tipo"])).data
            i["cotizacion"] = CotizacionSerializer(cotizacion_queryset.get(id = i["cotizacion"])).data

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
        cuota = Cuota.objects.get(id = pk)   
        cotizacion_queryset = Cotizacion.objects.all()     
        tipo_queryset = TipoCuota.objects.all()

        dataJson = CuotaSerializer(cuota).data
        dataJson["tipo"] = TipoCuotaSerializer(tipo_queryset.get(id =  cuota.tipo.pk)).data
        dataJson["cotizacion"] = CotizacionSerializer(cotizacion_queryset.get(id =  cuota.cotizacion.pk)).data  

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
        dataJson = PrecioSerializer(precio_queryset, many = True).data

        for i in dataJson:        
            i["tipoProducto"] = TipoProductoSerializer(tipo_producto_queryset.get(id = i["tipoProducto"])).data
            i["cotizacion"] = CotizacionSerializer(cotizacion_queryset.get(id = i["cotizacion"])).data

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
        precio = Precio.objects.get(id = pk)   
        tipo_producto_queryset = TipoProducto.objects.all()
        cotizacion_queryset = Cotizacion.objects.all()     

        dataJson = PrecioSerializer(precio).data
        dataJson["tipoProducto"] = TipoProductoSerializer(tipo_producto_queryset.get(id =  precio.tipoProducto.pk)).data
        dataJson["cotizacion"] = CotizacionSerializer(cotizacion_queryset.get(id =  precio.cotizacion.pk)).data  

        return Response(dataJson)


class ProyectoTipoProductoList(generics.ListCreateAPIView):
    serializer_class = ProyectoTipoProductoSerializer
    queryset = ProyectoTipoProducto.objects.all()

    def list(self, request):
        proyecto_tipo_producto_queryset = self.queryset
        proyecto_queryset = Proyecto.objects.all()
        tipo_producto_queryset = TipoProducto.objects.all()

        dataJson = ProyectoTipoProductoSerializer(proyecto_tipo_producto_queryset, many = True).data

        for i in dataJson:        
            i["proyecto"] = ProyectoSerializer(proyecto_queryset.get(id = i["proyecto"])).data
            i["tipo_producto"] = TipoProductoSerializer(tipo_producto_queryset.get(id = i["tipo_producto"])).data

        return Response(dataJson)

class ProyectoTipoProductoListSinFiltros(ProyectoTipoProductoList):
    def list(self, request):
        self.queryset = self.queryset.filter()
        return super().list(request)

class ProyectoTipoProductoDetail(APIView):    
    def get(self, request, pk=None):
        
        try:
            proyecto_tipo_producto_queryset = ProyectoTipoProducto.objects.get(id=pk)
        except :
            return Response({"mesaje": "proyecto no existe"})
        
        proyectoTipoProductoSerializer = ProyectoTipoProductoSerializer(proyecto_tipo_producto_queryset)
        proyecto_queryset = Proyecto.objects.all()
        tipo_producto_queryset = TipoProducto.objects.all()

        dataJson = proyectoTipoProductoSerializer.data
        dataJson["proyecto"] = ProyectoSerializer(proyecto_queryset.get(id=proyecto_tipo_producto_queryset.proyecto.pk)).data
        dataProyecto = ProyectoTipoProductoSerializer(ProyectoTipoProducto.objects.filter(proyecto=proyecto_tipo_producto_queryset.proyecto.pk), many=True).data

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
        except :
            return Response({"mesaje": "proyecto no existe"})
        
        proyectoSerializer = ProyectoSerializer(proyecto_queryset).data
        proyectoTipoProducto_queryset = ProyectoTipoProducto.objects.all()
        cotizacion_queryset = Cotizacion.objects.all()
        cuota_queryset = Cuota.objects.all()
        precio_queryset = Precio.objects.all()
        tipoProducto_queryset = TipoProducto.objects.all()

        cotizacion_serializer = CotizacionSerializer(cotizacion_queryset.filter(proyecto = pk), many = True)
        tipoProducto_serializer = ProyectoTipoProductoSerializer(proyectoTipoProducto_queryset.filter(proyecto = pk), many = True)
        
        for i in tipoProducto_serializer.data:
            i["tipo"] = TipoProductoSerializer(tipoProducto_queryset.get(id = i["tipo_producto"])).data
        for i in cotizacion_serializer.data:
            i["cuota"] = CuotaSerializer(cuota_queryset.filter(cotizacion = i["id"]), many = True).data
            i["precio"] = PrecioSerializer(precio_queryset.filter(cotizacion = i["id"]), many = True).data

        proyectoSerializer["tipoProducto"]= tipoProducto_serializer.data
        proyectoSerializer["cotizacion"]= cotizacion_serializer.data


        return Response(proyectoSerializer)