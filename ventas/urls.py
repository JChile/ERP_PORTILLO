
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


    re_path(r'^evento/$', views.EventoList.as_view()),
    re_path(r'^evento/(?P<nombre>[\w-]+)$', views.EventoDetail.as_view()),

    re_path(r'^tipoEvento/$', views.TipoEventoList.as_view()),
    re_path(r'^tipoEvento/(?P<nombre>[\w-]+)$', views.TipoEventoDetail.as_view()),
    
]
