"""
Payroll Calculation Service - Python Implementation
Tagore University Management System

This module demonstrates the automated salary calculation based on attendance data.
Implements the business logic described in the AUTOMATION_LOGIC.md document.

Author: Solutions Architect Team
Date: December 2025
"""

from datetime import datetime, date
from typing import Dict, List, Optional, Tuple
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from enum import Enum


class AttendanceStatus(Enum):
    """Enumeration for attendance status types"""
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    ON_LEAVE = "ON_LEAVE"
    HALF_DAY = "HALF_DAY"
    LATE = "LATE"


class PayrollStatus(Enum):
    """Enumeration for payroll processing status"""
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    PAID = "PAID"
    REJECTED = "REJECTED"


@dataclass
class AttendanceRecord:
    """Data class representing an attendance record"""
    attendance_id: int
    user_id: int
    attendance_date: date
    status: AttendanceStatus
    check_in_time: Optional[datetime] = None
    check_out_time: Optional[datetime] = None


@dataclass
class EmployeeSalaryStructure:
    """Data class representing employee salary components"""
    user_id: int
    employee_id: str
    first_name: str
    last_name: str
    base_salary: Decimal
    hra: Decimal  # House Rent Allowance
    da: Decimal  # Dearness Allowance
    special_allowance: Decimal
    pf_deduction: Decimal  # Provident Fund
    esi_deduction: Decimal  # Employee State Insurance
    professional_tax: Decimal
    salary_grade: str


@dataclass
class PayrollRecord:
    """Data class representing calculated payroll for an employee"""
    payroll_id: Optional[int]
    employee_user_id: int
    month: int
    year: int
    total_working_days: int
    days_present: int
    days_absent: int
    days_on_leave: int
    half_days: float
    base_salary: Decimal
    hra: Decimal
    da: Decimal
    special_allowance: Decimal
    gross_salary: Decimal
    pf_deduction: Decimal
    esi_deduction: Decimal
    professional_tax: Decimal
    absence_deduction: Decimal
    other_deductions: Decimal
    total_deductions: Decimal
    net_salary: Decimal
    status: PayrollStatus
    generated_at: datetime


