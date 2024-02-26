from django.db import models
from django.conf import settings
from products.models import Products

# Create your models here.
class CartModels(models.Model):
        userId = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
        productId = models.ForeignKey(Products, on_delete=models.CASCADE)
        quantity = models.PositiveIntegerField()
        time = models.DateTimeField(auto_now_add=True)