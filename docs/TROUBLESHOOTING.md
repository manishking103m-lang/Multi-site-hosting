# Troubleshooting Guide - Multi-Site Hosting Platform

## ❌ "Cannot be reached" / "Connection refused"

### Problem: Services not starting or not responding

#### **Quick Fix (Try this first):**

```bash
# Stop everything
docker-compose down

# Wait 10 seconds
sleep 10

# Start again
docker-compose up -d

# Wait 30 seconds for services to start
sleep 30

# Then try: http://localhost:3000
```

---

## 🔍 **Check if Everything is Running**

```bash
# See all containers
docker-compose ps

# Output should show:
# - multi-site-db (postgres)
# - multi-site-backend (node)
# - multi-site-frontend (next.js)
# - multi-site-nginx (nginx)
# All should show "Up"
```

---

## 📋 **Common Issues & Fixes**

### **Issue 1: Docker not installed**
```bash
# Download Docker Desktop from:
# https://www.docker.com/products/docker-desktop

# After installing, restart your computer
```

### **Issue 2: Docker Desktop not running**
```bash
# Windows/Mac: Open Docker Desktop application
# Linux: systemctl start docker
```

### **Issue 3: Ports already in use**
```bash
# Check what's using port 3000
lsof -i :3000  # Mac/Linux

# Or kill it
kill -9 $(lsof -t -i:3000)  # Mac/Linux

# Windows - open Task Manager and find the process
```

### **Issue 4: Not enough disk space**
```bash
# Check available space
df -h

# You need at least 5GB free
# Remove old Docker images:
docker system prune -a
```

### **Issue 5: Database not starting**
```bash
# Check database logs
docker-compose logs db

# Rebuild database
docker-compose down -v
docker-compose up -d

# Wait 60 seconds for database to initialize
```

---

## 🔧 **Detailed Debugging**

### **Check Backend Logs**
```bash
docker-compose logs -f backend

# Look for:
# - "Server running on http://localhost:5000"
# - No error messages
```

### **Check Frontend Logs**
```bash
docker-compose logs -f frontend

# Look for:
# - "ready - started server on"
# - No "ERROR" messages
```

### **Check Database Logs**
```bash
docker-compose logs -f db

# Look for:
# - "database system is ready to accept connections"
# - No error messages
```

### **Check Nginx Logs**
```bash
docker-compose logs -f nginx

# Should show minimal logs
```

---

## 🆘 **If Still Not Working**

### **Step 1: Full Reset**
```bash
# Stop everything
docker-compose down

# Remove volumes (careful - deletes data)
docker-compose down -v

# Remove Docker images
docker-compose down --rmi all

# Restart
docker-compose up -d

# Wait 60 seconds
# Then check: http://localhost:3000
```

### **Step 2: Check System Requirements**

```bash
# You need:
✅ Docker 20.10+
✅ Docker Compose 2.0+
✅ 4GB+ RAM available
✅ 5GB+ disk space
✅ Ports 3000, 5000, 5432 free
```

### **Step 3: Verify Installation**

```bash
# Check Docker version
docker --version

# Check Compose version
docker-compose --version

# Check Docker can run
docker run hello-world
```

---

## 📱 **Testing Services Individually**

### **Test Backend**
```bash
# Test health endpoint
curl http://localhost:5000/health

# Should return: {"status":"OK",...}
```

### **Test Frontend**
```bash
# Open in browser
http://localhost:3000

# Should show: Multi-Site Hosting homepage
```

### **Test Database**
```bash
# Connect to database
docker exec -it multi-site-db psql -U postgres -c "\l"

# Should list databases
```

---

## 🐳 **Docker Commands Reference**

```bash
# View all containers
docker ps -a

# View container logs
docker logs [container_name]

# Follow logs in real time
docker logs -f [container_name]

# Execute command in container
docker exec [container_name] [command]

# Stop all containers
docker-compose down

# Start all containers
docker-compose up -d

# Restart a service
docker-compose restart [service_name]

# Rebuild images
docker-compose build --no-cache

# Remove everything
docker-compose down -v --rmi all
```

---

## 💻 **Operating System Specific**

### **Windows Issues**

```
❌ "Docker daemon not running"
✅ Solution: Open Docker Desktop application

❌ "Drive is not shared"
✅ Solution: Docker Settings → Resources → File Sharing → Add drive

❌ "WSL 2 installation incomplete"
✅ Solution: https://docs.microsoft.com/en-us/windows/wsl/install
```

### **Mac Issues**

```
❌ "Cannot connect to Docker daemon"
✅ Solution: Open Applications → Docker.app

❌ "No space left on device"
✅ Solution: docker system prune -a
```

### **Linux Issues**

```
❌ "Permission denied while trying to connect"
✅ Solution: sudo usermod -aG docker $USER

❌ "docker-compose: command not found"
✅ Solution: sudo apt-get install docker-compose
```

---

## ✅ **How to Know Everything is Working**

```bash
✅ docker-compose ps shows all containers "Up"
✅ http://localhost:3000 loads the homepage
✅ http://localhost:5000/health returns JSON
✅ You can login with admin@example.com / admin123
✅ You can see the admin dashboard
```

---

## 🆘 **Still Not Working? Try This**

```bash
# Create a fresh setup
cd ~
mkdir multi-site-hosting-fresh
cd multi-site-hosting-fresh

# Clone fresh
git clone https://github.com/manishking103m-lang/multi-site-hosting.git .

# Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Remove old containers first
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null

# Start fresh
docker-compose up -d

# Wait and test
sleep 30
curl http://localhost:5000/health
```

---

## 📞 **Still Need Help?**

1. **Check Docker status:**
   - Windows/Mac: Look for Docker icon in system tray
   - Linux: `systemctl status docker`

2. **Check available disk space:**
   - `df -h` (Mac/Linux)
   - Check File Explorer (Windows)

3. **Check RAM usage:**
   - Open Task Manager/Activity Monitor
   - Ensure at least 2GB free

4. **Restart computer** (sometimes helps!)

5. **Reinstall Docker** if all else fails

---

## 🎯 **Quick Checklist**

- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Ports 3000, 5000, 5432 are free
- [ ] At least 5GB disk space free
- [ ] At least 4GB RAM available
- [ ] `docker-compose up -d` completed
- [ ] Waited 30+ seconds
- [ ] Browser showing http://localhost:3000
- [ ] Can login with admin@example.com / admin123

If all checked: **Your platform is working!** ✅

---

**Good luck! Your platform will be running soon! 🚀**
