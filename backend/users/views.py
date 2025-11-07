from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import get_user_model

from drf_spectacular.utils import extend_schema, OpenApiResponse

from .serializers import (
    RegisterSerializer, UserSerializer,
    ForgotPasswordSerializer, ResetPasswordSerializer,
    GuestSerializer, PodcastViewSerializer,
    SavedPodcastSerializer, UserFeedbackSerializer,
    PodcastProgressSerializer, CommentSerializer,
    CommentLikeSerializer
)

from .utils import generate_token, verify_token

from .models import SavedPodcast, Comment, CommentLike
from podcasts.models import Podcast

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

User = get_user_model()


def jwt_response(user):
    refresh = RefreshToken.for_user(user)
    return {
        "token": str(refresh.access_token),
        "user": UserSerializer(user).data
    }


@extend_schema(
    summary="Register a new user account",
    description="Creates a new user and sends an email verification token."
)
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        token = generate_token({"user_id": user.id})
        print(f"Email verification link: http://localhost:8000/users/verify/{token}")


@extend_schema(
    summary="Verify email address",
    description="Verifies user email using a token that was sent previously.",
    responses={200: OpenApiResponse(description="Email verified successfully")}
)
class VerifyEmailView(generics.GenericAPIView):
    def get(self, _, token):
        data = verify_token(token)
        if not data:
            return Response({"detail": "Invalid token"}, status=400)
        user = User.objects.get(id=data['user_id'])
        user.is_active = True
        user.save()
        return Response({"detail": "Email verified successfully"})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        return token


@extend_schema(
    summary="Login and obtain JWT tokens",
    description="Authenticates the user and returns access and refresh JWT tokens.",
    responses={200: UserSerializer}
)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@extend_schema(
    summary="Send password reset email",
    description="Sends a password reset token to the user's email."
)
class ForgotPasswordView(generics.GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    
    def post(self, request):
        email = request.data.get("email")
        user = User.objects.filter(email=email).first()
        if user:
            token = generate_token({"user_id": user.id})
            print(f"Password reset link: http://localhost:8000/users/reset/{token}")
        return Response({"detail": "Check your email"})


@extend_schema(
    summary="Reset password",
    description="Resets the password using a previously sent token."
)
class ResetPasswordView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, token):
        data = verify_token(token)
        if not data:
            return Response({"detail": "Invalid token"}, status=400)
        user = User.objects.get(id=data["user_id"])
        user.set_password(request.data.get("password"))
        user.save()
        return Response({"detail": "Password changed successfully"})


@extend_schema(
    summary="Get or update authenticated user profile",
    description="Returns the logged-in user's profile information."
)
class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


@extend_schema(
    summary="Continue with Google",
    description="Authenticates a user using Google token and returns JWT."
)
class GoogleLoginView(generics.GenericAPIView):
    def post(self, request):
        token = request.data.get("token")
        info = id_token.verify_oauth2_token(token, google_requests.Request())
        
        email = info['email']
        user, created = User.objects.get_or_create(email=email, defaults={
            "username": email.split("@")[0],
            "first_name": info.get("given_name", ""),
            "last_name": info.get("family_name", ""),
            "role": 0,
            "is_active": True
        })
        return Response(jwt_response(user))


@extend_schema(
    summary="Logout the user",
    description="Blacklists the refresh token so it can't be reused."
)
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="List all guest users",
    description="Returns a list of all users with the role of 'Guest'."
)
class GuestListView(generics.ListAPIView):
    serializer_class = GuestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role=2)


@extend_schema(
    summary="Retrieve a guest user profile",
    description="Returns detailed information about a guest."
)
class GuestDetailView(generics.RetrieveAPIView):
    serializer_class = GuestSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(role=2)
    lookup_field = "id"


@extend_schema(
    summary="Save podcast to user profile",
    description="Marks a podcast as saved by the authenticated user."
)
class SavePodcastView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SavedPodcastSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(
    summary="List saved podcasts",
    description="Returns all podcasts saved by the authenticated user."
)
class SavedPodcastListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SavedPodcastSerializer

    def get_queryset(self):
        return SavedPodcast.objects.filter(user=self.request.user)


@extend_schema(
    summary="Send feedback",
    description="Allows the authenticated user to submit feedback."
)
class FeedbackCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFeedbackSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(
    summary="Update podcast listening progress",
    description="Stores or updates the listening progress for a podcast episode."
)
class ProgressUpdateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PodcastProgressSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(
    summary="Create a comment",
    description="Allows a user to post a comment on a podcast."
)
class CommentCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(
    summary="List comments for a podcast",
    description="Returns all comments for the specified podcast, sorted newest first."
)
class PodcastCommentsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, podcast_id):
        podcast = Podcast.objects.get(id=podcast_id)
        comments = podcast.comments.order_by('-created_at')
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data)


@extend_schema(
    summary="Like or unlike a comment",
    description="Toggles like status on a comment for the authenticated user."
)
class LikeCommentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, comment_id):
        comment = Comment.objects.get(id=comment_id)
        like_exists = CommentLike.objects.filter(user=request.user, comment=comment).exists()

        if like_exists:
            CommentLike.objects.filter(user=request.user, comment=comment).delete()
            return Response({"message": "Unliked"}, status=status.HTTP_200_OK)

        CommentLike.objects.create(user=request.user, comment=comment)
        return Response({"message": "Liked"}, status=status.HTTP_201_CREATED)

