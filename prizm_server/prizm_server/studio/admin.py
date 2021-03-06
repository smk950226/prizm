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
    list_display = ['id', 'user', 'photographer', 'status', 'date_option', 'specific_date', 'start_date', 'end_date']
    list_display_links = ['id', 'user', 'photographer']
    list_filter = ['status']


@admin.register(models.OrderImage)
class OrderImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'order']
    list_display_links = ['id', 'order']


@admin.register(models.CustomRequest)
class CustomRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'photograpy_type', 'person', 'hour', 'date_option', 'specific_date', 'start_date', 'end_date', 'created_at', 'is_closed']
    list_display_links = ['id', 'user']


@admin.register(models.RequestLocation)
class RequestLocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'custom_request']


@admin.register(models.RequestOrder)
class RequestOrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'custom_request', 'photographer']