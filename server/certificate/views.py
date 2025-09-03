from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Certificate
from .serializers import CertificateSerializer
from django.template.loader import render_to_string
from weasyprint import HTML
from django.http import HttpResponse
from django.core.mail import send_mail
from django.utils.html import strip_tags
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Certificate
from .serializers import CertificateSerializer
from django.template.loader import render_to_string
from weasyprint import HTML
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
import tempfile
from django.shortcuts import get_object_or_404

class CertificateView(APIView):
    def get(self, request):
        certificates = Certificate.objects.all()
        serializer = CertificateSerializer(certificates, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CertificateSerializer(data=request.data)
        if serializer.is_valid():
            certificate = serializer.save()

            # Prepare certificate context
            context = {
                'name': certificate.user.name,
                'name_of_certificate': certificate.name,
                'competition_battled': certificate.competition_battled,
                'competition_won': certificate.competition_won,
            }

            # Generate certificate PDF
            html_content = render_to_string('certificate.html', context)
            certificate_name = f"{certificate.user.name}_{certificate.name}.pdf"

            with tempfile.NamedTemporaryFile(delete=True, suffix=".pdf") as temp_pdf:
                HTML(string=html_content).write_pdf(temp_pdf.name)

                # Render the cool GenZ email template
                html_message = render_to_string('email_certificate.html', {'name': certificate.user.name})
                plain_message = strip_tags(html_message)
                 

                # Send email with PDF attachment
                email = EmailMessage(
                    subject=f'🎉 Congrats {certificate.user.name}! Your Certificate is Here! 🎓',
                    body=plain_message,
                    from_email='codecell@eng.rizvi.edu.in',  # Replace with your email
                    to=[certificate.user.email],
                )
                email.attach(certificate_name, temp_pdf.read(), 'application/pdf')
                email.content_subtype = "html"  # Set content type to HTML
                email.send()

            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)



class GenerateCertificate(APIView):
    def get(self, request, id):
        certificate = Certificate.objects.get(id=id)
        context = {
            'name': certificate.user.name,
            'name_of_certificate': certificate.name,
            'competition_battled': certificate.competition_battled,
            'competition_won': certificate.competition_won,
        }
        print(certificate.user.name)

        html_content = render_to_string('certificate.html', context)
        certificate_name =f"{certificate.user.name}_{certificate.name}.pdf"

    # Generate the PDF and return it
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename={certificate_name}'
        HTML(string=html_content).write_pdf(response)

        return response