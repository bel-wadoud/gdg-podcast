# GDG Talks API Documentation

This API provides endpoints for managing podcasts and categories in the GDG Talks application. It is built using Django REST Framework and allows frontend teams to easily integrate podcast-related functionalities. The API integrates with YouTube API to fetch video data and supports dynamic field serialization for flexible responses.

## Base URL

```
http://localhost:8000/api/
```

## Authentication

Currently, no authentication is required for the endpoints. All endpoints are publicly accessible.

## Data Models

### Podcast

- `id` (integer): Unique identifier for the podcast.
- `title` (string): Title of the podcast.
- `description` (string): Description of the podcast.
- `thumbnail` (string): URL to the podcast thumbnail image.
- `duration` (time): Duration of the podcast (HH:MM:SS format).
- `youtube_video_id` (string): YouTube Video ID (e.g., dQw4w9WgXcQ).
- `audio_url` (string): URL to the podcast audio.
- `guest` (integer): Number of guests in the podcast.
- `category` (array of integers): List of category IDs associated with the podcast.
- `published_at` (datetime): Publication date and time of the podcast.
- `view_count` (integer): Number of views on the YouTube video.
- `like_count` (integer): Number of likes on the YouTube video.
- `channel_title` (string): Title of the YouTube channel.
- `video_url` (string, computed): Generated YouTube watch URL from video ID (e.g., https://www.youtube.com/watch?v={youtube_video_id}).
- `embed_url` (string, computed): Generated YouTube embed URL from video ID (e.g., https://www.youtube.com/embed/{youtube_video_id}).
- `thumbnail_url` (string, computed): Returns stored thumbnail or generates from video ID (e.g., https://img.youtube.com/vi/{youtube_video_id}/maxresdefault.jpg).

### Category

- `id` (integer): Unique identifier for the category.
- `name` (string): Name of the category.
- `podcasts_count` (integer): Number of podcasts in this category (only included in category list).

## Endpoints

| Endpoint                            | Method | Description                                                    |
| ----------------------------------- | ------ | -------------------------------------------------------------- |
| /podcasts/                          | GET    | Retrieves a list of all podcasts with basic information.       |
| /podcasts/{id}/                     | GET    | Retrieves detailed information about a specific podcast.       |
| /podcasts/{podcast_id}/download/    | GET    | Retrieves the video URL for downloading a podcast.             |
| /user/recommend/                    | GET    | Retrieves a list of recommended podcasts.                      |
| /categories/                        | GET    | Retrieves a list of all categories with podcast counts.        |
| /categories/{category_id}/podcasts/ | GET    | Retrieves a list of podcasts belonging to a specific category. |
| /podcasts/create-from-youtube/      | POST   | Creates a new podcast by fetching data from YouTube API.       |

### 1. Get All Podcasts

**Endpoint:** `GET /podcasts/`  
**Description:** Retrieves a list of all podcasts with basic information.  
**Response Fields:** `id`, `title`, `thumbnail`, `duration`, `youtube_video_id`

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Introduction to AI",
    "thumbnail": "https://example.com/thumbnail1.jpg",
    "duration": "00:30:00",
    "youtube_video_id": "dQw4w9WgXcQ"
  },
  {
    "id": 2,
    "title": "Web Development Basics",
    "thumbnail": "https://example.com/thumbnail2.jpg",
    "duration": "00:45:00",
    "youtube_video_id": "abcdefghijk"
  }
]
```

### 2. Get Podcast by ID

**Endpoint:** `GET /podcasts/{id}/`  
**Description:** Retrieves detailed information about a specific podcast.  
**Parameters:**

- `id` (integer): The ID of the podcast.  
  **Response Fields:** `id`, `title`, `description`, `video_url`, `audio_url`, `guest`, `category`, `published_at`

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Introduction to AI",
    "description": "A comprehensive guide to artificial intelligence.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "audio_url": "https://example.com/audio1.mp3",
    "guest": 2,
    "category": [1, 2],
    "published_at": "2023-10-01T10:00:00Z"
  }
]
```

**Error Response (404):**

```json
{
  "error": "Podcast not found."
}
```

### 3. Download Podcast

**Endpoint:** `GET /podcasts/{podcast_id}/download/`  
**Description:** Retrieves the video URL for downloading a podcast.  
**Parameters:**

- `podcast_id` (integer): The ID of the podcast.  
  **Response Fields:** `video_url`

**Example Response:**

```json
{
  "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Error Response (404):**

```json
{
  "error": "Podcast not found."
}
```

### 4. Get Recommended Podcasts

**Endpoint:** `GET /user/recommend/`  
**Description:** Retrieves a list of recommended podcasts (currently returns all podcasts with basic info).  
**Response Fields:** `id`, `title`

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Introduction to AI"
  },
  {
    "id": 2,
    "title": "Web Development Basics"
  }
]
```

### 5. Get All Categories

**Endpoint:** `GET /categories/`  
**Description:** Retrieves a list of all categories with podcast counts.  
**Response Fields:** `id`, `name`, `podcasts_count`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Technology",
    "podcasts_count": 5
  },
  {
    "id": 2,
    "name": "Science",
    "podcasts_count": 3
  }
]
```

### 6. Get Podcasts by Category

**Endpoint:** `GET /categories/{category_id}/podcasts/`  
**Description:** Retrieves a list of podcasts belonging to a specific category.  
**Parameters:**

- `category_id` (integer): The ID of the category.  
  **Response Fields:** `id`, `title`

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Introduction to AI"
  },
  {
    "id": 3,
    "title": "Machine Learning Fundamentals"
  }
]
```

### 7. Create Podcast from YouTube

**Endpoint:** `POST /podcasts/create-from-youtube/`  
**Description:** Creates a new podcast by fetching data from YouTube API using the provided video URL. The URL is automatically parsed to extract the video ID.  
**Request Body:**

