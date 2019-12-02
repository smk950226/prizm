from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . import serializers, models


class ExchangeRate(APIView):
    def get(self, request, format = None):
        country = request.query_params.get('country', None)
        if country:
            try:
                exchange_rate = models.ExchangeRate.objects.get(country = country)
                serializer = serializers.ExchangeRateSerializer(exchange_rate)
                return Response(status = status.HTTP_200_OK, data = {
                    'status': 'ok',
                    'data': serializer.data
                })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class Terms(APIView):
    def get(self, request, format = None):
        name = request.query_params.get('name', None)
        if name:
            try:
                term = models.Terms.objects.get(name = name)
                serializer = serializers.TermsSerializer(term)
                return Response(status = status.HTTP_200_OK, data = {
                    'status': 'ok',
                    'data': serializer.data
                })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})