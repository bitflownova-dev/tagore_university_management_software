# Tagore University Management System - Backend API

Complete NestJS backend with PostgreSQL, Redis, WebSocket support, and automated workflows.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 15+
- Redis 7+
- Git

### Installation

```bash
# Clone repository
cd d:\Bitflow\Tagore\backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env with your database credentials

# Run database migrations (after setting up PostgreSQL)
npm run migration:run

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000/api/v1`
API Documentation at `http://localhost:3000/api/docs`

---

## 📦 Features Implemented

### Core Modules

✅ **Authentication & Authorization**
- JWT-based authentication
- Refresh token support
- Role-based access control (RBAC)
- FCM token management for push notifications

✅ **User Management**
- Multi-role support (Director, Principal, Teacher, Student, Parent, HR, Accountant)
- Profile management
- User CRUD operations

✅ **Attendance Management**
- Mark attendance (single/bulk)
- Real-time attendance tracking
- College-wide attendance dashboard
- Automatic parent notifications on student absence
- Attendance summary and reports

✅ **Marks & Assessment**
- Marks entry and management
- Publish marks with auto-notification
- Student marks history
- Grade calculation

✅ **Payroll System**
- Attendance-based salary calculation
- Automated monthly payroll generation
- Payslip management
- HR approval workflow

✅ **Notifications**
- Firebase Cloud Messaging (FCM) integration
- Push notifications (single/bulk)
- In-app notifications
- Email notifications
- Automated alerts (absence, marks, payroll)

✅ **Real-time WebSocket**
- Live dashboard updates
- Real-time attendance sync
- Marks publication events
- Socket.io integration

---

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/               # Authentication & JWT
│   │   ├── users/              # User management
│   │   ├── attendance/         # Attendance tracking
│   │   ├── marks/              # Marks & assessment
│   │   ├── payroll/            # HR & payroll
│   │   ├── finance/            # Fee management (stub)
│   │   ├── notifications/      # Push notifications
│   │   ├── analytics/          # Dashboard analytics (stub)
│   │   └── realtime/           # WebSocket gateway
│   ├── config/                 # Configuration files
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

---

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)

```http
POST   /auth/login              # Login with username/password
POST   /auth/register           # Register new user
POST   /auth/refresh            # Refresh access token
POST   /auth/fcm-token          # Update FCM token
POST   /auth/logout             # Logout
```

### Users (`/api/v1/users`)

```http
GET    /users/profile           # Get current user profile
GET    /users/:id               # Get user by ID
PATCH  /users/:id               # Update user
```

### Attendance (`/api/v1/attendance`)

```http
POST   /attendance/mark                    # Mark single attendance
POST   /attendance/mark-bulk               # Mark bulk attendance
GET    /attendance/user/:userId            # Get user attendance (date range)
GET    /attendance/summary/:userId         # Get monthly summary
GET    /attendance/class/:classId          # Get class attendance
GET    /attendance/college/:collegeId/today # Today's college stats
GET    /attendance/report                  # Generate report
```

### Marks (`/api/v1/marks`)

```http
POST   /marks                   # Create marks entry
POST   /marks/:id/publish       # Publish marks (triggers notifications)
GET    /marks/student/:studentId # Get student marks
```

### Payroll (`/api/v1/payroll`)

```http
POST   /payroll/calculate       # Calculate monthly payroll
GET    /payroll/employee/:employeeId # Get employee payroll history
POST   /payroll/:id/approve     # Approve payroll
GET    /payroll/my-payslips     # Get current user's payslips
```

### Notifications (`/api/v1/notifications`)

```http
GET    /notifications           # Get user notifications
GET    /notifications/unread-count # Get unread count
POST   /notifications/:id/read  # Mark as read
POST   /notifications/read-all  # Mark all as read
DELETE /notifications/:id       # Delete notification
```

---

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=tagore_university

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRATION=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Firebase (for push notifications)
FIREBASE_PROJECT_ID=tagore-university
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Database Setup

1. Install PostgreSQL 15+
2. Create database: `createdb tagore_university`
3. Run schema: `psql tagore_university < ../database/schema.sql`

### Redis Setup

