from rest_framework.response import Response
from rest_framework.decorators import api_view
from podcust.models import Podcast, Category
from .serializers import PodcastSerializer, CategorySerializer
from django.db.models import Count

@api_view(['GET'])
def podcast_list(request):
    podcasts = Podcast.objects.all()
    serializer = PodcastSerializer(podcasts, many=True, fields = ['id', 'title', 'thumbnail', 'duration'])
    return Response(serializer.data)

@api_view(['GET'])
def podcast_by_id (request, id):
    podcast = Podcast.objects.filter(id = id)
    serializer = PodcastSerializer(podcast, many=True, fields = ['id', 'title', 'description', 'video_url', 'audio_url', 'guest', 'category', 'published_at'])
    return Response(serializer.data)

@api_view(['GET'])
def podcast_download (request, podcast_id):
    podcast = Podcast.objects.filter(id = podcast_id).first()
    serializer = PodcastSerializer(podcast, fields = ['video_url'])
    if podcast: 
        return Response(serializer.data)
    else:
        return Response({"error": "Podcast not found."}, status=404)
    
@api_view(['GET'])
def podcast_recemonede(request):
    podcasts = Podcast.objects.all()
    serializer = PodcastSerializer(podcasts, many=True,fields = ['id', 'title'])
    return Response(serializer.data)

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.annotate(podcasts_count=Count('podcasts'))
    serializer = CategorySerializer(categories, many=True, fields = ['id', 'name', 'podcasts_count'])
    return Response(serializer.data)

@api_view(['GET'])
def podcasts_by_category(request, category_id):
    podcasts = Podcast.objects.filter(category=category_id)
    serializer = PodcastSerializer(podcasts, many=True, fields = ['id', 'title'])
    return Response(serializer.data)

