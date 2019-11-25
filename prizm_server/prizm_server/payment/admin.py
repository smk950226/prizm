from django.contrib import admin
from . import models

@admin.register(models.PhotographerAccount)
class PhotographerAccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'photographer', 'account_type']
    list_display_links = ['id', 'photographer']
    list_filter = ['account_type']