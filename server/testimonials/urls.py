from django.urls import path
from .views import TestimonialView

urlpatterns = [
    path('testimonial/', TestimonialView.as_view()),
]
