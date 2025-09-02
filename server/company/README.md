# Internship Management API Documentation

This API allows management of **companies**, **internships**, and **student registrations**. It is built using **Django REST Framework**.

Base URL: `/api/` (adjust according to your deployment)

---

## Table of Contents

1. [Company Endpoints](#company-endpoints)
2. [Internship Endpoints](#internship-endpoints)
3. [Apply for Internship](#apply-for-internship)
4. [Students Registered](#students-registered)
5. [Recommended Internships](#recommended-internships)

---

## Company Endpoints

### 1. Get All Companies

```
GET /companies/
```

**Response**

```json
[
    {
        "user_email": "hr@company.com",
        "user_id": 1,
        "id": 1,
        "name": "TechCorp",
        "description": "Tech Company",
        "logo": "http://example.com/logo.png",
        "website": "http://techcorp.com",
        "location": "Mumbai",
        "industry": "Tech",
        "founded_at": "2010-05-20",
        "contact_phone": "1234567890",
        "internships": []
    }
]
```

### 2. Get Single Company

```
GET /companies/<company_id>/
```

**Response** – Same structure as above for a single company.

### 3. Create Company

```
POST /companies/
```

**Request Body**

```json
{
    "name": "TechCorp",
    "description": "Software Company",
    "location": "Mumbai",
    "industry": "Tech",
    "founded_at": "2010-05-20",
    "contact_phone": "1234567890",
    "user": 1
}
```

**Response** – Created company JSON (201)

### 4. Update Company

```
PATCH /companies/<company_id>/
```

**Request Body** – Any fields to update

```json
{
    "description": "Updated Company Description"
}
```

**Response** – Updated company JSON (200)

### 5. Delete Company

```
DELETE /companies/<company_id>/
```

**Response**

```json
{"message": "Company deleted successfully"}
```

---

## Internship Endpoints

### 1. Get All Internships

```
GET /internships/
```

**Response**

```json
[
    {
        "id": 1,
        "company": 1,
        "title": "Software Developer Intern",
        "description": "Learn Django & React",
        "stipend": "₹10000",
        "duration": "3 Months",
        "location": "Remote",
        "skills_required": "Python, Django",
        "openings": 3,
        "application_deadline": "2025-09-10",
        "posted_at": "2025-08-30T12:00:00Z",
        "students_for_interview": [],
        "students_under_review": []
    }
]
```

### 2. Get Single Internship

```
GET /internships/<internship_id>/
```

**Response** – Single internship JSON

### 3. Create Internship

```
POST /internships/
```

**Request Body**

```json
{
    "company": 1,
    "title": "Software Developer Intern",
    "description": "Learn Django & React",
    "stipend": "₹10000",
    "duration": "3 Months",
    "location": "Remote",
    "skills_required": "Python, Django",
    "openings": 3,
    "application_deadline": "2025-09-10",
    "Interviewer_user": 2
}
```

**Response** – Created internship JSON (201)

### 4. Update Internship

```
PATCH /internships/<internship_id>/
```

**Request Body**

```json
{
    "stipend": "₹12000"
}
```

**Response** – Updated internship JSON (200)

### 5. Delete Internship

```
DELETE /internships/<internship_id>/
```

**Response**

```json
{"message": "Internship deleted successfully"}
```

---

## Apply for Internship

```
POST /apply/
```

Registers a student for all internships matching the given **title**. Sends an email to the company.

**Request Body**

```json
{
    "email": "student@example.com",
    "internship_title": "Software Developer Intern"
}
```

**Response**

```json
{
    "registered": [
        {
            "id": 1,
            "user": 2,
            "user_name": "John Doe",
            "internship": 1,
            "internship_name": "Software Developer Intern",
            "registered_at": "2025-08-30T13:00:00Z",
            "is_selected": false,
            "company_name": "TechCorp",
            "interviw_time": null,
            "company_description": "Tech Company",
            "company_email": "hr@company.com",
            "internship_description": "Learn Django & React"
        }
    ],
    "already_registered": ["Software Developer Intern"]
}
```

---

## Students Registered

### Update Student Registration

```
PATCH /students-registered/<internship_id>/
```

**Request Body**

```json
{
    "is_selected": true,
    "interviw_time": "2025-09-01T10:00:00Z"
}
```

**Response**

```json
{"message": "Data updated successfully."}
```

---

## Recommended Internships

```
POST /recommended-internship/
```

Returns internships whose **title contains** the keyword.

**Request Body**

```json
{
    "keyword": "Developer"
}
```

**Response**

```json
[
    {
        "id": 1,
        "company": 1,
        "title": "Software Developer Intern",
        "description": "Learn Django & React",
        "stipend": "₹10000",
        "duration": "3 Months",
        "location": "Remote",
        "skills_required": "Python, Django",
        "openings": 3,
        "application_deadline": "2025-09-10",
        "posted_at": "2025-08-30T12:00:00Z",
        "students_for_interview": [],
        "students_under_review": []
    }
]
```

---

### Notes

* All **date-time fields** are in ISO 8601 format (UTC).
* Emails are sent via `codecell@eng.rizvi.edu.in`.
* `StudentsRegistered` is unique per `(user, internship)`.
