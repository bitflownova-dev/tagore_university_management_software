# Portal Specifications & Feature Documentation
## Unified University Management System - User Role Portals

---

## 1. Super Admin / Director Portal (God-View Dashboard)

### Access Level
- **Role**: DIRECTOR (role_level: 1)
- **Permissions**: Complete system access across all colleges
- **Multi-Tenant View**: Can switch between colleges or view consolidated data

---

### Dashboard Layout

#### A. Overview Section (Top Row - Full Width)
**Key Metrics Cards (Responsive Grid)**

```
┌────────────────┬────────────────┬────────────────┬────────────────┐
│ Total Students │ Total Revenue  │ Staff Present  │ System Health  │
│   5,229 / 6,700│    ₹4.2 Cr     │    245 / 280   │   ●●●● 98%    │
│  📈 +12% YoY   │  📊 ₹1.8Cr Due │   ⚠️ 35 Absent │   All Systems  │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

**Features:**
- Real-time auto-refresh every 30 seconds
- Click to drill down into detailed views
- Color-coded alerts (Green: Good, Yellow: Warning, Red: Critical)
- Sparkline mini-graphs showing 7-day trends

---

#### B. Interactive College Map (Left Panel - 40% Width)

**Visual Element**: Chennai city map with college location pins

```
      Chennai Map View
┌──────────────────────────────┐
│        🏛️ TCAS              │
│    Chromepet                 │
│    3,424 Students            │
│    ₹2.1Cr Revenue            │
│                              │
│                              │
│              🏛️ TEC  🏛️ TMC │
│          Rathinamangalam     │
│                              │
└──────────────────────────────┘
```

**Interactive Features:**
- Click on college pin → Open college-specific dashboard
- Hover → Show quick stats tooltip
- Visual indicators:
  - 🟢 Green pin: All metrics normal
  - 🟡 Yellow pin: Pending fees > 20%
  - 🔴 Red pin: Critical issues (low attendance, system errors)

---

#### C. Revenue Analytics (Right Panel - 60% Width)

**Revenue Breakdown Chart (Stacked Bar Graph)**

```
Revenue Collection vs Pending (Monthly View)
┌──────────────────────────────────────────────┐
│ Month    │████████████░░░░│ Collected/Total │
│ Jan 2025 │████████████████│ ₹68L / ₹75L    │
│ Feb 2025 │██████████░░░░░│ ₹62L / ₹75L    │
│ Mar 2025 │████░░░░░░░░░░░│ ₹25L / ₹75L    │
└──────────────────────────────────────────────┘
```

**Features:**
- Filter by college, course type, time period
- Export to PDF/Excel
- Drill-down to student-level dues

---

#### D. College-Wise Performance Table (Bottom Section - Full Width)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ College              │ Capacity  │ Revenue   │ Staff Att│ Student Att│ Status│
├────────────────────────────────────────────────────────────────────────────┤
│ TCAS (Arts/Science) │ 3424/4000 │ ₹2.1Cr    │  92%     │   87%      │  🟢   │
│ TEC (Engineering)   │ 1005/1500 │ ₹1.3Cr    │  88%     │   82%      │  🟡   │
│ TMC (Medical)       │  800/1200 │ ₹0.8Cr    │  95%     │   94%      │  🟢   │
└────────────────────────────────────────────────────────────────────────────┘
```

**Action Buttons**: Each row has:
- 👁️ View Details
- 📊 Analytics
- ⚙️ Settings

---

### Key Features

#### 1. Global Analytics Dashboard
- **Revenue Insights**:
  - Total collected vs projected (with variance %)
  - Overdue payments by college
  - Top 10 defaulters list
  - Payment trend graphs (daily, weekly, monthly)

- **Staff Insights**:
  - Global attendance percentage
  - Department-wise attendance heatmap
  - Leave requests pending approval
  - Top performers (based on student ratings)

- **Student Insights**:
  - Enrollment trends by course
  - Pass/fail percentages by college
  - Dropout rate analysis
  - Scholarship distribution

#### 2. System Administration
- **User Management**:
  - Create/edit Principals, HODs, Accountants
  - Bulk user import (Excel/CSV)
  - Role assignment and permissions
  - Deactivate/suspend users

- **College Configuration**:
  - Set fee structures globally
  - Define academic calendars
  - Configure attendance rules (late threshold, grace period)
  - Set payroll calculation parameters

- **System Logs**:
  - Audit trail of all actions
  - Login history
  - API usage statistics
  - Error logs and alerts

#### 3. Notifications Center
- **Real-Time Alerts**:
  - Critical fee defaults (> ₹1L)
  - Staff absences > 3 consecutive days
  - System downtime alerts
  - Security incidents

- **Scheduled Reports**:
  - Weekly performance summary email
  - Monthly financial closing report
  - Quarterly board meeting deck (auto-generated)

#### 4. Export & Reporting
- **One-Click Reports**:
  - Consolidated financial statement
  - Staff payroll summary
  - Student enrollment report
  - Attendance analytics
- **Formats**: PDF, Excel, CSV
- **Schedule**: Daily, weekly, monthly auto-email

---

## 2. College Admin / Principal Portal (College-Specific)

### Access Level
- **Role**: PRINCIPAL (role_level: 2)
- **Scope**: Single college (assigned in `users.college_id`)
- **Permissions**: Full access to college data, limited financial edit rights

---

### Dashboard Layout

