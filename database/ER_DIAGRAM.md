# Database Entity-Relationship (ER) Diagram Documentation
## Tagore University Management System

---

## Overview

This document provides a textual representation of the Entity-Relationship diagram for the Unified University Management System. The actual visual ER diagram should be created using tools like:
- **dbdiagram.io** (recommended)
- **Lucidchart**
- **Draw.io**
- **MySQL Workbench**

---

## Core Entities & Relationships

### Level 1: Organization Structure

```
┌─────────────┐
│  COLLEGES   │ (1)
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│ DEPARTMENTS │ (N)
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│   COURSES   │ (N)
└─────────────┘
```

**Relationships**:
- One COLLEGE has many DEPARTMENTS
- One DEPARTMENT has many COURSES
- One COLLEGE has many COURSES (direct relationship)

---

### Level 2: User Management

```
┌──────────────┐          ┌──────────────┐
│  USER_ROLES  │──1:N────▶│    USERS     │
└──────────────┘          └──────┬───────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                    ▼            ▼            ▼
          ┌────────────┐  ┌────────────┐  ┌────────────┐
          │  COLLEGES  │  │DEPARTMENTS │  │   COURSES  │
          └────────────┘  └────────────┘  └────────────┘
               (FK)            (FK)            (FK)
```

**Relationships**:
- One USER_ROLE has many USERS (1:N)
- One USER belongs to one COLLEGE (N:1)
- One USER belongs to one DEPARTMENT (N:1)
- USERS table has self-referencing relationship (parent → child via metadata JSONB)

---

### Level 3: Academic Management (LMS)

```
┌──────────────────┐
│ ACADEMIC_YEARS   │
└────────┬─────────┘
         │ 1:N
         ▼
┌──────────────────┐
│   SEMESTERS      │
└────────┬─────────┘
         │ 1:N
         ▼
┌──────────────────┐          ┌──────────────────┐
│    CLASSES       │─────N:1──│    SUBJECTS      │
└────────┬─────────┘          └────────┬─────────┘
         │                              │
         │ N:1                          │ N:1
         ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│     USERS        │          │     COURSES      │
│   (Teacher)      │          └──────────────────┘
└──────────────────┘

         ┌──────────────────┐
         │ CLASS_ENROLLMENTS│
         └────────┬─────────┘
                  │
         ┌────────┼────────┐
         │ N:1    │ N:1    │
         ▼        ▼        
   ┌─────────┐ ┌─────────┐
   │ CLASSES │ │  USERS  │
   └─────────┘ │(Student)│
               └─────────┘
```

**Relationships**:
- One ACADEMIC_YEAR has many SEMESTERS
- One SEMESTER has many CLASSES
- One CLASS belongs to one SUBJECT
- One CLASS has one TEACHER (USERS)
- One CLASS has many STUDENTS via CLASS_ENROLLMENTS (junction table)

---

### Level 4: Attendance System (Core Automation Hub)

```
┌──────────────────┐
│     USERS        │
│ (Student/Staff)  │
└────────┬─────────┘
         │
         │ 1:N
         ▼
┌──────────────────────────────┐
│   ATTENDANCE_RECORDS         │ ◄─── AUTOMATION TRIGGER POINT
│   - user_id                  │      (Triggers payroll, parent alerts)
│   - status (PRESENT/ABSENT)  │
│   - payroll_processed        │
│   - parent_notified          │
└────────┬─────────────────────┘
         │ N:1
         ▼
┌──────────────────┐
│     CLASSES      │
└──────────────────┘
```

**Relationships**:
- One USER (student or staff) has many ATTENDANCE_RECORDS
- One ATTENDANCE_RECORD belongs to one CLASS (for students)
- One ATTENDANCE_RECORD marked by one USER (teacher)

**Special Fields**:
- `payroll_processed`: Flag for HR automation
- `parent_notified`: Flag for parent alert automation

---

### Level 5: Marks & Assessment

