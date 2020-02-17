from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from prizm_server.users import serializers as users_serializers
from prizm_server.payment import serializers as payment_serializers
import json

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
    photographeraccount = payment_serializers.PhotographerAccountSerializer()

    class Meta:
        model = models.Photographer
        fields = ['id', 'user', 'nickname', 'profile_image', 'main_location', 'equipment', 'career', 'studio_id', 'portfolio_set', 'location_set', 'option_set', 'description', 'total_rating', 'review_count', 'photographeraccount']


class PhotographerPortfolioSerializer(serializers.ModelSerializer):
    user = users_serializers.PhotographerProfileSerializer()
    portfolio_set = PortfolioSerializer(many = True)

    class Meta:
        model = models.Photographer
        fields = ['id', 'user', 'nickname', 'profile_image', 'main_location', 'equipment', 'career', 'studio_id', 'portfolio_set', 'description', 'total_rating', 'review_count']


class PhotographerShortSerializer(serializers.ModelSerializer):
    user = users_serializers.PhotographerProfileSerializer()

    class Meta:
        model = models.Photographer
        fields = ['id', 'user', 'nickname', 'profile_image', 'studio_id', 'total_rating', 'review_count']


class OrderSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    photographer = PhotographerPortfolioSerializer()
    is_reviewed = serializers.SerializerMethodField()
    deposit = payment_serializers.DepositSerializer()
    location = serializers.SerializerMethodField()
    option = serializers.SerializerMethodField()

    class Meta:
        model = models.Order
        fields = ['id', 'user', 'photographer', 'location', 'option', 'comment', 'date_option', 'specific_date', 'start_date', 'end_date', 'confirmed_date', 'status', 'confirmed_at', 'available_time', 'is_reviewed', 'deposit']
    
    def get_is_reviewed(self, obj):
        try:
            request = self.context.get('request')
            review = models.Review.objects.filter(user = request.user, order = obj)
            if review.count() > 0:
                return True
            else:
                return False
        except:
            return False
    
    def get_location(self, obj):
        return json.loads(obj.location)
    
    def get_option(self, obj):
        return json.loads(obj.option)
        


class OrderShortSerializer(serializers.ModelSerializer):
    is_reviewed = serializers.SerializerMethodField()
    deposit = payment_serializers.DepositSerializer()
    location = serializers.SerializerMethodField()
    option = serializers.SerializerMethodField()

    class Meta:
        model = models.Order
        fields = ['id', 'location', 'option', 'confirmed_date', 'is_reviewed', 'deposit']
    
    def get_is_reviewed(self, obj):
        try:
            request = self.context.get('request')
            review = models.Review.objects.filter(user = request.user, order = obj)
            if review.count() > 0:
                return True
            else:
                return False
        except:
            return False
    
    def get_location(self, obj):
        return json.loads(obj.location)
    
    def get_option(self, obj):
        return json.loads(obj.option)


class OrderImageSerializer(serializers.ModelSerializer):
    processed_image_url = serializers.SerializerMethodField()
    class Meta:
        model = models.OrderImage
        fields = ['id', 'order', 'image', 'processed_image_url']
    
    def get_processed_image_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.processed_image.url
        return request.build_absolute_uri(photo_url)


class OrderImageDetailSerializer(serializers.ModelSerializer):
    orderimage_set = OrderImageSerializer(many = True)

    class Meta:
        model = models.Order
        fields = ['id', 'orderimage_set']


class ReviewSerializer(serializers.ModelSerializer):
    photographer = PhotographerShortSerializer()
    user = users_serializers.ProfileSerializer()
    order = OrderShortSerializer()
    class Meta:
        model = models.Review
        fields = ['id', 'photographer', 'order', 'user', 'rate', 'comment', 'created_at', 'updated_at']


class RequestLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RequestLocation
        fields = ['id', 'name', 'lng', 'lat']

class RequestOrderShortSerializer(serializers.ModelSerializer):
    photographer = PhotographerShortSerializer()

    class Meta:
        model = models.RequestOrder
        fields = ['id', 'photographer', 'available_time', 'price', 'location']


class CustomRequestSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    status = serializers.SerializerMethodField()
    locations = RequestLocationSerializer(many = True)
    request_order = serializers.SerializerMethodField()

    class Meta:
        model = models.CustomRequest
        fields = ['id', 'user', 'photograpy_type', 'person', 'hour', 'date_option', 'specific_date', 'start_date', 'end_date', 'location_option', 'status', 'created_at', 'is_closed', 'locations', 'request_order']
    
    def get_status(self, obj):
        try:
            request = self.context.get('request')
            user = request.user
            if user.user_type == 'photographer':
                if obj.photographer:
                    if obj.photographer == user.photographer:
                        return 'selected'
                    else:
                        return 'closed'
                elif obj.requestorder_set.filter(photographer = user.photographer).count() > 0:
                    return 'submitted'
                elif obj.is_closed:
                    return 'closed'
                else:
                    return 'none'
            else:
                return 'none'
        except:
            return 'none'
    
    def get_request_order(self, obj):
        try:
            request = self.context.get('request')
            user = request.user
            request_order = obj.requestorder_set.filter(photographer = user.photographer).first()
            if request_order:
                serializer = RequestOrderShortSerializer(request_order, context = {'request': request})
                return serializer.data
            else:
                return {}
        except:
            return {}


class RequestOrderSerializer(serializers.ModelSerializer):
    photographer = PhotographerSerializer()
    custom_request =  CustomRequestSerializer()

    class Meta:
        model = models.RequestOrder
        fields = ['id', 'photographer', 'custom_request', 'available_time', 'price', 'location']