#### A. Welcome Banner (Top Section)
```
┌─────────────────────────────────────────────────────────────┐
│ Welcome, Dr. Ramesh Kumar                                   │
│ Principal - Tagore College of Arts & Science (Chromepet)   │
│ Last Login: Dec 4, 2025 09:23 AM                           │
└─────────────────────────────────────────────────────────────┘
```

---

#### B. College Performance Overview (4-Column Grid)

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Students     │ Revenue      │ Staff        │ Today's Att  │
│ 3,424 / 4000 │ ₹2.1Cr       │ 142 / 150    │ Students: 89%│
│ 86% Capacity │ ₹48L Pending │ 8 On Leave   │ Staff: 94%   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

---

#### C. Department-Wise Breakdown (Table View)

```
┌──────────────────────────────────────────────────────────────────┐
│ Department        │ HOD Name       │ Students │ Attendance │ Action│
├──────────────────────────────────────────────────────────────────┤
│ Computer Science  │ Dr. Priya M    │   420    │    91%     │ 📊   │
│ Commerce          │ Prof. Suresh   │   380    │    88%     │ 📊   │
│ English Literature│ Dr. Lakshmi    │   210    │    85%     │ 📊   │
│ Mathematics       │ Prof. Vijay    │   190    │    92%     │ 📊   │
└──────────────────────────────────────────────────────────────────┘
```

**Click Action Button** → Opens department analytics:
- Subject-wise pass percentages
- Teacher performance ratings
- Budget utilization
- Student feedback scores

---

#### D. Pending Actions (Alert Panel - Right Sidebar)

```
⚠️ Pending Actions (12)
────────────────────────
🔴 5 Leave Approvals
🟡 3 Fee Waiver Requests
🟠 2 Grade Change Requests
🟢 2 Parent Meeting Requests

[View All →]
```

---

### Key Features

#### 1. Academic Management
- **Course Management**:
  - View all courses offered
  - Semester schedules and exam timetables
  - Subject-teacher assignments
  - Elective allocation

- **Student Management**:
  - Search students by name/ID
  - View enrollment details
  - Academic performance reports
  - Disciplinary records

- **Teacher Management**:
  - View all staff profiles
  - Assign subjects to teachers
  - Performance evaluation
  - Workload distribution

#### 2. Attendance Monitoring
- **Real-Time Dashboard**:
  - Today's attendance percentage (live updating)
  - Class-wise breakdown
  - Defaulters list (attendance < 75%)
  - Biometric sync status

- **Historical Reports**:
  - Monthly attendance trends
  - Department comparison
  - Student-wise attendance report

#### 3. Finance Overview (View-Only with Drill-Down)
- **Fee Collection Status**:
  - Total collected this month
  - Pending dues by course
  - Scholarship disbursements
  - Department budget status

- **Payment Approvals**:
  - Approve fee waivers (within limit)
  - View payment history
  - Generate fee receipts

#### 4. Communication Center
- **Announcements**:
  - Post college-wide announcements
  - Send notifications to students/parents
  - Email blast to specific departments

- **Parent Meetings**:
  - Schedule parent-teacher meetings
  - View feedback from parents
  - Complaint management

#### 5. Reports & Analytics
- **Pre-built Reports**:
  - Daily attendance report
  - Weekly revenue summary
  - Monthly academic performance
  - Semester results analysis

- **Custom Reports**:
  - Query builder interface
  - Export to Excel/PDF

---

## 3. Teacher / Faculty Portal (Mobile-First Design)

### Access Level
- **Role**: TEACHER (role_level: 4)
- **Scope**: Assigned classes and subjects
- **Primary Device**: Mobile phone (Android/iOS app)

---

### Mobile App Home Screen

```
┌────────────────────────────────────┐
│  [≡]  Tagore LMS       [🔔3] [👤] │
├────────────────────────────────────┤
│                                    │
│  👋 Good Morning, Prof. Anitha!   │
│                                    │
│  Today's Classes: 3                │
│  [───────●●○────────] 2 of 3 Done │
│                                    │
│  ┌────────────────────────────┐   │
│  │ Next Class: CS101 - Sec A  │   │
│  │ 10:00 AM - 11:00 AM        │   │
│  │ Room: 305, Block B         │   │
│  │                            │   │
│  │ [✓ Mark Attendance]        │   │
│  └────────────────────────────┘   │
│                                    │
│  Quick Actions:                    │
│  [📋 My Classes] [📊 Enter Marks] │
│  [💼 My Payslip] [📅 Apply Leave] │
│                                    │
└────────────────────────────────────┘
```

---

### Key Features

#### 1. Quick Attendance Marking (Primary Feature)

**Step 1: Select Class**
```
┌────────────────────────────────────┐
│  📋 Mark Attendance                │
├────────────────────────────────────┤
│  Select Class:                     │
│  ○ CS101 - Sec A (10:00 AM)       │
│  ● CS102 - Sec B (11:00 AM) ✓     │
│  ○ CS103 - Sec A (02:00 PM)       │
│                                    │
│  Date: Dec 4, 2025                │
│  Total Students: 58                │
│                                    │
│  [Continue →]                      │
└────────────────────────────────────┘
```

**Step 2: Mark Students (Swipe Interface)**

```
┌────────────────────────────────────┐
│  CS102 - Section B                 │
│  [All Present] [All Absent]        │
├────────────────────────────────────┤
│  1. Aarav Kumar         [P] [A]    │
│  2. Bhavya Sharma       [P] [A]    │
│  3. Chitra Menon        [P] [A]    │
│  4. Dinesh Raj          [P] [A]    │
│  ...                               │
│  Present: 54  Absent: 4            │
│                                    │
│  [Save Attendance]                 │
└────────────────────────────────────┘
```

