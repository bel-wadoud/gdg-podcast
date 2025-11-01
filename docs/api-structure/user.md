# API Structure

Base URL: `/api/`

---

## Auth

### Register

#### POST | `/auth/register`

**Request**
```json
{
  "email": "user@example.com",
  "password": "pass",
  "username": "username"
}
```
**Response**
```json
{
  "id": 45,
  "email": "user@example.com",
  "username": "wadoud",
  "token": "JWT_ACCESS_TOKEN"
}
```

### Login
#### POST | `/auth/login`

**Request**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

**Response**
```json
{
  "token": "JWT_ACCESS_TOKEN",
  "user": {
    "id": 45,
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Logout
#### POST | `/auth/logout`

**Response**
```json
{ "detail": "Logged out successfully" }
```

### Get Current User
#### GET | `/auth/me` 

**Response**
```json
{
  "id": 45,
  "email": "user@example.com",
  "username": "username",
  "avatar": "/media/avatars/user.png"
}
```

### Forgot password
#### POST | `/auth/password/forgot` 
**Request**
```json
{
  "email": "user@example.com"
}
```

**Response**
```json
{ "detail": "Password reset email sent" }
```

### Reset Password
#### POST | `/auth/password/reset`
**Request**
```json
{
  "token": "RESET_TOKEN_HERE",
  "current_password": "current",
  "new_password": "NewStrongPassword123"
}
```

**Response**
```json
{ "detail": "Password has been reset successfully" }
```

### Get User Profile
#### GET | `/user/profile/`
**Response**
```json
{
  "id": 45,
  "email": "user@example.com",
  "username": "wadoud",
  "avatar": "/media/avatars/user.png"
}
```

### Update Profile
#### PUT | `/user/profile/`
**Request**
```json
{
  "username": "new_username",
  "avatar": "BASE64_IMAGE_OR_FILE_UPLOAD"
}
```

**Response**
```json
{
  "id": 45,
  "username": "new_username",
  "avatar": "/media/avatars/new_avatar.png"
}
```

### Last Viewed
#### GET | `/user/activity/last-viewed/`
**Response**
```json
[
  { "id": 14, "title": "How AI Will Change The World" },
  { "id": 9, "title": "History of Programming Languages" }
]
```

### Saved Podcasts
#### GET | `/user/activity/saved/`
**Response**
```json
[
  { "id": 20, "title": "Quantum Computing Explained" },
  { "id": 5, "title": "The Rise of Remote Work" }
]
```

### Save Podcast
#### POST | `/user/activity/save/<podcast_id>/`
**Response**
```json
{ "detail": "Podcast saved" }
```

### Remove saved podcast
#### DELETE | `/user/activity/save/<podcast_id>/`
**Response**
```json
{ "detail": "Podcast removed" }
```


&Copyright (c) 2025 Wadoud Bel. All Rights Reserved.
