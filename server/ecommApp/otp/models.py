from django.db import models

# Create your models here.
class OTPModels(models.Model):
    email = models.EmailField()
    otp = models.IntegerField()
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    