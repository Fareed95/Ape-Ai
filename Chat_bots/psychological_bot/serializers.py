from rest_framework import serializers
from .models import Psychology_User, Chat_bot

class Chat_botSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat_bot
        fields = '__all__'

class Psychology_UserSerializer(serializers.ModelSerializer):
    chat_bot = Chat_botSerializer(many=True, read_only=True)
    class Meta:
        model = Psychology_User
        feilds = ['chat_history_unique_id','chat_bot' ]