# admin username: quocdat
# admin pass: q12we34r
from django.contrib import admin

# Register your models here.
from .models import User,Message,UserLanguage,Friendlist,FriendRequest,Interest

class MemberAdmin(admin.ModelAdmin):
  list_display = ("username", "joined_date")

admin.site.register(User)
admin.site.register(Message)
admin.site.register(UserLanguage)
admin.site.register(Friendlist)
admin.site.register(FriendRequest)
admin.site.register(Interest)
