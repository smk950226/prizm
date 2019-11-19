from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers

class PortfolioSerializer(serializers.ModelSerializer):
    width = serializers.SerializerMethodField()
    height = serializers.SerializerMethodField()
    class Meta:
        model = models.Portfolio
        fields = ['id', 'photographer', 'image', 'width', 'height']
    
    def get_width(self, obj):
        return obj.image.width
    
    def get_height(self, obj):
        return obj.image.height


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ['id', 'photographer', 'name', 'lng', 'lat']


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Option
        fields = ['id', 'photographer', 'title', 'photograpy_type', 'description', 'person', 'hour', 'price']


class PhotographerSerializer(serializers.ModelSerializer):
    user = users_serializers.PhotographerProfileSerializer()
    portfolio_set = PortfolioSerializer(many = True)
    location_set = LocationSerializer(many = True)
    option_set = OptionSerializer(many = True)

    class Meta:
        model = models.Photographer
        fields = ['id', 'user', 'nickname', 'profile_image', 'main_location', 'education', 'career', 'studio_id', 'portfolio_set', 'location_set', 'option_set', 'portfolio_url', 'description', 'total_rating', 'review_count']


class PhotographerPortfolioSerializer(serializers.ModelSerializer):
    user = users_serializers.PhotographerProfileSerializer()
    portfolio_set = PortfolioSerializer(many = True)

    class Meta:
        model = models.Photographer
        fields = ['id', 'user', 'nickname', 'profile_image', 'main_location', 'education', 'career', 'studio_id', 'portfolio_set', 'portfolio_url', 'description', 'total_rating', 'review_count']


class OrderSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    photographer = PhotographerPortfolioSerializer()
    location = LocationSerializer()
    option = OptionSerializer()

    class Meta:
        model = models.Order
        fields = ['id', 'user', 'photographer', 'location', 'option', 'comment', 'date_option', 'specific_date', 'start_date', 'end_date', 'confirmed_date', 'status']


class OrderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderImage
        fields = ['id', 'image']

class OrderImageDetailSerializer(serializers.ModelSerializer):
    orderimage_set = OrderImageSerializer(many = True)

    class Meta:
        model = models.Order
        fields = ['id', 'orderimage_set']