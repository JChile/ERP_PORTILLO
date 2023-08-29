
from django.urls import path
from django.urls import include, re_path
from . import views

urlpatterns = [
    re_path(r'^lead/$', views.LeadList.as_view()),
    re_path(r'lead/(?P<pk>[0-9]+)$', views.LeadDetail.as_view()),
    re_path(r'^asesor/$', views.AsesorList.as_view()),
    re_path(r'^asesor/(?P<pk>[0-9]+)$', views.AsesorDetail.as_view()),
    re_path(r'^whatsapp/$', views.WhatsAppList.as_view()),
    re_path(r'^whatsapp/(?P<pk>[0-9]+)$', views.WhatsAppDetail.as_view()),
    re_path(r'^llamada/$', views.LlamadaList.as_view()),
    re_path(r'^llamada/(?P<pk>[0-9]+)$', views.LlamadaDetail.as_view()),
    re_path(r'^estado/$', views.EstadoList.as_view()),
    re_path(r'^estado/(?P<pk>[0-9]+)$', views.EstadoDetail.as_view()),
    re_path(r'^objecion/$', views.ObjecionList.as_view()),
    re_path(r'^objecion/(?P<pk>[0-9]+)$', views.ObjecionDetail.as_view()),
]
