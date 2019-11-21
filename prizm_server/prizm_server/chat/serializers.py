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
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = models.ChatMessage
        fields = ['id', 'chat', 'from_user', 'to_user', 'text', 'message_type', 'created_at', 'is_me']
    
    def get_is_me(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            return request.user == obj.from_user
        return False


class ChatListSerializer(serializers.ModelSerializer):
    users = users_serializers.ProfileSerializer(many = True)
    order = studio_serializers.OrderSerializer()
    class Meta:
        model = models.Chat
        fields = ['id', 'users', 'order', 'created_at']