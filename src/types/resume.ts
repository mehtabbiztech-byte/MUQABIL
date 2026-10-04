export type ResumeTemplateId = string;
export type ResumeLayoutFamily = 'sts-govt' | 'fortune-500' | 'modern-ats' | 'tech-compact' | 'executive' | 'minimal';
export type ResumeAccentColor = 'emerald' | 'navy' | 'slate' | 'burgundy' | 'indigo' | 'teal' | 'blue' | 'violet' | 'rose' | 'amber';
export type ResumeFontSize = 'compact' | 'normal' | 'spacious';

export interface ProjectEntry {
  id: string;
  title: string;
  role?: string;
  techStack?: string;
  link?: string;
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  degreeLevel: string; // Matric / Intermediate / Bachelor / Master / MS-MPhil
  degreeTitle: string; // e.g. Pre-Engineering, Computer Science, B.Ed
  instituteOrBoard: string; // e.g. BISE Sukkur, University of Sindh
  passingYear: string;
  obtainedMarks: string;
  totalMarks: string;
  percentageOrCgpa: string;
  divisionOrGrade: string; // 1st Div, A+ Grade, 3.6 CGPA
  majorSubjects?: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  designation: string;
  employmentType: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export interface SkillEntry {
  id: string;
  name: string;
  category: 'technical' | 'office' | 'language' | 'interpersonal';
  level: 'Basic' | 'Intermediate' | 'Proficient' | 'Expert';
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuingAuthority: string; // e.g. STEDA Sindh, NAVTTC, TEVTA, Microsoft
  issueYear: string;
  licenseOrCertificateNo?: string;
}

export interface ReferenceEntry {
  id: string;
  name: string;
  designation: string;
  organization: string;
  contact: string;
}

export interface ResumeData {
  // Personal Details
  fullName: string;
  fatherName: string;
  cnic: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  domicileDistrict: string;
  province: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  maritalStatus: 'Single' | 'Married' | '';
  religion: string;
  hafizEQuran: boolean; // Relevant for Pakistan Govt bonus marks
  photoUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;

  // Professional Target & Summary
  targetHeadline: string; // e.g. "Candidate for STS BPS-11 Junior Clerk / STEDA PST Teacher"
  professionalSummary: string;

  // Core Sections
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects?: ProjectEntry[];
  skills: SkillEntry[];
  certifications: CertificationEntry[];
  references: ReferenceEntry[];

  // Display Settings
  template: ResumeTemplateId;
  accentColor: ResumeAccentColor;
  fontSize: ResumeFontSize;
  showPhoto: boolean;
  showFatherName: boolean;
  showCnic: boolean;
  showDomicile: boolean;
  showHafizStatus: boolean;
}
