# Quick Start Guide for Developers
## Tagore University Management System

---

## 📁 Project Structure

```
d:\Bitflow\Tagore\
├── database/
│   ├── schema.sql           # Complete PostgreSQL schema (700+ lines)
│   └── ER_DIAGRAM.md        # Entity-relationship documentation
│
├── docs/
│   ├── TECH_STACK.md        # Technology recommendations & architecture
│   ├── PORTAL_SPECIFICATIONS.md  # All 7 user portal designs
│   └── AUTOMATION_LOGIC.md  # Workflow automations & triggers
│
├── ui-designs/
│   └── UI_UX_SPECIFICATIONS.md  # Material Design style guide
│
├── backend-samples/
│   ├── payroll_calculation.py   # Python payroll automation demo
│   └── notification_service.ts  # Node.js real-time notifications
│
├── README.md                # Project summary & overview
└── QUICK_START.md          # This file
```

---

## 🚀 Getting Started (30 Minutes Setup)

### Step 1: Database Setup (10 min)

**Prerequisites**: PostgreSQL 15+ installed

```bash
# Create database
createdb tagore_university

# Connect to database
psql tagore_university

# Run schema
\i database/schema.sql

# Verify tables created
\dt
# Should show: colleges, users, attendance_records, payroll, etc. (30+ tables)
```

**Check database triggers**:
```sql
-- View all triggers
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Should see: trg_notify_parent_absent, trg_calculate_net_salary, etc.
```

---

### Step 2: Sample Data (5 min)

**Insert test data** (colleges already inserted via schema):

```sql
-- Create test user roles (already done in schema)
SELECT * FROM user_roles;

-- Create a test teacher
INSERT INTO users (
    username, email, phone, password_hash,
    first_name, last_name, primary_role_id,
    college_id, employee_id
) VALUES (
    'anitha.m', 'anitha.m@tagore.edu.in', '+919876543210',
    '$2b$10$test_hash_here',  -- Use bcrypt in production
    'Anitha', 'M',
    (SELECT role_id FROM user_roles WHERE role_name = 'TEACHER'),
    (SELECT college_id FROM colleges WHERE college_code = 'TCAS'),
    'E1001'
);

-- Create employee details for payroll
INSERT INTO employee_details (
    user_id, designation, employee_type, joining_date,
    base_salary, hra, da, special_allowance,
    pf_deduction, esi_deduction, professional_tax,
    salary_grade
) VALUES (
    (SELECT user_id FROM users WHERE username = 'anitha.m'),
    'Assistant Professor', 'FULL_TIME', '2020-01-01',
    45000, 10000, 7000, 3000,
    5400, 1800, 1000,
    'A'
);

-- Create a test student
INSERT INTO users (
    username, email, phone, password_hash,
    first_name, last_name, primary_role_id,
    college_id, student_id
) VALUES (
    'aarav.k', 'aarav.k@student.tagore.edu.in', '+919876543211',
    '$2b$10$test_hash_here',
    'Aarav', 'Kumar',
    (SELECT role_id FROM user_roles WHERE role_name = 'STUDENT'),
    (SELECT college_id FROM colleges WHERE college_code = 'TCAS'),
    '21CS042'
);

-- Link parent to student (via metadata)
INSERT INTO users (
    username, email, phone, password_hash,
    first_name, last_name, primary_role_id,
    metadata
) VALUES (
    'parent.aarav', 'parent.aarav@gmail.com', '+919876543212',
    '$2b$10$test_hash_here',
    'Rajesh', 'Kumar',
    (SELECT role_id FROM user_roles WHERE role_name = 'PARENT'),
    jsonb_build_object('child_user_id', 
        (SELECT user_id FROM users WHERE username = 'aarav.k')::text
    )
);
```

---

### Step 3: Test Automation (5 min)

**Test 1: Attendance → Parent Notification**

```sql
-- Mark student absent
INSERT INTO attendance_records (
    user_id, user_type, college_id, attendance_date, status,
    marked_by_user_id, marking_method
) VALUES (
    (SELECT user_id FROM users WHERE username = 'aarav.k'),
    'STUDENT',
    (SELECT college_id FROM colleges WHERE college_code = 'TCAS'),
    CURRENT_DATE,
    'ABSENT',
    (SELECT user_id FROM users WHERE username = 'anitha.m'),
    'MOBILE_APP'
);

-- Check if notification was created (trigger should fire)
SELECT * FROM notifications 
WHERE user_id = (SELECT user_id FROM users WHERE username = 'parent.aarav')
ORDER BY created_at DESC LIMIT 1;

-- Should show: "Aarav Kumar was marked absent on [date]"
```

**Test 2: Payroll Calculation**

