
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
    re_path(r'^profile/$', views.ProfileList.as_view()),
    re_path(r'^profile/(?P<pk>[0-9]+)$', views.ProfileDetail.as_view()),
    re_path(r'^user_profile/$', views.UserProfileList.as_view()),
    re_path(r'^user_profile/(?P<pk>[0-9]+)$', views.UserProfileDetail.as_view()),
    re_path(r'^group/$', views.GroupList.as_view()),
    re_path(r'^group/(?P<pk>[0-9]+)$', views.GroupDetail.as_view()),
    re_path(r'^permission/$', views.PermissionList.as_view()),
    re_path(r'^permission/(?P<pk>[0-9]+)$', views.PermissionDetail.as_view()),
    re_path(r'^modulo/$', views.ModuloList.as_view()),
    re_path(r'^modulo/(?P<pk>[0-9]+)$', views.ModuloDetail.as_view()),
    re_path(r'^group_modulo/$', views.GroupModuloList.as_view()),
    re_path(r'^group_modulo/(?P<pk>[0-9]+)$', views.GroupModuloDetail.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
