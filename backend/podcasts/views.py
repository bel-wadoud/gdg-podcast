from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Podcast, Category
from .serializers import PodcastSerializer, CategorySerializer
from django.db.models import Count

# -------------------------
# Podcasts
# -------------------------

@extend_schema(
    summary="List all podcasts",
    description="Returns a list of all podcasts with basic info (id, title, thumbnail, duration).",
    tags=["Podcasts"],
    responses=PodcastSerializer(many=True)
)
@api_view(['GET'])
def podcast_list(request):
    podcasts = Podcast.objects.all()
    serializer = PodcastSerializer(podcasts, many=True, fields=['id', 'title', 'thumbnail', 'duration'])
    return Response(serializer.data)


@extend_schema(
    summary="Retrieve a podcast by ID",
    description="Returns detailed information about a single podcast.",
    tags=["Podcasts"],
    responses=PodcastSerializer
)
@api_view(['GET'])
def podcast_by_id(request, id):
    podcast = Podcast.objects.filter(id=id)
    serializer = PodcastSerializer(
        podcast, 
        many=True, 
        fields=['id', 'title', 'description', 'video_url', 'audio_url', 'guest', 'category', 'published_at']
    )
    return Response(serializer.data)


@extend_schema(
    summary="Get podcast download URL",
    description="Returns video URL of the podcast for downloading. Returns 404 if not found.",
    tags=["Podcasts"],
    responses={
        200: PodcastSerializer,
        404: OpenApiResponse(description="Podcast not found")
    }
)
@api_view(['GET'])
def podcast_download(request, podcast_id):
    podcast = Podcast.objects.filter(id=podcast_id).first()
    if podcast:
        serializer = PodcastSerializer(podcast, fields=['video_url'])
        return Response(serializer.data)
    else:
        return Response({"error": "Podcast not found."}, status=404)


@extend_schema(
    summary="Recommended podcasts",
    description="Returns a list of recommended podcasts with minimal info (id, title).",
    tags=["Podcasts"],
    responses=PodcastSerializer(many=True)
)
@api_view(['GET'])
def podcast_recemonede(request):
    podcasts = Podcast.objects.all()
    serializer = PodcastSerializer(podcasts, many=True, fields=['id', 'title'])
    return Response(serializer.data)


# -------------------------
# Categories
# -------------------------

@extend_schema(
    summary="List all categories",
    description="Returns all categories along with the count of podcasts in each.",
    tags=["Categories"],
    responses=CategorySerializer(many=True)
)
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.annotate(podcasts_count=Count('podcasts'))
    serializer = CategorySerializer(categories, many=True, fields=['id', 'name', 'podcasts_count'])
    return Response(serializer.data)


@extend_schema(
    summary="List podcasts by category",
    description="Returns podcasts that belong to a specific category, with minimal info (id, title).",
    tags=["Categories"],
    responses=PodcastSerializer(many=True)
)
@api_view(['GET'])
def podcasts_by_category(request, category_id):
    podcasts = Podcast.objects.filter(category=category_id)
    serializer = PodcastSerializer(podcasts, many=True, fields=['id', 'title'])
    return Response(serializer.data)


@extend_schema(
    summary="Create Podcast from YouTube URL",
    description=(
        "Creates a Podcast entry by extracting metadata from a YouTube video. "
        "Requires a valid YouTube video URL. "
        "If the podcast already exists, it returns an error."
    ),
    request=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'video_url': openapi.Schema(type=openapi.TYPE_STRING, description="YouTube Video URL"),
            'audio_url': openapi.Schema(type=openapi.TYPE_STRING, description="URL to the extracted audio file"),
            'guest': openapi.Schema(type=openapi.TYPE_INTEGER, description="Guest ID (user with role=podcaster)"),
            'category': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_INTEGER), description="List of Category IDs")
        },
        required=['video_url']
    ),
    responses={
        201: OpenApiResponse(description="Podcast created successfully"),
        400: OpenApiResponse(description="Invalid request"),
    },
    examples=[
        OpenApiExample(
            'Example Payload',
            value={
                "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "audio_url": "https://mycdn.com/audio/file.mp3",
                "guest": 3,
                "category": [1, 2]
            }
        )
    ],
)
@api_view(['POST'])
def create_podcast_from_youtube(request):
    """
    Create a podcast from YouTube video URL
    Expects: {"video_url": "...", "audio_url": "...", "guest": 1, "category": [1,2]}
    """
    video_url = request.data.get('video_url')
    if not video_url:
        return Response({"error": "video_url is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Extract video ID
    youtube_video_id = extract_youtube_video_id(video_url)
    if not youtube_video_id:
        return Response({"error": "Invalid YouTube URL format"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if already exists
    if Podcast.objects.filter(youtube_video_id=youtube_video_id).exists():
        return Response({"error": "Podcast with this YouTube video ID already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch YouTube metadata
    youtube_data = fetch_youtube_video_data(youtube_video_id)
    if not youtube_data:
        return Response({"error": "Invalid YouTube video ID or unable to fetch data"}, status=status.HTTP_400_BAD_REQUEST)

    # Prepare data
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
        # Validate categories
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

