# Generated by Django 2.2.6 on 2019-11-20 07:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0013_chatmessage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatmessage',
            name='chat',
        ),
        migrations.RemoveField(
            model_name='chatmessage',
            name='from_user',
        ),
        migrations.RemoveField(
            model_name='chatmessage',
            name='to_user',
        ),
        migrations.DeleteModel(
            name='Chat',
        ),
        migrations.DeleteModel(
            name='ChatMessage',
        ),
    ]
