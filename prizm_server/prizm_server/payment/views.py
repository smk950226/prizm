from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models
from prizm_server.common.permissions import AdminAuthenticated

User = get_user_model()

class PhotographerAccount(APIView):
    permission_classes = [AdminAuthenticated]
    def post(self, request, format = None):
        user = request.user
        photographer = user.photographer
        legal_name = request.data.get('legalName', None)
        birth = request.data.get('birth', None)
        account_type = request.data.get('accountType', None)
        number = request.data.get('number', None)

        if legal_name and birth and account_type and number:
            try:
                photographer.photographeraccount
                account = photographer.photographeraccount
                account.legal_name = legal_name
                account.birth = birth
                account.account_type = account_type
                account.number = number
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                account = models.PhotographerAccount.objects.create(
                    photographer = photographer,
                    legal_name = legal_name,
                    birth = birth,
                    account_type = account_type,
                    number = number
                )
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Account 정보를 입력해주세요.')})