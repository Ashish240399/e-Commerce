from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

# Create your models here.
class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    firstName = models.CharField(max_length=50,blank=False)
    lastName = models.CharField(max_length=50,blank=False)
    address = models.TextField(blank=False)
    email = models.EmailField(blank=False)
    
    def save(self, *args, **kwargs):
        fields = [self.firstName, self.lastName, self.address, self.email]
        for field in fields:
            if field == "":
                raise ValidationError("All fields are required")
        super().save(*args, **kwargs)
