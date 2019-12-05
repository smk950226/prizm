from django.urls import path
from . import views

app_name = "chat"
urlpatterns = [
    path('check/message/', views.CheckNewMessage.as_view()),
]
