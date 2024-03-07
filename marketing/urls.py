
from django.urls import path
from django.urls import include, re_path
from . import reportesViews, views


urlpatterns = [
    path('', include('marketing.reportesUrls')),
    re_path(r'^proyecto/$', views.ProyectoList.as_view()),
    re_path(r'^proyecto/(?P<pk>[0-9]+)$', views.ProyectoDetail.as_view()),
    re_path(r'^categoria/$', views.CategoriaList.as_view()),
    re_path(r'^categoria/(?P<pk>[0-9]+)$', views.CategoriaDetail.as_view()),
    re_path(r'^campania/$', views.CampaniaList.as_view()),
    re_path(r'^campania/(?P<pk>[0-9]+)$', views.CampaniaDetail.as_view()),
    re_path(r'^proyecto_campania/$', views.ProyectoCampaniaList.as_view()),
    re_path(r'^presupuestoProyecto/$', views.PresupuestoProyectoList.as_view()),
    re_path(r'^presupuestoProyecto/(?P<pk>[0-9]+)$', views.PresupuestoProyectoDetail.as_view()),
    re_path(r'^gastoCampania/$', views.GastoCampaniaList.as_view()),
    re_path(r'^gastoCampania/(?P<pk>[0-9]+)$', views.GastoCampaniaDetail.as_view()),
]

