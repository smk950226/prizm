from django.urls import path
from . import views

app_name = "studio"
urlpatterns = [
    path('photographer/', views.Photographer.as_view()),
    path('photographer/detail/', views.PhotographerDetail.as_view()),
    path('order/', views.Order.as_view()),
    path('order/detail/', views.OrderDetail.as_view()),
    path('order/image/', views.OrderImage.as_view()),
    path('admin/order/', views.AdminOrder.as_view()),
]
