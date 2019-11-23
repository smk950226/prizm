from django.db import models
from django.utils.translation import ugettext_lazy as _

class Chat(models.Model):
    users = models.ManyToManyField('users.User')
    order = models.ForeignKey('studio.Order', on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return 'Chat for ' + self.order.photographer.nickname + ' and ' + self.order.user.name

    class Meta:
        ordering = ['-id']
        verbose_name = _('Chat')
        verbose_name_plural = _('Chat')


class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete = models.CASCADE, related_name = 'messages')
    from_user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'message_from')
    to_user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'message_to')
    text = models.TextField(_('Text'), blank = True, null = True)
    message_type = models.CharField(_("Message Type"), max_length = 200, choices = (
        ('order_confirm', 'Order Confirm'),
        ('order_confirm_response', 'Order Confirm Response'),
        ('order_redating', ('Order Re Dating')),
        ('order_redating_response', ('Order Re Dating Response')),
        ('normal', 'Normal')
    ))
    created_at = models.DateTimeField(auto_now_add = True)
    responded = models.BooleanField(_("Re Dating Responded"), default = False)

    def __str__(self):
        return 'message: ' + self.from_user.name + ' -> ' + self.to_user.name

    class Meta:
        ordering = ['-id']
        verbose_name = _('Chat Message')
        verbose_name_plural = _('Chat Message')