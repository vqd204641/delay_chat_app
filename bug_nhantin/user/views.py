from django.shortcuts import render,redirect
from django.http import  HttpResponse,HttpResponseBadRequest,JsonResponse
from user.models import User,Message,UserLanguage,Friendlist,FriendRequest,Interest
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
import base64
import os
import numpy as np
from django.core.files.base import ContentFile

def encode_anh(path):
    with open(path, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read())
        ans ="data:image/jpeg;base64," + encoded_string.decode('utf-8')
    return ans

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        date_of_birth = data['birthday']
        gender = data['gender']
        language = data['language']
        interest = data['hobby']
        profile_picture = data['profile_picture']

        if not User.objects.filter(username=username).exists():
            anh_duoc_ma_hoa = base64.b64decode(profile_picture[23:])
            image = ContentFile(anh_duoc_ma_hoa, name='image.jpg')
            save_directory = r'D:\media\pro_pic'
            image_filename = 'image.jpg'
            image_path = os.path.join(save_directory, image_filename)

            with open(image_path, 'wb') as f:
                f.write(anh_duoc_ma_hoa)

            new_user= User.objects.create(username= username, password = password, date_of_birth = date_of_birth, gender = gender,email = email,anh=image)
            new_user.save()

            new_language = UserLanguage.objects.create(user_id = new_user.id, language = language)
            new_language.save()

            new_interest = Interest.objects.create(user_id = new_user.id, interest = interest)
            new_interest.save()


            
            return JsonResponse(
                {   
                'id': new_user.id,
                'username': new_user.username,
                'interests': list(new_user.get_interests()),
                'languages': list(new_user.get_languages()),
                'date_of_birth': new_user.date_of_birth,
                'profile_picture': profile_picture,
                'status': True,
                'gender' : new_user.gender,
                'verify' : new_user.verify,
                }
                )        
        else:
            return JsonResponse({'status':'username already exit'})


@csrf_exempt     
def login(request):
    if request.method == 'POST':        
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        if User.objects.filter(username = username).exists():
            # User exists in the database
            user = User.objects.get(username=username)
            if user.password == password:
                profile_picture = encode_anh(user.anh.path)
                return JsonResponse(
                    {
                        'id': user.id,
                        'username':username,
                        'date_of_birth':user.date_of_birth,
                        'profile_picture':profile_picture,
                        'status' : True,
                        'verify' : user.verify,
                    }
                )
            else:
                # Incorrect password
                return JsonResponse(
                    {
                        'status':False,
                    }
                )
        else:
            # User does not exist
            return HttpResponse('User does not exist.')
    else:  
        return HttpResponse('code ngu vc')
    