```json
{
  "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "audio_url": "https://example.com/audio.mp3",
  "guest": 1,
  "category": [1, 2]
}
```

**Required Fields:**

- `video_url` (string): The full YouTube video URL. Supports various formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`
  - `https://www.youtube.com/v/VIDEO_ID`

**Optional Fields:**

- `audio_url` (string): URL to the podcast audio.
- `guest` (integer): Number of guests (default: 0).
- `category` (array of integers): List of category IDs.

**Response Fields:** All podcast fields including auto-fetched YouTube data.

**Example Response (201 Created):**

```json
{
  "id": 3,
  "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
  "description": "The official video for 'Never Gonna Give You Up' by Rick Astley...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "duration": "00:03:33",
  "youtube_video_id": "dQw4w9WgXcQ",
  "audio_url": "https://example.com/audio.mp3",
  "guest": 1,
  "category": [1, 2],
  "published_at": "2023-10-01T12:00:00Z",
  "view_count": 1234567890,
  "like_count": 9876543,
  "channel_title": "Rick Astley",
  "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "thumbnail_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
}
```

**Error Responses:**

- **400 Bad Request:** Missing `video_url`, invalid YouTube URL format, invalid YouTube video ID, or podcast with this video ID already exists.

```json
{
  "error": "video_url is required"
}
```

```json
{
  "error": "Invalid YouTube URL format"
}
```

```json
{
  "error": "Podcast with this YouTube video ID already exists"
}
```

```json
{
  "error": "Invalid YouTube video ID or unable to fetch data"
}
```

## Error Handling

- **400 Bad Request:** Invalid request parameters, missing required fields, or duplicate YouTube video ID.
- **404 Not Found:** Resource not found (e.g., invalid podcast or category ID).
- **500 Internal Server Error:** Server-side error, including YouTube API failures.

## Usage Notes

- All endpoints return JSON responses.
- The API uses dynamic field serialization, so only specified fields are included in responses based on the `fields` parameter in serializers.
- Timestamps are in ISO 8601 format.
- YouTube integration requires a valid `YOUTUBE_API_KEY` in Django settings for the create-from-youtube endpoint.
- Computed fields (`video_url`, `embed_url`, `thumbnail_url`) are generated dynamically from `youtube_video_id`.
- Ensure to handle potential network errors and validate responses on the frontend.
- The video player uses YouTube embed URLs for video playback.

## Getting Started

1. Ensure you have a valid YouTube API key and add it to your Django settings as `YOUTUBE_API_KEY`.
2. Start the Django server: `python manage.py runserver`
3. Access the API at `http://localhost:8000/api/`
4. Use tools like Postman or curl to test endpoints.

For any questions or issues, contact the backend team.

## Frontend Integration Guide

This section provides comprehensive documentation for frontend developers integrating with the GDG Talks API.

### Base API URL

```javascript
const API_BASE_URL = "http://localhost:8000/api";
// Production: 'https://yourdomain.com/api'
```

### Integration Examples

Refer to the [Endpoints](#endpoints) section above for detailed API documentation. Below are code examples for integrating with the API.

### Embedding YouTube Videos

#### Method 1: Using embed_url from API

```jsx
const PodcastPlayer = ({ podcast }) => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        src={podcast.embed_url}
        title={podcast.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
```

#### Method 2: Using youtube_video_id

```jsx
const PodcastPlayer = ({ videoId, title }) => {
  return (
    <div className="video-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

// CSS
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Complete React Example

```jsx
import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000/api";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/podcasts/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPodcasts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

const PodcastCard = ({ podcast }) => {
  return (
    <div className="podcast-card">
      <img
        src={podcast.thumbnail}
        alt={podcast.title}
        onError={(e) => {
          e.target.src = `https://img.youtube.com/vi/${podcast.youtube_video_id}/maxresdefault.jpg`;
        }}
      />
      <h3>{podcast.title}</h3>
      <p>{podcast.duration}</p>
      <p>👁️ {podcast.view_count.toLocaleString()} views</p>
    </div>
  );
};

const VideoPlayer = ({ podcast }) => {
  return (
    <div className="video-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${podcast.youtube_video_id}?autoplay=1`}
        title={podcast.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default PodcastList;
```

### Important Notes

#### 1. CORS Setup Required

Make sure Django has CORS headers configured:

```python
# Django settings.py must have:
INSTALLED_APPS = ['corsheaders', ...]
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOWED_ORIGINS = ['http://localhost:3000']
```

#### 2. Video ID Format

YouTube video IDs are always 11 characters.  
Example: `dQw4w9WgXcQ`  
Extract from URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`

#### 3. Responsive Video Embed

Always use the aspect ratio wrapper to maintain 16:9 ratio:

```css
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 = 56.25% */
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

#### 4. Error Handling

Always handle errors:

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error("Failed to fetch:", error);
  // Show user-friendly error message
}
```

### Testing the API

#### Using Browser Console:

```javascript
// Test GET all podcasts
fetch("http://localhost:8000/api/podcasts/")
  .then((r) => r.json())
  .then(console.log);

// Test POST create podcast
fetch("http://localhost:8000/api/podcasts/create-from-youtube/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    guest: 1,
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

### Common Issues & Solutions

| Issue                       | Solution                                                                |
| --------------------------- | ----------------------------------------------------------------------- |
| CORS error                  | Check Django CORS settings                                              |
| 404 Not Found               | Verify API URL is correct                                               |
| Video not loading           | Check `youtube_video_id` is valid                                       |
| Thumbnail missing           | Use fallback: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` |
| Ad blocker blocking YouTube | This is normal - videos still work, analytics are blocked for privacy   |

For any questions or issues, contact the backend team!
