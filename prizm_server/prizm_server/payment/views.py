from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _
from iamport import Iamport
from django.conf import settings
from uuid import uuid4

from . import serializers, models
from prizm_server.common.permissions import AdminAuthenticated
from prizm_server.studio import models as studio_models
from prizm_server.common import models as common_models

import math, json, requests

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
        bank_code = request.data.get('bankCode', None)
        bank_name = request.data.get('bankName', None)

        if legal_name and birth and account_type and content and bank_code and bank_name:
            IAMPORT_API_KEY = settings.IAMPORT_API_KEY
            IAMPORT_API_SECRET = settings.IAMPORT_API_SECRET
            data = {'imp_key': IAMPORT_API_KEY, 'imp_secret': IAMPORT_API_SECRET}

            imp = requests.post('https://api.iamport.kr/users/getToken', data = data)
            
            access_token = json.loads(imp.text)['response']['access_token']
            headers = {'Authorization': access_token}

            pre_imp = requests.get('https://api.iamport.kr/vbanks/holder?bank_code={}&bank_num={}&_token={}'.format(bank_code, content, access_token))
            if json.loads(pre_imp.text)['code'] == -1:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please check your account information again.')})
            elif json.loads(pre_imp.text)['code'] == 0:
                if json.loads(pre_imp.text)['response']['bank_holder'] != legal_name:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please check your account information again.')})
                else:
                    try:
                        photographer.photographeraccount
                        account = photographer.photographeraccount
                        account.legal_name = legal_name
                        account.birth = birth
                        account.account_type = account_type
                        account.content = content
                        account.bank_code = bank_code
                        account.bank_name = bank_name
                        account.save()

                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    except:
                        account = models.PhotographerAccount.objects.create(
                            photographer = photographer,
                            legal_name = legal_name,
                            birth = birth,
                            account_type = account_type,
                            content = content,
                            bank_code = bank_code,
                            bank_name = bank_name
                        )
                        account.save()

                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('An error has occurred..')})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please fill in the payout information to complete the account setup.')})


class PhotographerAccountCheck(APIView):
    permission_classes = [AdminAuthenticated]
    def post(self, request, format = None):
        user = request.user
        photographer = user.photographer
        legal_name = request.data.get('legalName', None)
        birth = request.data.get('birth', None)
        account_type = request.data.get('accountType', None)
        content = request.data.get('content', None)
        bank_code = request.data.get('bankCode', None)
        bank_name = request.data.get('bankName', None)

        if legal_name and birth and account_type and content and bank_code and bank_name:
            IAMPORT_API_KEY = settings.IAMPORT_API_KEY
            IAMPORT_API_SECRET = settings.IAMPORT_API_SECRET
            data = {'imp_key': IAMPORT_API_KEY, 'imp_secret': IAMPORT_API_SECRET}

            imp = requests.post('https://api.iamport.kr/users/getToken', data = data)
            
            access_token = json.loads(imp.text)['response']['access_token']
            headers = {'Authorization': access_token}

            pre_imp = requests.get('https://api.iamport.kr/vbanks/holder?bank_code={}&bank_num={}&_token={}'.format(bank_code, content, access_token))
            if json.loads(pre_imp.text)['code'] == -1:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please check your account information again.')})
            elif json.loads(pre_imp.text)['code'] == 0:
                if json.loads(pre_imp.text)['response']['bank_holder'] != legal_name:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Please check your account information again.')})
                else:
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            else:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('An error has occurred..')})
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
                        order.status = 'waiting_payment'
                        order.save()
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                    else:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('This payment option is only available for Korean customers.')})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid user - Pleae login again.')})
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
                option = json.loads(order.option)
                if user.country_number == '82' or user.country_code == 'KR':
                    try:
                        exchange_rate = common_models.ExchangeRate.objects.get(country = 'KR')
                        confirm_price = (option['price'] + math.ceil(option['price']*0.1))*exchange_rate.rate
                        if price == confirm_price:
                            payment = models.Payment.objects.create(
                                user = user,
                                order = order,
                                price = price,
                                merchant_uid = uuid4(),
                                alert_status = 'required'
                            )
                            payment.save()
                            serializer = serializers.MerchantUIDSerializer(payment)
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'merchant_uid': serializer.data})
                        else:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid price!')})
                    except:
                        confirm_price = (option['price'] + math.ceil(option['price']*0.1))*1250
                        if price == confirm_price:
                            payment = models.Payment.objects.create(
                                user = user,
                                order = order,
                                price = price,
                                merchant_uid = uuid4(),
                                alert_status = 'required'
                            )
                            payment.save()
                            serializer = serializers.MerchantUIDSerializer(payment)
                            return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'merchant_uid': serializer.data})
                        else:
                            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': _('Invalid price!')})
                else:
                    confirm_price = (option['price'] + math.ceil(option['price']*0.1))
                    if price == confirm_price:
                        payment = models.Payment.objects.create(
                            user = user,
                            order = order,
                            price = price,
                            merchant_uid = uuid4(),
                            alert_status = 'required'
                        )
                        payment.save()
                        serializer = serializers.MerchantUIDSerializer(payment)
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'merchant_uid': serializer.data})
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

        merchant_uid = meta['merchant_uid']
        success = meta['success']
        pay_status = meta['status']
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


class PaymentSucccessCallback(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        merchant_uid = request.data.get('merchantUid', None)
        imp_uid = request.data.get('impUid', None)
        imp_success = request.data.get('impSuccess', None)
        if merchant_uid and imp_uid:
            iamport = Iamport(settings.IAMPORT_API_KEY, settings.IAMPORT_API_SECRET)
            meta = iamport.find(merchant_uid=merchant_uid)
            payment = models.Payment.objects.get(merchant_uid = merchant_uid)
            payment.meta = meta
            payment.imp_uid = imp_uid

            pay_status = meta['status']
            if imp_success == 'true':
                payment.status = 'paid'
                payment.alert_status = 'confirmed'
                payment.save()
                order = payment.order
                order.status = 'paid'
                order.save()
            else:
                payment.status = pay_status
                payment.alert_status = 'required'
                payment.save()

            return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': 'Payment failed! Please contact to contact@prizm.cloud'})