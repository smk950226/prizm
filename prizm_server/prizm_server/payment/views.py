from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _

from . import serializers, models
from prizm_server.common.permissions import AdminAuthenticated
from prizm_server.studio import models as studio_models
from prizm_server.common import models as common_models

import math

User = get_user_model()

class PhotographerAccount(APIView):
    permission_classes = [AdminAuthenticated]
    def post(self, request, format = None):
        user = request.user
        photographer = user.photographer
        legal_name = request.data.get('legalName', None)
        birth = request.data.get('birth', None)
        account_type = request.data.get('accountType', None)
        content = request.data.get('content', None)

        if legal_name and birth and account_type and content:
            try:
                photographer.photographeraccount
                account = photographer.photographeraccount
                account.legal_name = legal_name
                account.birth = birth
                account.account_type = account_type
                account.content = content
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                account = models.PhotographerAccount.objects.create(
                    photographer = photographer,
                    legal_name = legal_name,
                    birth = birth,
                    account_type = account_type,
                    content = content
                )
                account.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in the payout information to complete the account setup.')})


class Deposit(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        name = request.data.get('name', None)
        price = int(request.data.get('price', None))
        order_id = request.data.get('orderId', None)

        if name and price and order_id:
            try:
                order = studio_models.Order.objects.get(id = order_id)
                if user.id == order.user.id:
                    if user.country_number == '82' or user.country_code == 'KR':
                        deposit = models.Deposit.objects.create(
                            order = order,
                            price = price,
                            name = name
                        )
                        deposit.save()
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    else:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('한국 사용자만 입금 가능합니다.')})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('요청자와 로그인한 유저가 일치하지 않습니다.')})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
            
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in the payout information to complete the payment')})


class PaymentExpired(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        order_id = request.data.get('orderId', None)

        if order_id:
            try:
                order = studio_models.Order.objects.get(id = order_id)
                order.status = 'cancelled'
                order.save()
                notifications = order.notification_set.all()
                notifications.delete()
                chats = order.chat_set.all()
                chats.delete()
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
            
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class CheckPrice(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        order_id = request.data.get('orderId', None)
        price = int(request.data.get('price', None))

        if order_id and price:
            try:
                order = studio_models.Order.objects.get(id = order_id)
                if user.country_number == '82' or user.country_code == 'KR':
                    try:
                        exchange_rate = common_models.ExchangeRate.objects.get(country = 'KR')
                        confirm_price = (order.option.price + math.ceil(order.option.price*0.1))*exchange_rate.rate
                        if price == confirm_price:
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                        else:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid price!')})
                    except:
                        confirm_price = (order.option.price + math.ceil(order.option.price*0.1))*1250
                        if price == confirm_price:
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                        else:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid price!')})
                else:
                    confirm_price = (order.option.price + math.ceil(order.option.price*0.1))
                    if price == confirm_price:
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    else:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid price!')})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request!')})


class Payment(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        meta = request.data.get('meta', None)
        order_id = request.data.get('orderId', None)

        imp_uid = meta['imp_uid']
        pay_method = meta['pay_method']
        pay_type = meta['pg_provider']

        merchant_uid = meta['merchant_uid']
        success = meta['success']
        pay_status = meta['status']
        paid_at = meta['paid_at']
        price = int(meta['paid_amount'])
        confirm_price = 0
        if user.country_number == '82' or user.country_code == 'KR':
            try:
                exchange_rate = common_models.ExchangeRate.objects.get(country = 'KR')
                confirm_price = (order.option.price + math.ceil(order.option.price*0.1))*exchange_rate.rate
            except:
                confirm_price = (order.option.price + math.ceil(order.option.price*0.1))*1250
        else:
            confirm_price = order.option.price + math.ceil(order.option.price*0.1)
        if confirm_price == price:
            try:
                order = studio_models.Order.objects.get(id = order_id)
                if success:
                    payment = models.Payment.objects.create(
                        user = user,
                        order = order,
                        price = price,
                        merchant_uid = merchant_uid,
                        imp_uid = imp_uid,
                        status = 'paid',
                        meta = meta,
                        alert_status = 'confirmed'
                    )
                    payment.save()
                    order.status = 'paid'
                    order.save()
                else:
                    payment = models.Payment.objects.create(
                        user = user,
                        order = order,
                        price = price,
                        merchant_uid = merchant_uid,
                        imp_uid = imp_uid,
                        status = 'failed',
                        meta = meta,
                        alert_status = 'required'
                    )
                    payment.save()

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})

            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request! Please contact to contact@prizm.cloud')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid request! Please contact to contact@prizm.cloud')})