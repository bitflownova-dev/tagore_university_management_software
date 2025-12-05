# Automation Logic & Workflow Specifications
## Unified University Management System - Tagore Group

---

## Core Automation Philosophy

**Principle**: "Data Interconnectivity"
- Actions in one module automatically trigger updates in related modules
- Zero manual intervention for routine calculations
- Real-time synchronization across all user interfaces
- Event-driven architecture with database triggers and background jobs

---

## 1. Payroll Automation Logic

### 🎯 Objective
Automatically calculate teacher/staff salary based on attendance records, with zero manual calculation by HR.

---

### Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT: End of Month (Triggered at 11:59 PM on last day)       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Fetch Attendance Data                                  │
│  Query: SELECT * FROM attendance_records                        │
│         WHERE user_type = 'STAFF'                               │
│         AND attendance_date BETWEEN '2025-11-01' AND '2025-11-30'│
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Calculate Attendance Metrics                           │
│  For each employee:                                             │
│    - days_present = COUNT(status = 'PRESENT')                   │
│    - days_absent = COUNT(status = 'ABSENT')                     │
│    - days_on_leave = COUNT(status = 'ON_LEAVE')                 │
│    - total_working_days = 26 (excluding Sundays)                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Fetch Salary Structure                                 │
│  Query: SELECT base_salary, hra, da, special_allowance,         │
│                pf_deduction, esi_deduction, professional_tax     │
│         FROM employee_details                                   │
│         WHERE user_id = [employee_id]                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Calculate Salary Components                            │
│                                                                  │
│  gross_salary = base_salary + hra + da + special_allowance      │
│                                                                  │
│  IF days_absent > 0 THEN                                        │
│    pay_per_day = gross_salary / total_working_days              │
│    absence_deduction = pay_per_day * days_absent                │
│  ELSE                                                            │
│    absence_deduction = 0                                        │
│  END IF                                                          │
│                                                                  │
│  total_deductions = pf_deduction + esi_deduction +              │
│                     professional_tax + absence_deduction         │
│                                                                  │
│  net_salary = gross_salary - total_deductions                   │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Insert Payroll Record                                  │
│  INSERT INTO payroll (                                          │
│    employee_user_id, month, year,                               │
│    total_working_days, days_present, days_absent, days_on_leave,│
│    base_salary, hra, da, special_allowance,                     │
│    pf_deduction, esi_deduction, professional_tax,               │
│    absence_deduction, net_salary, status                        │
│  ) VALUES (...)                                                 │
│  Status = 'PENDING' (awaiting HR approval)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Generate Payslip PDF                                   │
│  - Use template with college logo                               │
│  - Include earnings breakdown, deductions, net salary           │
│  - Store in AWS S3 or local storage                             │
│  - Generate receipt URL                                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7: Notify Employee                                        │
│  - Create notification in 'notifications' table                 │
│  - Send push notification to mobile app                         │
│  - Send email with payslip PDF attachment                       │
│  - Message: "Your payslip for [Month] is ready. Download now."  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 8: HR Approval Workflow                                   │
│  - HR logs into HRMS portal                                     │
│  - Reviews pending payroll entries                              │
│  - Can edit deductions/allowances if needed                     │
│  - Clicks "Approve Payroll"                                     │
│  - Status changed from 'PENDING' to 'APPROVED'                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 9: Payment Processing (Optional Auto-Transfer)            │
│  - Accountant marks as 'PAID' after bank transfer               │
│  - Or: Integrate with bank API for auto-transfer               │
│  - Update payment_date and transaction_reference               │
└─────────────────────────────────────────────────────────────────┘
```

---

### Calculation Formula Details

#### **Gross Salary Calculation**
```
gross_salary = base_salary + hra + da + special_allowance

Example:
  Base Salary:        ₹45,000
  HRA (20%):          ₹10,000  (housing allowance)
  DA (15%):           ₹7,000   (dearness allowance)
  Special Allowance:  ₹3,000
  ─────────────────────────────
  Gross Salary:       ₹65,000
```

#### **Absence Deduction Calculation**
```
pay_per_day = gross_salary / total_working_days

absence_deduction = pay_per_day * days_absent

