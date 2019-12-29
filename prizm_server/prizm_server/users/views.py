from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.validators import validate_email
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from uuid import uuid4
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from . import serializers, models
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
        first_name = request.data.get('firstName', None)
        last_name = request.data.get('lastName', None)
        country_number = request.data.get('countryNumber', None)
        mobile = request.data.get('mobile', None)
        if first_name and last_name and country_number and mobile:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
            else:
                user.first_name = first_name
                user.last_name = last_name
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
        first_name = request.data.get('firstName', None)
        last_name = request.data.get('lastName', None)
        country_number = request.data.get('countryNumber', None)
        mobile = request.data.get('mobile', None)
        instagram_account = request.data.get('instagram', None)
        if first_name and last_name and country_number and mobile and instagram_account:
            if len(User.objects.filter(mobile = mobile, country_number = country_number).exclude(id = user.id)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This mobile number has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
            else:
                if len(User.objects.filter(instagram_account = instagram_account).exclude(id = user.id)) > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This Instagram account has already been taken. Please contact us at contact@prizm.cloud if you have any inquiries.')})
                else:
                    user.first_name = first_name
                    user.last_name = last_name
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


class EmailVerification(APIView):
    def get(self, request, format = None):
        uuid = request.query_params.get('uuid', None)
        if uuid:
            try:
                email_verification = models.EmailVerification.objects.get(uuid = uuid, is_expired = False)
                now = timezone.now().timestamp()
                created = email_verification.created_at.timestamp()

                if now - created >= 1*60*60*2:
                    email_verification.is_expired = True
                    email_verification.save()
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Verification URL is valid for 2 hours. This URL has been expired.')})
                else:
                    email_verification.is_verified = True
                    email_verification.is_expired = True
                    email_verification.save()
                    user = email_verification.user
                    user.is_verified = True
                    user.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid URL!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid URL!')})


class SendVerificationEmail(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        email_verifications = models.EmailVerification.objects.filter(user = user)
        email_verifications.update(is_expired = True)

        uuid = uuid4()

        verification = models.EmailVerification.objects.create(
            user = user,
            uuid = uuid
        )

        verification.save()

        mail = EmailMessage('[PRIZM] Email Verification', render_to_string('users/email_verification.html', context={'user': user.name, 'url': 'https://prizm.cloud/email/verify/'+ str(uuid) +'/'}), 'PRIZM<contact@prizm.cloud>', [user.email])
        mail.content_subtype = "html"

        mail.send()

        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})