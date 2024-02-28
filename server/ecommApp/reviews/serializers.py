from rest_framework import serializers
from .models import ReviewModels

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = ReviewModels
        fields = '__all__'