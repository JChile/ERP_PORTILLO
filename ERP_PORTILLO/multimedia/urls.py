
from django.urls import path
from django.urls import include, re_path
from . import views


urlpatterns = [
    re_path(r'^videoProyecto/$', views.VideoProyectoList.as_view()),
    re_path(r'^videoProyecto/(?P<pk>[0-9]+)$', views.VideoProyectoDetail.as_view()),
    re_path(r'^videoProducto/$', views.VideProductoList.as_view()),
    re_path(r'^videoProducto/(?P<pk>[0-9]+)$', views.VideProductoDetail.as_view()),
    re_path(r'^imagenProducto/$', views.ImagenProductoList.as_view()),
    re_path(r'^imagenProducto/(?P<pk>[0-9]+)$', views.ImagenProductoDetail.as_view()),
    re_path(r'^imagenProyecto/$', views.ImagenProyectoList.as_view()),
    re_path(r'^imagenProyecto/(?P<pk>[0-9]+)$', views.ImagenProyectoDetail.as_view()),
]


