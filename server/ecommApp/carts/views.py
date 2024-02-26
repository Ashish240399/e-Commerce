from django.http import Http404
from django.shortcuts import render
from rest_framework import generics,status,authentication,permissions,response
from .models import CartModels
from .serializers import CartSerializers
from django.shortcuts import get_object_or_404
from products.models import Products

# Create your views here.

class CartListView(generics.ListAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializers

    def get_queryset(self):
        user = self.request.user
        return CartModels.objects.filter(userId_id=user.id)

class AddToCartView(generics.CreateAPIView):
    queryset = CartModels.objects.all()
    serializer_class = CartSerializers
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        product = get_object_or_404(Products, id=request.data.get('product_id'))
        cart_item, created = CartModels.objects.get_or_create(
            userId_id=user.id, 
            productId_id=product.id, 
            defaults={'quantity': 1}  # Provide a default value for 'quantity'
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        return response.Response(self.get_serializer(cart_item).data, status=status.HTTP_201_CREATED)


class RemoveFromCart(generics.CreateAPIView):
    queryset = CartModels.objects.all()
    serializer_class = CartSerializers
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        product = get_object_or_404(Products, id=request.data.get('product_id'))
        try:
            cart_item = CartModels.objects.get(userId_id=user.id, productId_id=product.id)
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
            return response.Response(self.get_serializer(cart_item).data, status=status.HTTP_200_OK)
        except CartModels.DoesNotExist:
            raise Http404('No CartItem matches the given query.')
        
class CartDeleteView(generics.DestroyAPIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CartModels.objects.filter(userId_id=user.id)

    def destroy(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)