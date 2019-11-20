from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers
from prizm_server.studio import serializers as studio_serializers

class ChatBasicSerializer(serializers.ModelSerializer):
    users = users_serializers.ProfileSerializer(many = True)
    order = studio_serializers.OrderSerializer()

    class Meta:
        model = models.Chat
        fields = ['id', 'users', 'order', 'created_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    chat = ChatBasicSerializer()
    from_user = users_serializers.ProfileSerializer()
    to_user = users_serializers.ProfileSerializer()

    class Meta:
        model = models.ChatMessage
        fields = ['id', 'chat', 'from_user', 'to_user', 'text', 'message_type', 'created_at']


class ChatListSerializer(serializers.ModelSerializer):
    users = users_serializers.ProfileSerializer(many = True)
    order = studio_serializers.OrderSerializer()
    recent_chats = serializers.SerializerMethodField()
    class Meta:
        model = models.Chat
        fields = ['id', 'users', 'order', 'created_at', 'recent_chats']
    
    def get_recent_chats(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            messages = obj.messages.order_by('-created_at')[:30]
            serializer = ChatMessageSerializer(messages, many = True, context = {'request': request})
            return serializer.data
        return []