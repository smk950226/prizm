from django.db import models
from django.utils.translation import ugettext_lazy as _
from jsonfield import JSONField
from django.conf import settings

from prizm_server.common.utils import named_property, timestamp_to_datetime

class PhotographerAccount(models.Model):
    photographer = models.OneToOneField('studio.Photographer', on_delete = models.CASCADE)
    legal_name = models.CharField(_("Legal Name of User"), max_length = 255)
    birth = models.CharField(_("Birth"), max_length = 20)
    account_type = models.CharField(_("Account Type"), max_length = 100, choices = (('bank_account', 'Bank Account'),('paypal_account', 'Paypal Account')))
    content = models.CharField(_("Content"), max_length = 255)
    bank_name = models.CharField(_("Bank Name"), max_length = 255, blank = True, null = True)
    bank_code = models.CharField(_("Bank Code"), max_length = 255, blank = True, null = True)

    def __str__(self):
        return self.photographer.nickname + '-' + self.account_type

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Account')
        verbose_name_plural = _('Photographer Account')


class Deposit(models.Model):
    order = models.OneToOneField('studio.Order', on_delete = models.CASCADE)
    price = models.FloatField(_('How much in dollars'))
    name = models.CharField(_('Deposant'), max_length = 255)
    created_at = models.DateTimeField(_('Deposit Created At'), auto_now_add = True)
    paid_at = models.DateTimeField(_('Deposit Completed At'), blank = True, null = True)
    is_paid = models.BooleanField(_('Is Paid'), default = False)

    def __str__(self):
        return self.order.photographer.nickname + '-' + str(self.price)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Deposit')
        verbose_name_plural = _('Deposit')


class Payment(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE)
    order = models.ForeignKey('studio.Order', on_delete = models.CASCADE)
    price = models.FloatField(_('Price'))
    pay_type = models.CharField(_('Payment Method'), max_length = 20, choices = (('paypal','Paypal'),), default = 'paypal')
    merchant_uid = models.UUIDField('거래 ID')
    imp_uid = models.CharField('아임포트 거래 ID', max_length = 100, blank = True)
    status = models.CharField('결제 상태', max_length = 9, choices = (
        ('ready', '미결제'),
        ('paid', '결제완료'),
        ('cancelled', '결제취소'),
        ('failed', '결제실패'),
    ), default = 'ready', db_index = True)
    meta = JSONField(blank = True, default = {})
    regist_dt = models.DateTimeField('거래 생성일', auto_now_add=True)
    alert_status = models.CharField('확인 필요 여부', max_length = 10, choices = (
        ('required', '확인 필요'),
        ('confirmed', '확인 불필요')
    ))

    user_name = property(lambda self: self.meta.get('buyer_name'))

    is_ready = property(lambda self: self.status == 'ready')
    is_paid = property(lambda self: self.status == 'paid')
    is_paid_ok = property(lambda self: self.status == 'paid' and self.price == self.meta.get('amount'))
    is_cancelled = property(lambda self: self.status == 'cancelled')
    is_failed = property(lambda self: self.status == 'failed')

    receipt_url = named_property('영수증')(lambda self: self.meta.get('receipt_url'))
    cancel_reason = named_property('취소이유')(lambda self: self.meta.get('cancel_reason'))
    fail_reason = named_property('실패이유')(lambda self: self.meta.get('fail_reason', ''))

    paid_at = named_property('결제일시')(lambda self: timestamp_to_datetime(self.meta.get('paid_at')))
    failed_at = named_property('실패일시')(lambda self: timestamp_to_datetime(self.meta.get('failed_at')))
    cancelled_at = named_property('취소일시')(lambda self: timestamp_to_datetime(self.meta.get('cancelled_at')))

    @named_property('영수증 링크')
    def receipt_link(self):
        if self.is_paid_ok and self.receipt_url:
            return mark_safe('<a href="{0}" target="_blank">영수증</a>'.format(self.receipt_url))

    @property
    def api(self):
        return Iamport(settings.IAMPORT_API_KEY, settings.IAMPORT_API_SECRET)
    
    def update(self, commit = True, meta = None):
        if self.imp_uid:
            try:
                self.meta = meta or self.api.find(imp_uid=self.imp_uid)
            except Iamport.HttpError:
                raise Http404('Not found {}'.format(self.imp_uid))
            assert str(self.merchant_uid) == self.meta['merchant_uid']
            self.status = self.meta['status']
            if(self.purchase_type == 'subscription'):
                subscription = self.subscription_uid
                subscription.last_pay_status = self.meta['status']
                subscription.save()
            if self.status == 'paid':
                assert self.price == self.meta['amount']
        if commit:
            self.save()
    
    def cancel(self, reason=None, commit=True):
        try:
            meta = self.api.cancel(reason, imp_uid=self.imp_uid)
            assert str(self.merchant_uid) == self.meta['merchant_uid']
            self.update(commit=commit, meta=meta)
        except Iamport.ResponseError as e:
            self.update(commit=commit)
        if commit:
            self.save()
    
    class Meta:
        verbose_name = _('Payment')
        verbose_name_plural = _('Payment')
        ordering = ('-id',)
    
    def __str__(self):
        return str(self.merchant_uid)