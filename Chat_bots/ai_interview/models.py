from django.db import models


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
        managed = False  # keep if using existing DB


class AiInterviewSampleData(models.Model):
    sample_company_data = models.TextField(null=True, blank=True)
    sample_internship_data = models.TextField(null=True, blank=True)
    analysis = models.TextField(null=True, blank=True)
    performance = models.IntegerField(null=True, blank=True)
    communication_skill = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='demo_interviews', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class AiDemoInterview(models.Model):
    question = models.TextField(blank=True, null=True)  # removed unique=True
    answer = models.TextField(blank=True, null=True)
    sample_data = models.ForeignKey(AiInterviewSampleData, related_name="demo_questions", on_delete=models.CASCADE)


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    industry = models.CharField(max_length=100, choices=[
        ('Tech', 'Tech'),
        ('Finance', 'Finance'),
        ('Healthcare', 'Healthcare'),
        ('Education', 'Education'),
        ('Other', 'Other')
    ], default='Other')
    founded_at = models.DateField(null=True, blank=True)
    contact_phone = models.CharField(max_length=15, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies', null=True, blank=True)

    class Meta:
        db_table = "company_company"
        managed = False


class Internship(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='internships')
    title = models.CharField(max_length=255)
    description = models.TextField()
    stipend = models.CharField(max_length=50, null=True, blank=True)
    duration = models.CharField(max_length=50)
    location = models.CharField(max_length=255, null=True, blank=True)
    skills_required = models.TextField(null=True, blank=True)
    openings = models.IntegerField(default=1)
    application_deadline = models.DateField()
    posted_at = models.DateTimeField(auto_now_add=True)
    Interviewer_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='internship_intervieww', null=True, blank=True)

    class Meta:
        db_table = "company_internship"
        managed = False


class Interview(models.Model):
    interviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interviews')
    internship = models.ForeignKey(Internship, on_delete=models.CASCADE, related_name='interviews')
    created_at = models.DateTimeField(auto_now_add=True)
    analysis = models.TextField(null=True, blank=True)
    performance = models.IntegerField(null=True, blank=True)
    communication_skill = models.IntegerField(null=True, blank=True)


class AiInterview(models.Model):
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE, related_name='ai_interviews', null=True, blank=True)
