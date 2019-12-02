from django.db import models
from django.utils.translation import ugettext_lazy as _
from prizm_server.common.utils import COUNTRY_CODE
from ckeditor.fields import RichTextField

class ExchangeRate(models.Model):
    country = models.CharField(_('Country'), choices = COUNTRY_CODE, max_length = 20)
    rate = models.FloatField(_('Exchange Rate'))

    def __str__(self):
        return self.country + '-' + str(self.rate)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Exchange Rate')
        verbose_name_plural = _('Exchange Rate')


class Terms(models.Model):
    name = models.CharField(_('Term Name'), max_length = 255)
    content = RichTextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
        verbose_name = _('Terms')
        verbose_name_plural = _('Terms')