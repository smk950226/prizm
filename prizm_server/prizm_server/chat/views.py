import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from prizm_server.common.pagination import MainPageNumberPagination
from . import models, serializers

class CheckNewMessage(APIView):
    permissions = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        check = models.ChatMessage.objects.filter(to_user = user, is_viewed = False)
        if check.count() > 0:
            return Response(status = status.HTTP_200_OK, data = {'new_message': True})
        else:
            return Response(status = status.HTTP_200_OK, data = {'new_message': False})