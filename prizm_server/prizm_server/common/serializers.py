from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers
from prizm_server.studio import serializers as studio_serializers

class ExchangeRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExchangeRate
        fields = ['id', 'country', 'rate']


class TermsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Terms
        fields = ['id', 'name', 'content']