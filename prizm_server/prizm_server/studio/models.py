from django.db import models
from django.utils.translation import ugettext_lazy as _

class Photographer(models.Model):
    user = models.OneToOneField('users.User', on_delete = models.CASCADE)
    nickname = models.CharField(_('Nickname'), max_length = 255)
    profile_image = models.ImageField(_('Profile Image'), upload_to = 'studio/photographer/profile/', blank = True, null = True)
    main_location = models.CharField(_('Location'), max_length = 255)
    education = models.CharField(_('Education'), max_length = 255)
    career = models.CharField(_('Career'), max_length = 255)
    studio_id = models.CharField(_('Studio ID'), max_length = 255)

    def __str__(self):
        return self.nickname

    class Meta:
        ordering = ['nickname']
        verbose_name = _('Photographer')
        verbose_name_plural = _('Photographer')


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