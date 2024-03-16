from django.urls import path
from .views import OTPView 

urlpatterns = [
    path("verify/",OTPView.as_view(),name = "otp")
]
