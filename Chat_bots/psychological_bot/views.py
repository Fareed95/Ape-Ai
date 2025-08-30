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

        if not email or not user_input:
            return Response({'error': 'Email and user input are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch or create the user
        user, created = Psychology_User.objects.get_or_create(chat_history_unique_id=email)

        summary = user.summary

        last_chat = Chat_bot.objects.filter(Chat_bot_User=user).last()

        latest_chat = f'user - {last_chat.question} \n bot - {last_chat.answer}' if last_chat else None
        print(latest_chat)

        # Feed the chat history to your LLM
        chat_bot_response,summary = psycholgy_chat_bot(user_input=user_input,summary_of_previous_chats=summary, latest_chat=latest_chat)
        
        



        # Save the current conversation
        new_chat = Chat_bot.objects.create(
            question=user_input,
            answer=chat_bot_response,
            Chat_bot_User=user
        )

        user.summary = summary
        user.save()
        
        return Response({'bot_response': chat_bot_response}, status=status.HTTP_200_OK)


class delete_conversation(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch or create the user
        user, created = Psychology_User.objects.get_or_create(chat_history_unique_id=email)

        # Delete the conversation
        Chat_bot.objects.filter(Chat_bot_User=user).delete()
        user.summary = ''
        user.save()


        return Response({'message': 'Conversation deleted successfully.'}, status=status.HTTP_200_OK)
    

class make_prompt(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        user, created = Psychology_User.objects.get_or_create(chat_history_unique_id=email)

        summary = user.summary
        prompt = psychological_prompt(input_value=summary)
        return Response({'prompt': prompt}, status=status.HTTP_200_OK)