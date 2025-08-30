from django.db import models

class Message(models.Model):
    room_name = models.CharField(max_length=255)  # Chat room identifier
    username = models.CharField(max_length=255)  # User's name
    message = models.TextField()  # The message content
    timestamp = models.DateTimeField(auto_now_add=True)  # When the message was sent

    def __str__(self):
        return f"{self.username} in {self.room_name}: {self.message}"
