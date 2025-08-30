from django.db import models
from api.models import User

# Create your models here.
class TestimonialModels(models.Model):
    name = models.CharField(max_length=100)
    testimonial = models.TextField()
    image = models.ImageField(upload_to='testimonial_image',null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='testimonial')