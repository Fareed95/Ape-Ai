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
from portfolio.models import UserDetails
from django.template.loader import render_to_string
from weasyprint import HTML
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
import tempfile
from utils.usercheck import authenticate_request

from io import BytesIO

class CertificateView(APIView):
    def post(self, request):
        user = authenticate_request(request, True)
        name = request.data.get("name")
        if not name:
            return Response({"error": "Certificate name is required"}, status=400)

        # Prepare context
        context = {
            'name': user.name,
            'name_of_certificate': name,
        }

        userdetails = UserDetails.objects.filter(user=user).first()

        Certificate.objects.create(
            name = name,
            user = userdetails
        )

        # Generate PDF into memory
        html_content = render_to_string('certificate.html', context)
        pdf_file = BytesIO()
        HTML(string=html_content).write_pdf(pdf_file)
        pdf_file.seek(0)

        certificate_name = f"{user.name}_{name}.pdf"

        # Render email
        html_message = render_to_string('email_certificate.html', {'name': user.name})
        plain_message = strip_tags(html_message)

        # Send email with attachment
        email = EmailMessage(
            subject=f'🎉 Congrats {user.name}! Your Certificate is Here! 🎓',
            body=plain_message,
            from_email='codecell@eng.rizvi.edu.in',
            to=[user.email],
        )
        email.attach(certificate_name, pdf_file.read(), 'application/pdf')
        email.content_subtype = "html"
        email.send()

        return Response({"message": "Certificate created and sent to user"}, status=201)


class GenerateCertificate(APIView):
    def get(self, request, id):
        certificate = Certificate.objects.get(id=id)
        context = {
            'name': certificate.user.name,
            'name_of_certificate': certificate.name,
        }
        print(certificate.user.name)

        html_content = render_to_string('certificate.html', context)
        certificate_name =f"{certificate.user.name}_{certificate.name}.pdf"

    # Generate the PDF and return it
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename={certificate_name}'
        HTML(string=html_content).write_pdf(response)

        return response