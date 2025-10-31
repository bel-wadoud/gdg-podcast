# API Structure

Base URL: `/api/`

---

## Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/register`          | Register using email + password |
| POST   | `/auth/register/google`   | Register using Google OAuth |
| POST   | `/auth/login`             | Login using email + password |
| POST   | `/auth/login/google`      | Login using Google OAuth |
| POST   | `/auth/logout`            | Logout |
| GET    | `/auth/me`                | Get current authenticated user |

---

## Public Podcasts (Landing Page)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/podcasts/`                                 | List all podcasts |
| GET    | `/podcasts/<podcast_id>/`                    | Get podcast details |
| GET    | `/podcasts/<podcast_id>/download/`           | Download/watch offline (if allowed) |

---

## Home Page Feed (Recommended)

| Method | Endpoint |
|--------|----------|
| GET    | `/user/` |

---

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/categories/`                             | List all categories |
| GET    | `/categories/<category_id>/`      | List podcasts in a category |

---

##  Profiles (Guests Profile Pages)

| Method | Endpoint |
|--------|----------|
| GET    | `/profiles/`              |
| GET    | `/profiles/<profile_id>/`   |

---

## User Profile & Activity

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `user/profile/`                      | Get user profile |
| PUT    | `/user/profile/`                      | Update profile |
| GET    | `/user/activity/last-viewed/`         | Get recently viewed podcasts |
| GET    | `/user/activity/saved/`               | Get saved podcasts |
| POST   | `/user/activity/save/<podcast_id>/`   | Save a podcast |
| DELETE | `/user/activity/save/<podcast_id>/`   | Remove saved podcast |

---

## Contact (Suggestions & Complaints)

| Method | Endpoint  |
|--------|-----------|
| GET    | /contacts/|
| POST   | `/contact/` |

---

## Admin Panel API

> Recommended prefix: `/admin/` or `/admin-panel/`

### Admin Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/admin/login` | Login admin |

### Manage Admin Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/admin/admins/`                | Add admin |
| DELETE | `/admin/admins/<admin_id>/`     | Remove admin |

### Manage Podcasts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/admin/podcasts/`                   | Upload / create podcast |
| PUT    | `/admin/podcasts/<podcast_id>/`      | Edit podcast |
| DELETE | `/admin/podcasts/<podcast_id>/`      | Delete podcast |

### Manage Guests

| Method | Endpoint |
|--------|----------|
| POST   | `/admin/guests/`               |
| PUT    | `/admin/guests/<guest_id>/`    |
| DELETE | `/admin/guests/<guest_id>/`    |

### View Contact Form Submissions

| Method | Endpoint |
|--------|----------|
| GET    | `/admin/contact/` |

---

&Copyright (c) 2025 Wadoud Bel. All Rights Reserved.
