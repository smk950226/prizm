from django.urls import path
from . import views

app_name = "studio"
urlpatterns = [
    path('photographer/', views.Photographer.as_view()),
    path('photographer/detail/', views.PhotographerDetail.as_view()),
    path('photographer/detail/bytoken/', views.PhotographerDetailByToken.as_view()),
    path('order/', views.Order.as_view()),
    path('order/detail/', views.OrderDetail.as_view()),
    path('order/complete/', views.CompleteOrder.as_view()),
    path('order/image/', views.OrderImage.as_view()),
    path('order/image/upload/', views.OrderImageUpload.as_view()),
    path('admin/order/', views.AdminOrder.as_view()),
    path('edit/', views.Studio.as_view()),
    path('chat/', views.Chat.as_view()),
    path('message/', views.Message.as_view()),
    path('download/<str:image_id>/', views.download),
    path('zip/<str:order_id>/', views.create_zip),
    path('review/', views.Review.as_view()),
    path('review/create/', views.ReviewCreate.as_view()),
]
