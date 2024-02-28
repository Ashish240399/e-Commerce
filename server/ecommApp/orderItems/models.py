from django.db import models
from django.db.models.fields.related import ForeignKey
from orders.models import OrderModels
from products.models import Products

class IntegerForeignKey(ForeignKey):
    def db_type(self, connection):
        db_type = super().db_type(connection)
        if 'bigint' in db_type:
            db_type = db_type.replace('bigint', 'int')
        return db_type

# Create your models here.
class OrderItemModels(models.Model):
    order = IntegerForeignKey(OrderModels, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    quantity = models.PositiveIntegerField()