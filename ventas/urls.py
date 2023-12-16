
from django.urls import path
from django.urls import include, re_path
from . import views

urlpatterns = [
    re_path(r'^lead/$', views.LeadListSinFiltros.as_view()),
    re_path(r'^lead/(?P<pk>[0-9]+)$', views.LeadDetail.as_view()),
    re_path(r'^leadActivo/$', views.LeadListActivos.as_view()),
    re_path(r'^leadInactivo/$', views.LeadListInactivos.as_view()),
    re_path(r'^leadAsignado/$', views.LeadListAsignados.as_view()),
    re_path(r'^leadNoAsignado/$', views.LeadListNoAsignados.as_view()),

    re_path(r'^leadCreationConfirmation/$', views.LeadCreationConfirmation.as_view()),

    re_path(r'^leadMultipleCreationAutomatic/$', views.leadMultipleCreationAutomatic.as_view()),
    re_path(r'^leadMultipleAssign/$', views.LeadMultipleAssign.as_view()),
    re_path(r'^leadMultipleCreationManual/$', views.LeadMultipleCreationManual.as_view()),
     
    re_path(r'^asesor/$', views.AsesorListSinFiltros.as_view()),
    re_path(r'^asesor/(?P<pk>[0-9]+)$', views.AsesorDetail.as_view()),
    re_path(r'^asesorLead/$', views.AsesorLeadList.as_view()),
    re_path(r'^asesorLead/(?P<pk>[0-9]+)$', views.AsesorLeadDetail.as_view()),
    re_path(r'^asesorActivo/$', views.AsesorListActivos.as_view()),
    re_path(r'^asesorInactivo/$', views.AsesorListInactivos.as_view()),
    re_path(r'^asesorAsignacion/$', views.AsesorAsignacion.as_view()),


    re_path(r'^whatsapp/$', views.WhatsAppList.as_view()),
    re_path(r'^whatsapp/(?P<pk>[0-9]+)$', views.WhatsAppDetail.as_view()),
    re_path(r'^whatsappActivo/$', views.whatsappActivos.as_view()),
    re_path(r'^whatsappInactivo/$', views.whatsappInactivos.as_view()),

    re_path(r'^llamada/$', views.LlamadaList.as_view()),
    re_path(r'^llamada/(?P<pk>[0-9]+)$', views.LlamadaDetail.as_view()),
    re_path(r'^llamadaActivo/$', views.LlamadaActivos.as_view()),
    re_path(r'^llamadaInactivo/$', views.LlamadaInactivos.as_view()),

    re_path(r'^objecion/$', views.ObjecionList.as_view()),
    re_path(r'^objecion/(?P<pk>[0-9]+)$', views.ObjecionDetail.as_view()),
    re_path(r'^objecionActivo/$', views.ObjecionActivos.as_view()),
    re_path(r'^objecionInactivo/$', views.ObjecionInactivos.as_view()),

    re_path(r'^estadoLead/$', views.EstadoLeadList.as_view()),
    re_path(r'^estadoLead/(?P<nombre>[\w-]+)$', views.EstadoLeadDetail.as_view()),
    re_path(r'^estadoLeadActivo/$', views.EstadoLeadActivos.as_view()),
    re_path(r'^estadoLeadInactivo/$', views.EstadoLeadInactivos.as_view()),

    re_path(r'^evento/$', views.EventoListSinFiltros.as_view()),
    re_path(r'^evento/(?P<pk>[\w-]+)$', views.EventoDetail.as_view()),
    re_path(r'^eventoActivo/$', views.EventoListActivos.as_view()),
    re_path(r'^eventoInactivo/$', views.EventoListInactivos.as_view()),
    
    re_path(r'^tipoEvento/$', views.TipoEventoList.as_view()),
    re_path(r'^tipoEvento/(?P<pk>[\w-]+)$', views.TipoEventoDetail.as_view()),
    re_path(r'^tipoEventoActivo/$', views.TipoEventoListActivos.as_view()),
    re_path(r'^tipoEventoInactivo/$', views.TipoEventoListInactivos.as_view()),

    re_path(r'^producto/$', views.ProductoListSinFiltros.as_view()),
    re_path(r'^producto/(?P<pk>[\w-]+)$', views.ProductoDetail.as_view()),
    re_path(r'^productoActivo/$', views.ProductoListActivos.as_view()),
    re_path(r'^productoInactivo/$', views.ProductoListInactivos.as_view()),

    re_path(r'^tipoProducto/$', views.TipoProductoList.as_view()),
    re_path(r'^tipoProducto/(?P<pk>[\w-]+)$', views.TipoProductoDetail.as_view()),
    re_path(r'^tipoProductoActivo/$', views.TipoProductoListActivos.as_view()),
    re_path(r'^tipoProductoInactivo/$', views.TipoProductoListInactivos.as_view()),

    re_path(r'^cotizacion/$', views.CotizacionListSinFiltros.as_view()),
    re_path(r'^cotizacion/(?P<pk>[\w-]+)$', views.CotizacionDetail.as_view()),
    re_path(r'^cotizacionActivo/$', views.CotizacionListActivos.as_view()),
    re_path(r'^cotizacionInactivo/$', views.CotizacionListInactivos.as_view()),

    re_path(r'^tipoCotizacion/$', views.TipoCotizacionList.as_view()),
    re_path(r'^tipoCotizacion/(?P<pk>[\w-]+)$', views.TipoCotizacionDetail.as_view()),
    re_path(r'^tipoCotizacionActivo/$', views.TipoCotizacionListActivos.as_view()),
    re_path(r'^tipoCotizacionInactivo/$', views.TipoCotizacionListInactivos.as_view()),

    re_path(r'^cuota/$', views.CuotaListSinFiltros.as_view()),
    re_path(r'^cuota/(?P<pk>[\w-]+)$', views.CuotaDetail.as_view()),
    re_path(r'^cuotaActivo/$', views.CuotaListActivos.as_view()),
    re_path(r'^cuotaInactivo/$', views.CuotaListInactivos.as_view()),

    re_path(r'^tipoCuota/$', views.TipoCuotaList.as_view()),
    re_path(r'^tipoCuota/(?P<pk>[\w-]+)$', views.TipoCuotaDetail.as_view()),
    re_path(r'^tipoCuotaActivo/$', views.TipoCuotaListActivos.as_view()),
    re_path(r'^tipoCuotaInactivo/$', views.TipoCuotaListInactivos.as_view()),

    re_path(r'^precio/$', views.PrecioListSinFiltros.as_view()),
    re_path(r'^precio/(?P<pk>[\w-]+)$', views.PrecioDetail.as_view()),
    re_path(r'^precioActivo/$', views.PrecioListActivos.as_view()),
    re_path(r'^precioInactivo/$', views.PrecioListInactivos.as_view()),

    re_path(r'^cliente/$', views.ClienteListSinFiltros.as_view()),
    re_path(r'^cliente/(?P<pk>[\w-]+)$', views.ClienteDetail.as_view()),
    re_path(r'^clienteActivo/$', views.ClienteListActivos.as_view()),
    re_path(r'^clienteInactivo/$', views.ClienteListInactivos.as_view()),

    
]
