from rest_framework.views import APIView
from rest_framework import status,authentication
from .razorpay_serializers import RazorpayOrderSerializer, TranscationModelSerializer
from .razorpay.main import RazorpayClient
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from orders.models import OrderModels
from carts.models import CartModels
from orderItems.models import OrderItemModels


rz_client = RazorpayClient()

class RazorpayOrderAPIView(APIView):
    """This API will create an order"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self, request):
        razorpay_order_serializer = RazorpayOrderSerializer(
            data=request.data
        )
        if razorpay_order_serializer.is_valid():
            order_response = rz_client.create_order(
                amount=razorpay_order_serializer.validated_data.get("amount"),
                currency=razorpay_order_serializer.validated_data.get("currency")
            )
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "order created",
                "data": order_response
            }
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": razorpay_order_serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class TransactionAPIView(APIView):
    """This API will complete order and save the 
    transaction"""
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self, request):
        transaction_serializer = TranscationModelSerializer(data=request.data)
        if transaction_serializer.is_valid():
            rz_client.verify_payment_signature(
                razorpay_payment_id = transaction_serializer.validated_data.get("payment_id"),
                razorpay_order_id = transaction_serializer.validated_data.get("order_id"),
                razorpay_signature = transaction_serializer.validated_data.get("signature")
            )
            transaction = transaction_serializer.save()
             # Create order after successful transaction
            user = request.user
            cart_items = CartModels.objects.filter(userId = user)
            amount = 0
            for item in cart_items:
                amount += item.productId.price*item.quantity
            order_status = "Order Accepted"
            shipping_address = user.profile.address
            payment_details = "Razorpay Payment"
            order = OrderModels.objects.create(
                userId_id = user.id,
                razorpayTransaction_id = transaction.id,
                orderStatus = order_status,
                amount = amount,
                shippingAddress = shipping_address,
                paymentDetails = payment_details,
            )
            for item in cart_items:
                OrderItemModels.objects.create(
                    order=order,
                    product=item.productId,
                    price=item.productId.price,
                    quantity=item.quantity
                )
            cart_items.delete()
            response = {
                "status_code": status.HTTP_201_CREATED,
                "message": "transaction created",
                "transaction_id":transaction.id
            }
            
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "bad request",
                "error": transaction_serializer.errors
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
