# Generated by Django 2.2.6 on 2019-12-02 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0021_review_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('paid', 'Paid'), ('cancelled', 'Cancelled'), ('completed', 'Completed')], default='pending', max_length=100, verbose_name='Order Status'),
        ),
    ]