```
┌──────────────────┐
│ ASSESSMENT_TYPES │
└────────┬─────────┘
         │ 1:N
         ▼
┌──────────────────────────────┐
│        MARKS                 │ ◄─── AUTOMATION TRIGGER POINT
│   - student_user_id          │      (Triggers parent notifications)
│   - is_published             │
│   - parent_notified          │
└────────┬─────────────────────┘
         │
    ┌────┼────┬────────────┐
    │ N:1│ N:1│ N:1        │
    ▼    ▼    ▼            ▼
┌───────┐┌────────┐┌────────────┐┌────────────┐
│ USERS ││CLASSES ││  SUBJECTS  ││   USERS    │
│(Stud.)││        ││            ││ (Teacher)  │
└───────┘└────────┘└────────────┘└────────────┘
```

**Relationships**:
- One ASSESSMENT_TYPE has many MARKS
- One MARK belongs to one STUDENT (USERS)
- One MARK belongs to one CLASS
- One MARK belongs to one SUBJECT
- One MARK entered by one TEACHER (USERS)

**Special Fields**:
- `is_published`: Controls visibility to students/parents
- `parent_notified`: Flag for notification automation

---

### Level 6: Finance & Fee Management

```
┌──────────────────┐          ┌──────────────────┐
│  FEE_STRUCTURES  │──N:1────▶│     COURSES      │
└────────┬─────────┘          └──────────────────┘
         │ 1:N
         ▼
┌──────────────────────────────┐
│      FEE_BALANCE             │ ◄─── AUTOMATION SOURCE
│   - total_fee                │      (Auto-reminder system)
│   - amount_paid              │
│   - amount_pending           │
│   - overdue (computed)       │
└────────┬─────────────────────┘
         │ N:1
         ▼
┌──────────────────┐
│ STUDENT_         │
│ ENROLLMENTS      │
└────────┬─────────┘
         │ N:1
         ▼
┌──────────────────┐
│      USERS       │
│    (Student)     │
└──────────────────┘

         ┌──────────────────┐
         │  FEE_PAYMENTS    │
         └────────┬─────────┘
                  │
         ┌────────┼────────┐
         │ N:1    │ N:1    │
         ▼        ▼        
   ┌───────────┐┌─────────┐
   │FEE_BALANCE││  USERS  │
   └───────────┘│(Student)│
                └─────────┘
```

**Relationships**:
- One COURSE has many FEE_STRUCTURES (per academic year)
- One STUDENT has many FEE_BALANCE records (per semester)
- One STUDENT has many FEE_PAYMENTS
- One FEE_PAYMENT links to one FEE_BALANCE

**Computed Fields**:
- `amount_pending = total_fee - amount_paid`
- `overdue = CURRENT_DATE > due_date AND amount_pending > 0`

---

### Level 7: HR & Payroll System

```
┌──────────────────┐
│      USERS       │
│     (Staff)      │
└────────┬─────────┘
         │ 1:1
         ▼
┌──────────────────────────────┐
│   EMPLOYEE_DETAILS           │
│   - base_salary              │
│   - hra, da, allowances      │
│   - pf_deduction, esi, etc.  │
│   - pay_per_day (computed)   │
└────────┬─────────────────────┘
         │ 1:N
         ▼
┌──────────────────────────────┐
│        PAYROLL               │ ◄─── AUTOMATION TARGET
│   - days_present             │      (Auto-calculated monthly)
│   - days_absent              │
│   - gross_salary             │
│   - net_salary (computed)    │
└──────────────────────────────┘
         ▲
         │ (Data Source)
         │
┌──────────────────────────────┐
│   ATTENDANCE_RECORDS         │
│   (user_type = 'STAFF')      │
└──────────────────────────────┘

         ┌──────────────────┐
         │ LEAVE_REQUESTS   │
         └────────┬─────────┘
                  │
         ┌────────┼────────┐
         │ N:1    │ N:1    │
         ▼        ▼        
   ┌───────────┐┌──────────┐
   │   USERS   ││  USERS   │
   │(Applicant)││(Approver)│
   └───────────┘└──────────┘
```

