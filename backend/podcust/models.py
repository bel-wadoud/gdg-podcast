from django.db import models

# Create your models here.

class Podcast(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField()
    thumbnail = models.CharField(max_length=1000)
    duruation = models.TimeField()
    video_url = models.URLField()
    audio_url = models.URLField()
    guest = models.IntegerField()
    category = models.ManyToManyField('Category', related_name='podcasts')
    published_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return (f"Podcast name : {self.title}" )


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)


    def __str__(self):
        return (f"Category name : {self.name}" )

