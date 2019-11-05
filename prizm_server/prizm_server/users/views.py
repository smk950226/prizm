from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.validators import validate_email

from . import serializers

User = get_user_model()

class CheckDuplicate(APIView):
    def post(self, request, format = None):
        email = request.data.get('email', None)
        mobile = request.data.get('mobile', None)
        country_number = request.data.get('countryNumber', None)
        if email and mobile and country_number:
            try:
                validate_email(email)
                if len(User.objects.filter(email = email)) > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이메일이 중복됩니다.'})
                else:
                    if len(User.objects.filter(mobile = mobile, country_number = country_number)) > 0:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '휴대전화 번호가 중복됩니다.'})
                    else:
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이메일이 올바르지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '정보를 입력해주세요.'})
    

class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)