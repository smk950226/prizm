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

from . import serializers, models
from prizm_server.common.pagination import MainPageNumberPagination, MesssageNumberPagination
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
        photographers = models.Photographer.objects.all()
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
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('사진 작가가 존재하지 않습니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


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
        serializer = serializers.OrderSerializer(orders, many = True)

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

                order = models.Order.objects.create(
                    user = user,
                    photographer = photographer,
                    location = location,
                    option = option,
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

                order = models.Order.objects.create(
                    user = user,
                    photographer = photographer,
                    location = location,
                    option = option,
                    comment = comment,
                    date_option = 'Range',
                    start_date = start,
                    end_date = end
                )
                order.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('요청 정보를 입력해주세요.')})
    
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
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('확정된 예약입니다.')})
                    else:
                        order.status = 'cancelled'
                        order.save()
                        message.responded = True
                        message.save()
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

                except:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})
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
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('가능한 시간을 선택해주세요.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


class OrderDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        order_id = request.query_params.get('orderId', None)
        if order_id:
            user = request.user
            order = models.Order.objects.get(id = order_id)
            serializer = serializers.OrderSerializer(order)

            return Response(status = status.HTTP_200_OK, data = serializer.data)
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


class AdminOrder(APIView):
    permission_classes = [AdminAuthenticated]
    def get(self, request, format = None):
        user = request.user
        photographer = user.photographer

        orders = models.Order.objects.filter(photographer = photographer).order_by('-id')
        serializer = serializers.OrderSerializer(orders, many = True)

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

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            elif option == 2:
                available_time = request.data.get('availableTime', None)
                if available_time:
                    if order.available_time:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이미 시간을 지정하였습니다.')})
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

                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})
            else:
                if order.status == 'confirmed':
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('확정된 예약입니다.')})
                else:
                    order.status = 'cancelled'
                    order.save()
                    notification = notification_models.Notification.objects.create(
                        user = order.user,
                        notification_type = 'request_cancel',
                        order = order
                    )
                    notification.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


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
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('예약이 존재하지 않습니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


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
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('예약이 존재하지 않습니다.')})


class Studio(APIView):
    permission_classes = [AdminAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format = None):
        user = request.user
        portfolio_images = request.data.getlist('portfolios[]', None)
        nickname = request.data.get('nickname', None)
        main_location = request.data.get('mainLocation', None)
        education = request.data.get('education', None)
        career = request.data.get('career', None)
        portfolio_url = request.data.get('portfolioUrl', None)
        description = request.data.get('description', None)
        profile_image = request.data.get('profileImage', None)
        locations = request.data.getlist('locations[]')
        options = request.data.getlist('options[]')
        studio_id = request.data.get('studioId')
        update = request.data.get('update')

        if (len(portfolio_images) > 0) and nickname and main_location and education and career and description and profile_image and (len(locations) > 0) and (len(options) > 0) and studio_id:
            if (studio_id == 'admin') or (studio_id == 'djangoadmin') or (studio_id.find('/') > -1) or (studio_id == '') or (studio_id == 'welcome') or (studio_id == 'message') or (studio_id == 'signup') or (studio_id == 'signin') or (studio_id == 'profile') or (studio_id == 'reservation') or (studio_id == 'menu'):
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('사용할 수 없는 Studio URL 입니다.')})
            elif models.Photographer.objects.filter(studio_id = studio_id).exclude(user__id = user.id).count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Studio URL이 중복됩니다.')})
            elif models.Photographer.objects.filter(nickname = nickname).exclude(user__id = user.id).count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('이름이 중복됩니다.')})
            else:
                new_portfolio_images = []
                pre_portfolio_id = []
                for port in portfolio_images:
                    if type(port) == type('text'):
                        pre_portfolio_id.append(int(json.loads(port)['id']))
                    else:
                        new_portfolio_images.append(port)
                if len(pre_portfolio_id) > 0:
                    pre_portfolio = models.Portfolio.objects.filter(photographer = user.photographer).exclude(id__in = pre_portfolio_id)
                    pre_portfolio.delete()
                
                if update == 'true':
                    photographer = user.photographer
                    photographer.nickname = nickname
                    if type(profile_image) == type('text'):
                        pass
                    else:
                        photographer.profile_image = profile_image
                    photographer.main_location = main_location
                    photographer.education = education
                    photographer.career = career
                    photographer.studio_id = studio_id
                    photographer.portfolio_url = portfolio_url
                    photographer.description = description

                    photographer.save()

                    for image in new_portfolio_images:
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
                        education = education,
                        career = career,
                        studio_id = studio_id,
                        portfolio_url = portfolio_url,
                        description = description
                    )

                    photographer.save()

                    for image in new_portfolio_images:
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
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('스튜디오 정보를 입력해주세요.')})


class PhotographerAccount(APIView):
    permission_classes = [AdminAuthenticated]
    def post(self, request, format = None):
        user = request.user
        photographer = user.photographer
        legal_name = request.data.get('legalName', None)
        birth = request.data.get('birth', None)
        account_type = request.data.get('accountType', None)
        number = request.data.get('number', None)

        if legal_name and birth and account_type and number:
            try:
                photographer.photographeraccount
                account = photographer.photographeraccount
                account.legal_name = legal_name
                account.birth = birth
                account.account_type = account_type
                account.number = number
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                account = models.PhotographerAccount.objects.create(
                    photographer = photographer,
                    legal_name = legal_name,
                    birth = birth,
                    account_type = account_type,
                    number = number
                )
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Account 정보를 입력해주세요.')})


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
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('잘못된 요청입니다.')})


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
    return response