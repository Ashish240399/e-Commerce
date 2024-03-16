from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from django.views import View
from rest_framework import views,response,status
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from otp.models import OTPModels
import random
from django.contrib.auth.models import User

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class EmailView(views.APIView):
    def initial(self, request, *args, **kwargs):
        # Disable CSRF validation for this view
        request._dont_enforce_csrf_checks = True
        super().initial(request, *args, **kwargs)

    def post(self, request, format = None):
        email = request.data.get("email")
        
        if not email:
            return response.Response({"detail": "Username, password and email are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return response.Response({"detail": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        

        # Generate OTP
        otp = random.randint(100000, 999999)

        # Store OTP in database
        OTPModels.objects.create(email=email, otp=otp)

        # Send OTP via email
        subject = "Your OTP For Testing Ecommerce App"
        message = f"Your OTP is - {otp}"
        from_email = settings.EMAIL_HOST_USER
        to_email = [email]

        try:
            send_mail(subject, message, from_email, to_email)
            return response.Response({"detail": "OTP sent to email"}, status=status.HTTP_200_OK)
        except Exception as e:
            return response.Response({"detail": f"Failed to send email: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)