from django.db import models
from api.models import User


class UserDetails(models.Model):
    name = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=254, unique=True)
    about = models.TextField(null =True,blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='userdetails', null=True,blank=True)
    template = models.IntegerField(null=True,blank=True)
    occupation = models.CharField(max_length=50,null=True,blank=True)

'''
Tools the user using in its framework
'''

class Toolname(models.Model):
    name = models.CharField(max_length=50,null=True,blank=True)
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE,related_name='toolname', null=True,blank=True)

class Tools(models.Model):
    name = models.CharField(max_length=50,null=True,blank=True)
    tool_name = models.ForeignKey(Toolname, on_delete=models.CASCADE,related_name='tools', null=True)

class ToolComponents(models.Model):
    name = models.CharField( max_length=50,null=True,blank=True)
    tool = models.ForeignKey(Tools, on_delete=models.CASCADE,related_name='toolcomponents', null=True)


'''
Edducation details of the user
'''

class Education(models.Model):
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE,related_name='education', null=True,blank=True)
    degree = models.CharField(max_length=50,null=True,blank=True)
    field_of_study = models.CharField(max_length=50,null=True,blank=True)
    University = models.CharField(max_length=50,null=True,blank=True)
    location = models.CharField(max_length=50,null=True,blank=True)
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)
    current_grade = models.CharField(max_length=50,null=True,blank=True)

'''
Certificates of the user
'''
# Directly using the Certificate model from certificate app

'''
Projects of the user
'''
class Project(models.Model):
    user = models.ForeignKey(UserDetails, on_delete=models.CASCADE,related_name='project', null=True)
    name = models.CharField( max_length=50, null=True,blank=True)
    description = models.TextField(null=True , blank=True)


class Link(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE,related_name='link', null=True)
    name = models.CharField(max_length=50,null=True,blank=True)
    url = models.URLField(null=True,blank=True)
