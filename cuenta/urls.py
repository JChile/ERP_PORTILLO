
from django.urls import path
from django.urls import include, re_path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    #path("", views.index, name="index"),
    path("",views.getRoutes),
    re_path(r'^user/$', views.UserList.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)$', views.UserDetail.as_view()),
    re_path(r'^usuario/$', views.UsuarioList.as_view()),
    re_path(r'^usuario/(?P<pk>[0-9]+)$', views.UsuarioDetail.as_view()),
    re_path(r'^prueba/$', views.PruebaList.as_view()),
    re_path(r'^prueba/(?P<pk>[0-9]+)$', views.PruebaDetail.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
