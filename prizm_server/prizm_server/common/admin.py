from django.contrib import admin
from . import models

@admin.register(models.ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ['id', 'country', 'rate']
    list_display_links = ['id', 'country']
    search_fields = ['country']


@admin.register(models.Terms)
class TermsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']


@admin.register(models.Proposal)
class ProposalAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']