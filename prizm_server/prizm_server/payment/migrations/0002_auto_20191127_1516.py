# Generated by Django 2.2.6 on 2019-11-27 06:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photographeraccount',
            name='account_type',
            field=models.CharField(choices=[('bank_account', 'Bank Account'), ('paypal_account', 'Paypal Account')], max_length=100, verbose_name='Account Type'),
        ),
    ]
