from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.http import HttpResponse, Http404
from PIL import Image
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.db.models import Q
from uuid import uuid4

from . import serializers, models
from prizm_server.common.pagination import MainPageNumberPagination, MesssageNumberPagination, OrderNumberPagination
from prizm_server.common.permissions import AdminAuthenticated
from prizm_server.chat import models as chat_models
from prizm_server.chat import serializers as chat_serializers
from prizm_server.notification import models as notification_models

import datetime, pytz, json, os, mimetypes, zipfile, io
from dateutil.relativedelta import relativedelta
from urllib.request import urlopen

User = get_user_model()

class Photographer(APIView):
    def get(self, request, format = None):
        photographers = models.Photographer.objects.all().order_by('-id')
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(photographers, request)
        serializer = serializers.PhotographerPortfolioSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class PhotographerDetail(APIView):
    def get(self, request, format = None):
        photographer_id = request.query_params.get('photographerId', None)
        if photographer_id:
            try:
                photographer = models.Photographer.objects.get(studio_id = photographer_id)
                serializer = serializers.PhotographerSerializer(photographer, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'photographer': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please check the url again. No photographer has registered the url.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class PhotographerDetailByToken(APIView):
    permission_classes = [AdminAuthenticated]
    def get(self, request, format = None):
        try:
            photographer = request.user.photographer
            serializer = serializers.PhotographerSerializer(photographer, context = {'request': request})
            return Response(status = status.HTTP_200_OK, data = serializer.data)
        except:
            return Response(status = status.HTTP_200_OK, data = {})


class Order(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        orders = models.Order.objects.filter(user = user).order_by('-id')
        for order in orders:
            if order.status == 'confirmed':
                if (order.confirmed_at.timestamp() + 60*60*24*3) < (timezone.now().timestamp()):
                    order.status = 'cancelled'
                    order.save()
                try:
                    deposit = order.deposit
                    if deposit.is_paid == False:
                        if (deposit.created_at.timestamp() + 60*60*24*1) < (timezone.now().timestamp()):
                            order.status = 'cancelled'
                            order.save()
                except:
                    pass
        orders = models.Order.objects.filter(user = user).order_by('-id')
        paginator = OrderNumberPagination()
        result_page = paginator.paginate_queryset(orders, request)
        serializer = serializers.OrderSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

    def post(self, request, format = None):
        user = request.user
        photographer_id = request.data.get('photographerId')
        location_id = request.data.get("locationId")
        option_id = request.data.get('optionId')
        comment = request.data.get('comment')
        date_option = request.data.get("dateOption")
        specific_date = request.data.get("date")
        hour = request.data.get("hour")
        min = request.data.get("min")
        start_date = request.data.get('startDate')
        end_date = request.data.get('endDate')

        if photographer_id and location_id and option_id and date_option and (specific_date or (start_date and end_date)):
            if date_option == 1:
                specific = datetime.datetime(int(specific_date.split('-')[0]), int(specific_date.split('-')[1]), int(specific_date.split('-')[2]), int(hour), int(min))
                photographer = models.Photographer.objects.get(id = photographer_id)
                location = models.Location.objects.get(id = location_id)
                option = models.Option.objects.get(id = option_id)

                location_json = json.dumps({
                    'id': location.id,
                    'photographer': location.photographer.id,
                    'name': location.name,
                    'lng': location.lng,
                    'lat': location.lat
                }, sort_keys=True, indent=4)

                option_json = json.dumps({
                    'id': option.id,
                    'photographer': option.photographer.id,
                    'title': option.title,
                    'photograpy_type': option.photograpy_type,
                    'description': option.description,
                    'person': option.person,
                    'hour': option.hour,
                    'price': option.price
                }, sort_keys=True, indent=4)

                order = models.Order.objects.create(
                    user = user,
                    photographer = photographer,
                    location = location_json,
                    option = option_json,
                    comment = comment,
                    date_option = 'Specific',
                    specific_date = specific
                )
                order.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

            elif date_option == 2:
                start = datetime.date(int(start_date.split('-')[0]), int(start_date.split('-')[1]), int(start_date.split('-')[2]))
                end = datetime.date(int(end_date.split('-')[0]), int(end_date.split('-')[1]), int(end_date.split('-')[2]))

                photographer = models.Photographer.objects.get(id = photographer_id)
                location = models.Location.objects.get(id = location_id)
                option = models.Option.objects.get(id = option_id)

                location_json = json.dumps({
                    'id': location.id,
                    'photographer': location.photographer.id,
                    'name': location.name,
                    'lng': location.lng,
                    'lat': location.lat
                }, sort_keys=True, indent=4)

                option_json = json.dumps({
                    'id': option.id,
                    'photographer': option.photographer.id,
                    'title': option.title,
                    'photograpy_type': option.photograpy_type,
                    'description': option.description,
                    'person': option.person,
                    'hour': option.hour,
                    'price': option.price
                }, sort_keys=True, indent=4)


                order = models.Order.objects.create(
                    user = user,
                    photographer = photographer,
                    location = location_json,
                    option = option_json,
                    comment = comment,
                    date_option = 'Range',
                    start_date = start,
                    end_date = end
                )
                order.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please select all of the options above to make a reservation.')})
    
    def put(self, request, format = None):
        user = request.user
        response_type = request.data.get('responseType', None)
        order_id = request.data.get('orderId')
        selected_time = request.data.get('selectedTime')
        message_id = request.data.get('messageId')

        if response_type and order_id and message_id:
            if response_type == 'cancel':
                order = models.Order.objects.get(id = order_id)
                try:
                    message = chat_models.ChatMessage.objects.get(id = message_id)
                    if order.status == 'confirmed':
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('You have already confirmed your date and time. Please contact as at contact@prizm.cloud if you have any inquiries.')})
                    else:
                        order.status = 'cancelled'
                        order.save()
                        message.responded = True
                        message.save()
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

                except:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
            else:
                order = models.Order.objects.get(id = order_id)
                if selected_time:
                    selected = datetime.datetime(int(selected_time[:4]), int(selected_time[5:7]), int(selected_time[8:10]), int(selected_time[11:13]), 00)
                    try:
                        message = chat_models.ChatMessage.objects.get(id = message_id)
                        order.confirmed_date = selected
                        order.confirmed_at = timezone.now()
                        order.status = 'confirmed'
                        order.save()
                        message.responded = True
                        message.save()
                        notification = notification_models.Notification.objects.create(
                            user = order.user,
                            notification_type = 'request_confirm',
                            order = order
                        )
                        notification.save()

                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    except:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please select your desired time to complete the reservation.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class CompleteOrder(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        order_id = request.data.get('orderId', None)
        if order_id:
            try:
                order = models.Order.objects.get(id = order_id)
                order.status = 'completed'
                order.is_ended = True
                order.save()
                order = models.Order.objects.get(id = order_id)
                serializer = serializers.OrderSerializer(order, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class OrderDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        order_id = request.query_params.get('orderId', None)
        if order_id:
            user = request.user
            order = models.Order.objects.get(id = order_id)
            serializer = serializers.OrderSerializer(order, context = {'request': request})

            return Response(status = status.HTTP_200_OK, data = serializer.data)
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class AdminOrder(APIView):
    permission_classes = [AdminAuthenticated]
    def get(self, request, format = None):
        user = request.user
        photographer = user.photographer
        order_status = request.query_params.get('status', None)

        orders = models.Order.objects.filter(photographer = photographer, user__is_verified = True).order_by('-id')

        if order_status:
            if order_status == 'pending':
                orders = orders.filter(status = 'pending')
            elif order_status == 'confirmed':
                orders = orders.filter(Q(status = 'confirmed') | Q(status = 'waiting_payment'))
            elif order_status == 'paid':
                orders = orders.filter(status = 'paid')
            elif order_status == 'past':
                orders = orders.filter(Q(status = 'cancelled') | Q(status = 'completed'))

        paginator = OrderNumberPagination()
        result_page = paginator.paginate_queryset(orders, request)
        serializer = serializers.OrderSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)
    
    def post(self, request, format = None):
        order_id = request.data.get('orderId', None)
        option = request.data.get('option', None)
        user = request.user
        if order_id and option:
            order = models.Order.objects.get(id = order_id)
            if option == 1:
                order.status = 'confirmed'
                order.confirmed_date = order.specific_date
                order.confirmed_at = timezone.now()
                order.save()
                notification = notification_models.Notification.objects.create(
                    user = order.user,
                    notification_type = 'request_confirm',
                    order = order
                )
                notification.save()

                chat = chat_models.Chat.objects.create(
                    order = order
                )
                chat.save()
                chat.users.add(user, order.user)
                message = chat_models.ChatMessage.objects.create(
                    chat = chat,
                    from_user = user,
                    to_user = order.user,
                    message_type = 'order_confirm'
                )
                message.save()
                order = models.Order.objects.get(id = order_id)
                serializer = serializers.OrderSerializer(order, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})
            elif option == 2:
                available_time = request.data.get('availableTime', None)
                if available_time:
                    if order.available_time:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('You have already sent available date and time to your client.')})
                    else:
                        order.available_time = json.dumps(available_time)
                        order.save()

                        chat = chat_models.Chat.objects.create(
                            order = order
                        )
                        chat.save()
                        chat.users.add(user, order.user)
                        message = chat_models.ChatMessage.objects.create(
                            chat = chat,
                            from_user = user,
                            to_user = order.user,
                            message_type = 'order_redating',
                            text = json.dumps(available_time)
                        )
                        message.save()
                        order = models.Order.objects.get(id = order_id)
                        serializer = serializers.OrderSerializer(order, context = {'request': request})

                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
            else:
                if order.status == 'confirmed':
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Your client has already made payment and confirmed the reservation. Please contact us at contact@prizm.cloud if you want to cancel the reservation.')})
                else:
                    order.status = 'cancelled'
                    order.save()
                    chats = order.chat_set.all()
                    chats.delete()
                    notification = notification_models.Notification.objects.create(
                        user = order.user,
                        notification_type = 'request_cancel',
                        order = order
                    )
                    notification.save()
                    order = models.Order.objects.get(id = order_id)
                    serializer = serializers.OrderSerializer(order, context = {'request': request})

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class OrderImage(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        order_id = request.query_params.get('orderId', None)

        if order_id:
            try:
                order = models.Order.objects.get(id = order_id)
                serializer = serializers.OrderImageDetailSerializer(order, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'images': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Error : failed to load the data. Please try again later.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class OrderImageUpload(APIView):
    permission_classes = [AdminAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format = None):
        user = request.user
        images = request.data.getlist('images[]', None)
        order_id = request.data.get('orderId')
        try:
            order = models.Order.objects.get(id = order_id)
            pre_image = models.OrderImage.objects.filter(order = order)
            pre_image.delete()
            for image in images:
                order_image = models.OrderImage.objects.create(order = order, image = image, processed_image = image)
                order_image.save()
            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        except:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Error : failed to load the data. Please try again later.')})


class Studio(APIView):
    permission_classes = [AdminAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format = None):
        user = request.user
        portfolio_images = request.data.getlist('portfolios[]', None)
        nickname = request.data.get('nickname', None)
        main_location = request.data.get('mainLocation', None)
        equipment = request.data.get('equipment', None)
        career = request.data.get('career', None)
        description = request.data.get('description', None)
        profile_image = request.data.get('profileImage', None)
        locations = request.data.getlist('locations[]')
        options = request.data.getlist('options[]')
        studio_id = request.data.get('studioId')
        update = request.data.get('update')

        if (len(portfolio_images) > 0) and nickname and main_location and career and description and profile_image and (len(locations) > 0) and (len(options) > 0) and studio_id:
            if (studio_id == 'admin') or (studio_id == 'djangoadmin') or (studio_id.find('/') > -1) or (studio_id == '') or (studio_id == 'welcome') or (studio_id == 'artist') or(studio_id == 'description') or (studio_id == 'payment') or (studio_id == 'message') or (studio_id == 'signup') or (studio_id == 'signin') or (studio_id == 'profile') or (studio_id == 'reservation') or (studio_id == 'menu'):
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This URL is not available. Please try another url for your online studio.')})
            elif models.Photographer.objects.filter(studio_id = studio_id).exclude(user__id = user.id).count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This URL is not available. Please try another url for your online studio.')})
            elif models.Photographer.objects.filter(nickname = nickname).exclude(user__id = user.id).count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This studio name is not available. Please try another studio name.')})
            else:
                new_portfolio_images = []
                pre_portfolio_id = []
                for port in portfolio_images:
                    if type(port) == type('text'):
                        pre_portfolio_id.append(int(json.loads(port)['id']))
                        new_portfolio_images.append(int(json.loads(port)['id']))
                    else:
                        new_portfolio_images.append(port)
                
                if update == 'true':
                    pre_portfolio = models.Portfolio.objects.filter(photographer = user.photographer).exclude(id__in = pre_portfolio_id)
                    pre_portfolio.delete()
                    photographer = user.photographer
                    photographer.nickname = nickname
                    if type(profile_image) == type('text'):
                        pass
                    else:
                        photographer.profile_image = profile_image
                    photographer.main_location = main_location
                    photographer.equipment = equipment
                    photographer.career = career
                    photographer.studio_id = studio_id
                    photographer.description = description

                    photographer.save()

                    for image in new_portfolio_images:
                        if type(image) == type(1):
                            try:
                                portfolio = models.Portfolio.objects.get(id = image)
                                new_port = models.Portfolio.objects.create(
                                    photographer = photographer,
                                    image = portfolio.image
                                )
                                new_port.save()
                                portfolio.delete()
                            except:
                                pass
                        else:
                            img = models.Portfolio.objects.create(
                                photographer = photographer,
                                image = image
                            )
                            img.save()
                    new_locations = []
                    pre_locations_id = []

                    for location in locations:
                        if int(json.loads(location)['id']) >= 0:
                            pre_locations_id.append(int(json.loads(location)['id']))
                        else:
                            new_locations.append(json.loads(location))
                    if len(pre_locations_id) > 0:
                        pre_locations = models.Location.objects.filter(photographer = photographer).exclude(id__in = pre_locations_id)
                        pre_locations.delete()
                    
                    for new in new_locations:
                        loca = models.Location.objects.create(
                            photographer = photographer,
                            name = new['name'],
                            lng = new['lng'],
                            lat = new['lat']
                        )
                        loca.save()

                    new_options = []
                    pre_options_id = []

                    for option in options:
                        if int(json.loads(option)['id']) >= 0:
                            pre_options_id.append(int(json.loads(option)['id']))
                        else:
                            new_options.append(json.loads(option))
                    if len(pre_options_id) > 0:
                        pre_options = models.Option.objects.filter(photographer = photographer).exclude(id__in = pre_options_id)
                        pre_options.delete()
                    
                    for new in new_options:
                        op = models.Option.objects.create(
                            photographer = photographer,
                            title = new['title'],
                            photograpy_type = new['photograpy_type'],
                            description = new['description'],
                            person = int(new['person']),
                            hour = int(new['hour']),
                            price = int(new['price']),
                        )
                        op.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

                else:
                    photographer = models.Photographer.objects.create(
                        user = user,
                        nickname = nickname,
                        profile_image = profile_image,
                        main_location = main_location,
                        equipment = equipment,
                        career = career,
                        studio_id = studio_id,
                        description = description
                    )

                    photographer.save()

                    for image in new_portfolio_images:
                        if type(image) == type(1):
                            try:
                                portfolio = models.Portfolio.objects.get(id = image)
                                new_port = models.Portfolio.objects.create(
                                    photographer = photographer,
                                    image = portfolio.image
                                )
                                new_port.save()
                                portfolio.delete()
                            except:
                                pass
                        else:
                            img = models.Portfolio.objects.create(
                                photographer = photographer,
                                image = image
                            )
                            img.save()
                    new_locations = []
                    pre_locations_id = []

                    for location in locations:
                        if int(json.loads(location)['id']) >= 0:
                            pre_locations_id.append(int(json.loads(location)['id']))
                        else:
                            new_locations.append(json.loads(location))
                    if len(pre_locations_id) > 0:
                        pre_locations = models.Location.objects.filter(photographer = photographer).exclude(id__in = pre_locations_id)
                        pre_locations.delete()
                    
                    for new in new_locations:
                        loca = models.Location.objects.create(
                            photographer = photographer,
                            name = new['name'],
                            lng = new['lng'],
                            lat = new['lat']
                        )
                        loca.save()

                    new_options = []
                    pre_options_id = []

                    for option in options:
                        if int(json.loads(option)['id']) >= 0:
                            pre_options_id.append(int(json.loads(option)['id']))
                        else:
                            new_options.append(json.loads(option))
                    if len(pre_options_id) > 0:
                        pre_options = models.Option.objects.filter(photographer = photographer).exclude(id__in = pre_options_id)
                        pre_options.delete()
                    
                    for new in new_options:
                        op = models.Option.objects.create(
                            photographer = photographer,
                            title = new['title'],
                            photograpy_type = new['photograpy_type'],
                            description = new['description'],
                            person = int(new['person']),
                            hour = int(new['hour']),
                            price = int(new['price']),
                        )
                        op.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in all the information to complete your registration.')})


class Chat(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        chats = chat_models.Chat.objects.filter(users__id = user.id).order_by('-created_at')
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(chats, request)
        serializer = chat_serializers.ChatListSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class Message(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        chat_id = request.query_params.get('chatId', None)
        if chat_id:
            chat = chat_models.Chat.objects.get(id = chat_id)
            if user.chat_set.filter(id = chat.id).count() > 0:
                messages = chat.messages.order_by('created_at')
                paginator = MesssageNumberPagination()
                result_page = paginator.paginate_queryset(messages, request)
                serializer = chat_serializers.ChatMessageSerializer(result_page, many = True, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'messages': serializer.data})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class Review(APIView):
    def get(self, request, format = None):
        photographer_id = request.query_params.get('photographerId', None)
        if photographer_id:
            try:
                photographer = models.Photographer.objects.get(id = photographer_id)
                reviews = photographer.review_set.all().order_by('-created_at')
                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(reviews, request)
                serializer = serializers.ReviewSerializer(result_page, many = True, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'total_rating': photographer.total_rating, 'review_count': photographer.review_count, 'reviews': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class ReviewCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        photographer_id = request.data.get('photographerId', None)
        order_id = request.data.get('orderId', None)
        rate = request.data.get('rate', None)
        comment = request.data.get('comment', None)

        if photographer_id and order_id and rate and comment:
            try:
                photographer = models.Photographer.objects.get(id = photographer_id)
                order = models.Order.objects.get(id = order_id)
                review = models.Review.objects.create(
                    photographer = photographer,
                    order = order,
                    user = user,
                    rate = rate,
                    comment = comment
                )
                review.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class CustomRequest(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        custom_request = models.CustomRequest.objects.filter(user__is_verified = True)

        paginator = OrderNumberPagination()
        result_page = paginator.paginate_queryset(custom_request, request)
        serializer = serializers.CustomRequestSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

    def post(self, request, format = None):
        user = request.user
        photograpy_type = request.data.get('photograpyType', None)
        person = request.data.get('person', None)
        hour = request.data.get('hour', None)
        date_option = int(request.data.get('dateOption', None))
        specific_date = request.data.get("selectedDate")
        specific_hour = request.data.get("selectedHour")
        specific_min = request.data.get("selectedMin")
        start_date = request.data.get('startDate', None)
        end_date = request.data.get('endDate', None)
        location_option = int(request.data.get('locationOption', None))
        locations = request.data.getlist('locations[]')
        if date_option == 1:
            specific = datetime.datetime(int(specific_date.split('-')[0]), int(specific_date.split('-')[1]), int(specific_date.split('-')[2]), int(specific_hour), int(specific_min))
            if location_option == 1:
                custom_request = models.CustomRequest.objects.create(
                    user = user,
                    photograpy_type = photograpy_type,
                    person = person,
                    hour = hour,
                    date_option = 'Specific',
                    specific_date = specific,
                    location_option = 'Specific'
                )
                custom_request.save()
                for location in locations:
                    location = json.loads(location)
                    loc = models.RequestLocation.objects.create(
                        custom_request = custom_request,
                        name = location['name'],
                        lng = location['lng'],
                        lat = location['lat']
                    )
                    loc.save()
                
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            elif location_option == 2:
                custom_request = models.CustomRequest.objects.create(
                    user = user,
                    photograpy_type = photograpy_type,
                    person = person,
                    hour = hour,
                    date_option = 'Specific',
                    specific_date = specific,
                    location_option = 'Range'
                )
                custom_request.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})

        elif date_option == 2:
            start = datetime.date(int(start_date.split('-')[0]), int(start_date.split('-')[1]), int(start_date.split('-')[2]))
            end = datetime.date(int(end_date.split('-')[0]), int(end_date.split('-')[1]), int(end_date.split('-')[2]))

            if location_option == 1:
                custom_request = models.CustomRequest.objects.create(
                    user = user,
                    photograpy_type = photograpy_type,
                    person = person,
                    hour = hour,
                    date_option = 'Range',
                    start_date = start,
                    end_date = end,
                    location_option = 'Specific'
                )
                custom_request.save()
                for location in locations:
                    location = json.loads(location)
                    loc = models.RequestLocation.objects.create(
                        custom_request = custom_request,
                        name = location['name'],
                        lng = location['lng'],
                        lat = location['lat']
                    )
                    loc.save()
                
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            elif location_option == 2:
                custom_request = models.CustomRequest.objects.create(
                    user = user,
                    photograpy_type = photograpy_type,
                    person = person,
                    hour = hour,
                    date_option = 'Range',
                    start_date = start,
                    end_date = end,
                    location_option = 'Range'
                )
                custom_request.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})

            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
    
    def delete(self, request, format = None):
        user = request.user
        request_id = request.data.get('requestId')
        if request_id:
            try:
                custom_request = models.CustomRequest.objects.get(id = request_id)
                custom_request.is_closed = True
                custom_request.save()
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class RequestOrder(APIView):
    def get(self, request, format = None):
        request_id = request.query_params.get('requestId', None)
        if request_id:
            custom_request = models.CustomRequest.objects.get(id = request_id)
            orders = custom_request.requestorder_set.all()
            paginator = MainPageNumberPagination()
            result_page = paginator.paginate_queryset(orders, request)
            serializer = serializers.RequestOrderSerializer(result_page, many = True, context = {'request': request})
            return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'orders': serializer.data})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})

    def post(self, request, format = None):
        user = request.user
        photographer = user.photographer
        request_id = request.data.get('requestId', None)
        location = request.data.get('location', None)
        available_time = request.data.get('availableTime', None)
        price = request.data.get('price', None)

        if request_id and location and price:
            try:
                custom_request = models.CustomRequest.objects.get(id = request_id)
                if custom_request.date_option == 'Specific':
                    request_order = models.RequestOrder.objects.create(
                        photographer = photographer,
                        custom_request = custom_request,
                        price = float(price),
                        location = location
                    )
                    request_order.save()
                    custom_request = models.CustomRequest.objects.get(id = request_id)
                    serializer = serializers.CustomRequestSerializer(custom_request, context = {'request': request})
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'custom_request': serializer.data})
                else:
                    request_order = models.RequestOrder.objects.create(
                        photographer = photographer,
                        custom_request = custom_request,
                        available_time = available_time,
                        price = float(price),
                        location = location
                    )
                    request_order.save()
                    custom_request = models.CustomRequest.objects.get(id = request_id)
                    serializer = serializers.CustomRequestSerializer(custom_request, context = {'request': request})
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'custom_request': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
    
    def put(self, request, format = None):
        user = request.user
        order_id = request.data.get('orderId', None)
        selected_time = request.data.get('selectedTime', None)
        now = timezone.now()

        if order_id:
            try:
                request_order = models.RequestOrder.objects.get(id = order_id)
                custom_request = request_order.custom_request
                photographer = request_order.photographer
                location = json.loads(request_order.location.replace("'", '"'))
                location_json = json.dumps({
                    'id': str(uuid4()),
                    'photographer': photographer.id,
                    'name': location['name'],
                    'lng': location['lng'],
                    'lat': location['lat']
                }, sort_keys=True, indent=4)

                option_json = json.dumps({
                    'id': str(uuid4()),
                    'photographer': photographer.id,
                    'title': 'Custom Request',
                    'photograpy_type': custom_request.photograpy_type,
                    'description': 'Custom Request',
                    'person': custom_request.person,
                    'hour': custom_request.hour,
                    'price': request_order.price
                }, sort_keys=True, indent=4)

                if custom_request.date_option == 'Specific':
                    order = models.Order.objects.create(
                        user = user,
                        photographer = request_order.photographer,
                        location = location_json,
                        option = option_json,
                        date_option = custom_request.date_option,
                        specific_date = custom_request.specific_date,
                        start_date = custom_request.start_date,
                        end_date = custom_request.end_date,
                        status = 'confirmed',
                        available_time = request_order.available_time,
                        confirmed_date = custom_request.specific_date,
                        confirmed_at = now
                    )

                    order.save()

                    custom_request.photographer = request_order.photographer
                    custom_request.is_closed = True
                    custom_request.order = order
                    custom_request.save()

                    notification = notification_models.Notification.objects.create(
                        user = user,
                        notification_type = 'request_confirm',
                        order = order
                    )
                    notification.save()

                    chat = chat_models.Chat.objects.create(
                        order = order
                    )
                    chat.save()
                    chat.users.add(user, photographer.user)
                    message = chat_models.ChatMessage.objects.create(
                        chat = chat,
                        from_user = photographer.user,
                        to_user = user,
                        message_type = 'order_confirm'
                    )
                    message.save()
                    serializer = serializers.OrderSerializer(order, context = {'request': request})

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})

                else:
                    selected = datetime.datetime(int(selected_time[:4]), int(selected_time[5:7]), int(selected_time[8:10]), int(selected_time[11:13]), 00)
                    order = models.Order.objects.create(
                        user = user,
                        photographer = request_order.photographer,
                        location = location_json,
                        option = option_json,
                        date_option = custom_request.date_option,
                        specific_date = custom_request.specific_date,
                        start_date = custom_request.start_date,
                        end_date = custom_request.end_date,
                        status = 'confirmed',
                        available_time = request_order.available_time,
                        confirmed_date = selected,
                        confirmed_at = now
                    )

                    order.save()

                    custom_request.photographer = request_order.photographer
                    custom_request.is_closed = True
                    custom_request.order = order
                    custom_request.save()

                    notification = notification_models.Notification.objects.create(
                        user = user,
                        notification_type = 'request_confirm',
                        order = order
                    )
                    notification.save()

                    chat = chat_models.Chat.objects.create(
                        order = order
                    )
                    chat.save()
                    chat.users.add(user, photographer.user)
                    message = chat_models.ChatMessage.objects.create(
                        chat = chat,
                        from_user = photographer.user,
                        to_user = user,
                        message_type = 'order_confirm'
                    )
                    message.save()
                    serializer = serializers.OrderSerializer(order, context = {'request': request})

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'order': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})

