from django.db import models
from django.utils.translation import ugettext_lazy as _
from prizm_server.common.utils import get_image_filename

class Photographer(models.Model):
    user = models.OneToOneField('users.User', on_delete = models.CASCADE)
    nickname = models.CharField(_('Nickname'), max_length = 255)
    profile_image = models.ImageField(_('Profile Image'), upload_to = 'studio/photographer/profile/', blank = True, null = True)
    main_location = models.CharField(_('Location'), max_length = 255)
    education = models.CharField(_('Education'), max_length = 255)
    career = models.CharField(_('Career'), max_length = 255)
    studio_id = models.CharField(_('Studio ID'), max_length = 255)
    portfolio_url = models.CharField(_('Portfolio URL'), max_length = 500, blank = True, null = True)
    description = models.TextField(_('Description'))

    def __str__(self):
        return self.nickname

    class Meta:
        ordering = ['nickname']
        verbose_name = _('Photographer')
        verbose_name_plural = _('Photographer')


    @property
    def total_rating(self):
        reviews = self.review_set.all()
        total = 0
        if reviews.count() > 0:
            for review in reviews:
                total += review.rate
            total /= reviews.count()

        return total
    
    @property
    def review_count(self):
        return self.review_set.count()


class Portfolio(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    image = models.ImageField(_('Portfolio Image'), upload_to = 'studio/photographer/portfolio/')

    def __str__(self):
        return self.photographer.nickname + '-image-' + str(self.id)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Portfolio')
        verbose_name_plural = _('Photographer Portfolio')


class Location(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    name = models.CharField(_('Name'), max_length = 300)
    lng = models.FloatField(_('Longitude'))
    lat = models.FloatField(_('Latitude'))

    def __str__(self):
        return self.photographer.nickname + '-location-' + str(self.id)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Location')
        verbose_name_plural = _('Photographer Location')


class Option(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    title = models.CharField(_('Option Title'), max_length = 400)
    photograpy_type = models.CharField(_('Photography Type'), max_length = 500)
    description = models.TextField(_('Option Description'))
    person = models.PositiveIntegerField(_('How many people'))
    hour = models.FloatField(_('How many hours'))
    price = models.FloatField(_('How much in dollars'))
    
    def __str__(self):
        return self.photographer.nickname + '-option-' + str(self.id)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Option')
        verbose_name_plural = _('Photographer Option')


class Review(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    user  = models.ForeignKey('users.User', on_delete = models.CASCADE)
    rate = models.FloatField(_("Rating"))
    comment = models.TextField(_("Comment"))
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.photographer.nickname + '-comment-' + self.user.email

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Review')
        verbose_name_plural = _('Photographer Review')


class Order(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE)
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    location = models.ForeignKey(Location, on_delete = models.CASCADE)
    option = models.ForeignKey(Option, on_delete = models.CASCADE)
    comment = models.TextField(_('Comment'), blank = True, null = True)
    date_option = models.CharField(_("Date Option"), choices = (('Specific', 'Specific Date'), ('Range', 'Not Specific Date')), max_length = 100)
    specific_date = models.DateTimeField(_("Specific Date"), blank = True, null = True)
    start_date = models.DateField(_("Range Start Date"), blank = True, null = True)
    end_date = models.DateField(_("Range End Date"), blank = True, null = True)
    status = models.CharField(_("Order Status"), max_length = 100, choices = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('done', 'Done')
    ), default = 'pending')
    is_ended = models.BooleanField(_("Schedule Ended"), default = False)
    available_time = models.TextField(_("Available Time"), blank = True, null = True)
    confirmed_date = models.DateTimeField(_("Confirmed Date"), blank = True, null = True)

    def __str__(self):
        return self.user.email + ' -> ' + self.photographer.nickname

    class Meta:
        ordering = ['-id']
        verbose_name = _('Customer Order')
        verbose_name_plural = _('Customer Order')


class OrderImage(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    image = models.ImageField(_('Order Image'), upload_to = get_image_filename)

    def __str__(self):
        return self.order.photographer.nickname + ' -> ' + self.order.user.email

    class Meta:
        ordering = ['-id']
        verbose_name = _('Order Image')
        verbose_name_plural = _('Order Image')


class PhotographerAccount(models.Model):
    photographer = models.OneToOneField(Photographer, on_delete = models.CASCADE)
    legal_name = models.CharField(_("Legal Name of User"), max_length = 255)
    birth = models.CharField(_("Birth"), max_length = 20)
    account_type = models.CharField(_("Account Type"), max_length = 100, choices = (('bank_account', 'Bank Account'),))
    number = models.CharField(_("Number"), max_length = 255)

    def __str__(self):
        return self.photographer.nickname + '-' + self.account_type

    class Meta:
        ordering = ['-id']
        verbose_name = _('Photographer Account')
        verbose_name_plural = _('Photographer Account')


class Chat(models.Model):
    users = models.ManyToManyField('users.User')
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
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
    text = models.TextField(_('Text'))
    message_type = models.CharField(_("Message Type"), max_length = 200, choices = (
        ('order_confirm', 'Order Confirm'),
        ('order_confirm_response', 'Order Confirm Response'),
        ('order_redating', ('Order Re Dating')),
        ('order_redating_response', ('Order Re Dating Response')),
        ('normal', 'Normal')
    ))
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return 'message: ' + self.from_user.name + ' -> ' + self.to_user.name

    class Meta:
        ordering = ['-id']
        verbose_name = _('Chat Message')
        verbose_name_plural = _('Chat Message')