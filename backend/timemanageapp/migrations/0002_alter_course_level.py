# Generated by Django 5.1.5 on 2025-01-18 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("timemanageapp", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="level",
            field=models.CharField(
                choices=[("basic", "입문반"), ("advanced", "작품반")], max_length=12
            ),
        ),
    ]
