from rest_framework import serializers
from .models import Company, Internship, StudentsRegistered


class StudentsRegisteredSerializer(serializers.ModelSerializer):
    internship_name = serializers.CharField(source='internship.title', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    company_name = serializers.CharField(source='internship.company.name', read_only=True)
    company_description = serializers.CharField(source='internship.company.description', read_only=True)
    company_email = serializers.EmailField(source ='internship.company.user.email', read_only=True)
    internship_description = serializers.CharField(source='internship.description', read_only=True)
    class Meta:
        model = StudentsRegistered
        fields = [
            'id',
            'user',
            'user_name',
            'internship',
            'internship_name',
            'registered_at',
            'is_selected',
            'company_name',
            'interviw_time',
            'company_description',
            'company_email',
            'internship_description'
        ]


class InternshipSerializer(serializers.ModelSerializer):
    students_for_interview = serializers.SerializerMethodField()
    students_under_review = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = [
            'id',
            'company',
            'title',
            'description',
            'stipend',
            'duration',
            'location',
            'skills_required',
            'openings',
            'application_deadline',
            'posted_at',
            'students_for_interview',
            'students_under_review',
        ]

    def get_students_for_interview(self, obj):
        selected_students = obj.students_registered.filter(is_selected=True)
        return StudentsRegisteredSerializer(selected_students, many=True).data

    def get_students_under_review(self, obj):
        under_review_students = obj.students_registered.filter(is_selected=False)
        return StudentsRegisteredSerializer(under_review_students, many=True).data


class CompanyProfileSerializer(serializers.ModelSerializer):
    internships = InternshipSerializer(many=True, read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source='user', read_only=True)

    class Meta:
        model = Company
        fields = [
            'user_email',
            'user_id',
            'id',
            'name',
            'description',
            'logo',
            'website',
            'location',
            'industry',
            'founded_at',
            'contact_phone',
            'internships',
        ]
