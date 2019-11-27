from django.db import models
from django.utils.translation import ugettext_lazy as _

class PhotographerAccount(models.Model):
    photographer = models.OneToOneField('studio.Photographer', on_delete = models.CASCADE)
    legal_name = models.CharField(_("Legal Name of User"), max_length = 255)
    birth = models.CharField(_("Birth"), max_length = 20)
    account_type = models.CharField(_("Account Type"), max_length = 100, choices = (('bank_account', 'Bank Account'),('paypal_account', 'Paypal Account')))
    content = models.CharField(_("Content"), max_length = 255)

    def __str__(self):
        return self.photographer.nickname + '-' + self.account_type

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Account')
        verbose_name_plural = _('Photographer Account')