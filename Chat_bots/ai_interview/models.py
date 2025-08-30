from django.db import models

class Interview(models.Model):
    chat_history_unique_id = models.CharField(max_length=1000)

class AiInterview(models.Model):
    question = models.CharField(max_length=1000, blank=True, null=True)
    answer = models.CharField(max_length=1000, blank=True, null=True)
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE, related_name='ai_interviews', null=True, blank=True)
