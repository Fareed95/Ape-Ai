from .views import PsychologyChatBotAPIView, delete_conversation, make_prompt
from django.urls import path

urlpatterns = [
    path('psychology_chat_bot/', PsychologyChatBotAPIView.as_view()),
    path('delete_conversation/', delete_conversation.as_view()),
    path('make_prompt/', make_prompt.as_view())
]