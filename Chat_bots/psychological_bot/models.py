from django.db import models

class Psychology_User(models.Model):
    chat_history_unique_id = models.CharField(max_length=1000)
    summary = models.TextField(blank=True, null=True)

class Chat_bot(models.Model):
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    Chat_bot_User = models.ForeignKey(Psychology_User, on_delete=models.CASCADE, related_name='chat_bot', null=True, blank=True)
    