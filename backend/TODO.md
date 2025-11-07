# TODO: Convert POST endpoint to accept video_url and extract video_id

## Steps to Complete:

- [x] Add utility function `extract_youtube_video_id` in `api/utils.py` to parse YouTube URLs and extract video ID.
- [x] Update `create_podcast_from_youtube` view in `api/views.py` to accept `video_url` instead of `youtube_video_id`, use the new utility to extract ID.
- [x] Update README.md to document the change in the POST endpoint (accept `video_url` instead of `youtube_video_id`).
- [x] Test the changes (run server and verify endpoint works with URL input).
