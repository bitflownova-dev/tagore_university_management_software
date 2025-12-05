-- ============================================================================
-- UNIFIED UNIVERSITY MANAGEMENT SYSTEM - DATABASE SCHEMA
-- Tagore Group of Colleges - Centralized Multi-Tenant Architecture
-- ============================================================================

-- Core Design Principles:
-- 1. Single Centralized Database for LMS, HRMS, ERP, Finance
-- 2. Multi-tenant architecture with college-level isolation
-- 3. Real-time data interconnectivity and automation triggers
-- 4. Optimized for high-volume transactions and analytics

-- ============================================================================
-- SECTION 1: ORGANIZATION & TENANT MANAGEMENT
-- ============================================================================

CREATE TABLE colleges (
    college_id SERIAL PRIMARY KEY,
    college_code VARCHAR(20) UNIQUE NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    college_type VARCHAR(50) NOT NULL, -- 'ARTS_SCIENCE', 'ENGINEERING', 'MEDICAL'
    location VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100) DEFAULT 'Chennai',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_capacity INTEGER NOT NULL,
    current_strength INTEGER DEFAULT 0,
    established_date DATE,
    accreditation_status VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Metadata
    metadata JSONB, -- Flexible storage for college-specific configs
    
    CONSTRAINT chk_positive_capacity CHECK (total_capacity > 0),
    CONSTRAINT chk_strength_capacity CHECK (current_strength <= total_capacity)
);

-- Pre-populate Tagore colleges
INSERT INTO colleges (college_code, college_name, college_type, location, total_capacity, current_strength) VALUES
('TCAS', 'Tagore College of Arts & Science', 'ARTS_SCIENCE', 'Chromepet, Chennai', 4000, 3424),
('TEC', 'Tagore Engineering College', 'ENGINEERING', 'Rathinamangalam, Chennai', 1500, 1005),
('TMC', 'Tagore Medical College & Hospital', 'MEDICAL', 'Rathinamangalam, Chennai', 1200, 800);

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    department_code VARCHAR(20) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    department_type VARCHAR(50), -- 'ACADEMIC', 'ADMINISTRATIVE', 'HOSPITAL'
    hod_user_id INTEGER, -- Foreign key added later
    budget_allocated DECIMAL(15, 2) DEFAULT 0,
    budget_utilized DECIMAL(15, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(college_id, department_code)
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES departments(department_id) ON DELETE SET NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_type VARCHAR(50) NOT NULL, -- 'UG', 'PG', 'DIPLOMA', 'CERTIFICATE'
    duration_years INTEGER NOT NULL,
    total_semesters INTEGER NOT NULL,
    intake_capacity INTEGER NOT NULL,
    current_enrollment INTEGER DEFAULT 0,
    fee_per_semester DECIMAL(12, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_positive_duration CHECK (duration_years > 0),
    CONSTRAINT chk_enrollment_capacity CHECK (current_enrollment <= intake_capacity)
);

-- ============================================================================
-- SECTION 2: USER MANAGEMENT (RBAC)
-- ============================================================================

CREATE TABLE user_roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL, -- 'DIRECTOR', 'PRINCIPAL', 'HOD', 'TEACHER', 'STUDENT', 'PARENT', 'HR', 'ACCOUNTANT', 'ADMIN'
    role_level INTEGER NOT NULL, -- Hierarchical level (1=highest)
    permissions JSONB NOT NULL, -- Detailed permission structure
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate roles
INSERT INTO user_roles (role_name, role_level, permissions) VALUES
('DIRECTOR', 1, '{"view": "ALL", "edit": "ALL", "analytics": "ALL", "financial": "ALL"}'),
('PRINCIPAL', 2, '{"view": "COLLEGE", "edit": "COLLEGE", "analytics": "COLLEGE", "financial": "VIEW"}'),
('HOD', 3, '{"view": "DEPARTMENT", "edit": "DEPARTMENT", "analytics": "DEPARTMENT"}'),
('TEACHER', 4, '{"view": "CLASS", "edit": "MARKS_ATTENDANCE", "lms": "FULL"}'),
('STUDENT', 5, '{"view": "SELF", "lms": "VIEW_SUBMIT"}'),
('PARENT', 5, '{"view": "CHILD"}'),
('HR', 3, '{"view": "STAFF", "edit": "HR_DATA", "payroll": "FULL"}'),
('ACCOUNTANT', 3, '{"view": "FINANCE", "edit": "FINANCE", "reports": "FULL"}'),
('ADMIN', 2, '{"view": "SYSTEM", "edit": "SYSTEM", "manage": "USERS"}');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    college_id INTEGER REFERENCES colleges(college_id) ON DELETE SET NULL,
    department_id INTEGER REFERENCES departments(department_id) ON DELETE SET NULL,
    
    -- Authentication
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Profile
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    profile_picture_url TEXT,
    
    -- Role & Status
    primary_role_id INTEGER NOT NULL REFERENCES user_roles(role_id),
    secondary_roles INTEGER[], -- Array of additional role_ids
    employee_id VARCHAR(50) UNIQUE, -- For staff
    student_id VARCHAR(50) UNIQUE, -- For students
    
    -- Contact & Address
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    emergency_contact VARCHAR(20),
    
    -- Account Status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    fcm_token TEXT, -- For push notifications
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Metadata
    metadata JSONB, -- Flexible storage for role-specific data
    
    CONSTRAINT chk_employee_or_student CHECK (
        (primary_role_id IN (SELECT role_id FROM user_roles WHERE role_name IN ('STUDENT', 'PARENT'))) OR 
        employee_id IS NOT NULL
    )
);

