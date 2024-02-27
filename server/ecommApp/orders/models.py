from django.db import models
from django.conf import settings

# Create your models here.
class OrderModels(models.Model):
    userId = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    orderDate = models.DateTimeField(auto_now_add=True)
    orderStatus = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    shippingAddress = models.TextField()
    paymentDetails = models.CharField(max_length=100)
