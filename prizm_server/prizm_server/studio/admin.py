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


@admin.register(models.PhotographerAccount)
class PhotographerAccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'account_type']
    list_display_links = ['id', 'photographer']
    list_filter = ['account_type']


@admin.register(models.Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'created_at']
    list_display_links = ['id', 'order']


@admin.register(models.ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'chat', 'from_user', 'to_user', 'message_type', 'created_at']
    list_display_links = ['id', 'chat']