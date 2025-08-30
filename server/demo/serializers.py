from rest_framework import serializers
from . models import Service, Image


class ImageSerializer(serializers.ModelSerializer):
    # drive_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    # event_registered_event = EventsRegisteredSerializer()
    images = ImageSerializer(many=True, read_only=True)  # Include images in the event serializer


    class Meta:
        model = Service
        fields = [
            'id',
            'name',
            'description',
            'images',
            'profile_image'
        ]