Example (26 working days in month):
  Gross Salary: ₹65,000
  Pay per day: ₹65,000 / 26 = ₹2,500
  
  Scenario 1: 0 days absent
    Absence Deduction = ₹2,500 × 0 = ₹0
  
  Scenario 2: 2 days absent
    Absence Deduction = ₹2,500 × 2 = ₹5,000
  
  Scenario 3: 5 days absent
    Absence Deduction = ₹2,500 × 5 = ₹12,500
```

**Note**: Approved leaves (sick leave, casual leave) are NOT counted as absences for deduction purposes.

#### **Standard Deductions**
```
PF (Provident Fund) = 12% of base_salary
ESI (Employee State Insurance) = 3.25% of gross_salary (if gross < ₹21,000)
Professional Tax = ₹200 per month (varies by state)

Example:
  Base Salary: ₹45,000
  Gross Salary: ₹65,000
  
  PF = ₹45,000 × 12% = ₹5,400
  ESI = Not applicable (gross > ₹21,000)
  Professional Tax = ₹1,000
  Absence Deduction = ₹5,000 (2 days absent)
  ──────────────────────────────────
  Total Deductions = ₹11,400
```

#### **Net Salary Calculation**
```
net_salary = gross_salary - total_deductions

Example:
  Gross Salary: ₹65,000
  Total Deductions: ₹11,400
  ──────────────────────────────────
  Net Salary: ₹53,600
```

---

### Database Trigger Implementation

**Trigger**: Automatically calculate net salary when payroll record is inserted/updated

```sql
CREATE OR REPLACE FUNCTION calculate_net_salary()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate absence deduction
    IF NEW.days_absent > 0 THEN
        NEW.absence_deduction := (NEW.gross_salary / NEW.total_working_days) * NEW.days_absent;
    END IF;
    
    -- Calculate net salary
    NEW.net_salary := NEW.gross_salary - (
        NEW.pf_deduction + 
        NEW.esi_deduction + 
        NEW.professional_tax + 
        NEW.absence_deduction + 
        NEW.other_deductions
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calculate_net_salary
BEFORE INSERT OR UPDATE ON payroll
FOR EACH ROW
EXECUTE FUNCTION calculate_net_salary();
```

---

### Edge Cases & Business Rules

#### **Leave Handling**
- **Approved Leave**: Does NOT count as absence (no deduction)
- **Unapproved Leave**: Counts as absence (deduction applied)
- **Half-Day**: Counts as 0.5 days absent

**Logic**:
```sql
SELECT 
    COUNT(CASE WHEN status = 'ABSENT' THEN 1 END) as days_absent,
    COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) as days_present,
    COUNT(CASE WHEN status = 'ON_LEAVE' THEN 1 END) as days_on_leave,
    COUNT(CASE WHEN status = 'HALF_DAY' THEN 0.5 END) as half_days
FROM attendance_records
WHERE user_id = [employee_id]
  AND attendance_date BETWEEN [start_date] AND [end_date]
  AND user_type = 'STAFF';
