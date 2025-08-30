from django.contrib import admin
from . models import Service, Image
class ImageInline(admin.TabularInline):
    model = Image
    extra = 1 


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',) 
    search_fields = ('name', 'description')  
    inlines = [ImageInline]


admin.site.register(Service, ServiceAdmin)
