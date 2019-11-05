from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db import models

from prizm_server.common.utils import COUNTRY_CODE, COUNTRY_NUMBER


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = CharField(_("Name of User"), blank=True, max_length=255)
    country_code = models.CharField(_("Country Code"), choices = COUNTRY_CODE, max_length=10)
    country_number = models.CharField(_("Country NUMBER"), choices = COUNTRY_NUMBER, max_length=10)
    mobile = models.CharField(_("Mobile"), max_length = 100)
    birth = models.CharField(_("Birth"), max_length = 100)
    user_type = models.CharField(_("Type"), choices = (('normal', _("Normal")), ('photographer', _("Photographer"))), max_length = 20, default = 'normal')
    instagram_account = models.CharField(_("Instagram Account"), max_length = 255, blank = True, null = True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
    

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('User')