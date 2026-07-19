# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 18+
- PostgreSQL 14+
- Nginx 1.20+

## Local Development

```bash
# Clone repository
git clone <repo-url>
cd multi-site-hosting

# Setup environment
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start services
docker-compose up -d

# Access application
# Frontend: http://localhost:3000
# API: http://localhost:5000
# Admin: http://localhost:3000/admin
```

## Production Deployment

### Using AWS EC2

1. Launch Ubuntu 22.04 instance
2. Install Docker & Docker Compose
3. Clone repository
4. Configure domain/SSL
5. Run: `docker-compose -f docker-compose.prod.yml up -d`

### Using Heroku

```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Using DigitalOcean

1. Create Droplet (2GB RAM minimum)
2. Install Docker
3. Deploy via Docker Compose

## Environment Configuration

Update `.env` with production values:

```
NODE_ENV=production
DATABASE_URL=your_production_db_url
JWT_SECRET=strong_random_secret
APP_URL=https://yourdomain.com
```

## SSL/TLS Setup

### Using Let's Encrypt

```bash
docker run --rm -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  certbot/certbot certonly --standalone \
  -d yourdomain.com
```

## Monitoring

- Use PM2 for process management
- Set up NewRelic/DataDog for monitoring
- Use CloudWatch for AWS deployments
- Monitor disk usage and database performance

## Backup Strategy

```bash
# Daily database backups
0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/db-$(date +%Y%m%d).sql.gz

# Weekly full backups
0 3 * * 0 tar -czf /backups/full-$(date +%Y%m%d).tar.gz /var/www/
```
