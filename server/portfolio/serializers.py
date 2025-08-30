from rest_framework import serializers
from . models import UserDetails,Toolname,Tools,ToolComponents,Education,Project,Link
# from api.models import User
# from api.serializers import UserSerializer
from certificate.serializers import CertificateSerializer



class ToolComponentsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ToolComponents
        fields = ['id','name','tool']

class ToolsSerializer(serializers.ModelSerializer):
    toolcomponents = ToolComponentsSerializer(many=True, read_only=True)
    class Meta:
        model = Tools
        fields = ['id','name','tool_name','toolcomponents']


class ToolnameSerializer(serializers.ModelSerializer):
    tools = ToolsSerializer(many=True, read_only=True)
    class Meta:
        model = Toolname
        fields = ['id','name','user','tools']



class EducationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Education
        fields = ['id','user','degree','field_of_study','University','location','start_date','end_date','current_grade']

class LinkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Link
        fields = ['id','project','url','name']


class ProjectSerializer(serializers.ModelSerializer):
    link = LinkSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = ['id','user','name','description','link']



class UserDetailsSerializer(serializers.ModelSerializer):
    toolname = ToolnameSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    certificate = CertificateSerializer(many=True, read_only=True)
    project = ProjectSerializer(many=True, read_only=True)
    certificate = CertificateSerializer(many=True, read_only=True)
    class Meta:
        model = UserDetails
        fields = ['id','name','email','phone_number','about','toolname','education','certificate','project','template','occupation']