```bash
# Windows (using Chocolatey)
choco install redis-64

# Or download from: https://github.com/microsoftarchive/redis/releases

# Start Redis
redis-server
```

---

## 🐳 Docker Setup

### Docker Compose (Full Stack)

```bash
# From project root
cd d:\Bitflow\Tagore\deployment
docker-compose up -d
```

This starts:
- PostgreSQL database
- Redis cache
- Backend API
- Adminer (database GUI)

---

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 📊 Database Schema

The backend uses the comprehensive schema from `../database/schema.sql` which includes:

- 30+ tables across 11 sections
- Automated triggers for workflows
- Materialized views for analytics
- JSONB fields for flexible metadata
- Row-level security for multi-tenancy

Key tables:
- `users` - All system users with roles
- `attendance_records` - Daily attendance tracking
- `marks` - Student marks & assessments
- `payroll` - Monthly salary records
- `notifications` - Multi-channel alerts

---

## 🔐 Authentication Flow

```
1. User Login → POST /api/v1/auth/login
   ↓
2. Server validates credentials
   ↓
3. Returns JWT access token (15min) + refresh token (7 days)
   ↓
4. Client stores tokens
   ↓
5. All API requests include: Authorization: Bearer <access_token>
   ↓
6. Access token expires → POST /api/v1/auth/refresh
   ↓
7. New access token issued
```

---

## ⚙️ Automation Workflows

### 1. Parent Absence Alert
```
Teacher marks student absent
  ↓
Attendance record saved
  ↓
Bull queue job triggered
  ↓
Notification created + FCM push sent
  ↓
Parent receives alert within 5 seconds
```

### 2. Marks Publication
```
Teacher publishes marks
  ↓
Marks table updated (is_published = true)
  ↓
Notifications created for student + parent
  ↓
FCM push sent to both
```

### 3. Monthly Payroll
```
End of month (cron job)
  ↓
Fetch attendance records for all staff
  ↓
Calculate gross salary - deductions
  ↓
Create payroll records (status = PENDING)
  ↓
Notify employees via FCM + email
  ↓
HR approves → status = APPROVED
```

---

## 🔥 Firebase Setup (Push Notifications)

1. Create Firebase project: https://console.firebase.google.com
2. Generate service account key:
   - Project Settings → Service Accounts → Generate New Private Key
3. Add credentials to `.env`:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

---

## 📱 WebSocket Events

Connect to: `ws://localhost:3000`

### Client Events
```javascript
// Join room for real-time updates
socket.emit('join-room', 'college-1');
```

### Server Events
```javascript
// Attendance update
socket.on('attendance-update', (data) => {
  console.log('New attendance:', data);
});

// Marks update
socket.on('marks-update', (data) => {
  console.log('New marks:', data);
});

// Dashboard update
socket.on('dashboard-update', (data) => {
  console.log('Dashboard refreshed:', data);
});
```

---

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start:prod
```

### Environment Variables for Production

- Set `NODE_ENV=production`
- Use strong JWT secrets
- Enable database SSL
- Set up proper CORS origins
- Configure email SMTP
- Set up AWS S3 for file storage

---

## 📈 Performance Optimization

- **Caching**: Redis for session and API caching
- **Database**: Indexed columns, materialized views
- **Job Queue**: Bull for background processing
- **Connection Pooling**: TypeORM connection pool (max 20)
- **Rate Limiting**: API throttling (coming soon)

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Check connection string in .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### Redis Connection Error
```bash
# Check Redis is running
redis-cli ping
# Should return: PONG
```

### Module Not Found Errors
```bash
# Install dependencies
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- NestJS Documentation: https://docs.nestjs.com
- TypeORM Documentation: https://typeorm.io
- Firebase Admin SDK: https://firebase.google.com/docs/admin/setup
- Bull Queue: https://github.com/OptimalBits/bull

---

## 👥 Development Team

**Status**: Ready for development team handoff

**Next Steps**:
1. Install dependencies: `npm install`
2. Set up database and run schema
3. Configure Firebase for push notifications
4. Start development server: `npm run start:dev`
5. Test API endpoints using Swagger UI

---

## 📝 License

Proprietary - Tagore Group of Colleges
