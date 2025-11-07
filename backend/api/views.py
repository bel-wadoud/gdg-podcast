from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from podcust.models import Podcast, Category
from .serializers import PodcastSerializer, CategorySerializer
from .utils import fetch_youtube_video_data, extract_youtube_video_id
from django.db.models import Count

@api_view(['GET'])
def podcast_list(request):
    podcasts = Podcast.objects.all()
    serializer = PodcastSerializer(podcasts, many=True, fields = ['id', 'title', 'thumbnail', 'duration', 'youtube_video_id'])
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

@api_view(['POST'])
def create_podcast_from_youtube(request):
    """
    Create a podcast from YouTube video URL
    Expects: {"video_url": "https://www.youtube.com/watch?v=VIDEO_ID", "audio_url": "URL", "guest": 1, "category": [1,2]}
    """
    video_url = request.data.get('video_url')
    if not video_url:
        return Response({"error": "video_url is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Extract video ID from URL
    youtube_video_id = extract_youtube_video_id(video_url)
    if not youtube_video_id:
        return Response({"error": "Invalid YouTube URL format"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if podcast with this video ID already exists
    if Podcast.objects.filter(youtube_video_id=youtube_video_id).exists():
        return Response({"error": "Podcast with this YouTube video ID already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch YouTube data
    youtube_data = fetch_youtube_video_data(youtube_video_id)
    if not youtube_data:
        return Response({"error": "Invalid YouTube video ID or unable to fetch data"}, status=status.HTTP_400_BAD_REQUEST)

    # Prepare data for serializer
    podcast_data = {
        'youtube_video_id': youtube_video_id,
        'title': youtube_data['title'],
        'description': youtube_data['description'],
        'thumbnail': youtube_data['thumbnail'],
        'duration': youtube_data['duration'],
        'audio_url': request.data.get('audio_url'),
        'guest': request.data.get('guest', 0),
        'view_count': youtube_data['view_count'],
        'like_count': youtube_data['like_count'],
        'channel_title': youtube_data['channel_title']
    }

    serializer = PodcastSerializer(data=podcast_data)
    if serializer.is_valid():
        if 'category' in request.data:
            category_ids = request.data['category']
            if not isinstance(category_ids, list):
                return Response({"error": "category must be a list of IDs"}, status=status.HTTP_400_BAD_REQUEST)
            existing_categories = Category.objects.filter(id__in=category_ids).values_list('id', flat=True)
            if len(existing_categories) != len(category_ids):
                return Response({"error": "One or more category IDs do not exist"}, status=status.HTTP_400_BAD_REQUEST)
        podcast = serializer.save()
        if 'category' in request.data:
            podcast.category.set(request.data['category'])
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