**Advanced Options**:
- 📷 Scan QR codes (students scan their ID cards)
- 📍 Location verification (must be within campus radius)
- 🕐 Late arrivals (mark as "Late" instead of "Absent")

---

#### 2. LMS - Class Management

**My Classes Tab**
```
┌────────────────────────────────────┐
│  📚 My Classes                     │
├────────────────────────────────────┤
│  ┌─────────────────────────────┐  │
│  │ CS101 - Data Structures     │  │
│  │ Semester 3, Section A       │  │
│  │ 58 Students                 │  │
│  │                             │  │
│  │ [📝 Assignments]  [📊 Marks]│  │
│  │ [📄 Materials]    [💬 Chat] │  │
│  └─────────────────────────────┘  │
│                                    │
│  ┌─────────────────────────────┐  │
│  │ CS102 - Algorithms          │  │
│  │ Semester 3, Section B       │  │
│  │ 62 Students                 │  │
│  └─────────────────────────────┘  │
└────────────────────────────────────┘
```

**Assignments Management**:
- Create new assignments
- Set deadlines
- Upload reference materials (PDF, videos)
- View submission status
- Grade submissions

**Materials Upload**:
- Lecture notes (PDF)
- Video lectures (YouTube links or direct upload)
- Reference books
- Previous year question papers

---

#### 3. Marks Entry

**Enter Marks Flow**
```
┌────────────────────────────────────┐
│  📊 Enter Marks                    │
├────────────────────────────────────┤
│  Subject: CS101 - Data Structures  │
│  Class: Section A                  │
│                                    │
│  Assessment Type:                  │
│  ○ Internal 1 (Max: 50)           │
│  ○ Internal 2 (Max: 50)           │
│  ● Assignment 1 (Max: 20) ✓       │
│  ○ Final Exam (Max: 100)          │
│                                    │
│  [Continue →]                      │
└────────────────────────────────────┘
```

**Marks Entry Grid** (Optimized for Mobile)
```
┌────────────────────────────────────┐
│  Assignment 1 - Max Marks: 20      │
├────────────────────────────────────┤
│  1. Aarav Kumar       [18 /20] ✓  │
│  2. Bhavya Sharma     [16 /20] ✓  │
│  3. Chitra Menon      [19 /20] ✓  │
│  4. Dinesh Raj        [AB    ] ✓  │
│  ...                               │
│                                    │
│  [Save Draft]  [Publish Marks]    │
└────────────────────────────────────┘
```

**Key Actions**:
- **Save Draft**: Marks not visible to students yet
- **Publish Marks**: Instantly syncs to student/parent app + sends push notification
- **Bulk Entry**: Copy previous marks, import from Excel

---

#### 4. HRMS - Personal Dashboard

**My Payslip Tab**
```
┌────────────────────────────────────┐
│  💼 My Payslip                     │
├────────────────────────────────────┤
│  Month: November 2025              │
│                                    │
│  Gross Salary:      ₹65,000       │
│  Deductions:        -₹8,200        │
│  ─────────────────────────────     │
│  Net Salary:        ₹56,800       │
│                                    │
│  Status: ✓ Paid on Dec 1, 2025    │
│                                    │
│  [View Breakdown]  [Download PDF] │
│                                    │
│  Previous Months:                  │
│  • October 2025 - ₹54,200         │
│  • September 2025 - ₹55,100       │
│  • August 2025 - ₹52,800          │
└────────────────────────────────────┘
```

**Payslip Breakdown Popup**:
```
╔═══════════════════════════════════╗
║ Earnings:                         ║
║  Base Salary:        ₹45,000      ║
║  HRA:                ₹10,000      ║
║  DA:                 ₹7,000       ║
║  Special Allowance:  ₹3,000       ║
║  ───────────────────────────      ║
║  Gross Salary:       ₹65,000      ║
║                                   ║
║ Deductions:                       ║
║  PF:                 -₹5,400      ║
║  ESI:                -₹1,800      ║
║  Professional Tax:   -₹1,000      ║
║  ───────────────────────────      ║
║  Total Deductions:   -₹8,200      ║
║                                   ║
║ Net Salary:          ₹56,800      ║
╚═══════════════════════════════════╝
```

**Attendance Impact**:
- Show "Days Present: 26/26" → Full salary
- If absent: "Days Present: 24/26 → Deduction: ₹4,200"

---

#### 5. Leave Management

**Apply Leave Form**
```
┌────────────────────────────────────┐
│  📅 Apply for Leave                │
├────────────────────────────────────┤
│  Leave Type:                       │
│  ● Casual Leave (Balance: 8)      │
│  ○ Sick Leave (Balance: 6)        │
│  ○ Earned Leave (Balance: 12)     │
│                                    │
│  From Date: [Dec 6, 2025]         │
│  To Date:   [Dec 7, 2025]         │
│  Total Days: 2                     │
│                                    │
│  Reason:                           │
│  ┌──────────────────────────────┐ │
│  │ Family function               │ │
│  └──────────────────────────────┘ │
│                                    │
│  [Submit for Approval]            │
└────────────────────────────────────┘
```

**Leave History**:
- View past requests
- Track approval status
- Remaining leave balance

---

#### 6. Notifications

**Notification Bell Icon** (Top-Right Corner)
```
🔔 (3 unread)

Notifications:
─────────────────────
• Payslip for Nov 2025 
  is ready. Download now.
  [2 hours ago]

• Reminder: Submit marks for 
  CS101 Internal 2 by Dec 5.
  [1 day ago]

• New announcement from 
  Principal: Sports Day on Dec 10.
  [2 days ago]
```

