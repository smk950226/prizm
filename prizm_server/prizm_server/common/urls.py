from django.urls import path
from . import views

app_name = "common"
urlpatterns = [
    path('exchange/rate/', views.ExchangeRate.as_view()),
    path('terms/', views.Terms.as_view()),
]
