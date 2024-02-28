from django.shortcuts import render
from .serializers import ReviewSerializers
from rest_framework import generics,response,authentication,permissions,status
from .models import ReviewModels
from products.models import Products

# Create your views here.
class CreateReview(generics.CreateAPIView):
    serializer_class = ReviewSerializers
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self,request,*args,**kwargs):
        user = request.user
        product_id = request.data.get('product_id')
        try:
            product = Products.objects.get(id=product_id)  
        except Products.DoesNotExist:
            return response.Response({"message": "Product not found"}, status=status.HTTP_400_BAD_REQUEST)
        rating = request.data.get('rating')
        review_text = request.data.get('review_text')
        
        # Use get_or_create to either get the existing review or create a new one
        review, created = ReviewModels.objects.get_or_create(
            user=user,
            product=product,
            defaults={'rating': rating, 'review_text': review_text},
        )
        
        # If the review already existed, update it
        if not created:
            review.rating = rating
            review.review_text = review_text
            review.save()
        
        return response.Response(self.get_serializer(review).data, status=status.HTTP_201_CREATED)
        
