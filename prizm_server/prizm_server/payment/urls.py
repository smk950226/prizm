from django.urls import path
from . import views

app_name = "payment"
urlpatterns = [
    path('photographer/account/', views.PhotographerAccount.as_view()),
    path('deposit/', views.Deposit.as_view()),
    path('expire/', views.PaymentExpired.as_view()),
    path('check/price/', views.CheckPrice.as_view()),
    path('success/', views.PaymentSucccessCallback.as_view()),
    path('', views.Payment.as_view()),
]
