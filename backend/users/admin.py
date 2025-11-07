from django.contrib import admin
from django.contrib.auth.models import Group, User 
from rest_framework.authtoken.models import TokenProxy

from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from .models import (
    User as CustomUser,
    Comment, CommentLike, SavedPodcast, UserFeedback, PodcastProgress
)

def get_all_fields(model):
    return [
        field.name
        for field in model._meta.get_fields()
        if not (field.many_to_many or field.one_to_many or field.one_to_one or field.auto_created)
    ]


@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = get_all_fields(CustomUser)
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ['role', 'is_active', 'is_staff', 'is_superuser']
    ordering = ['id']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = get_all_fields(Comment)
    search_fields = ['text', 'user__username', 'podcast__title']
    ordering = ['-created_at']


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    list_display = get_all_fields(CommentLike)
    search_fields = ['user__username', 'comment__text']


@admin.register(SavedPodcast)
class SavedPodcastAdmin(admin.ModelAdmin):
    list_display = get_all_fields(SavedPodcast)
    search_fields = ['user__username', 'podcast__title']


@admin.register(UserFeedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = get_all_fields(UserFeedback)
    search_fields = ['user__username', 'message']
    ordering = ['-created_at']


@admin.register(PodcastProgress)
class PodcastProgressAdmin(admin.ModelAdmin):
    list_display = get_all_fields(PodcastProgress)
    search_fields = ['user__username', 'podcast__title']
    ordering = ['user', 'podcast']


# Unregister Django entries
admin.site.unregister(Group)  
admin.site.unregister(OutstandingToken)
admin.site.unregister(BlacklistedToken)
admin.site.unregister(TokenProxy)
