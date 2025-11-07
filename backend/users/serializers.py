from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core import signing

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .models import (User, PodcastView, SavedPodcast, UserFeedback,
    PodcastProgress, Comment, CommentLike)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'avatar', 'role',
            'first_name', 'last_name', 'bio'
        ]
        read_only_fields = ['id', 'role']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.role != 2:
            data.pop('bio', None)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password',
            'first_name', 'last_name', 'avatar'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['role'] = 0  # always normal user
        user = User(**validated_data)
        user.set_password(password)
        user.is_active = False  # user must verify email
        user.save()
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims if needed
        token['username'] = user.username
        token['role'] = user.role
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#class LoginSerializer(serializers.Serializer):
#    email = serializers.EmailField()
#    password = serializers.CharField(write_only=True)

#    def validate(self, data):
#        user = authenticate(email=data['email'], password=data['password'])
#        if not user:
#            raise serializers.ValidationError("Incorrect email or password")
#        if not user.is_active:
#            raise serializers.ValidationError("Email not verified")
#        data['user'] = user
#        return data

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,
        max_length=128,
        help_text="Enter the new password"
    )

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar', 'bio']
        read_only_fields = fields


class PodcastViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastView
        fields = ['id', 'podcast', 'viewed_at']


class SavedPodcastSerializer(serializers.ModelSerializer):
    podcast_title = serializers.CharField(source="podcast.title", read_only=True)

    class Meta:
        model = SavedPodcast
        fields = ['id', 'user', 'podcast', 'podcast_title', 'saved_at']


class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = ['id', 'message', 'created_at']


class PodcastProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastProgress
        fields = ['id', 'podcast', 'current_time_seconds', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    liked_by_me = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'podcast', 'text', 'created_at', 'likes_count', 'liked_by_me']

    def get_liked_by_me(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        return obj.likes.filter(user=user).exists()

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ['id', 'comment', 'liked_at']