-- Indexes for performance
CREATE INDEX idx_users_college ON users(college_id);
CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_users_role ON users(primary_role_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_employee ON users(employee_id) WHERE employee_id IS NOT NULL;
CREATE INDEX idx_users_student ON users(student_id) WHERE student_id IS NOT NULL;

-- ============================================================================
-- SECTION 3: ACADEMIC MANAGEMENT (LMS)
-- ============================================================================

CREATE TABLE academic_years (
    academic_year_id SERIAL PRIMARY KEY,
    year_code VARCHAR(20) UNIQUE NOT NULL, -- '2024-25'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_year_dates CHECK (end_date > start_date)
);

CREATE TABLE semesters (
    semester_id SERIAL PRIMARY KEY,
    academic_year_id INTEGER NOT NULL REFERENCES academic_years(academic_year_id) ON DELETE CASCADE,
    semester_number INTEGER NOT NULL,
    semester_name VARCHAR(50) NOT NULL, -- 'Semester 1', 'Semester 2'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(academic_year_id, semester_number),
    CONSTRAINT chk_semester_dates CHECK (end_date > start_date)
);

CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    semester_number INTEGER NOT NULL,
    credits INTEGER NOT NULL,
    subject_type VARCHAR(50) NOT NULL, -- 'CORE', 'ELECTIVE', 'PRACTICAL', 'LAB'
    max_marks INTEGER NOT NULL DEFAULT 100,
    passing_marks INTEGER NOT NULL DEFAULT 40,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(college_id, course_id, subject_code),
    CONSTRAINT chk_passing_marks CHECK (passing_marks < max_marks)
);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    semester_id INTEGER NOT NULL REFERENCES semesters(semester_id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    
    class_code VARCHAR(50) UNIQUE NOT NULL,
    section VARCHAR(10), -- 'A', 'B', 'C'
    
    teacher_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    
    schedule JSONB, -- {"monday": ["09:00-10:00"], "tuesday": ["10:00-11:00"]}
    room_number VARCHAR(50),
    
    max_students INTEGER DEFAULT 60,
    enrolled_students INTEGER DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_class_capacity CHECK (enrolled_students <= max_students)
);

CREATE TABLE student_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    academic_year_id INTEGER NOT NULL REFERENCES academic_years(academic_year_id) ON DELETE CASCADE,
    
    enrollment_number VARCHAR(50) UNIQUE NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    current_semester INTEGER NOT NULL DEFAULT 1,
    
    status VARCHAR(50) DEFAULT 'ACTIVE', -- 'ACTIVE', 'SUSPENDED', 'GRADUATED', 'DROPPED'
    
    cgpa DECIMAL(4, 2) DEFAULT 0.00,
    total_credits_earned INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(student_user_id, course_id)
);

CREATE TABLE class_enrollments (
    class_enrollment_id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    student_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    
    UNIQUE(class_id, student_user_id)
);

-- ============================================================================
-- SECTION 4: ATTENDANCE TRACKING (CORE AUTOMATION TRIGGER)
-- ============================================================================

