from django.urls import path
from . import views

app_name = "payment"
urlpatterns = [
    path('photographer/account/', views.PhotographerAccount.as_view()),
    path('deposit/', views.Deposit.as_view()),
    path('expire/', views.PaymentExpired.as_view()),
]
