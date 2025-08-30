from rest_framework import serializers
from .models import User
from django.core.mail import send_mail
import random
import datetime
from django.utils import timezone
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from testimonials.serializers import TestimonialSerializer
from portfolio.serializers import UserDetailsSerializer
from company.serializers import StudentsRegisteredSerializer, CompanyProfileSerializer
# from company.models import Company

class StudentSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True, required=False)
    testimonial = TestimonialSerializer(many=True, read_only=True)
    userdetails = UserDetailsSerializer(many=True, read_only=True)
    interview_selected = serializers.SerializerMethodField()
    internship_under_review = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'profile_image',
            'name',
            'email',
            'password',
            'confirm_password',
            'otp',
            'is_staff',
            'is_company',
            'is_mentor',
            'testimonial',
            'userdetails',
            'interview_selected',
            'internship_under_review'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def get_interview_selected(self, obj):
        selected_internships = obj.internships_registered.filter(is_selected=True)
        return StudentsRegisteredSerializer(selected_internships, many=True).data

    def get_internship_under_review(self, obj):
        under_review_internships = obj.internships_registered.filter(is_selected=False)
        return StudentsRegisteredSerializer(under_review_internships, many=True).data

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.pop('confirm_password', None)

        if password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        return data



class CompanySerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True, required=False)
    testimonial = TestimonialSerializer(many=True, read_only=True)
    companies = CompanyProfileSerializer(many=True,read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'profile_image',
            'password',
            'confirm_password',
            'otp',
            'is_staff',
            'testimonial',
            'is_company',
            'companies',
            'is_mentor'
            ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

class MentorSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True, required=False)
    testimonial = TestimonialSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'profile_image'
            'password',
            'confirm_password',
            'otp',
            'is_staff',
            'testimonial',
            'is_company',
            'is_mentor'
            ]
        extra_kwargs = {
            'password': {'write_only': True},
        }


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data