---

### Mobile App Features Summary

| Feature | Description | Priority |
|---------|-------------|----------|
| Attendance Marking | Quick swipe-based interface | 🔴 Critical |
| Marks Entry | Mobile-optimized grid | 🔴 Critical |
| Payslip View | Auto-calculated, downloadable | 🟡 High |
| Leave Application | In-app form submission | 🟡 High |
| Push Notifications | Real-time alerts | 🟡 High |
| LMS Materials | Upload notes, assignments | 🟢 Medium |
| Class Schedule | Weekly calendar view | 🟢 Medium |
| Biometric Sync | Self-attendance via face ID | 🟠 Low |

---

## 4. Student & Parent Portal (Mobile App)

### Access Level
- **Student Role**: STUDENT (role_level: 5)
- **Parent Role**: PARENT (role_level: 5)
- **Linked Accounts**: Parent can view multiple children's data

---

### Student Dashboard (Mobile App)

**Home Screen**
```
┌────────────────────────────────────┐
│  [≡] Tagore Student     [🔔2] [👤]│
├────────────────────────────────────┤
│                                    │
│  📚 Welcome, Aarav Kumar           │
│  Roll No: 21CS042                  │
│  Semester 3 - CSE                  │
│                                    │
│  ┌────────────────────────────┐   │
│  │ Attendance: 87% ⚠️         │   │
│  │ (Minimum: 75%)             │   │
│  │ [View Details]             │   │
│  └────────────────────────────┘   │
│                                    │
│  ┌────────────────────────────┐   │
│  │ CGPA: 8.2 / 10.0           │   │
│  │ Current Semester: 8.5      │   │
│  │ [View Marksheet]           │   │
│  └────────────────────────────┘   │
│                                    │
│  Quick Actions:                    │
│  [💰 Pay Fees] [📝 Assignments]   │
│  [🗓️ Timetable] [📖 Materials]    │
│                                    │
└────────────────────────────────────┘
```

---

### Key Student Features

#### 1. Attendance Tracker

**Attendance Dashboard**
```
┌────────────────────────────────────┐
│  📊 My Attendance                  │
├────────────────────────────────────┤
│  Overall: 87% (167/192 classes)    │
│                                    │
│  Subject-wise:                     │
│  • Data Structures     92% 🟢     │
│  • Algorithms          88% 🟢     │
│  • DBMS                85% 🟡     │
│  • Operating Systems   79% 🟡     │
│  • Software Eng.       73% 🔴     │
│                                    │
│  ⚠️ Alert: Software Eng below 75% │
│                                    │
│  [View Calendar]                   │
└────────────────────────────────────┘
```

**Calendar View** (Visual attendance heatmap)
```
November 2025
─────────────────────
M  T  W  T  F  S  S
         1🟢 2🟢 3⚫ 4⚫
5🟢 6🟢 7🔴 8🟢 9🟢 10⚫ 11⚫
...

🟢 Present  🔴 Absent  🟡 Late  ⚫ Holiday
```

---

#### 2. Marks & Results

**Semester Marks**
```
┌────────────────────────────────────┐
│  📈 Semester 3 Marks               │
├────────────────────────────────────┤
│  Subject: Data Structures          │
│                                    │
│  Internal 1:     42/50  (84%)     │
│  Internal 2:     46/50  (92%)     │
│  Assignment:     18/20  (90%)     │
│  Practical:      19/20  (95%)     │
│  Final Exam:     Not yet released │
│                                    │
│  Current Score: 125/140 (89.3%)   │
│  Grade: A                          │
│                                    │
│  [View All Subjects]              │
└────────────────────────────────────┘
```

**Grade Card** (Downloadable PDF)
- Semester-wise results
- CGPA calculation
- Rank in class

---

#### 3. Fee Management

**Fee Dashboard**
```
┌────────────────────────────────────┐
│  💰 Fee Payment                    │
├────────────────────────────────────┤
│  Semester 3 (July - Dec 2025)      │
│                                    │
│  Tuition Fee:        ₹45,000      │
│  Lab Fee:            ₹5,000       │
│  Library Fee:        ₹2,000       │
│  Sports Fee:         ₹1,000       │
│  ─────────────────────────────     │
│  Total Fee:          ₹53,000      │
│                                    │
│  Amount Paid:        ₹30,000      │
│  Amount Pending:     ₹23,000 🔴   │
│                                    │
│  Due Date: Dec 15, 2025 (11 days) │
│                                    │
│  [Pay Now]  [View Receipt]        │
└────────────────────────────────────┘
```

**Payment Gateway Integration**
- **Options**: UPI, Debit/Credit Card, Net Banking
- **Instant Receipt**: Email + SMS + In-app notification
- **Payment History**: View all past transactions

---

#### 4. Assignments & Submissions

**Assignments Tab**
```
┌────────────────────────────────────┐
│  📝 My Assignments                 │
├────────────────────────────────────┤
│  ⚠️ 2 Pending, 1 Overdue          │
│                                    │
│  🔴 Overdue:                       │
│  Algorithm Design Assignment       │
│  Due: Dec 1, 2025                 │
│  [Submit Late]                     │
│                                    │
│  🟡 Due Soon:                      │
│  Data Structures Project           │
│  Due: Dec 6, 2025 (2 days)        │
│  [Submit Now]                      │
│                                    │
│  DBMS Case Study                   │
│  Due: Dec 10, 2025 (6 days)       │
│  [Start Working]                   │
│                                    │
│  🟢 Completed (3)                  │
│  [View All]                        │
└────────────────────────────────────┘
```

