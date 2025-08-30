from rest_framework import serializers
from .models import AiInterview,Interview




class ai_interviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiInterview
        fields = '__all__'



class InterviewSerializer(serializers.ModelSerializer):
    ai_interview = ai_interviewSerializer(many=True, read_only=True)
    class Meta:
        model = Interview
        fields = ['chat_history_unique_id','ai_interview']
