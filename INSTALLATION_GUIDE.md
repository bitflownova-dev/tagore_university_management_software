# 🚀 Complete Installation & Setup Guide
## Tagore University Management System

This guide will help you set up and run the entire system from scratch in **under 30 minutes**.

---

## 📋 Prerequisites

### Required Software
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 15 or higher ([Download](https://www.postgresql.org/download/))
- **Redis** 7 or higher ([Download for Windows](https://github.com/microsoftarchive/redis/releases))
- **Git** ([Download](https://git-scm.com/downloads))

### Optional (but Recommended)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **VS Code** with extensions: ESLint, Prettier, PostgreSQL
- **Postman** or **Thunder Client** for API testing

---

## 🎯 Installation Methods

Choose one of three methods based on your needs:

### Method 1: 🐳 Docker Compose (Easiest - 5 minutes)
### Method 2: 🔧 Manual Setup (Full Control - 20 minutes)
### Method 3: ☁️ Cloud Deployment (Production - 60 minutes)

---

## Method 1: 🐳 Docker Compose Setup (Recommended for Testing)

### Step 1: Install Docker Desktop
Download and install Docker Desktop for Windows from [docker.com](https://www.docker.com/products/docker-desktop/)

### Step 2: Start the Backend Stack

```powershell
# Navigate to deployment folder
cd d:\Bitflow\Tagore\deployment

# Start all services (PostgreSQL, Redis, Backend API, Adminer)
docker-compose up -d

# Check if containers are running
docker-compose ps

# View logs (optional)
docker-compose logs -f backend
```

**Services Started**:
- ✅ PostgreSQL (port 5432) - Database with schema auto-loaded
- ✅ Redis (port 6379) - Cache & queue
- ✅ Backend API (port 3000) - NestJS server
- ✅ Adminer (port 8080) - Database web UI

### Step 3: Start the Frontend

```powershell
# Open new terminal
cd d:\Bitflow\Tagore\frontend-web

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

### Step 4: Access the System

- **Web App**: http://localhost:3001
- **API**: http://localhost:3000/api/v1
- **API Docs**: http://localhost:3000/api/docs (Swagger)
- **Database UI**: http://localhost:8080 (Adminer)
  - System: PostgreSQL
  - Server: postgres
  - Username: postgres
  - Password: postgres123
  - Database: tagore_university

### Step 5: Create Test User (Optional)

```powershell
# Open new terminal
curl -X POST http://localhost:3000/api/v1/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "username": "director",
    "email": "director@tagore.edu.in",
    "password": "Test@123",
    "firstName": "John",
    "lastName": "Director",
    "primaryRoleId": 1,
    "phone": "+919876543210"
  }'
```

### Step 6: Login

Go to http://localhost:3001/login
- Username: `director`
- Password: `Test@123`

---

## Method 2: 🔧 Manual Setup (Full Control)

### Step 1: Install PostgreSQL

1. Download PostgreSQL 15 from https://www.postgresql.org/download/windows/
2. Run installer (default settings are fine)
3. Remember the password you set for `postgres` user

**Verify installation**:
```powershell
psql --version
# Should show: psql (PostgreSQL) 15.x
```

### Step 2: Create Database & Load Schema

```powershell
# Create database
createdb -U postgres tagore_university

# Load schema
psql -U postgres -d tagore_university -f d:\Bitflow\Tagore\database\schema.sql
```

**Verify tables created**:
```powershell
psql -U postgres -d tagore_university -c "\dt"
# Should list 30+ tables
```

### Step 3: Install Redis

**Option A: Using Chocolatey**
```powershell
choco install redis-64
redis-server
```

**Option B: Manual Download**
1. Download from https://github.com/microsoftarchive/redis/releases
2. Extract to `C:\Redis`
3. Run `redis-server.exe`

**Verify Redis**:
```powershell
redis-cli ping
# Should return: PONG
```

### Step 4: Setup Backend

```powershell
# Navigate to backend
cd d:\Bitflow\Tagore\backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env file (use Notepad or VS Code)
notepad .env
```

**Update `.env` with your settings**:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=YOUR_POSTGRES_PASSWORD
DATABASE_NAME=tagore_university

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=15m
```

**Start backend server**:
```powershell
npm run start:dev
```

**Verify backend is running**:
- Open http://localhost:3000/api/docs
- You should see Swagger API documentation

### Step 5: Setup Frontend

```powershell
# Open new terminal
cd d:\Bitflow\Tagore\frontend-web

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env (should be fine as default)
notepad .env
```

**Start frontend**:
```powershell
npm run dev
```

**Verify frontend**:
- Open http://localhost:3001
- You should see login page

### Step 6: Create Admin User

**Option A: Using Postman/Thunder Client**

POST `http://localhost:3000/api/v1/auth/register`

Body (JSON):
```json
{
  "username": "director",
  "email": "director@tagore.edu.in",
  "password": "Admin@123",
  "firstName": "Ramesh",
  "lastName": "Kumar",
  "primaryRoleId": 1,
  "phone": "+919876543210"
}
```

**Option B: Using PowerShell**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/v1/auth/register `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"director","email":"director@tagore.edu.in","password":"Admin@123","firstName":"Ramesh","lastName":"Kumar","primaryRoleId":1,"phone":"+919876543210"}'
```

### Step 7: Login & Test

1. Go to http://localhost:3001/login
2. Login with:
   - Username: `director`
   - Password: `Admin@123`
3. You should be redirected to Director Dashboard

---

## Method 3: ☁️ Cloud Deployment (AWS)

### Prerequisites
- AWS Account
- AWS CLI installed
- Basic knowledge of AWS services

### Services Required
- **RDS PostgreSQL** (Managed database)
- **ElastiCache Redis** (Managed cache)
- **ECS or EKS** (Container orchestration)
- **S3** (File storage)
- **CloudFront** (CDN)
- **Route 53** (DNS)
- **SES** (Email service)

### Quick Deploy Steps

```bash
# 1. Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier tagore-university-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --master-username postgres \
  --master-user-password YourSecurePassword \
  --allocated-storage 100

# 2. Create ElastiCache Redis
aws elasticache create-cache-cluster \
  --cache-cluster-id tagore-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1

# 3. Build Docker images
cd backend
docker build -t tagore-backend:latest .

cd ../frontend-web
docker build -t tagore-frontend:latest .

# 4. Push to AWS ECR (Elastic Container Registry)
# ... (See AWS ECR documentation)

# 5. Deploy to ECS
# ... (See deployment/aws-ecs.yml - TBD)
```

**Detailed AWS deployment guide**: Coming soon in `deployment/AWS_DEPLOYMENT.md`

---

## 🧪 Testing the System

### 1. Test Backend API

**Check health**:
```powershell
curl http://localhost:3000/api/v1/health
```

**Login test**:
```powershell
curl -X POST http://localhost:3000/api/v1/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"director","password":"Admin@123"}'
```

**Expected response**:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "userId": 1,
    "username": "director",
    ...
  }
}
```

### 2. Test Frontend

1. Open http://localhost:3001
2. Login with test credentials
3. Check if Director Dashboard loads
4. Verify KPI cards show data
5. Check console for errors (F12)

### 3. Test Database Triggers

```sql
-- Connect to PostgreSQL
psql -U postgres -d tagore_university

-- Mark student absent (should trigger parent notification)
INSERT INTO attendance_records (
  user_id, user_type, college_id, attendance_date, 
  status, marked_by_user_id, marking_method
) VALUES (
  2, 'STUDENT', 1, CURRENT_DATE,
  'ABSENT', 1, 'MANUAL'
);

-- Check if notification was created
SELECT * FROM notifications ORDER BY created_at DESC LIMIT 1;
```

### 4. Test WebSocket Connection

Open browser console (F12) and paste:

```javascript
const socket = io('http://localhost:3000');
socket.on('connect', () => console.log('Connected to WebSocket!'));
socket.emit('join-room', 'college-1');
socket.on('attendance-update', (data) => console.log('Attendance update:', data));
```

---

## 🐛 Troubleshooting

### Problem 1: Backend won't start

**Error**: `ECONNREFUSED` or `Database connection failed`

**Solution**:
```powershell
# Check PostgreSQL is running
pg_isready -h localhost -p 5432
# If not running: net start postgresql-x64-15

# Check Redis is running
redis-cli ping
# If not running: redis-server
```

### Problem 2: Frontend can't connect to backend

**Error**: `Network Error` or `CORS error`

**Solution**:
1. Check backend is running: http://localhost:3000/api/docs
2. Check frontend `.env` has correct API URL:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```
3. Restart frontend: `Ctrl+C` then `npm run dev`

### Problem 3: Database schema not loaded

**Error**: `relation "users" does not exist`

**Solution**:
```powershell
# Reload schema
psql -U postgres -d tagore_university -f d:\Bitflow\Tagore\database\schema.sql

# Verify tables
psql -U postgres -d tagore_university -c "\dt"
```

### Problem 4: Port already in use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=3001
```

### Problem 5: npm install fails

**Error**: `EACCES` or `permission denied`

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 📊 System Status Checklist

Use this checklist to verify everything is working:

### Backend
- [ ] PostgreSQL running (port 5432)
- [ ] Redis running (port 6379)
- [ ] Backend API running (port 3000)
- [ ] Swagger docs accessible (http://localhost:3000/api/docs)
- [ ] Database has 30+ tables
- [ ] Can create user via API
- [ ] Can login and get JWT token

### Frontend
- [ ] Frontend running (port 3001)
- [ ] Login page loads
- [ ] Can login with test user
- [ ] Dashboard loads without errors
- [ ] KPI cards visible
- [ ] Charts rendering

### Database
- [ ] All tables created
- [ ] Sample colleges data inserted (3 rows)
- [ ] User roles created (8 rows)
- [ ] Triggers working
- [ ] Materialized view created

### Optional
- [ ] WebSocket connection works
- [ ] Push notifications configured (Firebase)
- [ ] Email service configured (SMTP)
- [ ] File upload works (S3)

---

## 🔧 Post-Installation Configuration

### 1. Firebase Setup (Push Notifications)

1. Go to https://console.firebase.google.com
2. Create new project: "Tagore University"
3. Add Android/iOS apps
4. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
5. Generate service account key:
   - Project Settings → Service Accounts → Generate New Private Key
6. Add to backend `.env`:
   ```env
   FIREBASE_PROJECT_ID=tagore-university
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@...
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### 2. Email Service Setup (SMTP)

Using Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Note**: For Gmail, enable "2-Step Verification" and generate "App Password"

### 3. AWS S3 Setup (File Storage)

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=tagore-university-files
```

### 4. Payment Gateway Setup (Razorpay)

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret
```

---

## 📚 Next Steps

1. **Explore the System**:
   - Try all 7 portals (Director, Principal, Teacher, etc.)
   - Test attendance marking
   - Test marks entry
   - Check notifications

2. **Read Documentation**:
   - `backend/README.md` - Backend API docs
   - `frontend-web/README.md` - Frontend docs
   - `docs/PORTAL_SPECIFICATIONS.md` - Portal designs

3. **Start Development**:
   - Pick a feature from TODO list
   - Follow coding standards
   - Write tests
   - Submit PR

4. **Join the Team**:
   - Set up Git branches
   - Follow Git workflow
   - Code reviews

---

## 🎯 Quick Reference Commands

### Start Everything
```powershell
# Terminal 1: Backend
cd d:\Bitflow\Tagore\backend
npm run start:dev

# Terminal 2: Frontend
cd d:\Bitflow\Tagore\frontend-web
npm run dev

# Terminal 3: Redis (if manual)
redis-server
```

### Stop Everything
```powershell
# Stop backend: Ctrl+C in terminal 1
# Stop frontend: Ctrl+C in terminal 2
# Stop Redis: Ctrl+C in terminal 3

# Or if using Docker:
cd d:\Bitflow\Tagore\deployment
docker-compose down
```

### Reset Everything
```powershell
# Drop and recreate database
dropdb -U postgres tagore_university
createdb -U postgres tagore_university
psql -U postgres -d tagore_university -f d:\Bitflow\Tagore\database\schema.sql

# Clear Redis
redis-cli FLUSHALL

# Clear backend cache
cd backend
Remove-Item -Recurse node_modules
npm install

# Clear frontend cache
cd ../frontend-web
Remove-Item -Recurse node_modules
npm install
```

---

## 🆘 Getting Help

### Resources
- **GitHub Issues**: (Repository TBD)
- **API Documentation**: http://localhost:3000/api/docs
- **Project Docs**: `d:\Bitflow\Tagore\docs\`

### Common Questions

**Q: How do I add a new user role?**
A: Insert into `user_roles` table, then update frontend routing

**Q: How do I customize the theme?**
A: Edit `frontend-web/src/theme.ts`

**Q: How do I add a new API endpoint?**
A: Create controller method in backend module, add to Swagger

**Q: Where are the logs?**
A: Backend: console output; Docker: `docker-compose logs -f`

---

## ✅ Installation Complete!

You now have a fully functional university management system running locally!

**What you can do now**:
- ✅ Login as Director
- ✅ View college dashboards
- ✅ Mark attendance
- ✅ Enter marks
- ✅ Calculate payroll
- ✅ Send notifications

**Happy coding! 🚀**