**Submission Interface**:
- Upload files (PDF, Word, ZIP)
- Add comments/notes
- View teacher feedback and grades

---

#### 5. Timetable & Schedule

**Weekly Timetable**
```
┌────────────────────────────────────┐
│  🗓️ This Week's Schedule           │
├────────────────────────────────────┤
│  Monday, Dec 4                     │
│  09:00 - 10:00  Data Structures    │
│  10:00 - 11:00  Algorithms         │
│  11:30 - 12:30  DBMS               │
│  02:00 - 05:00  Lab - OS           │
│                                    │
│  [View Full Week]                  │
│  [Sync to Google Calendar]        │
└────────────────────────────────────┘
```

---

### Parent Dashboard (Mobile App)

**Home Screen**
```
┌────────────────────────────────────┐
│  [≡] Tagore Parent      [🔔5] [👤]│
├────────────────────────────────────┤
│                                    │
│  👨‍👦 My Children                    │
│                                    │
│  ┌────────────────────────────┐   │
│  │ ● Aarav Kumar              │   │
│  │   Class: Sem 3 - CSE       │   │
│  │   Attendance: 87% ⚠️       │   │
│  │   [View Details]           │   │
│  └────────────────────────────┘   │
│                                    │
│  ┌────────────────────────────┐   │
│  │ ○ Ananya Kumar             │   │
│  │   Class: Sem 1 - Commerce  │   │
│  │   Attendance: 95% ✓        │   │
│  │   [View Details]           │   │
│  └────────────────────────────┘   │
│                                    │
│  Recent Alerts:                    │
│  🔴 Aarav absent on Dec 3         │
│  🟢 Ananya scored 95 in English   │
│                                    │
└────────────────────────────────────┘
```

---

### Key Parent Features

#### 1. Real-Time Attendance Alerts

**Push Notification (Instant)**
```
╔════════════════════════════════════╗
║  🔔 Attendance Alert               ║
║  Aarav Kumar was marked absent     ║
║  on Dec 3, 2025 for OS class.      ║
║                                    ║
║  [View Details]    [Dismiss]       ║
╚════════════════════════════════════╝
```

**Notification Settings**:
- Enable/disable attendance alerts
- Set quiet hours
- Choose notification method (Push, Email, SMS)

---

#### 2. Performance Tracking

**Academic Progress View**
```
┌────────────────────────────────────┐
│  📊 Aarav's Performance            │
├────────────────────────────────────┤
│  Current Semester: 3               │
│  CGPA: 8.2 / 10.0  📈 +0.3         │
│                                    │
│  Latest Marks:                     │
│  • Data Structures:  89% (A)      │
│  • Algorithms:       85% (A)      │
│  • DBMS:             78% (B+)     │
│                                    │
│  Attendance: 87% ⚠️                │
│  (Needs 75% minimum)               │
│                                    │
│  [View Full Report]               │
└────────────────────────────────────┘
```

**Marks Notification** (When teacher publishes)
```
🔔 New marks published!
Aarav scored 42/50 in Data Structures Internal 1.
```

---

#### 3. Fee Management (Parent View)

**Fee Payment Dashboard**
```
┌────────────────────────────────────┐
│  💰 Fee Status                     │
├────────────────────────────────────┤
│  Child: Aarav Kumar                │
│  Semester 3                        │
│                                    │
│  Total Fee:      ₹53,000          │
│  Paid:           ₹30,000          │
│  Pending:        ₹23,000 🔴       │
│                                    │
│  Due Date: Dec 15, 2025           │
│  ⚠️ Payment overdue in 11 days    │
│                                    │
│  [Pay Now]  [Request Extension]   │
│  [View Payment History]           │
└────────────────────────────────────┘
```

**Payment History**:
- All past transactions
- Download receipts
- Request refunds

---

#### 4. Communication with Teachers

**Messaging Feature**
```
┌────────────────────────────────────┐
│  💬 Contact Teachers               │
├────────────────────────────────────┤
│  📧 Send Message                   │
│                                    │
│  To: Prof. Anitha (Class Teacher) │
│  Subject: [Attendance Query]      │
│                                    │
│  Message:                          │
│  ┌──────────────────────────────┐ │
│  │ Dear Madam, I would like to  │ │
│  │ discuss Aarav's attendance...│ │
│  └──────────────────────────────┘ │
│                                    │
│  [Send]                           │
└────────────────────────────────────┘
```

**Meeting Requests**:
- Request parent-teacher meeting
- View scheduled meetings
- Video call integration (optional)

---

#### 5. Notification Center

**All Notifications**
```
┌────────────────────────────────────┐
│  🔔 Notifications                  │
├────────────────────────────────────┤
│  Today:                            │
│  • Aarav absent in OS class        │
│    [10:30 AM]                      │
│                                    │
│  Yesterday:                        │
│  • New marks: Data Structures      │
│    Score: 42/50 (84%)              │
│    [3:45 PM]                       │
│                                    │
│  • Fee reminder: ₹23,000 pending   │
│    Due: Dec 15, 2025               │
│    [11:00 AM]                      │
│                                    │
│  This Week:                        │
│  • School holiday on Dec 6         │
│  • Sports Day on Dec 10            │
│                                    │
│  [Mark All as Read]               │
└────────────────────────────────────┘
```

---

### Student & Parent App Features Summary

