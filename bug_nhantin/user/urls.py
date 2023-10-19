from django.urls import path
from . import views

#const host = 'http://localhost:8000'
#       const loginRoute = `${host}/api/auth/login`;
#   const registerRoute = `${host}/api/auth/register`;
#       const allUsersRoute = `${host}/api/auth/allusers`;
#   const sendMessageRoute = `${host}/api/messages/addmsg`;
#const recieveMessageRoute = `${host}/api/messages/getmsg`;
#const setAvatarRoute = `${host}/api/auth/setavatar`;
#   const friendlist
#   const getmessage_info
#       const addfriend
#       const response

urlpatterns = [
     path('api/auth/login', views.login, name='login'),
     path('api/auth/register', views.signup, name='signup'),
     path('api/auth/allusers', views.allusers,name='allusers'),
     path('api/messages/addmsg', views.SendMessage, name='SendMessage'),
    path('api/messages/getmessage', views.getmessage_info, name='getmessage_info'),
    path('api/friend/friendlist',views.friendlist, name = 'friendlist'),
    path('api/friend/addfriend',views.addfriend,name='addfriend'),
    path('api/friend/response',views.response,name ='response'),
     path('api/messages/getallmessage',views.allmessage,name='allmessage'),
    path('api/friend/invite',views.getinvite,name ='getinvite'),
     path('api/auth/hobby',views.hobby,name='hobby'),
]