class PayrollCalculationService:
    """
    Service class for automated payroll calculation based on attendance data.
    
    This service implements the following workflow:
    1. Fetch attendance data for the specified month
    2. Calculate attendance metrics (present, absent, leave days)
    3. Fetch employee salary structure
    4. Calculate gross salary
    5. Calculate absence deductions
    6. Calculate total deductions
    7. Calculate net salary
    8. Generate payroll record
    """
    
    def __init__(self, db_connection):
        """
        Initialize the payroll service with database connection.
        
        Args:
            db_connection: Database connection object (could be SQLAlchemy, psycopg2, etc.)
        """
        self.db = db_connection
    
    def calculate_payroll_for_month(
        self, 
        employee_user_id: int, 
        month: int, 
        year: int,
        total_working_days: int = 26
    ) -> PayrollRecord:
        """
        Calculate complete payroll for an employee for a specific month.
        
        Args:
            employee_user_id: User ID of the employee
            month: Month number (1-12)
            year: Year (e.g., 2025)
            total_working_days: Total working days in the month (default: 26)
        
        Returns:
            PayrollRecord object with all calculated components
        
        Raises:
            ValueError: If employee not found or invalid input parameters
        """
        # Validate input
        if not 1 <= month <= 12:
            raise ValueError(f"Invalid month: {month}. Must be between 1 and 12.")
        
        if total_working_days <= 0:
            raise ValueError("Total working days must be positive.")
        
        # Step 1: Fetch employee salary structure
        salary_structure = self._fetch_employee_salary_structure(employee_user_id)
        if not salary_structure:
            raise ValueError(f"Employee not found: {employee_user_id}")
        
        # Step 2: Fetch attendance data for the month
        attendance_records = self._fetch_attendance_records(
            employee_user_id, month, year
        )
        
        # Step 3: Calculate attendance metrics
        attendance_metrics = self._calculate_attendance_metrics(attendance_records)
        
        # Step 4: Calculate salary components
        gross_salary = self._calculate_gross_salary(salary_structure)
        
        # Step 5: Calculate absence deduction
        absence_deduction = self._calculate_absence_deduction(
            gross_salary, 
            total_working_days,
            attendance_metrics['days_absent'],
            attendance_metrics['half_days']
        )
        
        # Step 6: Calculate total deductions
        total_deductions = (
            salary_structure.pf_deduction +
            salary_structure.esi_deduction +
            salary_structure.professional_tax +
            absence_deduction
        )
        
        # Step 7: Calculate net salary
        net_salary = gross_salary - total_deductions
        
        # Step 8: Create payroll record
        payroll_record = PayrollRecord(
            payroll_id=None,  # Will be set after DB insert
            employee_user_id=employee_user_id,
            month=month,
            year=year,
            total_working_days=total_working_days,
            days_present=attendance_metrics['days_present'],
            days_absent=attendance_metrics['days_absent'],
            days_on_leave=attendance_metrics['days_on_leave'],
            half_days=attendance_metrics['half_days'],
            base_salary=salary_structure.base_salary,
            hra=salary_structure.hra,
            da=salary_structure.da,
            special_allowance=salary_structure.special_allowance,
            gross_salary=gross_salary,
            pf_deduction=salary_structure.pf_deduction,
            esi_deduction=salary_structure.esi_deduction,
            professional_tax=salary_structure.professional_tax,
            absence_deduction=absence_deduction,
            other_deductions=Decimal('0.00'),
            total_deductions=total_deductions,
            net_salary=net_salary,
            status=PayrollStatus.PENDING,
            generated_at=datetime.now()
        )
        
        return payroll_record
    
    def _fetch_employee_salary_structure(
        self, 
        employee_user_id: int
    ) -> Optional[EmployeeSalaryStructure]:
        """
        Fetch employee salary structure from database.
        
        Args:
            employee_user_id: User ID of the employee
        
        Returns:
            EmployeeSalaryStructure object or None if not found
        """
        # SQL Query to fetch employee details
        query = """
            SELECT 
                u.user_id,
                u.employee_id,
                u.first_name,
                u.last_name,
                ed.base_salary,
                ed.hra,
                ed.da,
                ed.special_allowance,
                ed.pf_deduction,
                ed.esi_deduction,
                ed.professional_tax,
                ed.salary_grade
            FROM users u
            JOIN employee_details ed ON u.user_id = ed.user_id
            WHERE u.user_id = %s
              AND u.is_active = true
        """
        
        # Execute query (implementation depends on DB library)
        # This is a placeholder - actual implementation would use self.db
        result = self.db.execute(query, (employee_user_id,)).fetchone()
        
        if not result:
            return None
        
        return EmployeeSalaryStructure(
            user_id=result['user_id'],
            employee_id=result['employee_id'],
            first_name=result['first_name'],
            last_name=result['last_name'],
            base_salary=Decimal(str(result['base_salary'])),
            hra=Decimal(str(result['hra'])),
            da=Decimal(str(result['da'])),
            special_allowance=Decimal(str(result['special_allowance'])),
            pf_deduction=Decimal(str(result['pf_deduction'])),
            esi_deduction=Decimal(str(result['esi_deduction'])),
            professional_tax=Decimal(str(result['professional_tax'])),
            salary_grade=result['salary_grade']
        )
    
    def _fetch_attendance_records(
        self, 
        employee_user_id: int, 
        month: int, 
        year: int
    ) -> List[AttendanceRecord]:
        """
        Fetch attendance records for an employee for a specific month.
        
        Args:
            employee_user_id: User ID of the employee
            month: Month number (1-12)
            year: Year (e.g., 2025)
        
        Returns:
            List of AttendanceRecord objects
        """
        query = """
            SELECT 
                attendance_id,
                user_id,
                attendance_date,
                status,
                check_in_time,
                check_out_time
            FROM attendance_records
            WHERE user_id = %s
              AND user_type = 'STAFF'
              AND EXTRACT(MONTH FROM attendance_date) = %s
              AND EXTRACT(YEAR FROM attendance_date) = %s
            ORDER BY attendance_date ASC
        """
        
        results = self.db.execute(query, (employee_user_id, month, year)).fetchall()
        
        return [
            AttendanceRecord(
                attendance_id=row['attendance_id'],
                user_id=row['user_id'],
                attendance_date=row['attendance_date'],
                status=AttendanceStatus(row['status']),
                check_in_time=row['check_in_time'],
                check_out_time=row['check_out_time']
            )
            for row in results
        ]
    
    def _calculate_attendance_metrics(
        self, 
        attendance_records: List[AttendanceRecord]
    ) -> Dict[str, float]:
        """
        Calculate attendance metrics from attendance records.
        
        Args:
            attendance_records: List of AttendanceRecord objects
        
        Returns:
            Dictionary with keys:
                - days_present: Number of days present
                - days_absent: Number of days absent (excluding approved leaves)
                - days_on_leave: Number of approved leave days
                - half_days: Number of half days (counted as 0.5)
        """
        days_present = 0
        days_absent = 0
        days_on_leave = 0
        half_days = 0.0
        
        for record in attendance_records:
            if record.status == AttendanceStatus.PRESENT:
                days_present += 1
            elif record.status == AttendanceStatus.ABSENT:
                days_absent += 1
            elif record.status == AttendanceStatus.ON_LEAVE:
                days_on_leave += 1
            elif record.status == AttendanceStatus.HALF_DAY:
                half_days += 0.5
                days_present += 1  # Count as present for attendance percentage
            elif record.status == AttendanceStatus.LATE:
                days_present += 1  # Late arrivals count as present
        
        return {
            'days_present': days_present,
            'days_absent': days_absent,
            'days_on_leave': days_on_leave,
            'half_days': half_days
        }
    
    def _calculate_gross_salary(
        self, 
        salary_structure: EmployeeSalaryStructure
    ) -> Decimal:
        """
        Calculate gross salary (sum of all allowances).
        
        Formula:
            gross_salary = base_salary + hra + da + special_allowance
        
        Args:
            salary_structure: EmployeeSalaryStructure object
        
        Returns:
            Gross salary as Decimal
        """
        gross = (
            salary_structure.base_salary +
            salary_structure.hra +
            salary_structure.da +
            salary_structure.special_allowance
        )
        
        # Round to 2 decimal places
        return gross.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    
    def _calculate_absence_deduction(
        self, 
        gross_salary: Decimal,
        total_working_days: int,
        days_absent: int,
        half_days: float
    ) -> Decimal:
        """
        Calculate deduction for absent days.
        
        Formula:
            pay_per_day = gross_salary / total_working_days
            absence_deduction = pay_per_day * (days_absent + half_days)
        
        Note: Approved leaves (ON_LEAVE status) are NOT counted as absences.
        
        Args:
            gross_salary: Gross salary amount
            total_working_days: Total working days in the month
            days_absent: Number of days absent
            half_days: Number of half days (0.5 deduction each)
        
        Returns:
            Absence deduction amount as Decimal
        """
        if days_absent == 0 and half_days == 0:
            return Decimal('0.00')
        
        pay_per_day = gross_salary / Decimal(str(total_working_days))
        
        # Calculate total absent days (including half days)
        total_absent_days = Decimal(str(days_absent)) + Decimal(str(half_days))
        
        absence_deduction = pay_per_day * total_absent_days
        
        # Round to 2 decimal places
        return absence_deduction.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    
    def save_payroll_record(self, payroll_record: PayrollRecord) -> int:
        """
        Save payroll record to database.
        
        Args:
            payroll_record: PayrollRecord object to save
        
        Returns:
            payroll_id of the inserted record
        """
        query = """
            INSERT INTO payroll (
                employee_user_id, month, year,
                total_working_days, days_present, days_absent, days_on_leave,
                base_salary, hra, da, special_allowance,
                pf_deduction, esi_deduction, professional_tax,
                absence_deduction, other_deductions,
                net_salary, status
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            ) RETURNING payroll_id
        """
        
        result = self.db.execute(
            query,
            (
                payroll_record.employee_user_id,
                payroll_record.month,
                payroll_record.year,
                payroll_record.total_working_days,
                payroll_record.days_present,
                payroll_record.days_absent,
                payroll_record.days_on_leave,
                payroll_record.base_salary,
                payroll_record.hra,
                payroll_record.da,
                payroll_record.special_allowance,
                payroll_record.pf_deduction,
                payroll_record.esi_deduction,
                payroll_record.professional_tax,
                payroll_record.absence_deduction,
                payroll_record.other_deductions,
                payroll_record.net_salary,
                payroll_record.status.value
            )
        ).fetchone()
        
        self.db.commit()
        
        return result['payroll_id']
    
    def generate_payroll_for_all_employees(
        self, 
        month: int, 
        year: int
    ) -> List[Tuple[int, PayrollRecord, Optional[str]]]:
        """
        Generate payroll for all active employees for a given month.
        
        This is the main function called by the scheduled job at month-end.
        
        Args:
            month: Month number (1-12)
            year: Year (e.g., 2025)
        
        Returns:
            List of tuples: (employee_id, payroll_record, error_message)
        """
        # Fetch all active staff members
        query = """
            SELECT DISTINCT u.user_id
            FROM users u
            JOIN employee_details ed ON u.user_id = ed.user_id
            WHERE u.is_active = true
              AND u.primary_role_id IN (
                SELECT role_id FROM user_roles 
                WHERE role_name IN ('TEACHER', 'PRINCIPAL', 'HOD', 'ADMIN', 'HR', 'ACCOUNTANT')
              )
        """
        
        employee_ids = [row['user_id'] for row in self.db.execute(query).fetchall()]
        
        results = []
        
        for employee_id in employee_ids:
            try:
                # Calculate payroll
                payroll_record = self.calculate_payroll_for_month(
                    employee_id, month, year
                )
                
                # Save to database
                payroll_id = self.save_payroll_record(payroll_record)
                payroll_record.payroll_id = payroll_id
                
                results.append((employee_id, payroll_record, None))
                
            except Exception as e:
                # Log error and continue with next employee
                error_message = f"Error calculating payroll: {str(e)}"
                results.append((employee_id, None, error_message))
        
        return results


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

