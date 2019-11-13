from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path('check/duplicate/', views.CheckDuplicate.as_view()),
    path('check/photographer/', views.CheckPhotographer.as_view()),
    path('profile/', views.Profile.as_view()),
    path('profile/password/', views.ProfilePassword.as_view()),
]