```

#### **Partial Month Employment**
- If employee joins mid-month: Calculate salary only for worked days
- Formula: `net_salary = (pay_per_day × days_worked) - deductions`

#### **Salary Grade Variations**
Different grades may have different allowance percentages:
```
Grade A: HRA 20%, DA 15%, Special 5%
Grade B: HRA 18%, DA 12%, Special 3%
Grade C: HRA 15%, DA 10%, Special 2%
```

---

### Scheduled Job Configuration

**Job**: Monthly Payroll Generation
- **Trigger**: Last day of month at 11:59 PM
- **Execution Time**: ~5 minutes for 300 employees
- **Technology**: Bull Queue (Redis-based) or pg_cron

**Example pg_cron Job**:
```sql
SELECT cron.schedule(
    'generate_monthly_payroll',
    '59 23 L * *',  -- Last day of month at 11:59 PM
    $$
    SELECT generate_payroll_for_month(EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE));
    $$
);
```

---

## 2. Parent Absence Alert Automation

### 🎯 Objective
Instantly notify parents via push notification when their child is marked absent.

---

### Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT: Teacher Marks Student as Absent                         │
│  (Mobile app or web portal)                                     │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Insert Attendance Record                               │
│  INSERT INTO attendance_records (                               │
│    user_id, user_type, class_id, attendance_date,               │
│    status, marked_by_user_id, marking_method                    │
│  ) VALUES (                                                     │
│    [student_id], 'STUDENT', [class_id], '2025-12-04',           │
│    'ABSENT', [teacher_id], 'MOBILE_APP'                         │
│  )                                                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER FIRES: notify_parent_on_absent()                       │
│  (Database trigger - executes immediately)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Check if Status = 'ABSENT' AND parent_notified = false│
│  IF TRUE → Continue, ELSE → Exit                                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Find Parent User ID                                    │
│  Query:                                                         │
│    SELECT p.user_id, p.fcm_token,                               │
│           CONCAT(s.first_name, ' ', s.last_name) as student_name│
│    FROM users s                                                 │
│    JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text│
│    WHERE s.user_id = [student_id]                               │
│      AND p.primary_role_id = (                                  │
│        SELECT role_id FROM user_roles WHERE role_name = 'PARENT'│
│      )                                                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Create Notification Record                             │
│  INSERT INTO notifications (                                    │
│    user_id, notification_type, title, message,                  │
│    related_entity_type, related_entity_id,                      │
│    priority, sent_via, action_required                          │
│  ) VALUES (                                                     │
│    [parent_user_id], 'ATTENDANCE_ALERT',                        │
│    'Attendance Alert',                                          │
│    '[Student Name] was marked absent on [Date]',               │
│    'ATTENDANCE', [attendance_id],                               │
│    'HIGH', 'APP_PUSH', true                                     │
│  )                                                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Send Push Notification via FCM                         │
│  - Use parent's fcm_token from users table                      │
│  - Send to Firebase Cloud Messaging API                         │
│  - Payload:                                                     │
│    {                                                            │
│      "title": "Attendance Alert",                               │
│      "body": "Aarav Kumar was marked absent on Dec 4, 2025",   │
│      "data": {                                                  │
│        "type": "ATTENDANCE_ALERT",                              │
│        "student_id": 123,                                       │
│        "attendance_id": 456,                                    │
│        "action_url": "/attendance/details/456"                  │
│      },                                                         │
│      "priority": "high",                                        │
│      "notification": {                                          │
│        "sound": "default",                                      │
│        "badge": 1                                               │
│      }                                                          │
│    }                                                            │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Update Notification Delivery Status                    │
│  UPDATE notifications                                           │
│  SET delivery_status = 'SENT'                                   │
│  WHERE notification_id = [notification_id]                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7: Mark Attendance Record as Notified                     │
│  UPDATE attendance_records                                      │
│  SET parent_notified = true                                     │
│  WHERE attendance_id = [attendance_id]                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 8: (Optional) Send SMS/Email                              │
│  - If parent has SMS enabled in preferences                     │
│  - Use Twilio/AWS SNS for SMS                                   │
│  - Use SendGrid/AWS SES for email                               │
│  - Message: "Alert: [Student Name] absent today. Login to app." │
└─────────────────────────────────────────────────────────────────┘
```

---

### Real-Time Sync to Parent App

**WebSocket Connection**:
- Parent app maintains persistent WebSocket connection to server
- When notification is created, server pushes update via WebSocket
- Parent app immediately updates notification badge count
- No polling required - instant delivery

**Implementation**:
```javascript
// Server-side (Socket.io)
io.to(`parent_${parent_user_id}`).emit('new_notification', {
  type: 'ATTENDANCE_ALERT',
  title: 'Attendance Alert',
  message: `${student_name} was marked absent on ${date}`,
  timestamp: new Date(),
  read: false
});
```

---

### Database Trigger Code