def example_usage():
    """
    Example demonstrating how to use the PayrollCalculationService.
    """
    
    # Initialize database connection (pseudo-code)
    # db_connection = psycopg2.connect(...)
    
    # Initialize service
    # payroll_service = PayrollCalculationService(db_connection)
    
    # Example 1: Calculate payroll for a single employee
    print("=" * 70)
    print("EXAMPLE 1: Single Employee Payroll Calculation")
    print("=" * 70)
    
    # Mock data for demonstration
    employee_user_id = 1001  # Prof. Anitha M
    month = 11  # November
    year = 2025
    
    # Calculate payroll
    # payroll_record = payroll_service.calculate_payroll_for_month(
    #     employee_user_id, month, year
    # )
    
    # Display results (using mock data)
    print(f"\nEmployee: Prof. Anitha M (ID: {employee_user_id})")
    print(f"Period: November 2025")
    print(f"\nAttendance Summary:")
    print(f"  Total Working Days: 26")
    print(f"  Days Present: 24")
    print(f"  Days Absent: 2")
    print(f"  Days on Leave: 0")
    
    print(f"\nSalary Breakdown:")
    print(f"  Base Salary:        ₹45,000.00")
    print(f"  HRA:                ₹10,000.00")
    print(f"  DA:                 ₹7,000.00")
    print(f"  Special Allowance:  ₹3,000.00")
    print(f"  {'─' * 40}")
    print(f"  Gross Salary:       ₹65,000.00")
    
    print(f"\nDeductions:")
    print(f"  PF (12%):           -₹5,400.00")
    print(f"  ESI:                -₹1,800.00")
    print(f"  Professional Tax:   -₹1,000.00")
    print(f"  Absence (2 days):   -₹5,000.00  (₹2,500/day × 2)")
    print(f"  {'─' * 40}")
    print(f"  Total Deductions:   -₹13,200.00")
    
    print(f"\n  {'═' * 40}")
    print(f"  NET SALARY:         ₹51,800.00")
    print(f"  {'═' * 40}")
    
    # Example 2: Monthly batch processing
    print("\n" + "=" * 70)
    print("EXAMPLE 2: Batch Payroll Generation for All Employees")
    print("=" * 70)
    
    print(f"\nProcessing payroll for November 2025...")
    print(f"Total employees: 280")
    print(f"\nResults:")
    print(f"  ✓ Successfully processed: 278 employees")
    print(f"  ✗ Failed: 2 employees (errors logged)")
    print(f"\nTotal payout: ₹1,26,70,000")
    print(f"Status: PENDING (awaiting HR approval)")


if __name__ == "__main__":
    example_usage()
