# Community API Documentation
This API allows management of **community**, **post inside communities**, and **like, comment and save**. It is built using **Django REST Framework**.

Base URL: `/api/community/`


## Authentication

* All endpoints require **JWT authentication**.
* Use `Authorization: Bearer <token>` header.
* Some endpoints require user role (`admin` / `super_admin`) in the community.


## 🔑 Authentication Flow

### Headers Required

Every request to the API **must** include the following headers:

``` http
Authorization: <JWT_TOKEN>
x-auth-app: <FRONTEND_SECRET>
```

-   `Authorization`: JWT token generated when user logs in.
-   `x-auth-app`: A secret key shared between frontend and backend (must
    match `.env` → `FRONTEND_SECRET`).

---

## 1. Communities

### List Communities

* **Route:** `/communities/`
* **Method:** GET
* **Auth:** User
* **Description:** Fetch all communities.
* **Request Body:** None
* **Response:**

```json
[
 {
    "id": 1,
    "name": "Name of the Community",
    "description": "Good community description",
    "created_at": "2025-09-01T00:10:39.820034Z",
    "total_members_count": 1,
    "user_role": "super_admin",
    "profile_picture": "http://api-ape.crodlin.in/media/community_profiles/20250804_1922_Tech_Devices_Showcase_simple_compose_01k1tnjampfyx82qys6e3ey91m.png"
  }
]
```

---

### Retrieve Community Detail

* **Route:** `/communities/<int:pk>/`
* **Method:** GET
* **Auth:** User
* **Description:** Get detail of a specific community.
* **Response:**

```json
{
    "id": 1,
    "name": "aa",
    "description": "aa",
    "created_at": "2025-09-01T00:10:39.820034Z",
    "total_members_count": 1,
    "user_role": "super_admin",
    "profile_picture": "http://api-ape.crodlin.in/media/community_profiles/20250804_1922_Tech_Devices_Showcase_simple_compose_01k1tnjampfyx82qys6e3ey91m.png"
  }
```

---

### Create Community

* **Route:** `/communities/`
* **Method:** POST
* **Auth:** User

### Request Body (Form Fields)
| Field Name       | Type     | Required | Description                    |
|-----------------|----------|----------|--------------------------------|
| name            | string   | Yes      | Name of the community          |
| description     | string   | No       | Short description of community |
| profile_picture | file     | No       | Optional profile picture file  |


* **Response (201 Created):**

```json
{
  "id": 2,
  "name": "New Community",
  "description": "Description here",
  "created_at": "2025-09-02T12:10:00Z",
  "total_member_count":4,
  "user_role":"super_admin",
  "profile_picture":"/media/image.png"
}
```

* **Notes:** Creator is automatically added as `super_admin`.

---

### Update Community

* **Route:** `/communities/<int:pk>/`
* **Method:** PUT
* **Auth:** User with role `admin` or `super_admin`
* **Request Body (partial allowed):**

```json
{
  "name": "Updated Name"
}
```

* **Response (200 OK):**

```json
{
  "id": 2,
  "name": "Updated Name",
  "description": "Description here",
  "created_at": "2025-09-02T12:10:00Z"
}
```

---

### Delete Community

* **Route:** `/communities/<int:pk>/`
* **Method:** DELETE
* **Auth:** User with role `super_admin`
* **Response:** `204 No Content`

---

## 2. Posts

### List Posts

* **Route:** `/posts/`
* **Method:** GET
* **Auth:** User
* **Description:** Get all posts.
* **Response:**

```json
[
  {
    "id": 2,
    "title": "Day 1 of deploying",
    "content": "Day 1 of “Deploy on Your Own Laptop” series!
No more burning cash on EC2 😎
👉 Step 1: Make sure your laptop runs Linux OS (Ubuntu / Fedora / Debian etc.)
Why? Because Linux = developer’s paradise for servers 🐧",
    "created_at": "2025-09-01T02:47:03.984125Z",
    "updated_at": "2025-09-01T02:47:03.984136Z",
    "votes_like_count": 0,
    "votes_dislike_count": 0,
    "saved_count": 0,
    "community_name": "Devops Community",
    "files": [],
    "user_vote": null,
    "user_saved": false,
    "user_comments": []
  }
]
```

