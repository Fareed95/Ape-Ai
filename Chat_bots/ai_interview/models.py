from django.db import models

class Interview(models.Model):
    chat_history_unique_id = models.CharField(max_length=1000)


class AiInterviewSampleData(models.Model):
    sample_company_data = models.TextField(null=True, blank=True)
    sample_internship_data =  models.TextField(null=True, blank=True)
    analysis = models.TextField(null=True, blank=True)
    performance = models.IntegerField(null=True, blank=True)
    communication_skill = models.IntegerField(null=True,blank=True)


class AiDemoInterview(models.Model):
    
    question = models.CharField(max_length=1000, blank=True, null=True, unique=True)
    answer = models.CharField(max_length=1000, blank=True, null=True)
    sample_data = models.ForeignKey(AiInterviewSampleData, related_name="sample_data", on_delete=models.CASCADE)
    
    
class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    profile_image = models.ImageField(upload_to='profile_images', null=True, blank=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    is_mentor = models.BooleanField(default=False)
    date_joined = models.DateTimeField()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "api_user"
        managed = False



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

    class Meta:
        db_table = "company_company"
        managed = False


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
    posted_at = models.DateTimeField(auto_now_add=True)  
    Interviewer_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='internship_intervieww')

    class Meta:
        db_table = "company_internship"
        managed = False



class AiInterview(models.Model):
    question = models.CharField(max_length=1000, blank=True, null=True)
    answer = models.CharField(max_length=1000, blank=True, null=True)
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE, related_name='ai_interviews', null=True, blank=True)
    interviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interviewer', null=True, blank=True)