```sql
-- Add some attendance records for teacher (24 present, 2 absent)
DO $$
DECLARE
    teacher_id INT := (SELECT user_id FROM users WHERE username = 'anitha.m');
    college_id INT := (SELECT college_id FROM colleges WHERE college_code = 'TCAS');
    i INT;
BEGIN
    -- Add 24 present days
    FOR i IN 1..24 LOOP
        INSERT INTO attendance_records (
            user_id, user_type, college_id, attendance_date, status
        ) VALUES (
            teacher_id, 'STAFF', college_id,
            DATE '2025-11-01' + (i || ' days')::INTERVAL,
            'PRESENT'
        );
    END LOOP;
    
    -- Add 2 absent days
    FOR i IN 25..26 LOOP
        INSERT INTO attendance_records (
            user_id, user_type, college_id, attendance_date, status
        ) VALUES (
            teacher_id, 'STAFF', college_id,
            DATE '2025-11-01' + (i || ' days')::INTERVAL,
            'ABSENT'
        );
    END LOOP;
END $$;

-- Now test payroll calculation (manually, or wait for scheduled job)
INSERT INTO payroll (
    employee_user_id, month, year,
    total_working_days, days_present, days_absent, days_on_leave,
    base_salary, hra, da, special_allowance,
    pf_deduction, esi_deduction, professional_tax, absence_deduction
) VALUES (
    (SELECT user_id FROM users WHERE username = 'anitha.m'),
    11, 2025,
    26, 24, 2, 0,
    45000, 10000, 7000, 3000,
    5400, 1800, 1000, 0
);

-- Check calculated net_salary (trigger should calculate it)
SELECT 
    employee_user_id,
    gross_salary,
    total_deductions,
    net_salary
FROM payroll
WHERE employee_user_id = (SELECT user_id FROM users WHERE username = 'anitha.m');

-- Should show:
-- gross_salary: 65000
-- absence_deduction: 5000 (calculated by trigger)
-- net_salary: 51800
```

---

### Step 4: Backend Setup (10 min)

**Option A: Node.js Backend (Recommended)**

```bash
# Initialize NestJS project
npm i -g @nestjs/cli
nest new tagore-backend
cd tagore-backend

# Install dependencies
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install socket.io @nestjs/websockets
npm install firebase-admin
npm install class-validator class-transformer

# Set up environment variables
cp .env.example .env

# Edit .env:
DATABASE_URL=postgresql://user:password@localhost:5432/tagore_university
JWT_SECRET=your_secret_key_here
FIREBASE_PROJECT_ID=tagore-university
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

# Start development server
npm run start:dev
```

**Project structure**:
```
src/
├── modules/
│   ├── auth/           # JWT authentication
│   ├── users/          # User management
│   ├── attendance/     # Attendance marking
│   ├── payroll/        # Salary calculation
│   ├── notifications/  # Push notifications
│   └── analytics/      # Dashboard data
├── common/
│   ├── decorators/     # Custom decorators
│   ├── guards/         # Auth guards
│   └── filters/        # Exception filters
└── main.ts            # Entry point
```

**Option B: Python Backend (Alternative)**

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install pydantic python-jose passlib bcrypt
pip install python-multipart
pip install firebase-admin

# Create main.py
# (Use payroll_calculation.py as reference)

# Run server
uvicorn main:app --reload
```

---

### Step 5: Frontend Setup (Optional, 5 min)

**React Web App**:

```bash
# Create React app with Vite
npm create vite@latest tagore-web -- --template react-ts
cd tagore-web

# Install Material-UI
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-data-grid
npm install recharts  # For charts

# Install other dependencies
npm install axios react-router-dom
npm install socket.io-client
npm install react-query

# Start dev server
npm run dev
```

---

## 🧪 Testing the System

### Manual Testing Checklist

**Attendance Flow**:
- [ ] Create student attendance record (ABSENT)
- [ ] Check if notification created in `notifications` table
- [ ] Verify `parent_notified = true` in `attendance_records`
- [ ] Check WebSocket event (if backend running)

**Payroll Flow**:
- [ ] Add staff attendance records (mix of present/absent)
- [ ] Run payroll calculation (manual or scheduled job)
- [ ] Verify `net_salary` correctly calculated
- [ ] Check `absence_deduction` matches formula

**Marks Flow**:
- [ ] Insert marks record with `is_published = false`
- [ ] Update to `is_published = true`
- [ ] Check if notification created
- [ ] Verify `parent_notified = true`

---

## 📊 Sample Queries for Testing

### 1. Get Director Dashboard Stats

```sql
-- Use the materialized view
SELECT * FROM director_dashboard_stats;

-- Manual calculation (slower)
SELECT 
    c.college_name,
    c.current_strength,
    c.total_capacity,
    ROUND((c.current_strength::DECIMAL / c.total_capacity) * 100, 2) AS occupancy_percentage,
    (SELECT COUNT(*) 
     FROM attendance_records ar 
     JOIN users u ON ar.user_id = u.user_id 
     WHERE u.college_id = c.college_id 
       AND ar.user_type = 'STAFF' 
       AND ar.attendance_date = CURRENT_DATE 
       AND ar.status = 'PRESENT'
    ) AS staff_present_today
