from django.urls import path
from .views import CompanyView, InternshipView,ApplyForInternshipView,StudentsRegisteredView

urlpatterns = [
    # Company URLs
    path('companies/', CompanyView.as_view(), name='company-list'),
    path('companies/<int:company_id>/', CompanyView.as_view(), name='company-detail'),

    # Internship URLs
    path('internships/', InternshipView.as_view(), name='internship-list'),
    path('internships/<int:internship_id>/', InternshipView.as_view(), name='internship-detail'),
    path('apply/', ApplyForInternshipView.as_view(), name='apply-for-internship'),
    path('students-registered/<int:internship_id>', StudentsRegisteredView.as_view(), name='students-registered'),
]
