from django.shortcuts import render
from rest_framework import views,generics,authentication,permissions,response,status
from .models import OrderModels
from .serializers import OrderSerializers
from carts.models import CartModels
from orderItems.models import OrderItemModels

# Create your views here.
class OrdersView(generics.CreateAPIView):
    queryset = OrderModels.objects.all()
    serializer_class = OrderSerializers
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartModels.objects.filter(userId = user)
        
        if not cart_items.exists():
            return response.Response({"message": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)
        
        amount = 0
        for item in cart_items:
            amount += item.productId.price*item.quantity
            
        order_status = "Order Accepted"
        shipping_address = user.profile.address
        payment_details = request.data.get('paymentDetails')
        
        if not payment_details:
            return response.Response({"message": "paymentDetails is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        order = OrderModels.objects.create(
            userId_id = user.id,
            orderStatus = order_status,
            amount = amount,
            shippingAddress = shipping_address,
            paymentDetails = payment_details
        )

        for item in cart_items:
            OrderItemModels.objects.create(
                order=order,
                product=item.productId,
                price=item.productId.price,
                quantity=item.quantity
            )
        
        cart_items.delete()
        
        return response.Response(self.get_serializer(order).data, status=status.HTTP_201_CREATED)        
