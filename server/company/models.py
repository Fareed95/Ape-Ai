from django.db import models
from api.models import User

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Company Name
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)  # Logo
    website = models.URLField(null=True, blank=True)  # Company Website
    description = models.TextField(null=True, blank=True)  # About Company
    location = models.CharField(max_length=255, null=True, blank=True)  # HQ Location
    industry = models.CharField(max_length=100, choices=[  # Industry Category
        ('Tech', 'Tech'),
        ('Finance', 'Finance'),
        ('Healthcare', 'Healthcare'),
        ('Education', 'Education'),
        ('Other', 'Other')
    ], default='Other')
    founded_at = models.DateField(null=True, blank=True)  # Founding Date# HR Contact Email
    contact_phone = models.CharField(max_length=15, null=True, blank=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies',null=True,blank=True)


class Internship(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='internships')
    title = models.CharField(max_length=255)  # Internship Role
    description = models.TextField()  # Role Description
    stipend = models.CharField(max_length=50, null=True, blank=True)  # Stipend Info (₹ / month)
    duration = models.CharField(max_length=50)  # Duration (e.g., "3 Months")
    location = models.CharField(max_length=255, null=True, blank=True)  # Remote/Onsite/Hybrid
    skills_required = models.TextField(null=True, blank=True)  # Required Skills (Comma separated)
    openings = models.IntegerField(default=1)  # Number of Open Positions
    application_deadline = models.DateField()  # Last Date to Apply
    posted_at = models.DateTimeField(auto_now_add=True)  # Auto Timestamp



class StudentsRegistered(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='internships_registered')
    internship = models.ForeignKey(Internship, on_delete=models.CASCADE, related_name='students_registered')
    registered_at = models.DateTimeField(auto_now_add=True)
    is_selected = models.BooleanField(default=False)
    interviw_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'internship']