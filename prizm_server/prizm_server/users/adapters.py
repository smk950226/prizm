from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest
from uuid import uuid4
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from . import models


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, False)
        first_name = request.data.get('firstName', '')
        last_name = request.data.get('lastName', '')
        country_number = request.data.get('countryNumber', '')
        country_code = request.data.get('countryCode', '')
        mobile = request.data.get('mobile', '')
        user_type = request.data.get('userType')
        instagram = request.data.get('instagram')
        print('instagram: ', instagram)

        if user_type == 'photographer':
            user.first_name = first_name
            user.last_name = last_name
            user.country_number = country_number
            user.country_code = country_code
            user.mobile = mobile
            user.instagram_account = instagram
            user.user_type = 'photographer'
        else:
            user.first_name = first_name
            user.last_name = last_name
            user.country_number = country_number
            user.country_code = country_code
            user.mobile = mobile

        user.save()

        uuid = uuid4()

        verification = models.EmailVerification.objects.create(
            user = user,
            uuid = uuid
        )

        verification.save()

        mail = EmailMessage('[PRIZM] Email Verification', render_to_string('users/email_verification.html', context={'user': user.name, 'url': 'https://prizm.cloud/email/verify/'+ str(uuid) +'/'}), 'PRIZM<contact@prizm.cloud>', [user.email])
        mail.content_subtype = "html"

        mail.send()
        return user


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)
