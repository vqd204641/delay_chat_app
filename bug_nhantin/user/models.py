from django.db import models
from django_mysql.models import ListCharField
from datetime import datetime

class Message(models.Model):
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    body = models.TextField(max_length=100000000)
    send_time = models.DateTimeField(default=datetime.now)
    delivery_time = models.DateTimeField()
    is_send = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.sender_id} to {self.receiver_id}"
class User(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255, null=True)
    date_of_birth = models.DateField(default=datetime.now)
    gender = models.CharField(max_length=255,choices=GENDER_CHOICES, default='male')   
    anh = models.ImageField(null=True, blank=True, upload_to="pro_pic/")
    verify = models.BooleanField(default=False)
    def get_interests(self):
        interests = Interest.objects.filter(user_id=self.id).values_list('interest', flat=True)
        return interests

    def get_languages(self):
        languages = UserLanguage.objects.filter(user_id=self.id).values_list('language', flat=True)
        return languages

    def get_user_data(self):
        user_data = {
            'id': self.id,
            'username': self.username,
            'interests': self.get_interests(),
            'languages': self.get_languages(),
            'date_of_birth': self.date_of_birth,
            'profile_picture': self.profile_picture,
        }
        return user_data
    def __str__(self):
        return f"{self.username} {self.id}"
    
class Friendlist(models.Model):
    user_id = models.IntegerField()
    friend_id = ListCharField(
        base_field=models.IntegerField(),
        size=1000,
        max_length=255,  # Add max_length attribute
        null=True
    )
    def __str__(self):
        return f"{self.user_id}"
class FriendRequest(models.Model):
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    def __str__(self):
        return f"{self.sender_id} to {self.receiver_id}"
class UserLanguage(models.Model):
    user_id = models.IntegerField()
    language = ListCharField(
        base_field=models.CharField(max_length=20),  # Add max_length attribute
        size=10,
        max_length=255,  # Add max_length attribute
        null=True
    )
    def __str__(self):
        return f"{self.user_id}"

class Interest(models.Model):
    user_id = models.IntegerField()
    interest = ListCharField(
        base_field=models.CharField(max_length=20),  # Add max_length attribute
        size=10,
        max_length=255,  # Add max_length attribute
        null=True
    )
    def __str__(self):
        return f"{self.user_id}"

    