import { Routes, Route, Navigate } from 'react-router-dom';
import CollegeSelectionPage from './pages/CollegeSelectionPage';
import DirectorPortalSelection from './pages/DirectorPortalSelection';
import MedicalPortalSelection from './pages/medical/MedicalPortalSelection';
import EngineeringPortalSelection from './pages/engineering/EngineeringPortalSelection';
import DashboardLayout from './layouts/DashboardLayout';

// University-Wide Director Portal Pages
import UniversityDirectorDashboard from './pages/director/UniversityDirectorDashboard';
import CollegesAndDepartments from './pages/director/CollegesAndDepartments';
import UniversityStudentManagement from './pages/director/UniversityStudentManagement';
import StaffManagement from './pages/director/StaffManagement';
import Analytics from './pages/director/Analytics';
import Reports from './pages/director/Reports';
import UniversityHRDashboard from './pages/director/UniversityHRDashboard';
import UniversityAccountantDashboard from './pages/director/UniversityAccountantDashboard';
import NonTeachingStaffDashboard from './pages/director/NonTeachingStaffDashboard';

// Principal Portal Pages (Generic - used for navigation only)
import AcademicManagement from './pages/principal/AcademicManagement';
import FacultyManagement from './pages/principal/FacultyManagement';
import StudentRecords from './pages/principal/StudentRecords';

// Teacher Portal Pages (Generic - used for navigation only)
import AttendancePage from './pages/teacher/AttendancePage';
import MarksEntry from './pages/teacher/MarksEntry';
import MyClasses from './pages/teacher/MyClasses';

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyAttendance from './pages/student/MyAttendance';
import MyMarks from './pages/student/MyMarks';
import FeePayments from './pages/student/FeePayments';

// Parent Portal Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildrenManagement from './pages/parent/ChildrenManagement';

// HR Portal Pages
import HRDashboard from './pages/hr/HRDashboard';
import EmployeeDirectory from './pages/hr/EmployeeDirectory';
import PayrollManagement from './pages/hr/PayrollManagement';

// Accountant Portal Pages
import AccountantDashboard from './pages/accountant/AccountantDashboard';
import FeeCollection from './pages/accountant/FeeCollection';

// Medical College Student Pages
import MedicalStudentDashboard from './pages/medical/student/MedicalStudentDashboard';
import CompetencyBrowser from './pages/medical/student/CompetencyBrowser';
import ClinicalLogbook from './pages/medical/student/ClinicalLogbook';
import ClinicalRotations from './pages/medical/student/ClinicalRotations';
import AssessmentResults from './pages/medical/student/AssessmentResults';

// Medical College Portal Pages
import MedicalPrincipalDashboard from './pages/medical/principal/MedicalPrincipalDashboard';
import MedicalTeacherDashboard from './pages/medical/teacher/MedicalTeacherDashboard';
import MedicalHRDashboard from './pages/medical/hr/MedicalHRDashboard';
import MedicalAccountantDashboard from './pages/medical/accountant/MedicalAccountantDashboard';

// Medical College Principal Pages
import MedicalAcademicManagement from './pages/medical/principal/MedicalAcademicManagement';
import MedicalFacultyManagement from './pages/medical/principal/MedicalFacultyManagement';
import MedicalStudentRecords from './pages/medical/principal/MedicalStudentRecords';

// Medical College Teacher Pages
import LogbookApproval from './pages/medical/teacher/LogbookApproval';
import MedicalAttendancePage from './pages/medical/teacher/MedicalAttendancePage';
import MedicalMarksEntry from './pages/medical/teacher/MedicalMarksEntry';
import MedicalMyClasses from './pages/medical/teacher/MedicalMyClasses';

// Medical College Student Pages
import MedicalFeePayments from './pages/medical/student/MedicalFeePayments';

// Medical College Parent Pages
import MedicalParentDashboard from './pages/medical/parent/MedicalParentDashboard';
import MedicalChildrenManagement from './pages/medical/parent/MedicalChildrenManagement';

// Medical College HR Pages
import MedicalEmployeeDirectory from './pages/medical/hr/MedicalEmployeeDirectory';
import MedicalPayrollManagement from './pages/medical/hr/MedicalPayrollManagement';

// Medical College Accountant Pages
import MedicalFeeCollection from './pages/medical/accountant/MedicalFeeCollection';

