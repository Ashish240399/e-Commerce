from django.urls import path
from .views import AddToCartView,RemoveFromCart,CartListView,CartDeleteView

urlpatterns = [
    path("allcart/",CartListView.as_view(),name="CartListView"),
    path("addToCart/",AddToCartView.as_view(),name="AddToCartView"),
    path("removeFromCart/",RemoveFromCart.as_view(),name="RemoveFromCartView"),
    path("deleteCart/",CartDeleteView.as_view(),name="DeleteCartView")
]
