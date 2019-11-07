from django.urls import path
from . import views

app_name = "studio"
urlpatterns = [
    path('photographer/', views.Photographer.as_view()),
]
