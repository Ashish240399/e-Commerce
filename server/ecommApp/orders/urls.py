from django.urls import path
from .views import OrdersView

urlpatterns = [
    path("createOrder/",OrdersView.as_view(),name="createOrder")
]
