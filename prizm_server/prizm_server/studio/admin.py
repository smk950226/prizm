from django.contrib import admin
from . import models

@admin.register(models.Photographer)
class PhotographerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'nickname', 'main_location', 'studio_id']
    list_display_links = ['id', 'user', 'nickname']
    search_fields = ['studio_id']


@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer']
    list_display_links = ['id', 'photographer']


@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'name']
    list_display_links = ['id', 'photographer']


@admin.register(models.Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'title']
    list_display_links = ['id', 'photographer']


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'user']
    list_display_links = ['id', 'photographer']


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'photographer', 'specific_date', 'start_date', 'end_date']
    list_display_links = ['id', 'user', 'photographer']