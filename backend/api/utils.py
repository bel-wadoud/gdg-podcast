import os
import isodate
import re
from googleapiclient.discovery import build
from django.conf import settings

def extract_youtube_video_id(url):
    """
    Extract YouTube video ID from various URL formats.
    Supports:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    - https://www.youtube.com/v/VIDEO_ID
    Returns: video_id string or None if not found
    """
    patterns = [
        r'(?:https?://)?(?:www\.)?youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})',
        r'(?:https?://)?youtu\.be/([a-zA-Z0-9_-]{11})',
        r'(?:https?://)?(?:www\.)?youtube\.com/embed/([a-zA-Z0-9_-]{11})',
        r'(?:https?://)?(?:www\.)?youtube\.com/v/([a-zA-Z0-9_-]{11})'
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def get_youtube_service():
    """Initialize and return YouTube API service"""
    api_key = getattr(settings, 'YOUTUBE_API_KEY', None)
    if not api_key:
        raise ValueError("YOUTUBE_API_KEY not found in settings")
    return build('youtube', 'v3', developerKey=api_key)

def fetch_youtube_video_data(video_id):
    """
    Fetch video data from YouTube API
    Returns: dict with title, description, thumbnail, duration, view_count, like_count, channel_title
    """
    try:
        youtube = get_youtube_service()
        request = youtube.videos().list(
            part='snippet,statistics,contentDetails',
            id=video_id
        )
        response = request.execute()

        if not response['items']:
            return None

        video = response['items'][0]
        snippet = video['snippet']
        statistics = video['statistics']
        content_details = video['contentDetails']

        # Parse duration from ISO 8601 format to HH:MM:SS
        duration_iso = content_details['duration']
        duration_parsed = isodate.parse_duration(duration_iso)
        duration_str = f"{duration_parsed.seconds // 3600:02d}:{(duration_parsed.seconds % 3600) // 60:02d}:{duration_parsed.seconds % 60:02d}"

        return {
            'title': snippet['title'],
            'description': snippet['description'],
            'thumbnail': snippet['thumbnails'].get('maxres', snippet['thumbnails'].get('high', {}))['url'],
            'duration': duration_str,
            'view_count': int(statistics.get('viewCount', 0)),
            'like_count': int(statistics.get('likeCount', 0)),
            'channel_title': snippet['channelTitle']
        }
    except Exception as e:
        print(f"Error fetching YouTube data for video {video_id}: {str(e)}")
        return None
