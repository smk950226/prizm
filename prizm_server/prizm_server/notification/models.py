from django.db import models
from django.utils.translation import ugettext_lazy as _

class Notification(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    notification_type = models.CharField(_("Notification Type"), choices=(('request_confirm', 'Request Confirm'),('request_cancel', 'Request Cancel')), max_length = 100)
    order = models.ForeignKey('studio.Order', on_delete = models.CASCADE, blank = True, null = True)
    is_checked = models.BooleanField(_('Checked'), default = False)

    def __str__(self):
        return self.user.name + '-' + self.notification_type

    class Meta:
        ordering = ['-id']
        verbose_name = _('Notification')
        verbose_name_plural = _('Notification')