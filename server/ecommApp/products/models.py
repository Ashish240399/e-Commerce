from django.db import models

# Create your models here.
class Products(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField(max_length=200)
    product_type = models.CharField(max_length=50)