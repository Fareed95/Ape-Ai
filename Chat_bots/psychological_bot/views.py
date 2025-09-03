from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Psychology_User, Chat_bot
from .serializers import Psychology_UserSerializer, Chat_botSerializer
from .llm.home_page_psychology_understanding_chatbot import psycholgy_chat_bot
from .llm.psychological_prompt import psychological_prompt


class PsychologyChatBotAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user_input = request.data.get('user_input')
        session_id = request.data.get("session_id")

        if not email or not user_input or not session_id:
            return Response(
                {'error': 'Email, user input and session_id are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Unique session-based user
        user, created = Psychology_User.objects.get_or_create(
            chat_history_unique_id=f"{email}-{session_id}"
        )
        print(user)
        print(created)


        summary = user.summary or ""
        print("Summary:", summary)

        last_chat = Chat_bot.objects.filter(Chat_bot_User=user).last()
        latest_chat = None
        if last_chat:
            latest_chat = f"user - {last_chat.question}\n bot - {last_chat.answer}"
        print("Latest chat:", latest_chat)

        # Feed the chat history to LLM
        chat_bot_response, summary = psycholgy_chat_bot(
            user_input=user_input,
            summary_of_previous_chats=summary if summary.strip() else None,  # 👈 avoid empty
            latest_chat=latest_chat
        )

        print(summary)

        # Save chat
        Chat_bot.objects.create(
            question=user_input,
            answer=chat_bot_response,
            Chat_bot_User=user
        )

        # Update summary
        user.summary = summary
        print(f"summary hai {user.summary}")
        user.save()

        return Response({'bot_response': chat_bot_response}, status=status.HTTP_200_OK)


class delete_conversation(APIView):
    def post(self, request):
        email = request.data.get('email')
        session_id = request.data.get('session_id')

        if not email or not session_id:
            return Response(
                {'error': 'Email and session_id are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = Psychology_User.objects.get_or_create(
            chat_history_unique_id=f"{email}-{session_id}"
        )

        # Delete that session’s conversation
        Chat_bot.objects.filter(Chat_bot_User=user).delete()
        user.summary = ""
        user.save()

        return Response({'message': 'Conversation deleted successfully.'}, status=status.HTTP_200_OK)


class make_prompt(APIView):
    def post(self, request):
        email = request.data.get('email')
        session_id = request.data.get('session_id')

        if not email or not session_id:
            return Response(
                {'error': 'Email and session_id are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = Psychology_User.objects.get_or_create(
            chat_history_unique_id=f"{email}-{session_id}"
        )
        print("User:", user)

        # Summary safe
        summary = user.summary or ""
        prompt = psychological_prompt(input_value=summary if summary.strip() else "Start fresh conversation")

        return Response({'prompt': prompt}, status=status.HTTP_200_OK)
