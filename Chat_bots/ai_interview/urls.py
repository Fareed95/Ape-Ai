from django.urls import path

from .views import InterviewList


urlpatterns = [
    path('interviews/', InterviewList.as_view()),
]
