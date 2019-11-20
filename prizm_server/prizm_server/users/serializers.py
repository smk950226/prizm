from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models

class ProfileSerializer(serializers.ModelSerializer):
    chat_is_me = serializers.SerializerMethodField()

    class Meta:
        model = models.User
        fields = ['id', 'username', 'email', 'name', 'birth', 'mobile', 'country_number', 'country_code', 'user_type', 'instagram_account', 'chat_is_me']
    
    def get_chat_is_me(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            return obj.id == request.user.id
        return False


class PhotographerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'email', 'name', 'mobile', 'country_number', 'country_code', 'instagram_account']