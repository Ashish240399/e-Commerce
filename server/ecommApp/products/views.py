from django.shortcuts import render
from rest_framework import generics
from .models import Products
from .serializers import ProductSerializer

# Create your views here.
class ProductsView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    