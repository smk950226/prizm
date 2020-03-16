from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
import json
from . import models

User = get_user_model()

class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        chat_id = data['chatId']
        from_user = data['fromUser']

        messages = models.ChatMessage.objects.filter(chat__id = chat_id).order_by('-created_at')[:30]
        messages_all = models.ChatMessage.objects.filter(chat__id = chat_id).count()
        redating = False
        redating_msg_id = -1
        for msg in messages:
            msg.is_viewed = True
            msg.save()
            if (msg.message_type == 'order_redating') and msg.responded == False:
                if msg.chat.order.photographer.user.id != from_user:
                    redating = True
                    redating_msg_id = msg.id
        check = models.ChatMessage.objects.filter(to_user__id = from_user, chat__id = chat_id, is_viewed = False)
        if messages_all > 30:
            if check.count() > 0:
                content = {
                    'command': 'messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': True,
                    'has_next_page': True,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
            else:
                content = {
                    'command': 'messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': False,
                    'has_next_page': True,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
        else:
            if check.count() > 0:
                content = {
                    'command': 'messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': True,
                    'has_next_page': False,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
            else:
                content = {
                    'command': 'messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': False,
                    'has_next_page': False,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
    
    def new_message(self, data):
        author = data['from_user']
        receiver = data['to_user']
        chat_id = data['chat']
        text = data['message']
        message_type = data['message_type']
        from_user = User.objects.get(id = author)
        to_user = User.objects.get(id = receiver)
        chat = models.Chat.objects.get(id = chat_id)

        message = models.ChatMessage.objects.create(
            chat = chat,
            from_user = from_user,
            to_user = to_user,
            text = text,
            message_type = message_type
        )
        message.save()

        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)


    def more_messages(self, data):
        page = int(data['page'])
        chat_id = data['chatId']
        from_user = data['fromUser']
        total = models.ChatMessage.objects.filter(chat__id = chat_id).order_by('-created_at')
        count = total.count()
        if page*30 > count:
            messages = total[(page-1)*30:]
            redating = False
            redating_msg_id = -1
            for msg in messages:
                msg.is_viewed = True
                msg.save()
                if (msg.message_type == 'order_redating') and msg.responded == False:
                    redating = True
                    redating_msg_id = msg.id
            check = models.ChatMessage.objects.filter(to_user__id = from_user, chat__id = chat_id, is_viewed = False)
            if check.count() > 0:
                content = {
                    'command': 'more_messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': True,
                    'has_next_page': False,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
            else:
                content = {
                    'command': 'more_messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': False,
                    'has_next_page': False,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)

        else:
            messages = total[(page-1)*30:page*30]
            redating = False
            redating_msg_id = -1
            for msg in messages:
                msg.is_viewed = True
                msg.save()
                if (msg.message_type == 'order_redating') and msg.responded == False:
                    redating = True
                    redating_msg_id = msg.id
            check = models.ChatMessage.objects.filter(to_user__id = from_user, chat__id = chat_id, is_viewed = False)
            if check.count() > 0:
                content = {
                    'command': 'more_messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': True,
                    'has_next_page': True,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)
            else:
                content = {
                    'command': 'more_messages',
                    'messages': self.messages_to_json(messages),
                    'exist_new_message': False,
                    'has_next_page': True,
                    'redating': redating,
                    'redating_msg_id': redating_msg_id,
                }
                self.send_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result
    
    def message_to_json(self, message):
        if message.from_user.user_type == 'photographer':
            return {
                'chat': message.chat.id,
                'id': message.id,
                'from_user': message.from_user.photographer.nickname,
                'to_user': message.to_user.name,
                'text': message.text,
                'message_type': message.message_type,
                'created_at': str(message.created_at),
                'from_user_id': message.from_user.id
            }
        else:
            return {
                'chat': message.chat.id,
                'id': message.id,
                'from_user': message.from_user.name,
                'to_user': message.to_user.photographer.nickname,
                'text': message.text,
                'message_type': message.message_type,
                'created_at': str(message.created_at),
                'from_user_id': message.from_user.id
            }
    
    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'more_messages': more_messages
    }

    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = 'chat_%s' % self.chat_id

        print('websocket connected')

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)
    
    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))