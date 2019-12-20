# Generated by Django 2.2.6 on 2019-12-20 10:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('studio', '0024_auto_20191206_2058'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photograpy_type', models.CharField(max_length=500, verbose_name='Photography Type')),
                ('person', models.PositiveIntegerField(verbose_name='How many people')),
                ('hour', models.FloatField(verbose_name='How many hours')),
                ('date_option', models.CharField(choices=[('Specific', 'Specific Date'), ('Range', 'Not Specific Date')], max_length=100, verbose_name='Date Option')),
                ('specific_date', models.DateTimeField(blank=True, null=True, verbose_name='Specific Date')),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Range Start Date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='Range End Date')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Custom Request',
                'verbose_name_plural': 'Custom Request',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='RequestLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300, verbose_name='Name')),
                ('lng', models.FloatField(verbose_name='Longitude')),
                ('lat', models.FloatField(verbose_name='Latitude')),
                ('custorm_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='studio.CustomRequest')),
            ],
            options={
                'verbose_name': 'Request Location',
                'verbose_name_plural': 'Request Location',
                'ordering': ['-id'],
            },
        ),
    ]