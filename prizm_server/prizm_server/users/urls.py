from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path('check/duplicate/', views.CheckDuplicate.as_view()),
    path('check/photographer/', views.CheckPhotographer.as_view()),
    path('profile/', views.Profile.as_view()),
    path('profile/admin/', views.AdminProfile.as_view()),
    path('profile/password/', views.ProfilePassword.as_view()),
    path('email/verification/', views.EmailVerification.as_view()),
    path('email/verification/send/', views.SendVerificationEmail.as_view()),
    path('find/password/', views.FindPassword.as_view()),
]