| Feature | Student Access | Parent Access | Auto-Notification |
|---------|---------------|---------------|-------------------|
| Attendance Tracking | ✅ View own | ✅ View child's | ✅ Absence alert |
| Marks & Grades | ✅ View own | ✅ View child's | ✅ Marks published |
| Fee Payment | ✅ Can pay | ✅ Can pay | ✅ Overdue reminder |
| Assignments | ✅ Submit work | ❌ No access | ✅ Deadline reminder |
| Timetable | ✅ View schedule | ✅ View child's | ❌ None |
| Notifications | ✅ All alerts | ✅ All alerts | ✅ Push + Email |
| Teacher Contact | ✅ Messaging | ✅ Messaging | ❌ None |

---

## 5. HR & Accountant Portal (Web Dashboard)

### Access Level
- **HR Role**: HR (role_level: 3)
- **Accountant Role**: ACCOUNTANT (role_level: 3)
- **Scope**: College-specific or Director-level (based on assignment)

---

### HR Dashboard

#### Home Screen Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Tagore HRMS - HR Dashboard                         [👤 Logout] │
├─────────────────────────────────────────────────────────────────┤
│  [📊 Dashboard]  [👥 Employees]  [💼 Payroll]  [📅 Leave]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Overview (Dec 2025)                                            │
│  ┌────────────┬────────────┬────────────┬────────────┐         │
│  │ Total Staff│  Present   │  On Leave  │  Absent    │         │
│  │    280     │    245     │     15     │     20     │         │
│  │            │  87.5% ✓   │   5.4%     │  7.1% ⚠️   │         │
│  └────────────┴────────────┴────────────┴────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │  Pending Actions:                                │          │
│  │  • 12 Leave Requests (Awaiting Approval)         │          │
│  │  • 3 New Joiners (Onboarding Pending)            │          │
│  │  • November Payroll (Pending Approval)           │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Key HR Features

#### 1. Employee Management

**Employee Directory**
```
┌─────────────────────────────────────────────────────────────────┐
│  👥 Employee Directory                      [+ Add New Employee]│
├─────────────────────────────────────────────────────────────────┤
│  Search: [________________]  Filter: [Department ▼] [Status ▼] │
├─────────────────────────────────────────────────────────────────┤
│ EmpID │ Name           │ Department  │ Designation │ Status     │
├─────────────────────────────────────────────────────────────────┤
│ E1001 │ Prof. Anitha M │ CSE         │ Asst Prof   │ Active 🟢 │
│ E1002 │ Dr. Ramesh K   │ Management  │ Principal   │ Active 🟢 │
│ E1003 │ Ms. Priya S    │ Commerce    │ Lecturer    │ On Leave🟡│
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Employee Profile View** (Click on name)
```
╔═════════════════════════════════════════════════════════════════╗
║  Employee Profile: Prof. Anitha M                               ║
╠═════════════════════════════════════════════════════════════════╣
║  Personal Info:                     Employment Info:            ║
║  • EmpID: E1001                     • Joining Date: Jan 1, 2020 ║
║  • DOB: Mar 15, 1985                • Department: CSE           ║
║  • Phone: +91 98765 43210           • Designation: Asst Prof    ║
║  • Email: anitha.m@tagore.edu.in    • Salary Grade: A           ║
║                                     • Base Salary: ₹65,000      ║
║  Attendance (This Month):           • Experience: 8 years       ║
║  • Present: 24 / 26 days (92%)                                  ║
║  • Leave Taken: 2 days              Bank Details:               ║
║                                     • Bank: HDFC Bank            ║
║  Leave Balance:                     • Account: 123456789        ║
║  • Casual: 8 days                   • IFSC: HDFC0001234         ║
║  • Sick: 6 days                                                 ║
║  • Earned: 12 days                  [Edit]  [Deactivate]        ║
╚═════════════════════════════════════════════════════════════════╝
```

**Actions**:
- Add new employee (onboarding form)
- Edit employee details
- Assign departments
- Deactivate/terminate employees

---

#### 2. Payroll Management (HR View)

**Monthly Payroll Dashboard**
```
┌─────────────────────────────────────────────────────────────────┐
│  💼 Payroll Management - November 2025                          │
├─────────────────────────────────────────────────────────────────┤
│  Status: ⚠️ Pending Approval                                    │
│                                                                  │
│  Total Employees: 280                                           │
│  Gross Salary: ₹1,45,60,000                                     │
│  Total Deductions: ₹18,90,000                                   │
│  Net Payable: ₹1,26,70,000                                      │
│                                                                  │
│  [Generate Payroll]  [Approve]  [Download Report]              │
├─────────────────────────────────────────────────────────────────┤
│  EmpID │ Name      │ Days │ Gross  │ Deductions │ Net Salary   │
├─────────────────────────────────────────────────────────────────┤
│ E1001  │ Anitha M  │ 24/26│ ₹65,000│  ₹8,200    │ ₹56,800     │
│ E1002  │ Ramesh K  │ 26/26│ ₹95,000│ ₹12,500    │ ₹82,500     │
│ E1003  │ Priya S   │ 22/26│ ₹55,000│  ₹7,100    │ ₹39,450 ⚠️  │
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Payroll Generation Process** (Automated):
1. **Fetch Attendance Data**: Query `attendance_records` table for the month
2. **Calculate Absence Deduction**: `(gross_salary / working_days) * days_absent`
3. **Apply Standard Deductions**: PF, ESI, Professional Tax
4. **Calculate Net Salary**: `gross_salary - total_deductions`
5. **Generate Payslips**: Create PDF for each employee
6. **Send Notifications**: Email + in-app notification to all staff

