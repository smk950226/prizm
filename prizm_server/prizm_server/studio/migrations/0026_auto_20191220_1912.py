# Generated by Django 2.2.6 on 2019-12-20 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0025_customrequest_requestlocation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestlocation',
            old_name='custorm_request',
            new_name='custom_request',
        ),
    ]
