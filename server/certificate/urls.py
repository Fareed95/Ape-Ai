from django.urls import path
from .views import CertificateView, GenerateCertificate


urlpatterns = [
    path('certificate/', CertificateView.as_view()),
    path('certificate-generate/<int:id>/', GenerateCertificate.as_view())
    ]  