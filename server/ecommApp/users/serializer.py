from rest_framework import serializers
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["firstName","lastName","address","email"]
        
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()