```sql
CREATE OR REPLACE FUNCTION notify_parent_on_absent()
RETURNS TRIGGER AS $$
DECLARE
    parent_user_id INTEGER;
    parent_fcm_token TEXT;
    student_name VARCHAR(255);
    notification_id INTEGER;
BEGIN
    -- Only process if status is ABSENT and not yet notified
    IF NEW.status = 'ABSENT' AND NEW.user_type = 'STUDENT' AND NEW.parent_notified = false THEN
        
        -- Find parent details
        SELECT 
            p.user_id, 
            p.fcm_token,
            CONCAT(s.first_name, ' ', s.last_name)
        INTO 
            parent_user_id, 
            parent_fcm_token,
            student_name
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        WHERE s.user_id = NEW.user_id
          AND p.primary_role_id = (SELECT role_id FROM user_roles WHERE role_name = 'PARENT')
        LIMIT 1;
        
        IF parent_user_id IS NOT NULL THEN
            -- Create notification record
            INSERT INTO notifications (
                user_id, 
                notification_type, 
                title, 
                message, 
                related_entity_type, 
                related_entity_id,
                priority,
                sent_via,
                action_required,
                action_url
            ) VALUES (
                parent_user_id,
                'ATTENDANCE_ALERT',
                'Attendance Alert',
                student_name || ' was marked absent on ' || NEW.attendance_date::text,
                'ATTENDANCE',
                NEW.attendance_id,
                'HIGH',
                'APP_PUSH',
                true,
                '/attendance/details/' || NEW.attendance_id
            ) RETURNING notification_id INTO notification_id;
            
            -- Queue push notification job (using pg_notify for background worker)
            PERFORM pg_notify(
                'send_push_notification',
                json_build_object(
                    'fcm_token', parent_fcm_token,
                    'notification_id', notification_id,
                    'type', 'ATTENDANCE_ALERT',
                    'title', 'Attendance Alert',
                    'body', student_name || ' was marked absent on ' || NEW.attendance_date::text,
                    'data', json_build_object(
                        'student_id', NEW.user_id,
                        'attendance_id', NEW.attendance_id
                    )
                )::text
            );
            
            -- Mark as notified
            NEW.parent_notified := true;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify_parent_absent
BEFORE INSERT OR UPDATE ON attendance_records
FOR EACH ROW
EXECUTE FUNCTION notify_parent_on_absent();
```

---

### Notification Preferences

Parents can customize notification settings:
```json
{
  "attendance_alerts": {
    "enabled": true,
    "methods": ["APP_PUSH", "SMS", "EMAIL"],
    "quiet_hours": {
      "start": "22:00",
      "end": "08:00"
    }
  },
  "marks_alerts": {
    "enabled": true,
    "methods": ["APP_PUSH"],
    "threshold": "below_40_percent"  // Only notify for low marks
  },
  "fee_reminders": {
    "enabled": true,
    "methods": ["APP_PUSH", "EMAIL"],
    "days_before_due": 7
  }
}
```

---

## 3. Marks Publication & Parent Notification

### 🎯 Objective
When teacher publishes marks, instantly sync to student/parent app with push notification.

---

### Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT: Teacher Publishes Marks                                 │
│  (Mobile app - clicks "Publish Marks" button)                   │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Update Marks Record                                    │
│  UPDATE marks                                                   │
│  SET is_published = true                                        │
│  WHERE mark_id IN ([list_of_mark_ids])                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGER FIRES: notify_parent_on_marks()                        │
│  (Executes for each updated row)                                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Find Parent & Subject Info                             │
│  Query:                                                         │
│    SELECT p.user_id, p.fcm_token,                               │
│           CONCAT(s.first_name, ' ', s.last_name) as student_name,│
│           sub.subject_name, at.type_name                        │
│    FROM marks m                                                 │
│    JOIN users s ON m.student_user_id = s.user_id               │
│    JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text│
│    JOIN subjects sub ON m.subject_id = sub.subject_id           │
│    JOIN assessment_types at ON m.assessment_type_id = at.id    │
│    WHERE m.mark_id = [mark_id]                                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Create Notification                                    │
│  INSERT INTO notifications (...)                                │
│  Message: "[Student] scored [X]/[Y] in [Subject] [Assessment]" │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Send Push Notification                                 │
│  - To Parent App (via FCM)                                      │
│  - To Student App (via FCM)                                     │
│  - Include deep link to marks details page                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Real-Time WebSocket Sync                               │
│  - Push update to parent's active WebSocket connection          │
│  - Push update to student's active WebSocket connection         │
│  - Update marks card in real-time without app refresh           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Update Principal's Dashboard                           │
│  - Real-time sync to Principal's analytics dashboard            │
│  - Update class average, subject-wise performance metrics       │
│  - Refresh materialized views if needed                         │
└─────────────────────────────────────────────────────────────────┘
```

---

### Database Trigger Code

```sql
CREATE OR REPLACE FUNCTION notify_parent_on_marks()
RETURNS TRIGGER AS $$
DECLARE
    parent_user_id INTEGER;
    parent_fcm_token TEXT;
    student_user_id INTEGER;
    student_fcm_token TEXT;
    student_name VARCHAR(255);
    subject_name VARCHAR(255);
    assessment_type VARCHAR(50);
