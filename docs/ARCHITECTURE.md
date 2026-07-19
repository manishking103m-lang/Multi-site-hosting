# System Architecture

## Overview

The Multi-Site Hosting Platform is built with a microservices-inspired architecture that allows hosting multiple websites efficiently.

## Components

### 1. Reverse Proxy (Nginx)
- Routes traffic based on domain/subdomain
- Handles SSL/TLS termination
- Manages load balancing
- Compresses responses

### 2. Backend API (Node.js/Express)
- Site management (CRUD operations)
- User authentication & authorization
- Database operations
- Analytics tracking

### 3. Frontend (Next.js)
- Admin dashboard
- Site management UI
- User authentication
- Real-time updates

### 4. Database (PostgreSQL)
- Site configurations
- User data
- Analytics
- Settings

## Database Schema

```
Users
├── id (PK)
├── email (UNIQUE)
├── password (hashed)
├── name
└── role

Sites
├── id (PK)
├── user_id (FK)
├── name
├── domain (UNIQUE)
├── template
├── status
├── settings (JSON)
├── created_at
└── updated_at

Analytics
├── id (PK)
├── site_id (FK)
├── date
├── requests
├── unique_visitors
├── bandwidth_used
└── errors
```

## Traffic Flow

1. User visits `site1.example.com`
2. Nginx reverse proxy intercepts request
3. Routes to appropriate backend site handler
4. Backend processes request
5. Response returned to user

## Scaling Strategy

- **Horizontal**: Add more backend instances behind load balancer
- **Vertical**: Increase server resources
- **Database**: Read replicas for analytics queries
- **CDN**: Cache static assets globally

## Security

- JWT-based authentication
- CORS policy enforcement
- Input validation
- SQL injection prevention (parameterized queries)
- XSS protection
- HTTPS/SSL enforcement
