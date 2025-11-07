from django.db import models

# Create your models here.

class Podcast(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField()
    thumbnail = models.CharField(max_length=1000)
    duration = models.TimeField()
    youtube_video_id = models.CharField(max_length=20, blank=True, null=True, unique=True, help_text="YouTube Video ID (e.g., dQw4w9WgXcQ)", default='')
    audio_url = models.URLField(blank=True, null=True)
    guest = models.IntegerField()
    category = models.ManyToManyField('Category', related_name='podcasts')
    published_at = models.DateTimeField(auto_now_add=True)

    view_count = models.IntegerField(default=0, blank=True)
    like_count = models.IntegerField(default=0, blank=True)
    channel_title = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-published_at']
    
    def __str__(self):
        return (f"Podcast name : {self.title}" )
    
    @property
    def video_url(self):
        """Generate YouTube watch URL from video ID"""
        return f"https://www.youtube.com/watch?v={self.youtube_video_id}"
    
    @property
    def embed_url(self):
        """Generate YouTube embed URL from video ID"""
        return f"https://www.youtube.com/embed/{self.youtube_video_id}"
    
    @property
    def thumbnail_url(self):
        """Return stored thumbnail or generate from video ID"""
        if self.thumbnail:
            return self.thumbnail
        return f"https://img.youtube.com/vi/{self.youtube_video_id}/maxresdefault.jpg"


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)


    def __str__(self):
        return (f"Category name : {self.name}" )

