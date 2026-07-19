# Multi-Site Hosting Platform

A scalable website hosting platform that allows you to host and manage multiple websites in a single application.

## Features

- 🌐 Host multiple websites
- 🔐 Secure isolated environments
- 📊 Admin dashboard
- 🚀 Auto-scaling capabilities
- 💾 Database per site or shared
- 🔄 Easy site management
- 📈 Analytics and monitoring

## Architecture

```
┌─────────────────┐
│   Load Balancer │
│    (Nginx)      │
└────────┬────────┘
         │
         ├─── Domain 1 ─→ Site 1
         ├─── Domain 2 ─→ Site 2
         ├─── Domain 3 ─→ Site 3
         └─── Domain N ─→ Site N
```

## Tech Stack

- **Frontend**: Next.js 14+
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Reverse Proxy**: Nginx
- **Containerization**: Docker
- **Runtime**: Node.js

## Quick Start

### Using Docker Compose

```bash
docker-compose up -d
```

### Manual Setup

1. Install dependencies:
```bash
cd frontend && npm install
cd ../backend && npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
```

3. Run migrations:
```bash
cd backend
npm run migrate
```

4. Start services:
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## API Endpoints

### Sites Management
- `GET /api/sites` - List all sites
- `POST /api/sites` - Create new site
- `GET /api/sites/:id` - Get site details
- `PUT /api/sites/:id` - Update site
- `DELETE /api/sites/:id` - Delete site

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - Manage users
- `GET /api/admin/analytics` - Analytics data

## Configuration

See `docs/configuration.md` for detailed configuration options.

## Deployment

See `docs/deployment.md` for production deployment guides.

## License

MIT