**Relationships**:
- One USER (staff) has one EMPLOYEE_DETAILS (1:1)
- One EMPLOYEE has many PAYROLL records (monthly)
- One USER has many LEAVE_REQUESTS
- One LEAVE_REQUEST approved by one USER (manager/HOD)

**Automation Flow**:
1. ATTENDANCE_RECORDS → (counted) → days_present/absent
2. EMPLOYEE_DETAILS → salary components
3. PAYROLL → net_salary = gross - (deductions + absence_deduction)

**Computed Fields**:
- `pay_per_day = (base_salary + hra + da + special_allowance) / 30`
- `gross_salary = base_salary + hra + da + special_allowance`
- `net_salary = gross_salary - total_deductions`

---

### Level 8: Notifications System

```
┌──────────────────────────────┐
│      NOTIFICATIONS           │ ◄─── AUTOMATION TARGET
│   - notification_type        │      (Created by triggers)
│   - is_read                  │
│   - delivery_status          │
└────────┬─────────────────────┘
         │ N:1
         ▼
┌──────────────────┐
│      USERS       │
│   (Recipient)    │
└──────────────────┘

   Triggered By:
   ─────────────────────────────────────
   │ ATTENDANCE_RECORDS (status=ABSENT) │
   │ MARKS (is_published=true)          │
   │ FEE_BALANCE (overdue=true)         │
   │ PAYROLL (status=APPROVED)          │
   ─────────────────────────────────────
```

**Relationships**:
- One USER has many NOTIFICATIONS
- One NOTIFICATION links to one entity via polymorphic fields:
  - `related_entity_type` (ATTENDANCE, MARKS, PAYMENT, PAYROLL)
  - `related_entity_id` (foreign key to related table)

**Notification Types**:
- ATTENDANCE_ALERT: Parent notified when child absent
- MARKS_UPDATE: Student/parent notified when marks published
- FEE_REMINDER: Student/parent notified for overdue fees
- PAYROLL: Staff notified when payslip ready
- ANNOUNCEMENT: General announcements

---

## Key Automation Trigger Points

### 1. Attendance → Payroll (Staff)
```
ATTENDANCE_RECORDS (user_type='STAFF')
  └─► (Monthly aggregation)
      └─► PAYROLL.days_present, days_absent
          └─► PAYROLL.net_salary (auto-calculated)
              └─► NOTIFICATIONS (payslip ready)
```

### 2. Attendance → Parent Alert (Student)
```
ATTENDANCE_RECORDS (status='ABSENT', user_type='STUDENT')
  └─► Database Trigger: notify_parent_on_absent()
      └─► Find PARENT via USERS.metadata->>'child_user_id'
          └─► INSERT into NOTIFICATIONS
              └─► Send Push Notification (FCM)
```

### 3. Marks → Student/Parent Notification
```
MARKS (is_published=true)
  └─► Database Trigger: notify_parent_on_marks()
      └─► Find STUDENT and PARENT
          └─► INSERT into NOTIFICATIONS (for both)
              └─► Send Push Notifications
                  └─► WebSocket: Real-time dashboard sync
```

### 4. Fee → Automated Reminders
```
FEE_BALANCE (overdue=true, reminder_sent=false)
  └─► Scheduled Job (daily at 10:00 AM)
      └─► For each overdue student:
          └─► INSERT into NOTIFICATIONS
              └─► Send Push + Email + SMS
                  └─► UPDATE reminder_sent=true
```

---

## Database Constraints & Rules

### Primary Keys
All tables have a serial primary key:
- `college_id`, `user_id`, `attendance_id`, `payroll_id`, etc.

### Foreign Keys
All relationships enforced via foreign keys with appropriate `ON DELETE` actions:
- `CASCADE`: Delete child records (e.g., classes when course deleted)
- `SET NULL`: Preserve record but remove link (e.g., teacher resignation)

### Unique Constraints
- `colleges.college_code`
- `users.username`, `users.email`, `users.phone`
- `courses.course_code`
- `payroll(employee_user_id, month, year)` - one payroll per employee per month

