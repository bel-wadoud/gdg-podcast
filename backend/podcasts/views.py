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

