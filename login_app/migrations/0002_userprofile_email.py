# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2017-12-26 14:30
from __future__ import unicode_literals

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('login_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(default=django.utils.timezone.now, max_length=254, unique=True, verbose_name=django.contrib.auth.models.User),
            preserve_default=False,
        ),
    ]
