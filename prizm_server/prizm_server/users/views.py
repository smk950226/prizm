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
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This Instagram account has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                else:
                    try:
                        validate_email(email)
                        if len(User.objects.filter(email = email)) > 0:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This email address has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                        else:
                            if len(User.objects.filter(mobile = mobile, country_number = country_number)) > 0:
                                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                            else:
                                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    except:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Wrong email address. Please check your email address again.')})
            else:
                try:
                    validate_email(email)
                    if len(User.objects.filter(email = email)) > 0:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This email address has already been take. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                    else:
                        if len(User.objects.filter(mobile = mobile, country_number = country_number)) > 0:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                        else:
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                except:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Wrong email address. Please check your email address again.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in all the information to complete the registration.')})
    

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
        if name and country_number and mobile:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
            else:
                user.name = name
                user.country_number = country_number
                user.mobile = mobile
                user.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in all the information to complete the registration.')})


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
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Your current password is not valid. Please check the password again.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in all the information to complete the registration.')})


class AdminProfile(APIView):
    permission_classes = [AdminAuthenticated]
    def put(self, request, format = None):
        user = request.user
        name = request.data.get('name', None)
        country_number = request.data.get('countryNumber', None)
        mobile = request.data.get('mobile', None)
        instagram_account = request.data.get('instagram', None)
        print(name, country_number, mobile, instagram_account)
        if name and country_number and mobile and instagram_account:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
            else:
                if len(User.objects.filter(instagram_account = instagram_account).exclude(id = user.id)) > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This Instagram account has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                else:
                    user.name = name
                    user.country_number = country_number
                    user.mobile = mobile
                    user.instagram_account = instagram_account
                    user.save()

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in all the information to complete the registration.')})


class CheckPhotographer(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        if user.user_type == 'photographer':
            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This page is only available for registered photographers.')})