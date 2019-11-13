from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, False)
        name = request.data.get('name', '')
        birth = request.data.get('birth', '')
        country_number = request.data.get('countryNumber', '')
        country_code = request.data.get('countryCode', '')
        mobile = request.data.get('mobile', '')
        user_type = request.data.get('userType')
        instagram = request.data.get('instagram')

        if user_type == 'photographer':
            user.name = name
            user.birth = birth
            user.country_number = country_number
            user.mobile = mobile
            user.instagram = instagram
            user.user_type = 'photographer'
        else:
            user.name = name
            user.birth = birth
            user.country_number = country_number
            user.country_code = country_code
            user.mobile = mobile

        user.save()
        return user


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)