**Payslip Preview** (PDF)
```
═════════════════════════════════════════════
          TAGORE COLLEGE OF ARTS & SCIENCE
            PAYSLIP - NOVEMBER 2025
═════════════════════════════════════════════
Employee Name: Prof. Anitha M
Employee ID: E1001
Department: Computer Science
Designation: Assistant Professor
Bank Account: HDFC Bank - 123456789
─────────────────────────────────────────────
EARNINGS:                     AMOUNT (₹)
  Base Salary                    45,000
  HRA                            10,000
  DA                              7,000
  Special Allowance               3,000
                               ─────────
  Gross Salary                   65,000

DEDUCTIONS:
  Provident Fund (PF)             5,400
  ESI                             1,800
  Professional Tax                1,000
  Absence Deduction (2 days)      0
                               ─────────
  Total Deductions                8,200

─────────────────────────────────────────────
NET SALARY                        56,800
─────────────────────────────────────────────
Payment Date: December 1, 2025
Payment Mode: Bank Transfer
═════════════════════════════════════════════
```

---

#### 3. Leave Management

**Leave Requests Dashboard**
```
┌─────────────────────────────────────────────────────────────────┐
│  📅 Leave Management                        [View Leave Policy] │
├─────────────────────────────────────────────────────────────────┤
│  Pending Requests (12):                                         │
├─────────────────────────────────────────────────────────────────┤
│ EmpID │ Name      │ Type   │ From-To      │ Days │ Action      │
├─────────────────────────────────────────────────────────────────┤
│ E1003 │ Priya S   │ Casual │ Dec 6-7, 2025│  2   │[✓][✗]      │
│ E1045 │ Vijay R   │ Sick   │ Dec 4-5, 2025│  2   │[✓][✗]      │
│ E1102 │ Lakshmi D │ Earned │ Dec 10-17    │  8   │[✓][✗]      │
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Leave Approval Popup**
```
╔═════════════════════════════════════════╗
║  Leave Request Details                  ║
╠═════════════════════════════════════════╣
║  Employee: Ms. Priya S (E1003)          ║
║  Leave Type: Casual Leave               ║
║  Duration: Dec 6-7, 2025 (2 days)       ║
║  Reason: Family function                ║
║                                         ║
║  Leave Balance:                         ║
║  • Casual Leave: 8 days available       ║
║                                         ║
║  Approval Comments:                     ║
║  ┌───────────────────────────────────┐ ║
║  │ Approved as requested.            │ ║
║  └───────────────────────────────────┘ ║
║                                         ║
║  [Approve]  [Reject]  [Cancel]          ║
╚═════════════════════════════════════════╝
```

**Leave Analytics**:
- Department-wise leave trends
- Most common leave types
- Average leave days per employee

---

### Accountant Dashboard

#### Home Screen Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Tagore Finance - Accountant Dashboard             [👤 Logout] │
├─────────────────────────────────────────────────────────────────┤
│  [📊 Dashboard]  [💰 Payments]  [📈 Reports]  [⚙️ Settings]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Financial Overview (Dec 2025)                                  │
│  ┌────────────┬────────────┬────────────┬────────────┐         │
│  │ Revenue    │ Collected  │ Pending    │ Overdue    │         │
│  │ Expected   │ This Month │ Dues       │ (> 30 days)│         │
│  │  ₹2.5 Cr   │  ₹1.8 Cr   │  ₹70 L     │  ₹25 L ⚠️  │         │
│  └────────────┴────────────┴────────────┴────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │  Today's Transactions:  23 payments (₹12,45,000)│          │
│  │  Pending Approvals:     5 fee waivers            │          │
│  │  Overdue Reminders:     152 students             │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Key Accountant Features

#### 1. Payment Tracking

**Fee Collection Dashboard**
```
┌─────────────────────────────────────────────────────────────────┐
│  💰 Fee Collection                        [Export to Excel]     │
├─────────────────────────────────────────────────────────────────┤
│  Filter: [All Courses ▼] [Semester 3 ▼] [Status: All ▼]        │
├─────────────────────────────────────────────────────────────────┤
│ StudentID│ Name      │ Course │ Total Fee│ Paid │ Pending│Status│
├─────────────────────────────────────────────────────────────────┤
│ 21CS042  │ Aarav K   │ CSE S3 │ ₹53,000 │₹30,000│₹23,000│🔴   │
│ 21CM015  │ Bhavya S  │ COM S3 │ ₹48,000 │₹48,000│   ₹0  │🟢   │
│ 21CS098  │ Chitra M  │ CSE S3 │ ₹53,000 │₹20,000│₹33,000│🔴   │
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Payment Transaction Log** (Real-Time)
```
┌─────────────────────────────────────────────────────────────────┐
│  Recent Transactions                                            │
├─────────────────────────────────────────────────────────────────┤
│ Time     │ StudentID│ Amount  │ Method │ Status    │ Receipt   │
├─────────────────────────────────────────────────────────────────┤
│ 10:45 AM │ 21CS042  │ ₹10,000│ UPI    │ Success ✓│ [Download]│
│ 10:32 AM │ 21CM015  │ ₹25,000│ Card   │ Success ✓│ [Download]│
│ 10:18 AM │ 21EE073  │ ₹15,000│ NEFT   │ Pending ⏳│ -         │
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Manual Payment Entry** (For cash/cheque payments)
```
╔═════════════════════════════════════════╗
║  Record Payment                         ║
╠═════════════════════════════════════════╣
║  Student ID: [21CS042____]  [Search]    ║
║  Student Name: Aarav Kumar              ║
║  Course: CSE - Semester 3               ║
║                                         ║
║  Total Fee: ₹53,000                     ║
║  Paid: ₹30,000                          ║
║  Pending: ₹23,000                       ║
║                                         ║
║  Payment Amount: [₹________]            ║
║  Payment Method: [Cash ▼]               ║
║  Transaction ID: [_____________]        ║
║  Receipt Number: [Auto-generated]       ║
║                                         ║
║  Remarks:                               ║
║  ┌───────────────────────────────────┐ ║
║  │ Partial payment received          │ ║
║  └───────────────────────────────────┘ ║
║                                         ║
║  [Generate Receipt]  [Cancel]           ║
╚═════════════════════════════════════════╝
```

---

#### 2. Automated Fee Reminders

**Overdue Management**
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Overdue Payments (152 students)                             │
├─────────────────────────────────────────────────────────────────┤
│  Overdue > 30 days: 48 students (₹25,00,000)                   │
│  Overdue 15-30 days: 65 students (₹32,00,000)                  │
│  Overdue < 15 days: 39 students (₹13,00,000)                   │
│                                                                  │
│  [Send Reminder to All]  [Send SMS]  [Send Email]              │
├─────────────────────────────────────────────────────────────────┤
│ StudentID│ Name      │ Pending │ Overdue Days │ Last Reminder  │
├─────────────────────────────────────────────────────────────────┤
│ 21CS042  │ Aarav K   │ ₹23,000│   45 days 🔴│ Nov 20, 2025   │
│ 21CS098  │ Chitra M  │ ₹33,000│   38 days 🔴│ Nov 25, 2025   │
│ ...                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Automated Reminder System** (Scheduled Jobs):
- **15 days before due**: Friendly reminder
- **7 days before due**: Urgent reminder
- **Due date**: Payment overdue notification
- **7 days after due**: Final notice
- **30 days after due**: Escalation to Principal

---

#### 3. Financial Reports

**Report Generator**
```
┌─────────────────────────────────────────────────────────────────┐
│  📈 Generate Reports                                            │
├─────────────────────────────────────────────────────────────────┤
│  Report Type:                                                   │
│  ○ Daily Collection Report                                     │
│  ○ Monthly Revenue Summary                                     │
│  ● Fee Defaulters List                                         │
│  ○ Course-wise Collection                                      │
│  ○ Payment Method Analysis                                     │
│                                                                  │
│  Date Range: [Dec 1, 2025] to [Dec 4, 2025]                   │
│  College: [All Colleges ▼]                                      │
│  Course: [All Courses ▼]                                        │
│                                                                  │
│  Export Format: ○ PDF  ● Excel  ○ CSV                          │
│                                                                  │
│  [Generate Report]                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Pre-built Reports**:
1. **Daily Collection Report**: All transactions for the day
2. **Monthly Revenue Summary**: Total revenue vs target
3. **Fee Defaulters List**: Students with pending payments
4. **Course-wise Collection**: Revenue breakdown by course
5. **Payment Method Analysis**: Cash vs UPI vs Card distribution
6. **Scholarship Report**: Total scholarships disbursed

