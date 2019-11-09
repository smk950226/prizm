from django.urls import path
from . import views

app_name = "studio"
urlpatterns = [
    path('photographer/', views.Photographer.as_view()),
    path('photographer/detail/', views.PhotographerDetail.as_view()),
]
