# Generated by Django 4.2.3 on 2023-08-01 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='anh',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
    ]
