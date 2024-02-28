from django.conf import settings
from django.db import models
from products.models import Products

# Create your models here.
class ReviewModels(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    review_text = models.TextField()