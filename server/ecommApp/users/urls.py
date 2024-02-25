from django.urls import path
from .views import RegisterView,LoginView,CSRFTokenView,UsersDetailView

urlpatterns = [
    path("register/",RegisterView.as_view(),name="register"),
    path("login/",LoginView.as_view(),name="login"),
    path('csrf-token/', CSRFTokenView.as_view(), name='csrf-token'),
    path("",UsersDetailView.as_view(), name="user")
]
