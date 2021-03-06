# Generated by Django 2.2.6 on 2019-12-22 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0030_auto_20191222_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestlocation',
            name='custom_request',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='studio.CustomRequest'),
        ),
        migrations.CreateModel(
            name='RequestOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('available_time', models.TextField(blank=True, null=True, verbose_name='Available Time')),
                ('price', models.FloatField(verbose_name='How much in dollars')),
                ('custom_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studio.CustomRequest')),
                ('photographer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studio.Photographer')),
            ],
            options={
                'verbose_name': 'Custom Request Order',
                'verbose_name_plural': 'Custom Request Order',
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='requestlocation',
            name='request_order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='studio.RequestOrder'),
        ),
    ]