CREATE TABLE attendance_records (
    attendance_id SERIAL PRIMARY KEY,
    
    -- Attendance Subject (Student or Staff)
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    user_type VARCHAR(20) NOT NULL, -- 'STUDENT', 'STAFF'
    
    -- Context
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(class_id) ON DELETE SET NULL, -- For students
    
    -- Date & Time
    attendance_date DATE NOT NULL,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    
    -- Status
    status VARCHAR(20) NOT NULL, -- 'PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'ON_LEAVE'
    
    -- Marked By
    marked_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    marking_method VARCHAR(50), -- 'MANUAL', 'BIOMETRIC', 'MOBILE_APP', 'FACE_RECOGNITION'
    
    -- Location (for mobile attendance)
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Additional Info
    remarks TEXT,
    
    -- Automation Flags
    payroll_processed BOOLEAN DEFAULT false, -- For staff payroll calculation
    parent_notified BOOLEAN DEFAULT false, -- For student absence alerts
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, attendance_date, class_id)
);

-- Indexes for high-frequency queries
CREATE INDEX idx_attendance_user ON attendance_records(user_id, attendance_date);
CREATE INDEX idx_attendance_college_date ON attendance_records(college_id, attendance_date);
CREATE INDEX idx_attendance_class ON attendance_records(class_id, attendance_date);
CREATE INDEX idx_attendance_status ON attendance_records(status);
CREATE INDEX idx_attendance_payroll_pending ON attendance_records(user_type, payroll_processed) WHERE user_type = 'STAFF' AND payroll_processed = false;
CREATE INDEX idx_attendance_notification_pending ON attendance_records(status, parent_notified) WHERE status = 'ABSENT' AND parent_notified = false;

-- ============================================================================
-- SECTION 5: MARKS & ASSESSMENT (LMS)
-- ============================================================================

CREATE TABLE assessment_types (
    assessment_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL, -- 'INTERNAL_1', 'INTERNAL_2', 'ASSIGNMENT', 'PRACTICAL', 'FINAL_EXAM'
    weightage DECIMAL(5, 2) NOT NULL, -- Percentage contribution to final grade
    description TEXT
);

INSERT INTO assessment_types (type_name, weightage) VALUES
('INTERNAL_1', 15.00),
('INTERNAL_2', 15.00),
('ASSIGNMENT', 10.00),
('PRACTICAL', 10.00),
('FINAL_EXAM', 50.00);

CREATE TABLE marks (
    mark_id SERIAL PRIMARY KEY,
    student_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    class_id INTEGER NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    assessment_type_id INTEGER NOT NULL REFERENCES assessment_types(assessment_type_id) ON DELETE CASCADE,
    
    marks_obtained DECIMAL(6, 2) NOT NULL,
    max_marks DECIMAL(6, 2) NOT NULL,
    
    -- Entered By
    entered_by_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Status
    is_published BOOLEAN DEFAULT false, -- Controls visibility to students/parents
    
    remarks TEXT,
    
    -- Automation Flag
    parent_notified BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(student_user_id, class_id, subject_id, assessment_type_id),
    CONSTRAINT chk_marks_range CHECK (marks_obtained >= 0 AND marks_obtained <= max_marks)
);

-- Index for real-time parent notification triggers
CREATE INDEX idx_marks_published ON marks(is_published, parent_notified) WHERE is_published = true AND parent_notified = false;
CREATE INDEX idx_marks_student ON marks(student_user_id);

-- ============================================================================
-- SECTION 6: FINANCE & FEE MANAGEMENT (ERP)
-- ============================================================================