### Check Constraints
- `chk_positive_capacity`: `total_capacity > 0`
- `chk_strength_capacity`: `current_strength <= total_capacity`
- `chk_marks_range`: `marks_obtained >= 0 AND marks_obtained <= max_marks`
- `chk_positive_amount`: `amount_paid > 0`

### Indexes
Critical indexes for performance:
- `idx_users_college` on `users(college_id)`
- `idx_attendance_user` on `attendance_records(user_id, attendance_date)`
- `idx_marks_published` on `marks(is_published, parent_notified)`
- `idx_payroll_employee` on `payroll(employee_user_id)`
- `idx_notifications_user_unread` on `notifications(user_id, is_read)`

---

## Materialized Views for Analytics

### director_dashboard_stats
Aggregates college-wise data for Director's dashboard:
- Student strength vs capacity
- Revenue collected vs pending
- Staff attendance metrics

**Refresh Strategy**: Every 5-15 minutes via scheduled job

---

## Data Flow Examples

### Example 1: Teacher Marks Attendance

```
1. Teacher opens mobile app → "Mark Attendance"
2. Selects class: CS101 - Section A
3. Marks student "Aarav" as ABSENT
4. Clicks "Save Attendance"

   ↓ (INSERT)

5. attendance_records table
   - user_id: 1001 (Aarav)
   - status: 'ABSENT'
   - marked_by_user_id: 2001 (Teacher)
   - parent_notified: false

   ↓ (TRIGGER FIRES)

6. notify_parent_on_absent() trigger
   - Finds parent_user_id: 3001
   - INSERT into notifications

   ↓ (PARALLEL)

7. PostgreSQL NOTIFY 'send_push_notification'
   - Node.js worker receives event
   - Sends FCM push notification
   - Sends WebSocket update

   ↓ (< 5 seconds)

8. Parent receives push notification on phone
9. Parent app badge count updates: 🔔3
```

### Example 2: Monthly Payroll Generation

```
1. Last day of month at 11:59 PM
2. Scheduled job triggers

   ↓ (FOR EACH EMPLOYEE)

3. Query attendance_records:
   - COUNT(status='PRESENT') → 24 days
   - COUNT(status='ABSENT') → 2 days

4. Query employee_details:
   - base_salary: ₹45,000
   - hra: ₹10,000, da: ₹7,000

5. Calculate:
   - gross_salary = ₹65,000
   - absence_deduction = (₹65,000/26) × 2 = ₹5,000
   - net_salary = ₹65,000 - ₹13,200 = ₹51,800

6. INSERT into payroll table
   - status: 'PENDING'

7. Generate PDF payslip
8. Send email to employee
9. INSERT into notifications
```

---

## ER Diagram Tools & Visualization

### Recommended Tools

1. **dbdiagram.io** (Best for this project)
   - URL: https://dbdiagram.io
   - Features: Import from SQL, export to PNG/PDF
   - Syntax: Simple DSL format

2. **Draw.io** (Free, versatile)
   - URL: https://app.diagrams.net
   - Features: Entity shapes, export to SVG/PNG

3. **Lucidchart** (Professional)
   - URL: https://www.lucidchart.com
   - Features: Collaborative editing, templates

### Creating ER Diagram from schema.sql

**Using dbdiagram.io**:
1. Copy `database/schema.sql`
2. Convert to DBML format (or use online converters)
3. Import to dbdiagram.io
4. Auto-generate visual diagram
5. Export as PNG (high-res for documentation)

---

## Summary

This database architecture provides:
✅ **Centralized Data**: Single source of truth for all modules  
✅ **Real-Time Automation**: Database triggers for instant workflows  
✅ **Scalability**: Optimized indexes and materialized views  
✅ **Data Integrity**: Foreign keys, constraints, and ACID compliance  
✅ **Audit Trail**: Complete logging of all data modifications  
✅ **Multi-Tenancy**: College-level data isolation with RLS  

The ER diagram should be created using the relationships documented above and the actual `schema.sql` file. All 11 sections of the schema work together to provide seamless data interconnectivity across LMS, HRMS, ERP, and Finance modules.

---

**For visual ER diagram generation, use dbdiagram.io with the provided schema.sql file.**