---

### Retrieve Specific Posts

* **Route:** `/posts/<int:pk>`
* **Method:** GET
* **Auth:** User
* **Description:** Get specific post details.
* **Response:**

```json

  {
    "id": 2,
    "title": "Day 1 of deploying",
    "content": "Day 1 of “Deploy on Your Own Laptop” series!
No more burning cash on EC2 😎
👉 Step 1: Make sure your laptop runs Linux OS (Ubuntu / Fedora / Debian etc.)
Why? Because Linux = developer’s paradise for servers 🐧",
    "created_at": "2025-09-01T02:47:03.984125Z",
    "updated_at": "2025-09-01T02:47:03.984136Z",
    "votes_like_count": 0,
    "votes_dislike_count": 0,
    "saved_count": 0,
    "community_name": "Devops Community",
    "files": [],
    "user_vote": null,
    "user_saved": false,
    "user_comments": []
  }
```

---

### Create Post

* **Route:** `/posts/`
* **Method:** POST
* **Auth:** User (must be member of community)
* **Request Body:**


| Field      | Type     | Required | Description                                      |
|------------|----------|----------|--------------------------------------------------|
| `title`    | string   | Yes      | Title of the post                                |
| `content`  | string   | Yes      | Content/body of the post                         |
| `community`| integer  | Yes      | ID of the community where the post is created    |
| `files`    | array    | No       | List of files (optional, supports multiple files)|

* **Response (201 Created):**

```json
{
    "id": 3,
    "title": "this is the asendfjndmnf",
    "content": "testing this blog can say it is a good one but foir just teweting",
    "created_at": "2025-09-03T05:39:49.047699Z",
    "updated_at": "2025-09-03T05:39:49.047722Z",
    "votes_like_count": 0,
    "votes_dislike_count": 0,
    "saved_count": 0,
    "community_name": "aa",
    "files": [],
    "user_vote": null,
    "user_saved": false,
    "user_comments": []
}
```

---

### Update Post

* **Route:** `/posts/<int:pk>/`
* **Method:** PUT
* **Auth:** Post author
* **Request Body:** Partial allowed

```json
{
  "content": "Updated content"
}
```

* **Response (200 OK):** Updated post JSON

---

### Delete Post

* **Route:** `/posts/<int:pk>/`
* **Method:** DELETE
* **Auth:** Post author or `admin`/`super_admin` of community
* **Response:** `204 No Content`

---

## 3. Role Management

### Assign / Update Role

* **Route:** `/communities/<int:community_id>/roles/`
* **Method:** POST
* **Auth:** `admin` / `super_admin`
* **Request Body:**

```json
{
  "user_id": 10,
  "role": "admin"
}
```

* **Response (200 OK or 201 Created):**

```json
{
  "id": 5,
  "user": 10,
  "community": 1,
  "role": "admin"
}
```

* **Notes:**

  * `super_admin` can do anything.
  * `admin` cannot modify `super_admin`.

---

## 4. User Activity

### User Activity Overview

* **Route:** `/users/activity/`
* **Method:** GET
* **Auth:** User
* **Response:**

```json
{
  "user_id": 5,
  "email": "user@example.com",
  "communities": [
    {
      "community_id": 1,
      "community_name": "Tech Club",
      "role": "member",
      "user_posts_count": 3,
      "liked_posts_count": 5,
      "disliked_posts_count": 1,
      "saved_posts_count": 2,
      "user_posts": [...],
      "liked_posts": [...],
      "disliked_posts": [...],
      "saved_posts": [...]
    }
  ]
}
```

---

## 5. DRF ViewSets (Files, Votes, Comments, Replies, Saves, Community Users)

All of these endpoints are registered via DRF **DefaultRouter**, so they follow standard RESTful patterns.  
**Auth:** JWT or Session required.  
**Note:** Updates & deletes are restricted to owners or related post/comment owners where specified.

---

### 5.1 Files
**Endpoint:** `/files/`

