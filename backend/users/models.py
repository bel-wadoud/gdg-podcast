from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# overide of built-in user model
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")

        email = self.normalize_email(email)

        user = self.model(
            username=username,
            email=email,
            **extra_fields
        )

        user.set_password(password)  # hash password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 1)  # admin role
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        (0, 'User'),
        (1, 'Admin'),
        (2, 'Guest')
    )

    username    = models.CharField(max_length=50, unique=True)
    email       = models.EmailField(unique=True)
    avatar      = models.TextField(blank=True, null=True)
    role        = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=0)
    first_name  = models.CharField(max_length=50, blank=True, null=True)
    last_name   = models.CharField(max_length=50, blank=True, null=True)
    bio         = models.CharField(max_length=1000, blank=True, null=True)

    # Required for Django Admin / Permissions
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'     # Login with email
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username


class PodcastView(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='viewed_podcasts')
    podcast = models.ForeignKey('podcasts.Podcast', on_delete=models.CASCADE, related_name='views')
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'podcast')  # Prevents duplicates


class SavedPodcast(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_podcasts')
    podcast = models.ForeignKey('podcasts.Podcast', on_delete=models.CASCADE, related_name='saved_by')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'podcast')


class UserFeedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedback')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class PodcastProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    podcast = models.ForeignKey('podcasts.Podcast', on_delete=models.CASCADE, related_name='progress')
    current_time_seconds = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'podcast')


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    podcast = models.ForeignKey('podcasts.Podcast', on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_comments')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'comment')