// College-Specific Department Pages
import MedicalDepartments from './pages/medical/principal/MedicalDepartments';
import EngineeringDepartments from './pages/engineering/principal/EngineeringDepartments';

// Engineering College Principal Pages
import EngineeringAcademicManagement from './pages/engineering/principal/EngineeringAcademicManagement';
import EngineeringFacultyManagement from './pages/engineering/principal/EngineeringFacultyManagement';
import EngineeringStudentRecords from './pages/engineering/principal/EngineeringStudentRecords';

// Engineering College Teacher Pages
import EngineeringAttendancePage from './pages/engineering/teacher/EngineeringAttendancePage';
import EngineeringMarksEntry from './pages/engineering/teacher/EngineeringMarksEntry';
import EngineeringMyClasses from './pages/engineering/teacher/EngineeringMyClasses';

// Engineering College Student Pages
import EngineeringFeePayments from './pages/engineering/student/EngineeringFeePayments';

// Engineering College Parent Pages
import EngineeringParentDashboard from './pages/engineering/parent/EngineeringParentDashboard';
import EngineeringChildrenManagement from './pages/engineering/parent/EngineeringChildrenManagement';

// Engineering College HR Pages
import EngineeringEmployeeDirectory from './pages/engineering/hr/EngineeringEmployeeDirectory';
import EngineeringPayrollManagement from './pages/engineering/hr/EngineeringPayrollManagement';

// Engineering College Accountant Pages
import EngineeringFeeCollection from './pages/engineering/accountant/EngineeringFeeCollection';

// Dental College Portal Pages
import DentalPortalSelection from './pages/dental/DentalPortalSelection';

// Dental College Principal Pages
import DentalDepartments from './pages/dental/principal/DentalDepartments';
import DentalAcademicManagement from './pages/dental/principal/DentalAcademicManagement';
import DentalFacultyManagement from './pages/dental/principal/DentalFacultyManagement';
import DentalStudentRecords from './pages/dental/principal/DentalStudentRecords';

// Dental College Teacher Pages
import DentalAttendancePage from './pages/dental/teacher/DentalAttendancePage';
import DentalMarksEntry from './pages/dental/teacher/DentalMarksEntry';
import DentalMyClasses from './pages/dental/teacher/DentalMyClasses';

// Dental College Student Pages
import DentalFeePayments from './pages/dental/student/DentalFeePayments';

// Dental College Parent Pages
import DentalParentDashboard from './pages/dental/parent/DentalParentDashboard';
import DentalChildrenManagement from './pages/dental/parent/DentalChildrenManagement';

// Dental College HR Pages
import DentalEmployeeDirectory from './pages/dental/hr/DentalEmployeeDirectory';
import DentalPayrollManagement from './pages/dental/hr/DentalPayrollManagement';

// Dental College Accountant Pages
import DentalFeeCollection from './pages/dental/accountant/DentalFeeCollection';

// Arts & Science College Portal Pages
import ArtsSciencePortalSelection from './pages/arts-science/ArtsSciencePortalSelection';

// Arts & Science College Principal Pages
import ArtsScienceDepartments from './pages/arts-science/principal/ArtsScienceDepartments';
import ArtsScienceAcademicManagement from './pages/arts-science/principal/ArtsScienceAcademicManagement';
import ArtsScienceFacultyManagement from './pages/arts-science/principal/ArtsScienceFacultyManagement';
import ArtsScienceStudentRecords from './pages/arts-science/principal/ArtsScienceStudentRecords';

// Arts & Science College Teacher Pages
import ArtsScienceAttendancePage from './pages/arts-science/teacher/ArtsScienceAttendancePage';
import ArtsScienceMarksEntry from './pages/arts-science/teacher/ArtsScienceMarksEntry';
import ArtsScienceMyClasses from './pages/arts-science/teacher/ArtsScienceMyClasses';

// Arts & Science College Student Pages
import ArtsScienceFeePayments from './pages/arts-science/student/ArtsScienceFeePayments';

// Arts & Science College Parent Pages
import ArtsScienceParentDashboard from './pages/arts-science/parent/ArtsScienceParentDashboard';
import ArtsScienceChildrenManagement from './pages/arts-science/parent/ArtsScienceChildrenManagement';

