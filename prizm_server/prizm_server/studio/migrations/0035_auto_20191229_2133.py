# Generated by Django 2.2.6 on 2019-12-29 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0034_auto_20191224_0107'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photographer',
            name='education',
        ),
        migrations.AddField(
            model_name='photographer',
            name='equipment',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Equipment'),
        ),
    ]