from django.db import models
from portfolio.models import UserDetails

# Create your models here.
class Certificate(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE, related_name='certificate')
    date_of_certificate = models.DateTimeField( auto_now_add=True)


