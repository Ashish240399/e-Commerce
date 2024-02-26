from rest_framework import serializers
from .models import CartModels

class CartSerializers(serializers.ModelSerializer):
    class Meta:
        model = CartModels
        fields = '__all__'