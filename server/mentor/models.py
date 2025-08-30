from django.db import models
from api.models import User

class MentorDetails(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Company Name
    description = models.TextField(null=True, blank=True)  # About Company
    contact_phone = models.CharField(max_length=15, null=True, blank=True)
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentor',null=True,blank=True)



class Coarse(models.Model):
    mentor = models.ForeignKey(MentorDetails, on_delete=models.CASCADE, related_name='coarse')
    title = models.CharField(max_length=255)  # Internship Role
    description = models.TextField()  # Role Descriptio


class StudentsRegistered(models.Model):
    coarse = models.ForeignKey(Coarse, on_delete=models.CASCADE, related_name='students_registered')
    registered_at = models.DateTimeField(auto_now_add=True)
    is_selected = models.BooleanField(default=False)
    meet_time = models.DateTimeField(null=True, blank=True)
