from django.shortcuts import render
from django.core.cache import cache
from rest_framework import generics
from .models import Products
from .serializers import ProductSerializer
import json
import redis
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.
class ProductsView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        r = redis.Redis(host='localhost', port=6379, decode_responses=True)
        products = r.get('products')
        
        if products:
            print("Data fetched from cache")
            products = json.loads(products)  # Load the JSON string from the cache
        else:
            products = list(Products.objects.all().values())  # Convert the QuerySet to a list of dictionaries
            r.set('products', json.dumps(products, cls=DjangoJSONEncoder))  # Dump the list as a JSON string into the cache
            print("Data fetched from database")
            
        return products