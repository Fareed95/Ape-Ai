from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
import jwt
from .models import User
from .serializer import StudentSerializer, CompanySerializer
from utils.usercheck import authenticate_request
from django.core.mail import send_mail
from django.template.loader import render_to_string




class UserView(APIView):
    @csrf_exempt
    def get(self, request):

        user = authenticate_request(request, need_user=True)
        if user.is_company:
            serializer = CompanySerializer(user)
        else:  
            serializer = StudentSerializer(user)

        return Response(serializer.data)

    @csrf_exempt
    def patch(self, request):
        
        user = authenticate_request(request, need_user=True)

        data = request.data
        if "name" in data:
            user.name = data["name"]
        else:
            return Response({"error": "You can only update your name"}, status=status.HTTP_403_FORBIDDEN)

        user.save()
        html_message = render_to_string('email/name_reset_sucessful.html', {'name': user.name})
        send_mail(
                'Name Reset Successful',
                'Your name has been reset successfully.',
                'fareedsayedprsnl@gmail.com',
                [user.email],
                fail_silently=False,
                html_message=html_message,
            )
        return Response({"message":f"Your name is updated successfully to {user.name}"}, status=status.HTTP_200_OK)

        
    @csrf_exempt
    def delete(self, request):
        user = authenticate_request(request, need_user=True)
        # User can delete only their own account
        user.delete()
        html_message = render_to_string('email/account_deleted_sucessful.html', {'name': user.name})
        send_mail(
                'Account Deleted Successful',
                'Your account has been permanently deleted successfully.',
                'fareedsayedprsnl@gmail.com',
                [user.email],
                fail_silently=False,
                html_message=html_message,
            )
        return Response({"message": "Your account has been deleted successfully"}, status=status.HTTP_200_OK)
