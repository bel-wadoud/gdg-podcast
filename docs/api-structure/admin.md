## Admin API

### Admin Login
#### POST | `/admin/login/`
**Request**
```json 
{
  "email": "admin@mail.com",
  "password": "AdminPassword123"
}
```

**Response**
```json
{
  "token": "ADMIN_JWT_TOKEN",
  "admin": {
    "id": 1,
    "email": "admin@mail.com",
    "role": "superadmin"
  }
}
```

### Add Admin Account
#### POST | `/admin/add/`
**Request**
```json
{
  "email": "newadmin@mail.com",
  "password": "SecurePass123",
}
```

**Response**
```json
{
  "id": 3,
  "email": "newadmin@mail.com",
}
```

### Delete Admin
#### DELETE `/admin/add/<admin_id>`
**Response**
{ "detail": "Admin removed" }

### Create Podcast
#### POST | `/admin/podcasts/new/`
**Request**
```json
{
  "title": "New Episode",
  "description": "Detailed description here...",
  "category_id": 3,
  "guest_id": 7,
  "video_file": "FILE",
  "audio_file": "FILE"
}
```

**Response**
```json
{
  "id": 30,
  "title": "New Episode",
  "category": { "id": 3, "name": "Technology" },
  "guest": { "id": 7, "name": "John Carter" }
}
```

### Edit Podcast
#### PUT | `/admin/podcasts/<podcast_id>/`
**Request**
```json
{
  "title": "Updated Episode Title",
  "description": "Updated description"
}
```

**Response**
```json
{ "detail": "Podcast updated" }
```

### Delete Podcast
#### DELETE | `/admin/podcasts/<podcast_id>/`
**Response**
```json
{ "detail": "Podcast deleted" }
```

### Create Guests
#### POST | `/admin/guests/`
**Request**
```json
{
  "name": "New Guest",
  "bio": "Short bio...",
  "image": "FILE"
}
```

**Response**
```json 
{
  "id": 11,
  "name": "New Guest",
  "bio": "Short bio..."
}
```

### Edit Guest
#### PUT | `/admin/guests/<guest_id>`
**Request**
```json
{
  "bio": "Updated biography"
}
```

**Response**
```json
{ "detail": "Guest updated" }
```

### Delete Guest
#### DELETE | `/admin/guests/<guest_id>/`
**Response**
```json
{ "detail": "Guest deleted" }
```

### View Contact Submissions
#### GET | `/admin/contact/`
**Response**
```json
[
  {
    "id": 19,
    "email": "someone@mail.com",
    "message": "Please improve video loading speed.",
    "submitted_at": "2025-03-01T11:50:23Z"
  }
]
```

