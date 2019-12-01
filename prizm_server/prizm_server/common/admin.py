from django.contrib import admin
from . import models

@admin.register(models.ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ['id', 'country', 'rate']
    list_display_links = ['id', 'country']
    search_fields = ['country']