from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.utils import timezone

from prizm_server.common.utils import COUNTRY_CODE, COUNTRY_NUMBER


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = CharField(_("Name of User"), blank=True, max_length=255)
    country_code = models.CharField(_("Country Code"), choices = COUNTRY_CODE, max_length=10, blank = True, null = True)
    country_number = models.CharField(_("Country NUMBER"), choices = COUNTRY_NUMBER, max_length=10, blank = True, null = True)
    mobile = models.CharField(_("Mobile"), max_length = 100)
    user_type = models.CharField(_("Type"), choices = (('normal', _("Normal")), ('photographer', _("Photographer"))), max_length = 20, default = 'normal')
    instagram_account = models.CharField(_("Instagram Account"), max_length = 255, blank = True, null = True)
    is_verified = models.BooleanField(_("Is Verified"), default = False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def __str__(self):
        return self.username
    

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('User')

    @property
    def custom_request_status(self):
        custom_request = self.customrequest_set.all()
        if custom_request.count() > 0:
            last_request = custom_request.order_by('-id').first()
            if last_request.is_closed:
                return {
                    'id': -1,
                    'status': 'none'
                }
            else:
                orders = last_request.requestorder_set.all()
                if orders.count() >= 3:
                    return {
                        'id': last_request.id,
                        'status': 'open',
                        'count': orders.count()
                    }
                else:
                    return {
                        'id': last_request.id,
                        'status': 'close'
                    }
        else:
            return {
                'id': -1,
                'status': 'none'
            }


class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    uuid = models.UUIDField(_("Verification ID"))
    created_at = models.DateTimeField(auto_now_add = True)
    is_verified = models.BooleanField(_("Is Verified"), default = False)
    is_expired = models.BooleanField(_("Is Expired"), default = False)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ['-id']
        verbose_name = _('Email Verification')
        verbose_name_plural = _('Email Verification')
