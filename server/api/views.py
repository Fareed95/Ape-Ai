from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
from django.utils import timezone
from .models import User
from .serializer import PasswordResetRequestSerializer,PasswordResetSerializer
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.core.cache import cache
import ssl
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from portfolio.models import UserDetails
from company.models import Company
from utils.usercheck import authenticate_request
from portfolio.models import UserDetails
from company.models import Company 
import os
from dotenv import load_dotenv
load_dotenv()

ssl._create_default_https_context = ssl._create_unverified_context

'''
register is first checking if user exists and is active then it add the user and on the put request it is verifying the otp and if the user is company it is creating a company profile else userdetails profile
'''

class RegisterView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        is_company = request.data.get('is_company', False)
        authenticate_request(request)

        if not email or not name or not password or not confirm_password:
            return Response({"message": "Email, name, password, and confirm_password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({"message": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user exists and is active
        existing_user = User.objects.filter(email=email).first()
        if existing_user and existing_user.is_active:
            return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        otp = get_random_string(length=4, allowed_chars='0123456789')

        if existing_user:
            # If user exists but inactive, update their details & OTP
            existing_user.name = name
            existing_user.set_password(password)
            existing_user.otp = otp
            existing_user.otp_expiration = timezone.now() + timezone.timedelta(minutes=5)
            existing_user.is_active = False
            existing_user.is_company = is_company
            existing_user.save()
            user = existing_user
        else:
            # Create new user
            user = User.objects.create_user(email=email, name=name, password=password, is_company=is_company)
            user.otp = otp
            user.otp_expiration = timezone.now() + timezone.timedelta(minutes=5)
            user.is_active = False
            user.save()

        html_message = render_to_string('email/register_otp.html', {'otp': otp})
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}',
            'fareedsayedprsnl@gmail.com',
            [email],
            fail_silently=False,
            html_message=html_message,
        )

        return Response({"message": "User created successfully. OTP sent to your email."}, status=status.HTTP_201_CREATED)


    def put(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        user = User.objects.filter(email=email).first()
        authenticate_request(request)

        if user and user.otp == otp and user.otp_expiration > timezone.now():
            user.is_active = True
            user.otp = None
            user.otp_expiration = None
            user.save()
            if user.is_company:
                Company.objects.create(user=user, name=user.name)
            else:
                UserDetails.objects.create(user=user, name=user.name, email=user.email)
            return Response({'message': 'Account verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP or OTP expired'}, status=status.HTTP_400_BAD_REQUEST)


class ResendotpView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        authenticate_request(request)

        if user:
            otp = get_random_string(length=4, allowed_chars='0123456789')
            user.otp = otp
            user.otp_expiration = timezone.now() + timezone.timedelta(minutes=5)
            user.save()
            html_message = render_to_string('email/otp_resend.html', {'otp': otp})
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp}',
                'fareedsayedprsnl@gmail.com',  # Replace with your email
                [email],
                fail_silently=False,
                html_message=html_message,
            )
            return Response({"message": "OTP resent successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)




class LoginView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data['email']

        password = request.data['password']

        user = User.objects.filter(email=email).first()
        authenticate_request(request)

        if user is None:
            raise AuthenticationFailed('User Not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')

        if not user.is_active:
            raise AuthenticationFailed('Account not activated. Please verify your email.')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.data = {
            'jwt': token  # No "Bearer" prefix
        }

        return response
    




class LogoutView(APIView):
    @csrf_exempt
    def post(self, request):
        authenticate_request(request)

        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': "Logged out successfully"
        }
        return response



# views.py



class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        authenticate_request(request)


        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        otp = get_random_string(length=4, allowed_chars='0123456789')
        # cache.set(f'otp_{email}', otp, timeout=300)  # OTP valid for 5 minutes
        user.otp = otp
        user.otp_expiration = timezone.now() + timezone.timedelta(minutes=5)
        user.save()
        html_message = render_to_string('email/password_reset.html', {'otp': otp})

        send_mail(
            'Password Reset OTP',
            f'Your OTP for password reset is {otp}.',
            'fareedsayedprsnl@gmail.com',
            [email],
            fail_silently=False,
            html_message=html_message,
        )
        return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']
        authenticate_request(request)


        try:
            user = User.objects.get(email=email)
            if user.otp != otp or user.otp_expiration < timezone.now():
                return Response({"message": "Invalid OTP or OTP expired."}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            cache.delete(f'otp_{email}')
            # Send confirmation email
            html_message = render_to_string('email/password_reset_sucessful.html', {'name': user.name})
            send_mail(
                'Password Reset Successful',
                'Your password has been reset successfully.',
                'fareedsayedprsnl@gmail.com',
                [email],
                fail_silently=False,
                html_message=html_message,
            )
            return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)



class OAuthLoginView(APIView):
    @csrf_exempt
    def post(self, request):
        google_token = request.data.get('token')
        google_secret_auth_id = os.getenv('GOOGLE_SECRET_AUTH_ID')
        email = request.data.get('email')
        name = request.data.get('name')
        is_company = request.data.get('is_company')

        
        if not email or not name:
            return Response({"error": "Email and name are required"}, status=status.HTTP_400_BAD_REQUEST)
        
            # Here, you would typically verify the Google token with Google's API

        user = User.objects.filter(email=email).first()

        if not user:
            # Create a new user if the email does not exist in the database

            if is_company:
                user = User.objects.create(email=email, name=name, is_company=True,password=get_random_string(8),)
                user_details = Company.objects.create(
                user=user,
                name=name
            )
            else:
                user = User.objects.create(email=email, name=name,password=get_random_string(8),)
                user_details = UserDetails.objects.create(
                user=user,
                name=name,
                email=email,
            )
            user.is_active = True  
            user.save()
            
            user_details.save()

            html_message = render_to_string('emails/welcome.html', { 'name': user.name})
            plain_message = strip_tags(html_message)

            send_mail(
            f'Welcome {user.name},',
            plain_message,
            'codecell@eng.rizvi.edu.in',  # Replace with your email
            [user.email],
            fail_silently=False,
            html_message=html_message,
            )

        # Generate JWT token
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        return Response({'jwt': token}, status=status.HTTP_200_OK)
