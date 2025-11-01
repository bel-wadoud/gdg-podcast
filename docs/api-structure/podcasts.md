## API Structure

Base URL: `/api/`

--

### List Podcasts
#### GET | `/podcasts/`
**Response**
```json
[
  {
    "id": 14,
    "title": "How AI Will Change The World",
    "thumbnail": "/media/podcasts/14/thumb.jpg",
    "duration": "01:13:40"
  }
]
``` 

### Podcast Details
#### GET | `/podcasts/<podcast_id>/`
**Response**
```json
{
  "id": 14,
  "title": "How AI Will Change The World",
  "description": "In this episode...",
  "video_url": "/media/podcasts/14/video.mp4",
  "audio_url": "/media/podcasts/14/audio.mp3",
  "guest": { "id": 7, "name": "John Carter" },
  "category": { "id": 3, "name": "Technology" },
  "published_at": "2025-02-12T14:30:00Z"
}
```

### Download Offline Video
#### GET | `/podcasts/<podcast_id>/download/`
**Response**
```json
{ "file_url": "/media/podcasts/14/audio.mp3" }
```

### Recommended Feed
#### GET | /user/recommended/
**Response**
```json
[
  { "id": 20, "title": "Quantum Computing Explained" },
  { "id": 15, "title": "The Future of Neuroscience" }
]
```

### List Categories
#### GET | `/categories/`
**Response**
```json
[
  { "id": 3, "name": "Technology", "podcasts_count": 24 },
  { "id": 5, "name": "Health", "podcasts_count": 18 }
]
```

### Podcasts by categories
#### GET | `/categories/3/podcasts/`
**Response**
```json
[
  { "id": 14, "title": "How AI Will Change The World" },
  { "id": 20, "title": "Quantum Computing Explained" }
]
```

### List Guests
#### Get | `/guests/`
**Response**
```json
[
  { "id": 7, "name": "John Carter", "image": "/media/guests/john.png" }
]
```

### Guest Details
#### Get | `/guests/<guest_id>/`
**Response**
```json
{
  "id": 7,
  "name": "John Carter",
  "bio": "Machine Learning researcher...",
  "image": "/media/guests/john.png",
  "social_links": {
    "instagram": "@john.ml",
    "twitter": "@john_ai"
  }
}
```

### Contact Form
#### POST | `/contact/`
**Request**
```json
{
  "email": "someone@mail.com",
  "message": "I suggest adding timestamps to each topic."
}
```

**Response**
```json
{
  "email": "someone@mail.com",
  "message": "I suggest adding timestamps to each topic."
}
```
