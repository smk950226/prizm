# Generated by Django 2.2.6 on 2019-11-11 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0005_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='is_ended',
            field=models.BooleanField(default=False, verbose_name='Schedule Ended'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('rejected', 'Rejected')], default='pending', max_length=100, verbose_name='Order Status'),
        ),
    ]