| Method | Path              | Description |
|--------|------------------|-------------|
| `POST` | `/files/`        | Upload a file for a post. |
| `GET`  | `/files/`        | List all uploaded files (filtered by permissions). |

🔒 **No update/delete allowed.**

**Example `POST /files/`:**
```json
{
  "post": 12,
  "file": "binary file upload"
}
```

---

### 5.2 Votes (on Posts)
**Endpoint:** `/votes/`

| Method   | Path              | Description |
|----------|------------------|-------------|
| `POST`   | `/votes/`        | Add an upvote/downvote to a post. |
| `PUT`    | `/votes/{id}/`   | Update a vote (change upvote ↔ downvote). |
| `DELETE` | `/votes/{id}/`   | Remove your vote. |

🔒 Only the **owner** can update or delete their vote.

**Example `POST /votes/`:**
```json
{
  "post": 12,
  "value": 1
}
```

---

### 5.3 Comments
**Endpoint:** `/comments/`

| Method   | Path               | Description |
|----------|-------------------|-------------|
| `POST`   | `/comments/`      | Add a comment to a post. |
| `GET`    | `/comments/`      | List all comments. |
| `DELETE` | `/comments/{id}/` | Delete comment (by author or post author). |

**Example `POST /comments/`:**
```json
{
  "post": 12,
  "content": "Nice post!",
  "tag": 45
}
```

---

### 5.4 Replies (to Comments)
**Endpoint:** `/replies/`

| Method   | Path              | Description |
|----------|------------------|-------------|
| `POST`   | `/replies/`      | Add a reply to a comment. |
| `GET`    | `/replies/`      | List replies. |
| `DELETE` | `/replies/{id}/` | Delete reply (by reply author, comment author, or post author). |

**Example `POST /replies/`:**
```json
{
  "comment": 88,
  "content": "Totally agree!",
  "tag": 45
}
```

---

### 5.5 Comment Votes
**Endpoint:** `/comment-votes/`

| Method   | Path                     | Description |
|----------|-------------------------|-------------|
| `POST`   | `/comment-votes/`       | Add an upvote/downvote on a comment. |
| `PUT`    | `/comment-votes/{id}/`  | Update your vote. |
| `DELETE` | `/comment-votes/{id}/`  | Remove your vote. |

🔒 Only the **owner** can update/delete.

**Example `POST /comment-votes/`:**
```json
{
  "comment": 88,
  "value": -1
}
```

---

### 5.6 Comment Reply Votes
**Endpoint:** `/comment-reply-votes/`

| Method   | Path                          | Description |
|----------|------------------------------|-------------|
| `POST`   | `/comment-reply-votes/`      | Add an upvote/downvote on a reply. |
| `PUT`    | `/comment-reply-votes/{id}/` | Update your vote. |
| `DELETE` | `/comment-reply-votes/{id}/` | Remove your vote. |

🔒 Only the **owner** can update/delete.

**Example `POST /comment-reply-votes/`:**
```json
{
  "reply": 44,
  "value": 1
}
```

---

### 5.7 Saved Posts
**Endpoint:** `/saved-posts/`

| Method   | Path                      | Description |
|----------|--------------------------|-------------|
| `POST`   | `/saved-posts/`          | Save a post for the logged-in user. |
| `DELETE` | `/saved-posts/{id}/`     | Unsave a post. |
| `GET`    | `/saved-posts/`          | List saved posts of the user. |

🔒 Only the **owner** can create/delete saves.

**Example `POST /saved-posts/`:**
```json
{
  "post": 12
}
```

---

### 5.8 Community Users (Roles in Community)
**Endpoint:** `/community-users/`

| Method   | Path                       | Description |
|----------|---------------------------|-------------|
| `POST`   | `/community-users/`       | Join a community (default role = member). |
| `DELETE` | `/community-users/{id}/`  | Leave a community. |
| `GET`    | `/community-users/`       | List all community memberships. |

🔒 Only the **user** can join/leave themselves (admins can remove members).

**Example `POST /community-users/`:**
```json
{
  "community": 5,
  "role": "member"
}
```