def download(request, image_id):
    image = models.OrderImage.objects.get(id = image_id)
    img = Image.open(image.processed_image)
    filename = image.order.user.name + '-' + str(image.id) + '.' + img.format.lower()
    response = HttpResponse(image.processed_image, content_type='image/'+img.format.lower())
    response['Content-Disposition'] = 'attachment; filename=%s' % filename
    return response

def create_zip(request, order_id):
    order = models.Order.objects.get(id = order_id)
    images = order.orderimage_set.all()
    f = io.BytesIO()
    zf = zipfile.ZipFile(f, 'w')
    for image in images:
        url = urlopen(request.build_absolute_uri(image.image.url))
        zf.writestr(image.image.name, url.read())
    zf.close()
    response = HttpResponse(f.getvalue(), content_type="application/zip")
    response['Content-Disposition'] = 'attachment; filename={}.zip'.format(order.user.name)

    mail = EmailMessage('[PRIZM] Your photos have arrived!', render_to_string('studio/photos.html', context={'user': order.user.name, 'photographer': order.photographer.nickname, 'location': order.location.name}), 'PRIZM<contact@prizm.cloud>', [order.user.email])
    mail.content_subtype = "html"
    mail.attach('{}.zip'.format(order.user.name), f.getvalue(), "application/zip")
    mail.send()
    return response