BEGIN
    -- Only process if marks are published and not yet notified
    IF NEW.is_published = true AND NEW.parent_notified = false THEN
        
        -- Find parent, student, and subject details
        SELECT 
            p.user_id, 
            p.fcm_token,
            s.user_id,
            s.fcm_token,
            CONCAT(s.first_name, ' ', s.last_name),
            sub.subject_name,
            at.type_name
        INTO 
            parent_user_id, 
            parent_fcm_token,
            student_user_id,
            student_fcm_token,
            student_name,
            subject_name,
            assessment_type
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        JOIN subjects sub ON sub.subject_id = NEW.subject_id
        JOIN assessment_types at ON at.assessment_type_id = NEW.assessment_type_id
        WHERE s.user_id = NEW.student_user_id
          AND p.primary_role_id = (SELECT role_id FROM user_roles WHERE role_name = 'PARENT')
        LIMIT 1;
        
        -- Notify Parent
        IF parent_user_id IS NOT NULL THEN
            INSERT INTO notifications (
                user_id, 
                notification_type, 
                title, 
                message, 
                related_entity_type, 
                related_entity_id,
                priority,
                sent_via,
                action_url
            ) VALUES (
                parent_user_id,
                'MARKS_UPDATE',
                'New Marks Published',
                student_name || ' scored ' || NEW.marks_obtained || '/' || NEW.max_marks || ' in ' || subject_name || ' (' || assessment_type || ')',
                'MARKS',
                NEW.mark_id,
                'NORMAL',
                'APP_PUSH',
                '/marks/details/' || NEW.mark_id
            );
            
            -- Queue push notification for parent
            PERFORM pg_notify('send_push_notification', 
                json_build_object(
                    'fcm_token', parent_fcm_token,
                    'type', 'MARKS_UPDATE',
                    'title', 'New Marks Published',
                    'body', student_name || ' scored ' || NEW.marks_obtained || '/' || NEW.max_marks
                )::text
            );
        END IF;
        
        -- Notify Student
        INSERT INTO notifications (
            user_id, 
            notification_type, 
            title, 
            message, 
            related_entity_type, 
            related_entity_id,
            priority,
            sent_via,
            action_url
        ) VALUES (
            student_user_id,
            'MARKS_UPDATE',
            'New Marks Published',
            'Your ' || assessment_type || ' marks for ' || subject_name || ' are now available: ' || NEW.marks_obtained || '/' || NEW.max_marks,
            'MARKS',
            NEW.mark_id,
            'NORMAL',
            'APP_PUSH',
            '/marks/details/' || NEW.mark_id
        );
        
        -- Queue push notification for student
        PERFORM pg_notify('send_push_notification', 
            json_build_object(
                'fcm_token', student_fcm_token,
                'type', 'MARKS_UPDATE',
                'title', 'New Marks Published',
                'body', 'You scored ' || NEW.marks_obtained || '/' || NEW.max_marks || ' in ' || subject_name
            )::text
        );
        
        -- Mark as notified
        NEW.parent_notified := true;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify_parent_marks
