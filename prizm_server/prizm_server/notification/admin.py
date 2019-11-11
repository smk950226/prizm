from django.contrib import admin
from . import models

@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'notification_type', 'created_at', 'is_checked']
    list_display_links = ['id', 'user', 'notification_type']
    list_filter = ['notification_type']