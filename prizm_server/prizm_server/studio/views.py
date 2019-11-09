from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models
from prizm_server.common.pagination import MainPageNumberPagination
from django.utils.translation import ugettext_lazy as _

User = get_user_model()

class Photographer(APIView):
    def get(self, request, format = None):
        photographers = models.Photographer.objects.all()
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(photographers, request)
        serializer = serializers.PhotographerPortfolioSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class PhotographerDetail(APIView):
    def get(self, request, format = None):
        photographer_id = request.query_params.get('photographerId', None)
        if photographer_id:
            try:
                photographer = models.Photographer.objects.get(id = photographer_id)
                serializer = serializers.PhotographerSerializer(photographer, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'photographer': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('사진 작가가 존재하지 않습니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})