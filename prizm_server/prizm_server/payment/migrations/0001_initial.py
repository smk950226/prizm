# Generated by Django 2.2.6 on 2019-11-25 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('studio', '0019_delete_photographeraccount'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhotographerAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('legal_name', models.CharField(max_length=255, verbose_name='Legal Name of User')),
                ('birth', models.CharField(max_length=20, verbose_name='Birth')),
                ('account_type', models.CharField(choices=[('bank_account', 'Bank Account')], max_length=100, verbose_name='Account Type')),
                ('number', models.CharField(max_length=255, verbose_name='Number')),
                ('photographer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='studio.Photographer')),
            ],
            options={
                'verbose_name': 'Photographer Account',
                'verbose_name_plural': 'Photographer Account',
                'ordering': ['-id'],
            },
        ),
    ]
