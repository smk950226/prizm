from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from prizm_server.users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ["username", "name", "is_superuser", 'user_type', 'country_code']
    search_fields = ["name", 'email']
    fieldsets = [
        ('개인정보', {'fields': [
            'username',
            'name',
            'email',
            'country_code',
            'country_number',
            'mobile',
            'user_type',
            'instagram_account',

        ]}),
        ('권한', {'fields': (
            'is_active',
            'is_staff',
            'is_superuser',
            'password'
        )})
    ]