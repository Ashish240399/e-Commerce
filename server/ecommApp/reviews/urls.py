from django.urls import path
from .views import CreateReview

urlpatterns = [
    path("createReview/",CreateReview.as_view(),name="create_review")
]
