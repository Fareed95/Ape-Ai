import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Log for debugging
        print(f"User {self.channel_name} trying to join room {self.room_group_name}")

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Send chat history to the new user
        history = await self.get_chat_history(self.room_name)
        await self.send(text_data=json.dumps({
            'type': 'chat_history',
            'messages': history
        }))
        print(f"User {self.channel_name} connected to room {self.room_group_name}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"User {self.channel_name} disconnected from room {self.room_group_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(f"Received data from WebSocket: {data}")
        username = data.get('username', 'Anonymous')
        message = data['message']

        # Save message to the database
        saved_message = await self.save_message(self.room_name, username, message)

        # Broadcast the message to the room group
        print(f"Broadcasting message from {username}: {message}")
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'username': saved_message['username'],
                'message': saved_message['message'],
                'timestamp': saved_message['timestamp']
            }
        )

    @database_sync_to_async
    def save_message(self, room_name, username, message):
        from .models import Message
        msg = Message.objects.create(room_name=room_name, username=username, message=message)
        return {
            'username': msg.username,
            'message': msg.message,
            'timestamp': msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')  # Format timestamp
        }

    @database_sync_to_async
    def get_chat_history(self, room_name):
        from .models import Message
        messages = Message.objects.filter(room_name=room_name).order_by('timestamp')
        return [{
            'username': msg.username,
            'message': msg.message,
            'timestamp': msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')  # Format timestamp
        } for msg in messages]

    async def chat_message(self, event):
        # Log the message being sent to the WebSocket
        print(f"Sending message to WebSocket: {event}")
        await self.send(text_data=json.dumps({
            'username': event['username'],
            'message': event['message'],
            'timestamp': event['timestamp']
        }))
