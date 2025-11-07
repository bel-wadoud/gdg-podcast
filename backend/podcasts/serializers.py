from rest_framework import serializers
from .models import Podcast, Category
from .utils import fetch_youtube_video_data

class PodcastSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()
    embed_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Podcast
        fields = '__all__'
        extra_kwargs = {
            'category': {'required': False},
            'audio_url': {'required': False}
        }

    def __init__(self, *args, **kwargs):
        # extract 'fields' param before passing kwargs to parent
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def get_video_url(self, obj):
        return obj.video_url

    def get_embed_url(self, obj):
        return obj.embed_url

    def get_thumbnail_url(self, obj):
        return obj.thumbnail_url

    def create(self, validated_data):
        youtube_video_id = validated_data.get('youtube_video_id')
        if youtube_video_id:
            # Fetch data from YouTube API
            youtube_data = fetch_youtube_video_data(youtube_video_id)
            if youtube_data:
                # Auto-populate fields from YouTube data
                validated_data['title'] = youtube_data['title']
                validated_data['description'] = youtube_data['description']
                validated_data['thumbnail'] = youtube_data['thumbnail']
                validated_data['duration'] = youtube_data['duration']
                validated_data['view_count'] = youtube_data['view_count']
                validated_data['like_count'] = youtube_data['like_count']
                validated_data['channel_title'] = youtube_data['channel_title']
        return super().create(validated_data)

    def update(self, instance, validated_data):
        youtube_video_id = validated_data.get('youtube_video_id')
        if youtube_video_id and youtube_video_id != instance.youtube_video_id:
            # Fetch new data from YouTube API if video ID changed
            youtube_data = fetch_youtube_video_data(youtube_video_id)
            if youtube_data:
                validated_data['title'] = youtube_data['title']
                validated_data['description'] = youtube_data['description']
                validated_data['thumbnail'] = youtube_data['thumbnail']
                validated_data['duration'] = youtube_data['duration']
                validated_data['view_count'] = youtube_data['view_count']
                validated_data['like_count'] = youtube_data['like_count']
                validated_data['channel_title'] = youtube_data['channel_title']
        return super().update(instance, validated_data)
                



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category 
        fields = '__all__' 

    def __init__(self, *args, **kwargs):
        # extract 'fields' param before passing kwargs to parent
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