FROM colleges c
WHERE c.is_active = true;
```

### 2. Get Student Attendance Summary

```sql
SELECT 
    u.first_name || ' ' || u.last_name AS student_name,
    u.student_id,
    COUNT(*) AS total_classes,
    SUM(CASE WHEN ar.status = 'PRESENT' THEN 1 ELSE 0 END) AS present_count,
    SUM(CASE WHEN ar.status = 'ABSENT' THEN 1 ELSE 0 END) AS absent_count,
    ROUND(
        (SUM(CASE WHEN ar.status = 'PRESENT' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100, 
        2
    ) AS attendance_percentage
FROM users u
JOIN attendance_records ar ON u.user_id = ar.user_id
WHERE u.student_id = '21CS042'
  AND ar.user_type = 'STUDENT'
GROUP BY u.user_id, u.first_name, u.last_name, u.student_id;
```

### 3. Get Fee Defaulters

```sql
SELECT 
    u.student_id,
    u.first_name || ' ' || u.last_name AS student_name,
    fb.total_fee,
    fb.amount_paid,
    fb.amount_pending,
    fb.due_date,
    CURRENT_DATE - fb.due_date AS days_overdue
FROM fee_balance fb
JOIN users u ON fb.student_user_id = u.user_id
WHERE fb.amount_pending > 0
  AND fb.due_date < CURRENT_DATE
ORDER BY days_overdue DESC;
```

### 4. Get Pending Payroll

```sql
SELECT 
    u.employee_id,
    u.first_name || ' ' || u.last_name AS employee_name,
    p.month,
    p.year,
    p.days_present,
    p.days_absent,
    p.gross_salary,
    p.net_salary,
    p.status
FROM payroll p
JOIN users u ON p.employee_user_id = u.user_id
WHERE p.status = 'PENDING'
ORDER BY p.year DESC, p.month DESC;
```

---

## 🔧 Common Development Tasks

### Add a New User Role

```sql
INSERT INTO user_roles (role_name, role_level, permissions) 
VALUES ('LIBRARIAN', 4, '{"view": "LIBRARY", "edit": "BOOKS"}');
```

### Create a New Course

```sql
INSERT INTO courses (
    college_id, department_id, course_code, course_name,
    course_type, duration_years, total_semesters,
    intake_capacity, fee_per_semester
) VALUES (
    (SELECT college_id FROM colleges WHERE college_code = 'TCAS'),
    (SELECT department_id FROM departments WHERE department_code = 'CSE'),
    'BCA', 'Bachelor of Computer Applications',
    'UG', 3, 6,
    60, 35000
);
```

### Schedule a Cron Job (Payroll)

```sql
-- Using pg_cron extension
SELECT cron.schedule(
    'generate_monthly_payroll',
    '59 23 L * *',  -- Last day of month at 11:59 PM
    $$
    SELECT generate_payroll_for_month(
        EXTRACT(MONTH FROM CURRENT_DATE)::INT, 
        EXTRACT(YEAR FROM CURRENT_DATE)::INT
    );
    $$
);
```

---

## 🐛 Debugging Tips

### Check if Triggers Are Firing

```sql
-- Enable query logging in postgresql.conf
-- Then check logs at: /var/log/postgresql/postgresql-15-main.log

-- Or use this to see trigger execution:
CREATE OR REPLACE FUNCTION debug_trigger()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Trigger % fired on table %', TG_NAME, TG_TABLE_NAME;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to a trigger
CREATE TRIGGER debug_attendance_trigger
BEFORE INSERT ON attendance_records
FOR EACH ROW EXECUTE FUNCTION debug_trigger();
```

### Check Notification Delivery

```sql
-- View all pending notifications
SELECT * FROM notifications 
WHERE delivery_status = 'PENDING' 
ORDER BY created_at DESC;

-- Check FCM token validity
SELECT user_id, fcm_token 
FROM users 
WHERE fcm_token IS NOT NULL 
LIMIT 10;
```

### Performance Monitoring

```sql
-- Enable pg_stat_statements
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- View slowest queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 📚 Next Steps

1. **Read Full Documentation**:
   - `docs/TECH_STACK.md` - Technology choices
   - `docs/PORTAL_SPECIFICATIONS.md` - UI requirements
   - `docs/AUTOMATION_LOGIC.md` - Business logic

2. **Implement Authentication**:
   - JWT-based auth with refresh tokens
   - Role-based access control (RBAC)

3. **Build API Endpoints**:
   - RESTful APIs for CRUD operations
   - GraphQL (optional) for complex queries

4. **Set Up Real-Time Features**:
   - WebSocket server with Socket.io
   - Firebase Cloud Messaging integration

5. **Create Mobile Apps**:
   - React Native app for Teacher, Student, Parent
   - Expo for rapid development

6. **Deploy to Production**:
   - AWS RDS for PostgreSQL
   - AWS ECS/EKS for backend services
   - CloudFront CDN for frontend

---

## 🆘 Getting Help

### Resources
- PostgreSQL Docs: https://www.postgresql.org/docs/15/
- NestJS Docs: https://docs.nestjs.com/
- Material-UI Docs: https://mui.com/
- React Native Docs: https://reactnative.dev/

### Contact
- Architecture Questions: Refer to `README.md`
- Database Issues: Check `database/ER_DIAGRAM.md`
- UI/UX Questions: See `ui-designs/UI_UX_SPECIFICATIONS.md`

---

**Happy Coding! 🚀**
