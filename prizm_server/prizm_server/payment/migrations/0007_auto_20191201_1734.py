# Generated by Django 2.2.6 on 2019-12-01 08:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('studio', '0020_auto_20191201_1519'),
        ('payment', '0006_auto_20191201_1620'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deposit',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='studio.Order'),
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(verbose_name='Price')),
                ('pay_type', models.CharField(choices=[('paypal', 'Paypal')], default='paypal', max_length=20, verbose_name='Payment Method')),
                ('merchant_uid', models.UUIDField(verbose_name='거래 ID')),
                ('imp_uid', models.CharField(blank=True, max_length=100, verbose_name='아임포트 거래 ID')),
                ('status', models.CharField(choices=[('ready', '미결제'), ('paid', '결제완료'), ('cancelled', '결제취소'), ('failed', '결제실패')], db_index=True, default='ready', max_length=9, verbose_name='결제 상태')),
                ('meta', jsonfield.fields.JSONField(blank=True, default={})),
                ('regist_dt', models.DateTimeField(auto_now_add=True, verbose_name='거래 생성일')),
                ('alert_status', models.CharField(choices=[('required', '확인 필요'), ('confirmed', '확인 불필요')], max_length=10, verbose_name='확인 필요 여부')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studio.Order')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Payment',
                'verbose_name_plural': 'Payment',
                'ordering': ('-id',),
            },
        ),
    ]
