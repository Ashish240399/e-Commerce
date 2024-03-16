from django.shortcuts import render
from rest_framework import views,response
from .models import OTPModels
from django.utils import timezone
import datetime

# Create your views here.
class OTPView(views.APIView):
    def initial(self, request, *args, **kwargs):
        # Disable CSRF validation for this view
        request._dont_enforce_csrf_checks = True
        super().initial(request, *args, **kwargs)
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        
        try:
            otp_obj = OTPModels.objects.get(email=email,otp=otp)
            if otp_obj is not None:
                is_otp_expired = timezone.now() - otp_obj.created_at > datetime.timedelta(minutes=5)
                if is_otp_expired:
                    otp_obj.delete()
                    return response.Response({"message":"OTP expired"},status=400)
                else:
                    otp_obj.verified = True
                    otp_obj.save()
                    return response.Response({"message":"OTP verified"},status=200)
                
        except:
            return response.Response({"message":"Invalid OTP"},status=400)