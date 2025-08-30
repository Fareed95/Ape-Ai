from django.urls import path
from .views import (
    UserDetailsByEmailAPIView, ToolnameAPIView, ToolsAPIView,
    ToolComponentsAPIView, EducationAPIView,
    ProjectAPIView, LinkAPIView, ResumeAPIView
)

urlpatterns = [
    # UserDetails via Email
    path('userdetails/<str:email>/', UserDetailsByEmailAPIView.as_view(), name='userdetails-by-email'),
    path('userdetails/', UserDetailsByEmailAPIView.as_view(), name='userdetails'),

    # Tool-related APIs
    path('toolnames/', ToolnameAPIView.as_view(), name='toolnames'),
    path('toolnames/<int:pk>/', ToolnameAPIView.as_view(), name='toolname-detail'),
    
    path('tools/', ToolsAPIView.as_view(), name='tools'),
    path('tools/<int:pk>/', ToolsAPIView.as_view(), name='tool-detail'),
    
    path('toolcomponents/', ToolComponentsAPIView.as_view(), name='toolcomponents'),
    path('toolcomponents/<int:pk>/', ToolComponentsAPIView.as_view(), name='toolcomponent-detail'),

    # Education, Projects, and Links
    path('education/', EducationAPIView.as_view(), name='education'),
    path('education/<int:pk>/', EducationAPIView.as_view(), name='education-detail'),
    
    path('projects/', ProjectAPIView.as_view(), name='projects'),
    path('projects/<int:pk>/', ProjectAPIView.as_view(), name='project-detail'),
    
    path('links/', LinkAPIView.as_view(), name='links'),
    path('links/<int:pk>/', LinkAPIView.as_view(), name='link-detail'),

    # Resume API (GET only)
    path('resume/<str:email>/', ResumeAPIView.as_view(), name='resume'),
]