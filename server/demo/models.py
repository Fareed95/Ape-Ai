from django.db import models

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='services/', null=True, blank=True)
    def __str__(self):
        return self.name

class Image(models.Model):
    gallery = models.ForeignKey(Service, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='galleries/', null=True, blank=True)

    def __str__(self):
        return f"Image for {self.gallery.name}"