CREATE TABLE fee_structures (
    fee_structure_id SERIAL PRIMARY KEY,
    college_id INTEGER NOT NULL REFERENCES colleges(college_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    academic_year_id INTEGER NOT NULL REFERENCES academic_years(academic_year_id) ON DELETE CASCADE,
    
    semester_number INTEGER NOT NULL,
    
    tuition_fee DECIMAL(12, 2) NOT NULL DEFAULT 0,
    lab_fee DECIMAL(12, 2) DEFAULT 0,
    library_fee DECIMAL(12, 2) DEFAULT 0,
    sports_fee DECIMAL(12, 2) DEFAULT 0,
    hostel_fee DECIMAL(12, 2) DEFAULT 0,
    transport_fee DECIMAL(12, 2) DEFAULT 0,
    other_fees DECIMAL(12, 2) DEFAULT 0,
    
    total_fee DECIMAL(12, 2) GENERATED ALWAYS AS (
        tuition_fee + lab_fee + library_fee + sports_fee + hostel_fee + transport_fee + other_fees
    ) STORED,
    
    due_date DATE NOT NULL,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(college_id, course_id, academic_year_id, semester_number)
);

CREATE TABLE fee_payments (
    payment_id SERIAL PRIMARY KEY,
    student_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    enrollment_id INTEGER NOT NULL REFERENCES student_enrollments(enrollment_id) ON DELETE CASCADE,
    fee_structure_id INTEGER NOT NULL REFERENCES fee_structures(fee_structure_id) ON DELETE CASCADE,
    
    -- Payment Details
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount_paid DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'CASH', 'CARD', 'UPI', 'NET_BANKING', 'CHEQUE'
    
    transaction_id VARCHAR(255) UNIQUE,
    payment_gateway VARCHAR(100), -- 'RAZORPAY', 'PAYTM', 'PHONEPE'
    
    -- Status
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'
    
    -- Receipt
    receipt_number VARCHAR(50) UNIQUE,
    receipt_url TEXT,
    
    remarks TEXT,
    processed_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_positive_amount CHECK (amount_paid > 0)
);

-- Index for financial reporting and pending payments
CREATE INDEX idx_payments_student ON fee_payments(student_user_id);
CREATE INDEX idx_payments_status ON fee_payments(payment_status);
CREATE INDEX idx_payments_date ON fee_payments(payment_date);

CREATE TABLE fee_balance (
    balance_id SERIAL PRIMARY KEY,
    student_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    enrollment_id INTEGER NOT NULL REFERENCES student_enrollments(enrollment_id) ON DELETE CASCADE,
    academic_year_id INTEGER NOT NULL REFERENCES academic_years(academic_year_id) ON DELETE CASCADE,
    semester_number INTEGER NOT NULL,
    
    total_fee DECIMAL(12, 2) NOT NULL,
    amount_paid DECIMAL(12, 2) DEFAULT 0,
    amount_pending DECIMAL(12, 2) GENERATED ALWAYS AS (total_fee - amount_paid) STORED,
    
    due_date DATE NOT NULL,
    
    -- Alert Flags
    reminder_sent BOOLEAN DEFAULT false,
    overdue BOOLEAN GENERATED ALWAYS AS (CURRENT_DATE > due_date AND amount_paid < total_fee) STORED,
    
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(student_user_id, academic_year_id, semester_number)
);

-- Index for automated reminder system
CREATE INDEX idx_balance_overdue ON fee_balance(overdue, reminder_sent) WHERE overdue = true AND reminder_sent = false;

-- ============================================================================
-- SECTION 7: HR & PAYROLL (HRMS)
-- ============================================================================

CREATE TABLE employee_details (
    employee_detail_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Employment Info
    designation VARCHAR(100) NOT NULL,
    employee_type VARCHAR(50) NOT NULL, -- 'FULL_TIME', 'PART_TIME', 'CONTRACT', 'VISITING'
    joining_date DATE NOT NULL,
    confirmation_date DATE,
    
    -- Qualification
    highest_qualification VARCHAR(100),
    specialization VARCHAR(100),
    experience_years INTEGER DEFAULT 0,
    
    -- Salary Structure
    salary_grade VARCHAR(20), -- 'A', 'B', 'C', 'D'
    base_salary DECIMAL(12, 2) NOT NULL,
    hra DECIMAL(12, 2) DEFAULT 0, -- House Rent Allowance
    da DECIMAL(12, 2) DEFAULT 0, -- Dearness Allowance
    special_allowance DECIMAL(12, 2) DEFAULT 0,
    
    -- Deductions
    pf_deduction DECIMAL(12, 2) DEFAULT 0, -- Provident Fund
    esi_deduction DECIMAL(12, 2) DEFAULT 0, -- Employee State Insurance
    professional_tax DECIMAL(12, 2) DEFAULT 0,
    
    -- Attendance Based Salary
    pay_per_day DECIMAL(10, 2) GENERATED ALWAYS AS (
        (base_salary + hra + da + special_allowance) / 30
    ) STORED,
    
    -- Bank Details
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    ifsc_code VARCHAR(20),
    
    -- Status
    employment_status VARCHAR(50) DEFAULT 'ACTIVE', -- 'ACTIVE', 'RESIGNED', 'TERMINATED', 'RETIRED'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll (
    payroll_id SERIAL PRIMARY KEY,
    employee_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Period
    month INTEGER NOT NULL, -- 1-12
    year INTEGER NOT NULL,
    
    -- Working Days
    total_working_days INTEGER NOT NULL,
    days_present INTEGER NOT NULL DEFAULT 0,
    days_absent INTEGER NOT NULL DEFAULT 0,
    days_on_leave INTEGER NOT NULL DEFAULT 0,
    
    -- Salary Components
    base_salary DECIMAL(12, 2) NOT NULL,
    hra DECIMAL(12, 2) DEFAULT 0,
    da DECIMAL(12, 2) DEFAULT 0,
    special_allowance DECIMAL(12, 2) DEFAULT 0,
    
    gross_salary DECIMAL(12, 2) GENERATED ALWAYS AS (
        base_salary + hra + da + special_allowance
    ) STORED,
    
    -- Deductions
    pf_deduction DECIMAL(12, 2) DEFAULT 0,
    esi_deduction DECIMAL(12, 2) DEFAULT 0,
    professional_tax DECIMAL(12, 2) DEFAULT 0,
    absence_deduction DECIMAL(12, 2) DEFAULT 0, -- Calculated based on days_absent
    other_deductions DECIMAL(12, 2) DEFAULT 0,
    
    total_deductions DECIMAL(12, 2) GENERATED ALWAYS AS (
        pf_deduction + esi_deduction + professional_tax + absence_deduction + other_deductions
    ) STORED,
    
    -- Net Salary
    net_salary DECIMAL(12, 2), -- Calculated by trigger
    
    -- Status
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'PAID', 'REJECTED'
    
    -- Payment
    payment_date DATE,
    payment_mode VARCHAR(50), -- 'BANK_TRANSFER', 'CASH', 'CHEQUE'
    transaction_reference VARCHAR(255),
    
    -- Approval
    generated_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    approved_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    
    remarks TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(employee_user_id, month, year)
);

-- Index for payroll processing
CREATE INDEX idx_payroll_employee ON payroll(employee_user_id);
CREATE INDEX idx_payroll_period ON payroll(year, month);
CREATE INDEX idx_payroll_status ON payroll(status);

CREATE TABLE leave_requests (
    leave_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    leave_type VARCHAR(50) NOT NULL, -- 'CASUAL', 'SICK', 'EARNED', 'MATERNITY', 'PATERNITY'
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    total_days INTEGER NOT NULL,
    
    reason TEXT NOT NULL,
    
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED'
    
    approved_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    approval_date TIMESTAMP,
    approval_remarks TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_leave_dates CHECK (to_date >= from_date)
);

-- ============================================================================
-- SECTION 8: NOTIFICATIONS & ALERTS (AUTOMATION)
-- ============================================================================

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    
    -- Recipient
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Content
    notification_type VARCHAR(50) NOT NULL, -- 'ATTENDANCE_ALERT', 'MARKS_UPDATE', 'FEE_REMINDER', 'PAYROLL', 'ANNOUNCEMENT'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related Entity (polymorphic)
    related_entity_type VARCHAR(50), -- 'ATTENDANCE', 'MARKS', 'PAYMENT', 'PAYROLL'
    related_entity_id INTEGER,
    
    -- Priority
    priority VARCHAR(20) DEFAULT 'NORMAL', -- 'LOW', 'NORMAL', 'HIGH', 'URGENT'
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    
    -- Delivery
    sent_via VARCHAR(50), -- 'APP_PUSH', 'EMAIL', 'SMS', 'IN_APP'
    delivery_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SENT', 'DELIVERED', 'FAILED'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Action
    action_url TEXT, -- Deep link to relevant section
    action_required BOOLEAN DEFAULT false
);

-- Index for unread notifications
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- ============================================================================
-- SECTION 9: ANALYTICS & REPORTING (DATA WAREHOUSE)
-- ============================================================================

-- Materialized view for Director's dashboard - Real-time aggregate stats
CREATE MATERIALIZED VIEW director_dashboard_stats AS
SELECT 
    -- College-wise breakdown
    c.college_id,
    c.college_name,
    c.college_type,
    c.total_capacity,
    c.current_strength,
    ROUND((c.current_strength::DECIMAL / c.total_capacity) * 100, 2) AS occupancy_percentage,
    
    -- Financial metrics (current academic year)
    (SELECT COALESCE(SUM(fp.amount_paid), 0) 
     FROM fee_payments fp 
     JOIN users u ON fp.student_user_id = u.user_id 
     WHERE u.college_id = c.college_id 
       AND fp.payment_status = 'SUCCESS'
       AND EXTRACT(YEAR FROM fp.payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    ) AS total_revenue_collected,
    
    (SELECT COALESCE(SUM(fb.amount_pending), 0) 
     FROM fee_balance fb 
     JOIN users u ON fb.student_user_id = u.user_id 
     WHERE u.college_id = c.college_id
    ) AS total_revenue_pending,
    
    -- Staff metrics (today's attendance)
    (SELECT COUNT(*) 
     FROM attendance_records ar 
     JOIN users u ON ar.user_id = u.user_id 
     WHERE u.college_id = c.college_id 
       AND ar.user_type = 'STAFF' 
       AND ar.attendance_date = CURRENT_DATE 
       AND ar.status = 'PRESENT'
    ) AS staff_present_today,
    
    (SELECT COUNT(*) 
     FROM users u 
     WHERE u.college_id = c.college_id 
       AND u.primary_role_id IN (SELECT role_id FROM user_roles WHERE role_name IN ('TEACHER', 'HOD', 'PRINCIPAL'))
       AND u.is_active = true
    ) AS total_staff,
    
    -- Student metrics (today's attendance)
    (SELECT COUNT(*) 
     FROM attendance_records ar 
     JOIN users u ON ar.user_id = u.user_id 
     WHERE u.college_id = c.college_id 
       AND ar.user_type = 'STUDENT' 
       AND ar.attendance_date = CURRENT_DATE 
       AND ar.status = 'PRESENT'
    ) AS students_present_today,
    
    CURRENT_TIMESTAMP AS last_updated
FROM colleges c
WHERE c.is_active = true;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_director_stats_college ON director_dashboard_stats(college_id);

-- Refresh function (can be scheduled via cron or triggered)
CREATE OR REPLACE FUNCTION refresh_director_dashboard()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY director_dashboard_stats;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 10: AUTOMATION TRIGGERS
-- ============================================================================

-- Trigger 1: Auto-notify parents when student is marked absent
CREATE OR REPLACE FUNCTION notify_parent_on_absent()
RETURNS TRIGGER AS $$
DECLARE
    parent_user_id INTEGER;
    student_name VARCHAR(255);
BEGIN
    IF NEW.status = 'ABSENT' AND NEW.user_type = 'STUDENT' AND NEW.parent_notified = false THEN
        -- Find parent
        SELECT u.user_id, CONCAT(s.first_name, ' ', s.last_name)
        INTO parent_user_id, student_name
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        WHERE s.user_id = NEW.user_id
          AND p.primary_role_id = (SELECT role_id FROM user_roles WHERE role_name = 'PARENT')
        LIMIT 1;
        
        IF parent_user_id IS NOT NULL THEN
            -- Create notification
            INSERT INTO notifications (
                user_id, 
                notification_type, 
                title, 
                message, 
                related_entity_type, 
                related_entity_id,
                priority,
                sent_via,
                action_required
            ) VALUES (
                parent_user_id,
                'ATTENDANCE_ALERT',
                'Attendance Alert',
                student_name || ' was marked absent on ' || NEW.attendance_date::text,
                'ATTENDANCE',
                NEW.attendance_id,
                'HIGH',
                'APP_PUSH',
                true
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

-- Trigger 2: Auto-notify parents when marks are published
CREATE OR REPLACE FUNCTION notify_parent_on_marks()
RETURNS TRIGGER AS $$
DECLARE
    parent_user_id INTEGER;
    student_name VARCHAR(255);
    subject_name VARCHAR(255);
BEGIN
    IF NEW.is_published = true AND NEW.parent_notified = false THEN
        -- Find parent and subject info
        SELECT 
            p.user_id, 
            CONCAT(s.first_name, ' ', s.last_name),
            sub.subject_name
        INTO parent_user_id, student_name, subject_name
        FROM users s
        LEFT JOIN users p ON p.metadata->>'child_user_id' = s.user_id::text
        JOIN subjects sub ON sub.subject_id = NEW.subject_id
        WHERE s.user_id = NEW.student_user_id
          AND p.primary_role_id = (SELECT role_id FROM user_roles WHERE role_name = 'PARENT')
        LIMIT 1;
        
        IF parent_user_id IS NOT NULL THEN
            -- Create notification
            INSERT INTO notifications (
                user_id, 
                notification_type, 
                title, 
                message, 
                related_entity_type, 
                related_entity_id,
                priority,
                sent_via
            ) VALUES (
                parent_user_id,
                'MARKS_UPDATE',
                'Marks Published',
                student_name || ' scored ' || NEW.marks_obtained || '/' || NEW.max_marks || ' in ' || subject_name,
                'MARKS',
                NEW.mark_id,
                'NORMAL',
                'APP_PUSH'
            );
            
            -- Mark as notified
            NEW.parent_notified := true;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify_parent_marks
BEFORE UPDATE ON marks
FOR EACH ROW
EXECUTE FUNCTION notify_parent_on_marks();

-- Trigger 3: Calculate net salary in payroll
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

-- Trigger 4: Update college current strength when student enrolls
CREATE OR REPLACE FUNCTION update_college_strength()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE colleges c
        SET current_strength = (
            SELECT COUNT(*) 
            FROM student_enrollments se 
            JOIN users u ON se.student_user_id = u.user_id 
            WHERE u.college_id = c.college_id 
              AND se.status = 'ACTIVE'
        )
        WHERE c.college_id = (SELECT college_id FROM users WHERE user_id = NEW.student_user_id);
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE colleges c
        SET current_strength = (
            SELECT COUNT(*) 
            FROM student_enrollments se 
            JOIN users u ON se.student_user_id = u.user_id 
            WHERE u.college_id = c.college_id 
              AND se.status = 'ACTIVE'
        )
        WHERE c.college_id = (SELECT college_id FROM users WHERE user_id = NEW.student_user_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_college_strength
AFTER INSERT OR UPDATE ON student_enrollments
FOR EACH ROW
EXECUTE FUNCTION update_college_strength();

-- Trigger 5: Auto-generate fee balance entry when student enrolls
CREATE OR REPLACE FUNCTION generate_fee_balance()
RETURNS TRIGGER AS $$
DECLARE
    fee_record RECORD;
BEGIN
    IF NEW.status = 'ACTIVE' THEN
        -- Get fee structure for current semester
        SELECT * INTO fee_record
        FROM fee_structures
        WHERE course_id = NEW.course_id
          AND academic_year_id = NEW.academic_year_id
          AND semester_number = NEW.current_semester
          AND is_active = true
        LIMIT 1;
        
        IF FOUND THEN
            INSERT INTO fee_balance (
                student_user_id,
                enrollment_id,
                academic_year_id,
                semester_number,
                total_fee,
                due_date
            ) VALUES (
                NEW.student_user_id,
                NEW.enrollment_id,
                NEW.academic_year_id,
                NEW.current_semester,
                fee_record.total_fee,
                fee_record.due_date
            )
            ON CONFLICT (student_user_id, academic_year_id, semester_number) 
            DO NOTHING;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_fee_balance
AFTER INSERT OR UPDATE ON student_enrollments
FOR EACH ROW
EXECUTE FUNCTION generate_fee_balance();

-- ============================================================================
-- SECTION 11: AUDIT & LOGGING
-- ============================================================================

CREATE TABLE audit_logs (
    audit_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    
    action VARCHAR(50) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'
    entity_type VARCHAR(50) NOT NULL, -- 'USER', 'ATTENDANCE', 'MARKS', 'PAYMENT'
    entity_id INTEGER,
    
    old_values JSONB,
    new_values JSONB,
    
    ip_address INET,
    user_agent TEXT,
    
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);

-- ============================================================================
-- PERFORMANCE OPTIMIZATION
-- ============================================================================

-- Enable pg_stat_statements for query performance monitoring
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Partitioning strategy for high-volume tables (attendance_records, notifications)
-- Example: Partition attendance_records by month for better query performance
-- CREATE TABLE attendance_records_2025_01 PARTITION OF attendance_records
-- FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

-- Notes:
-- 1. Use PostgreSQL for JSONB support, advanced indexing, and materialized views
-- 2. Implement row-level security (RLS) for multi-tenant isolation
-- 3. Set up connection pooling (PgBouncer) for high concurrency
-- 4. Configure streaming replication for high availability
-- 5. Use TimescaleDB extension for time-series data (attendance, analytics)
-- 6. Schedule materialized view refreshes every 5-15 minutes
-- 7. Implement database backup strategy (daily full + hourly incremental)
