from django.contrib import admin
from django.utils import timezone
from . import models
from django.utils.safestring import mark_safe

@admin.register(models.PhotographerAccount)
class PhotographerAccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'account_type', 'bank_name']
    list_display_links = ['id', 'photographer']
    list_filter = ['account_type']


@admin.register(models.Deposit)
class DepositAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'price', 'name', 'created_at', 'paid_at', 'is_paid']
    list_display_links = ['id', 'order']
    actions = ['do_paid']

    def do_paid(self, request, queryset):
        total = queryset.count()
        if total > 0:
            for deposit in queryset:
                deposit.is_paid = True
                deposit.paid_at = timezone.now()
                deposit.save()
                order = deposit.order
                order.status = 'paid'
                order.save()
            self.message_user(request, '{}건의 결제를 입금확인 처리했습니다.'.format(total))
        else:
            self.message_user(request, '갱신할 결제정보가 없습니다.')
    do_paid.short_description = '선택된 결제들을 입금확인처리하기'


@admin.register(models.Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'order', 'price', 'pay_type', 'status_html', 'alert_status_html', 'paid_at', 'receipt_link']
    list_display_links = ['id', 'user']
    search_fields = ['user__email']
    list_filter = ['status', 'pay_type', 'alert_status']
    actions = ['do_update', 'do_cancel']

    def do_update(self, request, queryset):
        total = queryset.count()
        if total > 0:
            for order in queryset:
                order.update()
            self.message_user(request, '{}건의 결제 정보를 갱신했습니다.'.format(total))
        else:
            self.message_user(request, '갱신할 결제정보가 없습니다.')
    do_update.short_description = '선택된 결제들의 정보 갱신하기'

    def do_cancel(self, request, queryset):
        queryset = queryset.filter(status='paid')
        total = queryset.count()
        if total > 0:
            for order in queryset:
                order.cancel(reason = '관리자 취소')
            self.message_user(request, '{}건의 구매을 취소했습니다.'.format(total))
        else:
            self.message_user(request, '취소할 구매이 없습니다.')
    do_cancel.short_description = '선택된 구매에 대해 결제취소요청하기'

    def status_html(self, instance):
        if instance.status == 'ready':
            html = mark_safe('<span style="color: green;">{}</span>'.format('미결제'))
        elif instance.status == 'paid':
            html = mark_safe('<span style="color: red;">{}</span>'.format('결제완료'))
        elif instance.status == 'cancelled':
            html = mark_safe('<span style="color: blue;">{}</span>'.format('결제취소'))
        else:
            html = mark_safe('<span>{}</span>'.format('결제실패'))

        return html
    
    def alert_status_html(self, instance):
        if instance.alert_status == 'required':
            html = mark_safe('<span style="color: red;">{}</span>'.format('확인 필요'))
        elif instance.alert_status == 'confirmed':
            html = mark_safe('<span style="color: blue;">{}</span>'.format('확인 불필요'))
        else:
            html = mark_safe('<span style="color: green;">{}</span>'.format('미지정'))
        
        return html