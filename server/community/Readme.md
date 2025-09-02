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
    "id": 1,
    "title": "Post Title",
    "content": "Post content",
    "community": 1,
    "user": 5,
    "created_at": "2025-09-02T12:20:00Z"
  }
]
```

---

### Create Post

* **Route:** `/posts/`
* **Method:** POST
* **Auth:** User (must be member of community)
* **Request Body:**

```json
{
  "title": "New Post",
  "content": "Post content",
  "community": 1,
  "files": []  // optional multiple files
}
```

* **Response (201 Created):**

```json
{
  "id": 2,
  "title": "New Post",
  "content": "Post content",
  "community": 1,
  "user": 5,
  "created_at": "2025-09-02T12:25:00Z",
  "files": [
    {"id": 1, "file": "file1.png"}
  ]
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

> All of these use **ModelViewSet**, so standard CRUD is available.
> **Auth:** Required. Some updates/deletes restricted to owners.

* **Files:** `/files/` – Create & list only, no update/delete
* **Votes:** `/votes/` – Create, update/delete only by owner
* **Comments:** `/comments/` – Create, delete only by author or post author
* **Replies:** `/replies/` – Create, delete only by author or comment/post author
* **Comment Votes:** `/comment-votes/` – Create/update by user, delete by owner
* **Comment Reply Votes:** `/comment-reply-votes/` – Same as above
* **Saved Posts:** `/saved-posts/` – Create/delete by owner only
* **Community Users:** `/community-users/` – Create/delete by owner only
