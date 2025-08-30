from rest_framework import serializers
from . models import TestimonialModels

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialModels
        fields = '__all__'  