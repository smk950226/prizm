# Generated by Django 2.2.6 on 2019-12-22 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0031_auto_20191222_1706'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestorder',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='studio.RequestLocation'),
        ),
    ]
