from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers

class PhotographerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PhotographerAccount
        fields = ['id', 'photographer', 'legal_name', 'birth', 'account_type', 'content']


class MerchantUIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Payment
        fields = ['merchant_uid']


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Deposit
        fields = ['id', 'price', 'name', 'created_at', 'is_paid']