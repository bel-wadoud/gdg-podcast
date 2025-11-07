from django.urls import path

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView



from .views import (
    RegisterView, VerifyEmailView, MeView,
    ForgotPasswordView, ResetPasswordView, GoogleLoginView,
    LogoutView, GuestListView, GuestDetailView,
    SavePodcastView, SavedPodcastListView, FeedbackCreateView, 
    ProgressUpdateView, CommentCreateView, LikeCommentView, 
    PodcastCommentsView, LikeCommentView
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("verify/<str:token>/", VerifyEmailView.as_view()),

    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),

    path('logout/', LogoutView.as_view(), name='logout'),
    
    path("me/", MeView.as_view()),
    
    path("forgot/", ForgotPasswordView.as_view()),
    path("reset/<str:token>/", ResetPasswordView.as_view()),
    
    path("google/", GoogleLoginView.as_view()),

    path('guests/', GuestListView.as_view(), name='guest-list'),
    path('guests/<int:id>/', GuestDetailView.as_view(), name='guest-detail'),

    path('save/', SavePodcastView.as_view()),
    path('saved/', SavedPodcastListView.as_view()),
    path('feedback/', FeedbackCreateView.as_view()),
    path('progress/', ProgressUpdateView.as_view()),
    
    path('comment/', CommentCreateView.as_view()),
    path('comment/like/', LikeCommentView.as_view()),

    path('podcasts/<int:podcast_id>/comments/', PodcastCommentsView.as_view(), name='podcast-comments'),
    path('comments/<int:comment_id>/like/', LikeCommentView.as_view(), name='comment-like'),

]

