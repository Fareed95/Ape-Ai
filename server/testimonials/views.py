from django.shortcuts import render
from . models import TestimonialModels
from .serializers import TestimonialSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class TestimonialView(APIView):
    def get(self, request):
        testimonials = TestimonialModels.objects.all()
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = TestimonialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def put(self, request, pk):
        testimonial = TestimonialModels.objects.get(pk=pk)
        serializer = TestimonialSerializer(testimonial, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def delete(self, request, pk):
        testimonial = TestimonialModels.objects.get(pk=pk)
        testimonial.delete()
        return Response(status=204)
    