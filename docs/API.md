# API Documentation

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Sites

#### List Sites
```
GET /api/sites

Response:
{
  "sites": [
    {
      "id": 1,
      "name": "My Website",
      "domain": "mysite.com",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Create Site
```
POST /api/sites
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Website",
  "domain": "newsite.com",
  "template": "blank"
}

Response:
{
  "id": 2,
  "name": "New Website",
  "domain": "newsite.com",
  "template": "blank",
  "status": "creating",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

#### Get Site Details
```
GET /api/sites/:id

Response:
{
  "id": 1,
  "name": "My Website",
  "domain": "mysite.com",
  "status": "active",
  "settings": {...}
}
```

#### Update Site
```
PUT /api/sites/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "settings": {...}
}
```

#### Delete Site
```
DELETE /api/sites/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Site deleted"
}
```

### Admin

#### Get Statistics
```
GET /api/admin/stats
Authorization: Bearer <admin-token>

Response:
{
  "totalSites": 42,
  "activeSites": 38,
  "totalUsers": 156,
  "activeUsers": 89,
  "totalBandwidth": "1.2 TB",
  "uptime": "99.9%"
}
```

#### Get Analytics
```
GET /api/admin/analytics?period=7d
Authorization: Bearer <admin-token>

Response:
{
  "daily": [...],
  "topSites": [...],
  "summary": {...}
}
```

## Error Responses

```
400 Bad Request
{
  "error": "Description of what went wrong"
}

401 Unauthorized
{
  "error": "Invalid or missing token"
}

403 Forbidden
{
  "error": "You don't have permission to access this"
}

404 Not Found
{
  "error": "Resource not found"
}

500 Internal Server Error
{
  "error": "An unexpected error occurred"
}
```
