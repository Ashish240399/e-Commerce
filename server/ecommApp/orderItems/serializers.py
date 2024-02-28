from rest_framework import serializers
from .models import OrderItemModels

class OrderItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderItemModels
        field = '__all__'