BEFORE UPDATE ON marks
FOR EACH ROW
EXECUTE FUNCTION notify_parent_on_marks();
```

---

## 4. Fee Overdue Reminder Automation

### 🎯 Objective
Automatically send reminders to students/parents when fees are overdue.

---

### Scheduled Job Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│  SCHEDULED JOB: Daily Fee Reminder Check                        │
│  Runs: Every day at 10:00 AM                                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Find Overdue Payments                                  │
│  Query:                                                         │
│    SELECT fb.*, u.user_id, u.fcm_token, u.email,                │
│           CONCAT(u.first_name, ' ', u.last_name) as student_name│
│    FROM fee_balance fb                                          │
│    JOIN users u ON fb.student_user_id = u.user_id              │
│    WHERE fb.due_date < CURRENT_DATE                             │
│      AND fb.amount_pending > 0                                  │
│      AND fb.reminder_sent = false                               │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: For Each Overdue Student                               │
│  Loop through results and process individually                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Find Parent                                            │
│  Query parent linked to student                                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Create Notification                                    │
│  - For Student                                                  │
│  - For Parent                                                   │
│  Title: "Fee Payment Overdue"                                   │
│  Message: "Your fee payment of ₹[X] is overdue by [Y] days"    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Send Multi-Channel Notifications                       │
│  - Push Notification (App)                                      │
│  - Email (with payment link)                                    │
│  - SMS (for critical overdue > 30 days)                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Update Reminder Status                                 │
│  UPDATE fee_balance                                             │
│  SET reminder_sent = true, last_reminder_date = CURRENT_DATE    │
│  WHERE balance_id = [id]                                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7: Escalation Logic (Overdue > 30 days)                  │
│  - Send alert to Accountant                                     │
│  - Send alert to Principal                                      │
│  - Flag student for follow-up                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Escalation Rules

| Overdue Duration | Action |
|-----------------|--------|
| 7 days before due | Friendly reminder (Push + Email) |
| 1 day before due | Urgent reminder (Push + Email + SMS) |
| Due date | Payment overdue notification |
| 7 days after due | First follow-up (Push + Email) |
| 15 days after due | Second follow-up + Accountant alert |
| 30 days after due | Final notice + Principal alert + SMS |
| 60 days after due | Escalate to Director + Suspend library access |

---

## 5. Real-Time Dashboard Sync

### 🎯 Objective
Instantly update Principal's dashboard when data changes (attendance, marks, fees).

---

### Implementation Strategy

**Technology**: WebSocket (Socket.io) + Redis Pub/Sub

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT: Any Data Change (Insert/Update in key tables)          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  Database Trigger: Publish Event to Redis                       │
│  PERFORM pg_notify('dashboard_update', json_data::text);        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  Node.js Worker: Listening to pg_notify channel                 │
│  Receives event: { type: 'ATTENDANCE_UPDATE', college_id: 1 }   │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  Publish to Redis Pub/Sub                                       │
│  redis.publish('dashboard:college:1', JSON.stringify(event));   │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  Socket.io Server: Subscribe to Redis Channel                   │
│  Emit to all connected clients (Principals, Director)           │
│  io.to('college:1').emit('dashboard_update', event);            │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  Client (Web Dashboard): Receives WebSocket Message             │
│  - Updates attendance percentage in real-time                   │
│  - Refreshes revenue chart                                      │
│  - Updates "Students Present Today" counter                     │
│  - No page reload required                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Example: Real-Time Attendance Update

**Scenario**: Teacher marks attendance at 10:05 AM

1. **Database Insert**: Attendance record saved
2. **Trigger Fires**: Publishes event to Redis
3. **WebSocket Broadcast**: All connected dashboards receive update
4. **UI Update**: Principal sees "Students Present: 245/280" change to "246/280" instantly

---

## Summary: Automation Features

| Automation | Trigger | Target Users | Notification Method | Latency |
|-----------|---------|--------------|---------------------|---------|
| **Payroll Calculation** | End of month | HR, Staff | Email + In-app | ~5 min batch job |
| **Absence Alert** | Attendance marked | Parent | Push + SMS + Email | < 5 seconds |
| **Marks Publication** | Teacher publishes | Student, Parent, Principal | Push + WebSocket | < 3 seconds |
| **Fee Reminder** | Daily cron job | Student, Parent, Accountant | Push + Email + SMS | 10:00 AM daily |
| **Dashboard Sync** | Any data change | Director, Principal | WebSocket | Real-time |

---

This completes the **Automation Logic & Workflow Specifications** document. All automations are designed to work seamlessly with the centralized database architecture, ensuring data interconnectivity and real-time responsiveness across the entire system.
