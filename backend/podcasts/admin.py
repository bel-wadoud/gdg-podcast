from django.contrib import admin
from .models import Podcast, Category


def get_all_fields(model):
    return [
        field.name
        for field in model._meta.get_fields()
        if not (field.many_to_many or field.one_to_many or field.one_to_one or field.auto_created)
    ]

# Register your models here.
#
@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    list_display = ['title', 'guest', 'published_at', 'get_categories', 'duruation']
    search_fields = ['title', 'description', 'guest__username']
    list_filter = ['published_at', 'category']
    ordering = ['-published_at']

    def get_categories(self, obj):
        return ", ".join([c.name for c in obj.category.all()])
    get_categories.short_description = "Categories"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    ordering = ['name']
# admin.site.register(Podcast)
# admin.site.register(Category)
