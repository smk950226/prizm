from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.validators import validate_email
from django.utils.translation import ugettext_lazy as _

from . import serializers
from prizm_server.common.permissions import AdminAuthenticated

User = get_user_model()

class CheckDuplicate(APIView):
    def post(self, request, format = None):
        email = request.data.get('email', None)
        mobile = request.data.get('mobile', None)
        country_number = request.data.get('countryNumber', None)
        instagram = request.data.get('instagram', None)
        if email and mobile and country_number:
            if instagram:
                if len(User.objects.filter(instagram_account = instagram)) > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('인스타그램 계정이 중복됩니다.')})
                else:
                    try:
                        validate_email(email)
                        if len(User.objects.filter(email = email)) > 0:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이메일이 중복됩니다.')})
                        else:
                            if len(User.objects.filter(mobile = mobile, country_number = country_number)) > 0:
                                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('휴대전화 번호가 중복됩니다.')})
                            else:
                                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    except:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이메일이 올바르지 않습니다.')})
            else:
                try:
                    validate_email(email)
                    if len(User.objects.filter(email = email)) > 0:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이메일이 중복됩니다.')})
                    else:
                        if len(User.objects.filter(mobile = mobile, country_number = country_number)) > 0:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('휴대전화 번호가 중복됩니다.')})
                        else:
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                except:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이메일이 올바르지 않습니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('정보를 입력해주세요.')})
    

class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


    def put(self, request, format = None):
        user = request.user
        name = request.data.get('name', None)
        country_number = request.data.get('countryNumber', None)
        mobile = request.data.get('mobile', None)
        birth = request.data.get('birth', None)
        if name and country_number and mobile and birth:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('휴대전화 번호가 중복됩니다.')})
            else:
                user.name = name
                user.country_number = country_number
                user.mobile = mobile
                user.birth = birth
                user.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('정보를 입력해주세요.')})


class ProfilePassword(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, format = None):
        user = request.user
        current_password = request.data.get('currentPassword', None)
        password = request.data.get('password', None)
        if current_password and password:
            if user.check_password(current_password):
                user.set_password(password)
                user.save()
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('현재 비밀번호가 일치하지 않습니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('정보를 입력해주세요.')})


class AdminProfile(APIView):
    permission_classes = [AdminAuthenticated]
    def put(self, request, format = None):
        user = request.user
        name = request.data.get('name', None)
        country_number = request.data.get('countryNumber', None)
        mobile = request.data.get('mobile', None)
        birth = request.data.get('birth', None)
        instagram_account = request.data.get('instagram', None)
        if name and country_number and mobile and birth and instagram_account:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('휴대전화 번호가 중복됩니다.')})
            else:
                if len(User.objects.filter(instagram_account = instagram_account).exclude(id = user.id)) > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('인스타그램 계정이 중복됩니다.')})
                else:
                    user.name = name
                    user.country_number = country_number
                    user.mobile = mobile
                    user.birth = birth
                    user.save()

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('정보를 입력해주세요.')})


class CheckPhotographer(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        if user.user_type == 'photographer':
            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('사진 작가 계정이 아닙니다.')})