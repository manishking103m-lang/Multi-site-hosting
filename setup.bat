@echo off
REM Multi-Site Hosting Platform - Setup & Debug Script for Windows

echo.
echo 🚀 Multi-Site Hosting Platform Setup
echo ====================================
echo.

REM Check if Docker is installed
echo 📦 Checking Docker installation...
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed!
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('docker --version') do echo ✅ Docker found: %%i

REM Check if Docker Compose is installed
echo.
echo 📦 Checking Docker Compose installation...
where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed!
    echo Please install Docker Compose from: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('docker-compose --version') do echo ✅ Docker Compose found: %%i

REM Check if Docker daemon is running
echo.
echo 🔍 Checking if Docker daemon is running...
docker info >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker daemon is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo ✅ Docker daemon is running

REM Copy environment files
echo.
echo ⚙️  Setting up environment files...
if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✅ Created backend\.env
) else (
    echo ✅ backend\.env already exists
)

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo ✅ Created frontend\.env
) else (
    echo ✅ frontend\.env already exists
)

REM Stop existing containers
echo.
echo 🛑 Stopping any existing containers...
docker-compose down 2>nul

REM Start services
echo.
echo 🚀 Starting services...
docker-compose up -d

REM Wait for services to start
echo.
echo ⏳ Waiting for services to start (30 seconds)...
timeout /t 30 /nobreak

REM Check service status
echo.
echo 📊 Service Status:
echo =================
docker-compose ps

REM Check if services are running
echo.
echo 🔍 Testing services...

echo Testing Backend API...
docker exec multi-site-backend curl -s http://localhost:5000/health >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Backend is running on http://localhost:5000
) else (
    echo ❌ Backend not responding (check logs: docker-compose logs backend)
)

echo Testing Frontend...
docker exec multi-site-frontend curl -s http://localhost:3000 >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Frontend is running on http://localhost:3000
) else (
    echo ⏳ Frontend starting (might need more time)
)

echo Testing Database...
docker exec multi-site-db pg_isready -U postgres >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Database is connected
) else (
    echo ❌ Database not responding
)

echo.
echo ✨ Setup Complete!
echo ==================
echo.
echo 🌐 Access Your Platform:
echo   Homepage:  http://localhost:3000
echo   Dashboard: http://localhost:3000/admin
echo   API:       http://localhost:5000
echo.
echo 🔐 Login Credentials:
echo   Email:    admin@example.com
echo   Password: admin123
echo.
echo 📝 Useful Commands:
echo   View logs:    docker-compose logs -f backend
echo   Stop services: docker-compose down
echo   Restart:      docker-compose restart
echo.
echo If services don't respond, try:
echo   1. Wait a few more seconds and refresh browser
echo   2. Check logs: docker-compose logs backend
echo   3. Restart: docker-compose down ^&^& docker-compose up -d
echo.
echo Happy hosting! 🚀
echo.
pause