// Arts & Science College HR Pages
import ArtsScienceEmployeeDirectory from './pages/arts-science/hr/ArtsScienceEmployeeDirectory';
import ArtsSciencePayrollManagement from './pages/arts-science/hr/ArtsSciencePayrollManagement';

// Arts & Science College Accountant Pages
import ArtsScienceFeeCollection from './pages/arts-science/accountant/ArtsScienceFeeCollection';

// Nursing College Portal Pages
import NursingPortalSelection from './pages/nursing/NursingPortalSelection';

// Nursing College Principal Pages
import NursingDepartments from './pages/nursing/principal/NursingDepartments';
import NursingAcademicManagement from './pages/nursing/principal/NursingAcademicManagement';
import NursingFacultyManagement from './pages/nursing/principal/NursingFacultyManagement';
import NursingStudentRecords from './pages/nursing/principal/NursingStudentRecords';

// Nursing College Teacher Pages
import NursingAttendancePage from './pages/nursing/teacher/NursingAttendancePage';
import NursingMarksEntry from './pages/nursing/teacher/NursingMarksEntry';
import NursingMyClasses from './pages/nursing/teacher/NursingMyClasses';

// Nursing College Student Pages
import NursingFeePayments from './pages/nursing/student/NursingFeePayments';

// Nursing College Parent Pages
import NursingParentDashboard from './pages/nursing/parent/NursingParentDashboard';
import NursingChildrenManagement from './pages/nursing/parent/NursingChildrenManagement';

// Nursing College HR Pages
import NursingEmployeeDirectory from './pages/nursing/hr/NursingEmployeeDirectory';
import NursingPayrollManagement from './pages/nursing/hr/NursingPayrollManagement';

// Nursing College Accountant Pages
import NursingFeeCollection from './pages/nursing/accountant/NursingFeeCollection';

// Allied Health Sciences Portal Pages
import AlliedHealthPortalSelection from './pages/allied-health/AlliedHealthPortalSelection';

// Allied Health Principal Pages
import AlliedHealthPrincipalDashboard from './pages/allied-health/principal/AlliedHealthPrincipalDashboard';
import AlliedHealthDepartments from './pages/allied-health/principal/AlliedHealthDepartments';
import AlliedHealthAcademicManagement from './pages/allied-health/principal/AlliedHealthAcademicManagement';
import AlliedHealthFacultyManagement from './pages/allied-health/principal/AlliedHealthFacultyManagement';
import AlliedHealthStudentRecords from './pages/allied-health/principal/AlliedHealthStudentRecords';

// Allied Health Teacher Pages
import AlliedHealthTeacherDashboard from './pages/allied-health/teacher/AlliedHealthTeacherDashboard';
import AlliedHealthAttendancePage from './pages/allied-health/teacher/AlliedHealthAttendancePage';
import AlliedHealthMarksEntry from './pages/allied-health/teacher/AlliedHealthMarksEntry';
import AlliedHealthMyClasses from './pages/allied-health/teacher/AlliedHealthMyClasses';

// Allied Health Student Pages
import AlliedHealthStudentDashboard from './pages/allied-health/student/AlliedHealthStudentDashboard';
import AlliedHealthFeePayments from './pages/allied-health/student/AlliedHealthFeePayments';

// Allied Health Parent Pages
import AlliedHealthParentDashboard from './pages/allied-health/parent/AlliedHealthParentDashboard';
import AlliedHealthChildrenManagement from './pages/allied-health/parent/AlliedHealthChildrenManagement';

// Allied Health HR Pages
import AlliedHealthHRDashboard from './pages/allied-health/hr/AlliedHealthHRDashboard';
import AlliedHealthEmployeeDirectory from './pages/allied-health/hr/AlliedHealthEmployeeDirectory';
import AlliedHealthPayrollManagement from './pages/allied-health/hr/AlliedHealthPayrollManagement';

// Allied Health Accountant Pages
import AlliedHealthAccountantDashboard from './pages/allied-health/accountant/AlliedHealthAccountantDashboard';
import AlliedHealthFeeCollection from './pages/allied-health/accountant/AlliedHealthFeeCollection';

