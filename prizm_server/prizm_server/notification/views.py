from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models
from django.utils.translation import ugettext_lazy as _

User = get_user_model()

class Notification(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        notifications = models.Notification.objects.filter(user = user)
        serializer = serializers.NotificationSerializer(notifications, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)
    
    def put(self, request, format = None):
        user = request.user
        user.notification_set.all().update(is_checked = True)

        return Response(status = status.HTTP_200_OK)