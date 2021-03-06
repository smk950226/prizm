from django.db import models
from django.utils.translation import ugettext_lazy as _
from prizm_server.common.utils import get_image_filename, get_processed_image_filename
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import Thumbnail
from jsonfield import JSONField


class Photographer(models.Model):
    user = models.OneToOneField('users.User', on_delete = models.CASCADE)
    nickname = models.CharField(_('Nickname'), max_length = 255)
    profile_image = models.ImageField(_('Profile Image'), upload_to = 'studio/photographer/profile/', blank = True, null = True)
    main_location = models.CharField(_('Location'), max_length = 255)
    equipment = models.CharField(_('Equipment'), max_length = 255, blank = True, null = True)
    career = models.CharField(_('Career'), max_length = 255, blank = True, null = True)
    studio_id = models.CharField(_('Studio ID'), max_length = 255)
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
    order = models.ForeignKey('studio.Order', on_delete = models.CASCADE, blank = True, null = True)
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
    location = JSONField(_('Location'))
    option = JSONField(_('Option'))
    comment = models.TextField(_('Comment'), blank = True, null = True)
    date_option = models.CharField(_("Date Option"), choices = (('Specific', 'Specific Date'), ('Range', 'Not Specific Date')), max_length = 100)
    specific_date = models.DateTimeField(_("Specific Date"), blank = True, null = True)
    start_date = models.DateField(_("Range Start Date"), blank = True, null = True)
    end_date = models.DateField(_("Range End Date"), blank = True, null = True)
    status = models.CharField(_("Order Status"), max_length = 100, choices = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('waiting_payment', 'Wait Payment'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed')
    ), default = 'pending')
    is_ended = models.BooleanField(_("Schedule Ended"), default = False)
    available_time = models.TextField(_("Available Time"), blank = True, null = True)
    confirmed_date = models.DateTimeField(_("Confirmed Date"), blank = True, null = True)
    confirmed_at = models.DateTimeField(_("Confirmed At"), blank = True, null = True)

    def __str__(self):
        return self.user.email + ' -> ' + self.photographer.nickname

    class Meta:
        ordering = ['-id']
        verbose_name = _('Customer Order')
        verbose_name_plural = _('Customer Order')


class OrderImage(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    image = models.ImageField(_('Order Image'), upload_to = get_image_filename)
    processed_image = ProcessedImageField(upload_to = get_processed_image_filename, options = {'quality': 70}, blank = True, null = True)

    def __str__(self):
        return self.order.photographer.nickname + ' -> ' + self.order.user.email

    class Meta:
        ordering = ['-id']
        verbose_name = _('Order Image')
        verbose_name_plural = _('Order Image')


class CustomRequest(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE)
    photograpy_type = models.CharField(_('Photography Type'), max_length = 500)
    person = models.PositiveIntegerField(_('How many people'))
    hour = models.FloatField(_('How many hours'))
    date_option = models.CharField(_("Date Option"), choices = (('Specific', 'Specific Date'), ('Range', 'Not Specific Date')), max_length = 100)
    specific_date = models.DateTimeField(_("Specific Date"), blank = True, null = True)
    start_date = models.DateField(_("Range Start Date"), blank = True, null = True)
    end_date = models.DateField(_("Range End Date"), blank = True, null = True)
    location_option = models.CharField(_("Location Option"), choices = (('Specific', 'Specific Location'), ('Range', 'Not Specific Location')), max_length = 100)
    created_at = models.DateTimeField(auto_now_add = True)
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE, blank = True, null = True)
    is_closed = models.BooleanField(_("Is Closed"), default = False)
    order = models.OneToOneField(Order, on_delete = models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.user.email + ' - custom request - ' + str(self.id)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Custom Request')
        verbose_name_plural = _('Custom Request')


class RequestOrder(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete = models.CASCADE)
    custom_request = models.ForeignKey(CustomRequest, on_delete = models.CASCADE) 
    available_time = models.TextField(_("Available Time"), blank = True, null = True)
    price = models.FloatField(_("How much in dollars"))
    location = models.CharField(_("Selected Location"), max_length = 500, blank = True, null = True)

    def __str__(self):
        return self.custom_request.user.email + ' - custom request order - ' + self.photographer.nickname

    class Meta:
        ordering = ['-id']
        verbose_name = _('Custom Request Order')
        verbose_name_plural = _('Custom Request Order')


class RequestLocation(models.Model):
    custom_request = models.ForeignKey(CustomRequest, on_delete = models.CASCADE, related_name="locations", blank = True, null = True)
    request_order = models.ForeignKey(RequestOrder, on_delete = models.CASCADE, related_name="locations", blank = True, null = True)
    name = models.CharField(_('Name'), max_length = 300)
    lng = models.FloatField(_('Longitude'))
    lat = models.FloatField(_('Latitude'))

    def __str__(self):
        return self.name + '-location-' + str(self.lng) + ', ' + str(self.lat)

    class Meta:
        ordering = ['-id']
        verbose_name = _('Request Location')
        verbose_name_plural = _('Request Location')