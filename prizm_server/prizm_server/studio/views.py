from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import serializers, models
from prizm_server.common.pagination import MainPageNumberPagination
from prizm_server.common.permissions import AdminAuthenticated
from prizm_server.notification import models as notification_models
from django.utils.translation import ugettext_lazy as _

import datetime, pytz
from dateutil.relativedelta import relativedelta

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