---

#### 4. Real-Time Dashboard (Auto-Refresh)

**Live Financial Metrics**
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Real-Time Dashboard (Updates every 30 seconds)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Today's Collection: ₹12,45,000  (23 transactions)             │
│  ████████████████████░░░░░░░░░░░ 65% of daily target          │
│                                                                  │
│  This Month (Dec 2025):                                         │
│  Collected: ₹1.8 Cr / Target: ₹2.5 Cr                          │
│  ████████████████░░░░░░░░░░░░░░ 72%                           │
│                                                                  │
│  Pending Payments: ₹70 L (1,245 students)                      │
│  Overdue Payments: ₹25 L (152 students) ⚠️                     │
│                                                                  │
│  Payment Success Rate: 98.5% ✓                                 │
│  Failed Transactions: 4 (₹62,000) [View Details]               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### HR & Accountant Portal Summary

| Module | HR Features | Accountant Features |
|--------|------------|---------------------|
| **Primary Function** | Staff management, payroll | Fee collection, financial reporting |
| **Automation** | Auto-payroll calculation, leave tracking | Auto-reminders, payment gateway sync |
| **Real-Time Data** | Attendance sync, leave requests | Payment transactions, collection stats |
| **Reports** | Payroll reports, attendance analysis | Financial reports, defaulter lists |
| **Approvals** | Leave requests, new joiners | Fee waivers, refunds |
| **Notifications** | Payslip generated, leave approved | Payment received, overdue alerts |

---

## Summary: Portal Feature Matrix

| Portal | Primary Users | Key Features | Automation Highlights |
|--------|--------------|--------------|----------------------|
| **Director** | Director/Super Admin | Multi-college view, global analytics | Real-time dashboard refresh, scheduled reports |
| **Principal** | College Principals | College-specific dashboard, department management | Attendance alerts, performance metrics |
| **Teacher** | Faculty/Teachers | Mobile attendance, marks entry, payslip view | Payslip auto-calculation, marks sync to parent |
| **Student** | Students | Attendance tracker, marks view, fee payment | Absence alerts, marks notifications |
| **Parent** | Parents | Child monitoring, payment management | Real-time absence alerts, marks updates |
| **HR** | HR Staff | Employee management, payroll, leave | Auto-payroll, leave balance tracking |
| **Accountant** | Finance Staff | Fee collection, reports, reminders | Payment gateway sync, auto-reminders |

---

This completes the **Portal Specifications** document. Each portal is designed with role-specific features, intuitive UI, and automated workflows that leverage the centralized database architecture.
