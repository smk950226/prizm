from django.contrib import admin
from . import models

@admin.register(models.Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'created_at']
    list_display_links = ['id', 'order']


@admin.register(models.ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'chat', 'from_user', 'to_user', 'message_type', 'created_at', 'is_viewed']
    list_display_links = ['id', 'chat']