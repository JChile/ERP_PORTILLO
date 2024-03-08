
from django.urls import path
from django.urls import include, re_path
from . import views
from . import reportesViews

urlpatterns = [
    re_path(r'^reporteMarketing/$', reportesViews.ReporteMarketing.as_view()),


]