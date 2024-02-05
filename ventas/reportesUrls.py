
from django.urls import path
from django.urls import include, re_path
from . import views
from . import cutomViews, reportesViews

urlpatterns = [
    re_path(r'^reporteAsesorLead/$', reportesViews.ReporteAsesorLead.as_view()),
    re_path(r'^reporteProyectoCampania/$', reportesViews.ReporteProyectoCampaniaList.as_view()),
    re_path(r'^reporteProyectoCampania/(?P<pk>[\w-]+)$',reportesViews.ReporteProyectoCampaniaDetail.as_view()),
    re_path(r'^reporteProporcionAsignadosDesasignadosByAsesor/(?P<pk>[\w-]+)$',reportesViews.ReporteProporcionAsignadosDesasignadosByAsesor.as_view()),


]