def allusers(request):
    if request.method == 'GET':
        users = User.objects.all()
        
        user_info_list = []
        for user in users:
            profile_picture = encode_anh(user.anh.path)
            user_info = {
                'id': user.id,
                'username': user.username,
                'gender': user.gender,
                'interests': list(user.get_interests()),
                'languages': list(user.get_languages()),
                'date_of_birth': user.date_of_birth,
                'profile_picture': profile_picture,
                'verify' : user.verify,
            }
            user_info_list.append(user_info)
        return JsonResponse({'all_user_data' : user_info_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt 
def SendMessage(request):
    if request.method == 'POST':

        data = json.loads(request.body)
       
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        body = data['content']
        send_time = data['send_time']
        min1 = data['delay_time']
        min = int(min1)
        a = datetime.strptime(send_time, '%Y-%m-%d %H:%M:%S')
        
        delivery_time = a + timedelta(minutes=min)
        
        new_message= Message.objects.create(sender_id= sender_id, receiver_id = receiver_id, body = body, delivery_time =delivery_time ,is_send = True, send_time = send_time)
        new_message.save()
        
        return HttpResponse('message send sucessfully')

def getmessage_info(request):
    if request.method == 'GET':
        receiver_id = request.GET.get('user_id')
        #data = json.loads(request.body)
        #message_id = data['message_id']
                 
        messages = Message.objects.filter(receiver_id = receiver_id)
        mess_list =[]
        for message in messages:
            user = User.objects.get(id=message.sender_id)
            message_info = {
            'sender_name': user.username,
            'id': message.id,
            'sender_id': message.sender_id,
            'body': message.body,
            'send_time': message.send_time,
            'delivery_time': message.delivery_time,
            }
            mess_list.append(message_info)
        return JsonResponse({'user_message' : mess_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
def friendlist(request):
    if request.method == 'GET':
#       data = json.loads(request.body)
        user_id = request.GET.get('user_id')

        try:
            friendlist_obj = Friendlist.objects.get(user_id=user_id)
            friend_list = friendlist_obj.friend_id
            return JsonResponse({'friend_list': friend_list})
        except Friendlist.DoesNotExist:
            return JsonResponse({'error': 'Friend list not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt
def addfriend(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        
        friend_request = FriendRequest(sender_id=sender_id, receiver_id=receiver_id)
        friend_request.save()
        
        return JsonResponse({'success': 'Friend request added.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt  
def response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
#        friend_request_id = data['friend_request_id']
        
        answer = data['answer']
        try:
            friend_request = FriendRequest.objects.get(sender_id=sender_id , receiver_id = receiver_id)
            friend_request.delete()  # Remove the FriendRequest
            
            if answer == 'accept':
                # Add to Friendlist
                friendlist_r, _ = Friendlist.objects.get_or_create(user_id=friend_request.receiver_id)
                
                friend_ids = friendlist_r.friend_id or []  # Retrieve the current friend IDs or initialize an empty list
                friend_ids.append(friend_request.sender_id)  # Append the new friend ID
                friendlist_r.friend_id = friend_ids
                friendlist_r.save()
                
                friendlist_s, _ = Friendlist.objects.get_or_create(user_id=friend_request.sender_id)
                friend_ids = friendlist_s.friend_id or []  # Retrieve the current friend IDs or initialize an empty list
                friend_ids.append(friend_request.receiver_id)  # Append the new friend ID
                friendlist_s.friend_id = friend_ids
                friendlist_s.save()
                
                return JsonResponse({'success': 'Friend request accepted and added to friend list.'})
            else:
                return JsonResponse({'success': 'Friend request declined.'})
        except FriendRequest.DoesNotExist:
            return JsonResponse({'error': 'Friend request not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
def allmessage(request):
    if request.method == 'GET':
        receiver_id = request.GET.get('user_id1')
        sender_id = request.GET.get('user_id2')
        #data = json.loads(request.body)
        #message_id = data['message_id']
        
        mess_list =[]     
        messages = Message.objects.filter(receiver_id = receiver_id,sender_id = sender_id)       
        for message in messages:
            message_info = {
            'id': message.id,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'body': message.body,
            'send_time': message.send_time,
            'delivery_time': message.delivery_time,
            }
            mess_list.append(message_info)
        
        messages2 = Message.objects.filter(receiver_id = sender_id ,sender_id = receiver_id)
        for message in messages2:
            message_info = {
            'id': message.id,
            'sender_id': message.sender_id,
            'receiver_id': message.receiver_id,
            'body': message.body,
            'send_time': message.send_time,
            'delivery_time': message.delivery_time,
            }
            mess_list.append(message_info)
        return JsonResponse({'user message' : mess_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
def getinvite(request):
    if request.method == 'GET':
        receiver_id = request.GET.get('receiver_id')
        #data = json.loads(request.body)
        #message_id = data['message_id']
                 
        invites = FriendRequest.objects.filter(receiver_id = receiver_id)
        invite_list =[]
        for invite in invites:
            invite_info = {
            'id': invite.id,
            'sender_id': invite.sender_id,
            'receiver_id': invite.receiver_id,
            }
            invite_list.append(invite_info)
        return JsonResponse({'user message' : invite_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
def hobby(request):
    if request.method == 'GET':
        interest = request.GET.get('hobby')
        users = Interest.objects.all()
        
        user_id_list = []
        for user in users:
            interest_list = user.interest
            i_array = np.array(interest_list)
            for i in i_array:
                if i == interest:
                    user_id_list.append(user.user_id)
        
        user_info_list =[]
        for user_id in user_id_list:
            users = User.objects.filter(id = user_id)
            for user in users:
                profile_picture = encode_anh(user.anh.path)
                user_info = {
                'id': user.id,
                'username': user.username,
                'interests': list(user.get_interests()),
                'languages': list(user.get_languages()),
                'date_of_birth': user.date_of_birth,
                'profile_picture': profile_picture,
            }
            user_info_list.append(user_info)
        return JsonResponse({'all_user_data' : user_info_list})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)