from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import UserDetails, Toolname, Tools, ToolComponents, Education,  Project, Link
from .serializers import (
    UserDetailsSerializer, ToolnameSerializer, ToolsSerializer, 
    ToolComponentsSerializer, EducationSerializer, 
    ProjectSerializer, LinkSerializer
)
from django.template.loader import render_to_string
from weasyprint import HTML
from django.http import HttpResponse

# UserDetails by Email
class UserDetailsByEmailAPIView(APIView):
    def get(self, request, email):
        user = get_object_or_404(UserDetails, email=email)
        serializer = UserDetailsSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, email):
        user = get_object_or_404(UserDetails, email=email)
        serializer = UserDetailsSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, email):
        user = get_object_or_404(UserDetails, email=email)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# Toolname API
# Toolname API
class ToolnameAPIView(APIView):
    def get(self, request):
        toolnames = Toolname.objects.all()
        serializer = ToolnameSerializer(toolnames, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToolnameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        toolname = get_object_or_404(Toolname, pk=pk)
        serializer = ToolnameSerializer(toolname, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        toolname = get_object_or_404(Toolname, pk=pk)
        toolname.delete()
        return Response({"message": "Toolname deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Tools API
class ToolsAPIView(APIView):
    def get(self, request):
        tools = Tools.objects.all()
        serializer = ToolsSerializer(tools, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToolsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        tool = get_object_or_404(Tools, pk=pk)
        serializer = ToolsSerializer(tool, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tool = get_object_or_404(Tools, pk=pk)
        tool.delete()
        return Response({"message": "Tool deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# ToolComponents API
class ToolComponentsAPIView(APIView):
    def get(self, request):
        components = ToolComponents.objects.all()
        serializer = ToolComponentsSerializer(components, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToolComponentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        component = get_object_or_404(ToolComponents, pk=pk)
        serializer = ToolComponentsSerializer(component, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        component = get_object_or_404(ToolComponents, pk=pk)
        component.delete()
        return Response({"message": "Tool Component deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Education API
class EducationAPIView(APIView):
    def get(self, request):
        education = Education.objects.all()
        serializer = EducationSerializer(education, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EducationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        education = get_object_or_404(Education, pk=pk)
        serializer = EducationSerializer(education, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        education = get_object_or_404(Education, pk=pk)
        education.delete()
        return Response({"message": "Education deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Project API
class ProjectAPIView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        project.delete()
        return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Link API
class LinkAPIView(APIView):
    def get(self, request):
        links = Link.objects.all()
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        link = get_object_or_404(Link, pk=pk)
        serializer = LinkSerializer(link, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        link = get_object_or_404(Link, pk=pk)
        link.delete()
        return Response({"message": "Link deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class ResumeAPIView(APIView):
    def get(self, request, email):
        user = get_object_or_404(UserDetails, email=email)
        serializer = UserDetailsSerializer(user)
        # print(serializer.data)
        context = {
            'user': serializer.data,
            'name': serializer.data['name'],
            'email': serializer.data['email'],
            'phone': serializer.data['phone_number'],
            'education': Education.objects.filter(user=user),
            'projects': Project.objects.filter(user=user),
            # 'links': Link.objects.filter(user=user),
        }
        print(serializer.data['certificate'])
        print(Education.objects.filter(user=user))
        html_content = render_to_string('resume.html', context)
        resume_name =f"{serializer.data['name']}_resume.pdf"

    # Generate the PDF and return it
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename={resume_name}'
        HTML(string=html_content).write_pdf(response)

        return response

    

        # return response
        return Response(serializer.data, status=status.HTTP_200_OK)