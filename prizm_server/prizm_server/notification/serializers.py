from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers
from prizm_server.studio import serializers as studio_serializers

class NotificationSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    order = studio_serializers.OrderSerializer()
    class Meta:
        model = models.Notification
        fields = ['id', 'user', 'notification_type', 'is_checked', 'order']