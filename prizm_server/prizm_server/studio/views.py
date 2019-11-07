from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models
from prizm_server.common.pagination import MainPageNumberPagination

User = get_user_model()

class Photographer(APIView):
    def get(self, request, format = None):
        photographers = models.Photographer.objects.all()
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(photographers, request)
        serializer = serializers.PhotographerPortfolioSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)