// College-Specific Principal Dashboards
import EngineeringPrincipalDashboard from './pages/engineering/principal/EngineeringPrincipalDashboard';
import DentalPrincipalDashboard from './pages/dental/principal/DentalPrincipalDashboard';
import ArtsSciencePrincipalDashboard from './pages/arts-science/principal/ArtsSciencePrincipalDashboard';
import NursingPrincipalDashboard from './pages/nursing/principal/NursingPrincipalDashboard';

// College-Specific Teacher Dashboards
import EngineeringTeacherDashboard from './pages/engineering/teacher/EngineeringTeacherDashboard';
import DentalTeacherDashboard from './pages/dental/teacher/DentalTeacherDashboard';
import ArtsScienceTeacherDashboard from './pages/arts-science/teacher/ArtsScienceTeacherDashboard';
import NursingTeacherDashboard from './pages/nursing/teacher/NursingTeacherDashboard';

function App() {
  return (
    <Routes>
      {/* College Selection Page */}
      <Route path="/" element={<CollegeSelectionPage />} />
      
      {/* University Director Portal */}
      <Route path="/director" element={<DirectorPortalSelection />} />
      <Route path="/director" element={<DashboardLayout />}>
        <Route path="dashboard" element={<UniversityDirectorDashboard />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="students" element={<UniversityStudentManagement />} />
        <Route path="colleges" element={<CollegesAndDepartments />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="hr" element={<UniversityHRDashboard />} />
        <Route path="accountant" element={<UniversityAccountantDashboard />} />
        <Route path="non-teaching" element={<NonTeachingStaffDashboard />} />
      </Route>
      
      {/* College Portal Selection Pages */}
      <Route path="/medical" element={<MedicalPortalSelection />} />
      <Route path="/engineering" element={<EngineeringPortalSelection />} />
      <Route path="/dental" element={<DentalPortalSelection />} />
      <Route path="/arts-science" element={<ArtsSciencePortalSelection />} />
      <Route path="/nursing" element={<NursingPortalSelection />} />
      
      {/* Medical College Portal Routes */}
      <Route path="/medical" element={<DashboardLayout />}>

        {/* Principal Portal - Medical Specific */}
        <Route path="principal" element={<MedicalPrincipalDashboard />} />
        <Route path="principal/academic" element={<MedicalAcademicManagement />} />
        <Route path="principal/faculty" element={<MedicalFacultyManagement />} />
        <Route path="principal/students" element={<MedicalStudentRecords />} />
        <Route path="principal/departments" element={<MedicalDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Medical Specific */}
        <Route path="teacher" element={<MedicalTeacherDashboard />} />
        <Route path="teacher/logbook-approval" element={<LogbookApproval />} />
        <Route path="teacher/attendance" element={<MedicalAttendancePage />} />
        <Route path="teacher/marks" element={<MedicalMarksEntry />} />
        <Route path="teacher/classes" element={<MedicalMyClasses />} />
        <Route path="teacher/students" element={<MedicalStudentRecords />} />

        {/* Medical Student Portal - CBME */}
        <Route path="student" element={<MedicalStudentDashboard />} />
        <Route path="student/competencies" element={<CompetencyBrowser />} />
        <Route path="student/logbook" element={<ClinicalLogbook />} />
        <Route path="student/assessments" element={<AssessmentResults />} />
        <Route path="student/rotations" element={<ClinicalRotations />} />
        <Route path="student/fees" element={<MedicalFeePayments />} />

        {/* Parent Portal - Medical Specific */}
        <Route path="parent" element={<MedicalParentDashboard />} />
        <Route path="parent/children" element={<MedicalChildrenManagement />} />

        {/* HR Portal - Medical Specific */}
        <Route path="hr" element={<MedicalHRDashboard />} />
        <Route path="hr/employees" element={<MedicalEmployeeDirectory />} />
        <Route path="hr/payroll" element={<MedicalPayrollManagement />} />

        {/* Accountant Portal - Medical Specific */}
        <Route path="accountant" element={<MedicalAccountantDashboard />} />
        <Route path="accountant/collection" element={<MedicalFeeCollection />} />
      </Route>

      {/* Engineering College Portal Routes */}
      <Route path="/engineering" element={<DashboardLayout />}>
        {/* Principal Portal - Engineering Specific */}
        <Route path="principal" element={<EngineeringPrincipalDashboard />} />
        <Route path="principal/academic" element={<EngineeringAcademicManagement />} />
        <Route path="principal/faculty" element={<EngineeringFacultyManagement />} />
        <Route path="principal/students" element={<EngineeringStudentRecords />} />
        <Route path="principal/departments" element={<EngineeringDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Engineering Specific */}
        <Route path="teacher" element={<EngineeringTeacherDashboard />} />
        <Route path="teacher/attendance" element={<EngineeringAttendancePage />} />
        <Route path="teacher/marks" element={<EngineeringMarksEntry />} />
        <Route path="teacher/classes" element={<EngineeringMyClasses />} />

        {/* Engineering Student Portal */}
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/attendance" element={<MyAttendance />} />
        <Route path="student/marks" element={<MyMarks />} />
        <Route path="student/fees" element={<EngineeringFeePayments />} />

        {/* Parent Portal - Engineering Specific */}
        <Route path="parent" element={<EngineeringParentDashboard />} />
        <Route path="parent/children" element={<EngineeringChildrenManagement />} />

        {/* HR Portal - Engineering Specific */}
        <Route path="hr" element={<HRDashboard />} />
        <Route path="hr/employees" element={<EngineeringEmployeeDirectory />} />
        <Route path="hr/payroll" element={<EngineeringPayrollManagement />} />

        {/* Accountant Portal - Engineering Specific */}
        <Route path="accountant" element={<AccountantDashboard />} />
        <Route path="accountant/collection" element={<EngineeringFeeCollection />} />
      </Route>

      {/* Dental College Portal Routes */}
      <Route path="/dental" element={<DashboardLayout />}>
        {/* Principal Portal - Dental Specific */}
        <Route path="principal" element={<DentalPrincipalDashboard />} />
        <Route path="principal/academic" element={<DentalAcademicManagement />} />
        <Route path="principal/faculty" element={<DentalFacultyManagement />} />
        <Route path="principal/students" element={<DentalStudentRecords />} />
        <Route path="principal/departments" element={<DentalDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Dental Specific */}
        <Route path="teacher" element={<DentalTeacherDashboard />} />
        <Route path="teacher/attendance" element={<DentalAttendancePage />} />
        <Route path="teacher/marks" element={<DentalMarksEntry />} />
        <Route path="teacher/classes" element={<DentalMyClasses />} />

        {/* Student Portal */}
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/attendance" element={<MyAttendance />} />
        <Route path="student/marks" element={<MyMarks />} />
        <Route path="student/fees" element={<DentalFeePayments />} />

        {/* Parent Portal */}
        <Route path="parent" element={<DentalParentDashboard />} />
        <Route path="parent/children" element={<DentalChildrenManagement />} />

        {/* HR Portal */}
        <Route path="hr" element={<HRDashboard />} />
        <Route path="hr/employees" element={<DentalEmployeeDirectory />} />
        <Route path="hr/payroll" element={<DentalPayrollManagement />} />

        {/* Accountant Portal */}
        <Route path="accountant" element={<AccountantDashboard />} />
        <Route path="accountant/collection" element={<DentalFeeCollection />} />
      </Route>

      {/* Arts & Science College Portal Routes */}
      <Route path="/arts-science" element={<DashboardLayout />}>
        {/* Principal Portal - Arts & Science Specific */}
        <Route path="principal" element={<ArtsSciencePrincipalDashboard />} />
        <Route path="principal/academic" element={<ArtsScienceAcademicManagement />} />
        <Route path="principal/faculty" element={<ArtsScienceFacultyManagement />} />
        <Route path="principal/students" element={<ArtsScienceStudentRecords />} />
        <Route path="principal/departments" element={<ArtsScienceDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Arts & Science Specific */}
        <Route path="teacher" element={<ArtsScienceTeacherDashboard />} />
        <Route path="teacher/attendance" element={<ArtsScienceAttendancePage />} />
        <Route path="teacher/marks" element={<ArtsScienceMarksEntry />} />
        <Route path="teacher/classes" element={<ArtsScienceMyClasses />} />

        {/* Student Portal */}
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/attendance" element={<MyAttendance />} />
        <Route path="student/marks" element={<MyMarks />} />
        <Route path="student/fees" element={<ArtsScienceFeePayments />} />

        {/* Parent Portal */}
        <Route path="parent" element={<ArtsScienceParentDashboard />} />
        <Route path="parent/children" element={<ArtsScienceChildrenManagement />} />

        {/* HR Portal */}
        <Route path="hr" element={<HRDashboard />} />
        <Route path="hr/employees" element={<ArtsScienceEmployeeDirectory />} />
        <Route path="hr/payroll" element={<ArtsSciencePayrollManagement />} />

        {/* Accountant Portal */}
        <Route path="accountant" element={<AccountantDashboard />} />
        <Route path="accountant/collection" element={<ArtsScienceFeeCollection />} />
      </Route>

      {/* Nursing College Portal Routes */}
      <Route path="/nursing" element={<DashboardLayout />}>
        {/* Principal Portal - Nursing Specific */}
        <Route path="principal" element={<NursingPrincipalDashboard />} />
        <Route path="principal/academic" element={<NursingAcademicManagement />} />
        <Route path="principal/faculty" element={<NursingFacultyManagement />} />
        <Route path="principal/students" element={<NursingStudentRecords />} />
        <Route path="principal/departments" element={<NursingDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Nursing Specific */}
        <Route path="teacher" element={<NursingTeacherDashboard />} />
        <Route path="teacher/attendance" element={<NursingAttendancePage />} />
        <Route path="teacher/marks" element={<NursingMarksEntry />} />
        <Route path="teacher/classes" element={<NursingMyClasses />} />

        {/* Student Portal */}
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/attendance" element={<MyAttendance />} />
        <Route path="student/marks" element={<MyMarks />} />
        <Route path="student/fees" element={<NursingFeePayments />} />

        {/* Parent Portal */}
        <Route path="parent" element={<NursingParentDashboard />} />
        <Route path="parent/children" element={<NursingChildrenManagement />} />

        {/* HR Portal */}
        <Route path="hr" element={<HRDashboard />} />
        <Route path="hr/employees" element={<NursingEmployeeDirectory />} />
        <Route path="hr/payroll" element={<NursingPayrollManagement />} />

        {/* Accountant Portal */}
        <Route path="accountant" element={<AccountantDashboard />} />
        <Route path="accountant/collection" element={<NursingFeeCollection />} />
      </Route>

      {/* Allied Health College Portal Routes */}
      <Route path="/allied-health" element={<AlliedHealthPortalSelection />} />
      <Route path="/allied-health" element={<DashboardLayout />}>
        {/* Principal Portal - Allied Health Specific */}
        <Route path="principal" element={<AlliedHealthPrincipalDashboard />} />
        <Route path="principal/academic" element={<AlliedHealthAcademicManagement />} />
        <Route path="principal/faculty" element={<AlliedHealthFacultyManagement />} />
        <Route path="principal/students" element={<AlliedHealthStudentRecords />} />
        <Route path="principal/departments" element={<AlliedHealthDepartments />} />
        <Route path="principal/reports" element={<Reports />} />
        <Route path="principal/analytics" element={<Analytics />} />

        {/* Teacher Portal - Allied Health Specific */}
        <Route path="teacher" element={<AlliedHealthTeacherDashboard />} />
        <Route path="teacher/attendance" element={<AlliedHealthAttendancePage />} />
        <Route path="teacher/marks" element={<AlliedHealthMarksEntry />} />
        <Route path="teacher/classes" element={<AlliedHealthMyClasses />} />

        {/* Student Portal */}
        <Route path="student" element={<AlliedHealthStudentDashboard />} />
        <Route path="student/fees" element={<AlliedHealthFeePayments />} />

        {/* Parent Portal */}
        <Route path="parent" element={<AlliedHealthParentDashboard />} />
        <Route path="parent/children" element={<AlliedHealthChildrenManagement />} />

        {/* HR Portal */}
        <Route path="hr" element={<AlliedHealthHRDashboard />} />
        <Route path="hr/employees" element={<AlliedHealthEmployeeDirectory />} />
        <Route path="hr/payroll" element={<AlliedHealthPayrollManagement />} />

        {/* Accountant Portal */}
        <Route path="accountant" element={<AlliedHealthAccountantDashboard />} />
        <Route path="accountant/fees" element={<AlliedHealthFeeCollection />} />
      </Route>

      {/* Catch all - redirect to index */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
