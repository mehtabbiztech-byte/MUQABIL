import React from 'react';
import { ResumeData, ResumeAccentColor } from '../../types/resume';
import { resolveResumeTemplate, RESUME_ACCENT_HEX } from '../../data/resumeTemplates';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  BookOpen, 
  Briefcase, 
  CheckCircle2, 
  User, 
  FileText,
  Calendar,
  Globe
} from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

const ACCENT_STYLES: Record<ResumeAccentColor, {
  primary: string;
  badge: string;
  border: string;
  tableHeader: string;
  subheading: string;
  icon: string;
}> = {
  emerald: {
    primary: 'text-emerald-800 dark:text-emerald-300',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    border: 'border-emerald-600',
    tableHeader: 'bg-emerald-800 text-white',
    subheading: 'text-emerald-700',
    icon: 'text-emerald-700',
  },
  navy: {
    primary: 'text-slate-900 dark:text-sky-300',
    badge: 'bg-sky-50 text-slate-900 border-sky-300',
    border: 'border-slate-800',
    tableHeader: 'bg-slate-900 text-white',
    subheading: 'text-slate-800',
    icon: 'text-slate-800',
  },
  slate: {
    primary: 'text-slate-900 dark:text-slate-100',
    badge: 'bg-slate-100 text-slate-800 border-slate-300',
    border: 'border-slate-700',
    tableHeader: 'bg-slate-800 text-white',
    subheading: 'text-slate-700',
    icon: 'text-slate-700',
  },
  burgundy: {
    primary: 'text-rose-900 dark:text-rose-300',
    badge: 'bg-rose-50 text-rose-900 border-rose-300',
    border: 'border-rose-800',
    tableHeader: 'bg-rose-900 text-white',
    subheading: 'text-rose-800',
    icon: 'text-rose-800',
  },
  indigo: {
    primary: 'text-indigo-900 dark:text-indigo-300',
    badge: 'bg-indigo-50 text-indigo-900 border-indigo-300',
    border: 'border-indigo-700',
    tableHeader: 'bg-indigo-900 text-white',
    subheading: 'text-indigo-800',
    icon: 'text-indigo-800',
  },
  teal: {
    primary: 'text-teal-800 dark:text-teal-300',
    badge: 'bg-teal-50 text-teal-800 border-teal-300',
    border: 'border-teal-600',
    tableHeader: 'bg-teal-800 text-white',
    subheading: 'text-teal-700',
    icon: 'text-teal-700',
  },
  blue: {
    primary: 'text-blue-800 dark:text-blue-300',
    badge: 'bg-blue-50 text-blue-800 border-blue-300',
    border: 'border-blue-600',
    tableHeader: 'bg-blue-800 text-white',
    subheading: 'text-blue-700',
    icon: 'text-blue-700',
  },
  violet: {
    primary: 'text-violet-800 dark:text-violet-300',
    badge: 'bg-violet-50 text-violet-800 border-violet-300',
    border: 'border-violet-600',
    tableHeader: 'bg-violet-800 text-white',
    subheading: 'text-violet-700',
    icon: 'text-violet-700',
  },
  rose: {
    primary: 'text-rose-800 dark:text-rose-300',
    badge: 'bg-rose-50 text-rose-800 border-rose-300',
    border: 'border-rose-600',
    tableHeader: 'bg-rose-800 text-white',
    subheading: 'text-rose-700',
    icon: 'text-rose-700',
  },
  amber: {
    primary: 'text-amber-800 dark:text-amber-300',
    badge: 'bg-amber-50 text-amber-800 border-amber-300',
    border: 'border-amber-600',
    tableHeader: 'bg-amber-800 text-white',
    subheading: 'text-amber-700',
    icon: 'text-amber-700',
  },
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, scale = 1 }) => {
  const selectedTemplate = resolveResumeTemplate(data.template);
  const accent = ACCENT_STYLES[data.accentColor] || ACCENT_STYLES.emerald;
  const isCompact = data.fontSize === 'compact';
  const isSpacious = data.fontSize === 'spacious';

  const baseTextSize = isCompact ? 'text-[11px] leading-tight' : isSpacious ? 'text-[13px] leading-relaxed' : 'text-xs leading-normal';
  const headingTextSize = isCompact ? 'text-xs' : isSpacious ? 'text-sm' : 'text-xs';
  const zoomStyle = scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: 'top center' } : undefined;

  // Format STS Govt Standard Format
  if (selectedTemplate.previewLayout === 'sts-govt') {
    return (
      <div 
        id="resume-printable-area"
        className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto p-7 sm:p-10 shadow-2xl rounded-sm border border-slate-300 font-sans print:p-0 print:border-0 print:shadow-none ${baseTextSize}`}
        style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
      >
        {/* Header Title for Public Sector Scrutiny */}
        <div className="text-center border-b-2 border-slate-800 pb-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
            CURRICULUM VITAE (C.V.) FOR SCREENING / RECRUITMENT TEST
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
            {data.fullName || 'Candidate Name'}
          </h1>
          {data.targetHeadline && (
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              {data.targetHeadline}
            </p>
          )}
        </div>

        {/* Candidate Official Bio Information Grid */}
        <div className="bg-slate-50 border border-slate-300 p-3.5 rounded-sm mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 text-slate-800">
            {data.showFatherName && data.fatherName && (
              <div>
                <strong className="font-bold text-slate-950">Father's Name:</strong> {data.fatherName}
              </div>
            )}
            {data.showCnic && data.cnic && (
              <div>
                <strong className="font-bold text-slate-950">CNIC No:</strong> <span className="font-mono">{data.cnic}</span>
              </div>
            )}
            {data.showDomicile && data.domicileDistrict && (
              <div>
                <strong className="font-bold text-slate-950">Domicile / PRC:</strong> {data.domicileDistrict} ({data.province || 'Sindh'})
              </div>
            )}
            {data.phone && (
              <div>
                <strong className="font-bold text-slate-950">Contact / WhatsApp:</strong> {data.phone}
              </div>
            )}
            {data.email && (
              <div>
                <strong className="font-bold text-slate-950">Email Address:</strong> {data.email}
              </div>
            )}
            {data.dob && (
              <div>
                <strong className="font-bold text-slate-950">Date of Birth:</strong> {data.dob}
              </div>
            )}
            {data.gender && (
              <div>
                <strong className="font-bold text-slate-950">Gender:</strong> {data.gender}
              </div>
            )}
            {data.maritalStatus && (
              <div>
                <strong className="font-bold text-slate-950">Marital Status:</strong> {data.maritalStatus}
              </div>
            )}
            {data.religion && (
              <div>
                <strong className="font-bold text-slate-950">Religion:</strong> {data.religion}
              </div>
            )}
            {data.showHafizStatus && data.hafizEQuran && (
              <div className="text-emerald-800 font-bold col-span-full">
                ★ Hafiz-e-Quran (Eligible for Government Bonus Marks / Quota)
              </div>
            )}
            {data.address && (
              <div className="col-span-full">
                <strong className="font-bold text-slate-950">Postal Address:</strong> {data.address}, {data.city}
              </div>
            )}
          </div>
        </div>

        {/* Objective / Summary */}
        {data.professionalSummary && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5 flex items-center gap-1.5`}>
              <FileText size={14} className="text-slate-700" />
              <span>Career Objective & Professional Statement</span>
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed">
              {data.professionalSummary}
            </p>
          </div>
        )}

        {/* Academic Qualification Table (Strict Government Scrutiny Format) */}
        {data.education && data.education.length > 0 && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5`}>
              <BookOpen size={14} className="text-slate-700" />
              <span>Academic Qualifications</span>
            </h2>
            <div className="overflow-x-auto border border-slate-300">
              <table className="w-full text-left border-collapse text-[10.5px] sm:text-[11.5px]">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold">
                    <th className="p-1.5 border border-slate-600">Certificate / Degree</th>
                    <th className="p-1.5 border border-slate-600">Board / University</th>
                    <th className="p-1.5 border border-slate-600 text-center">Passing Year</th>
                    <th className="p-1.5 border border-slate-600 text-center">Marks / CGPA</th>
                    <th className="p-1.5 border border-slate-600 text-center">% / Div</th>
                    <th className="p-1.5 border border-slate-600">Major Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  {data.education.map((edu, idx) => (
                    <tr key={edu.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-1.5 border border-slate-300 font-bold text-slate-950">
                        {edu.degreeTitle} <span className="text-[10px] text-slate-500 font-normal block">{edu.degreeLevel}</span>
                      </td>
                      <td className="p-1.5 border border-slate-300">{edu.instituteOrBoard}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-medium">{edu.passingYear}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono">
                        {edu.obtainedMarks} / {edu.totalMarks}
                      </td>
                      <td className="p-1.5 border border-slate-300 text-center font-bold text-slate-900">
                        {edu.percentageOrCgpa || edu.divisionOrGrade}
                      </td>
                      <td className="p-1.5 border border-slate-300 text-slate-700">{edu.majorSubjects || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Official Certifications & Teaching Licenses */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5`}>
              <Award size={14} className="text-slate-700" />
              <span>Professional Licenses, Diplomas & Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="border border-slate-300 bg-slate-50/70 p-2 rounded-xs">
                  <div className="font-bold text-slate-950 text-xs">{cert.title}</div>
                  <div className="text-slate-600 text-[11px]">{cert.issuingAuthority} • ({cert.issueYear})</div>
                  {cert.licenseOrCertificateNo && (
                    <div className="text-slate-500 font-mono text-[10px] mt-0.5">
                      Roll/Lic #: {cert.licenseOrCertificateNo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5`}>
              <Briefcase size={14} className="text-slate-700" />
              <span>Professional & Employment Experience</span>
            </h2>
            <div className="space-y-2.5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-slate-400 pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-950 text-xs">{exp.designation}</span>
                    <span className="text-slate-600 text-[11px] font-mono">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-700 font-medium text-[11.5px]">
                    {exp.organization} • <span className="text-slate-500">{exp.location} ({exp.employmentType})</span>
                  </div>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-700 text-[11px]">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="leading-snug">{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects & Key Initiatives */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5`}>
              <Award size={14} className="text-slate-700" />
              <span>Key Projects, Research & Departmental Assignments</span>
            </h2>
            <div className="space-y-2">
              {data.projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-slate-400 pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-950 text-xs">{proj.title}</span>
                    {proj.role && <span className="text-slate-600 text-[10.5px]">({proj.role})</span>}
                  </div>
                  {proj.techStack && (
                    <div className="text-slate-600 text-[10.5px] font-mono mt-0.5">
                      Tools / Tech: {proj.techStack}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700 text-[11px]">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Competencies */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5`}>
              <CheckCircle2 size={14} className="text-slate-700" />
              <span>Skills, IT Literacy & Language Proficiencies</span>
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-800 text-[11px] font-medium"
                >
                  {skill.name} <span className="text-slate-500 text-[10px]">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mb-5">
            <h2 className={`${headingTextSize} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5`}>
              References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-slate-700">
                  <div className="font-bold text-slate-950">{ref.name}</div>
                  {ref.designation && <div>{ref.designation}, {ref.organization}</div>}
                  {ref.contact && <div className="text-slate-600">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidate Solemn Declaration Line for Public Examinations */}
        <div className="mt-8 pt-4 border-t border-slate-400 text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div className="max-w-md italic">
            "I solemnly affirm that the facts and particulars stated in this application are correct and complete to the best of my knowledge and belief."
          </div>
          <div className="text-center shrink-0 border-t border-slate-800 pt-1 w-44">
            <span className="block font-bold text-slate-950 uppercase">{data.fullName || 'Candidate'}</span>
            <span className="text-[9px] text-slate-500">Applicant Signature / Thumb</span>
          </div>
        </div>
      </div>
    );
  }

  // Fortune 500 ATS Standard Format (Strict Single-Column, Harvard/Wharton Standard, EEO Anti-Bias compliant)
  if (selectedTemplate.previewLayout === 'fortune-500') {
    return (
      <div 
        id="resume-printable-area"
        className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto p-8 sm:p-12 shadow-2xl rounded-sm font-sans print:p-0 print:shadow-none print:max-w-none ${baseTextSize}`}
        style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
      >
        {/* Fortune 500 EEO Compliance Header */}
        <header className="text-center border-b-2 border-slate-900 pb-3.5 mb-4">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase font-sans">
            {data.fullName || 'Candidate Name'}
          </h1>
          {data.targetHeadline && (
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1 tracking-wide">
              {data.targetHeadline}
            </p>
          )}

          {/* Standard ATS Contact Ribbon with Pipe Separators */}
          <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 mt-2 text-[11px] text-slate-700 font-medium">
            {data.city && (
              <span>{data.city}</span>
            )}
            {data.phone && (
              <>
                <span className="text-slate-400">•</span>
                <span className="font-mono">{data.phone}</span>
              </>
            )}
            {data.email && (
              <>
                <span className="text-slate-400">•</span>
                <a href={`mailto:${data.email}`} className="text-slate-900 font-semibold hover:underline">
                  {data.email}
                </a>
              </>
            )}
            {data.linkedinUrl && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-900 font-semibold">{data.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </>
            )}
            {data.githubUrl && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-800">{data.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </>
            )}
            {data.portfolioUrl && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-800">{data.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {data.professionalSummary && (
          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5 flex items-center justify-between">
              <span>Professional Summary</span>
              <span className="text-[10px] text-slate-500 font-mono lowercase tracking-normal print:hidden">ATS-friendly format</span>
            </h2>
            <p className="text-slate-800 leading-relaxed text-justify">
              {data.professionalSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  {/* Line 1: Title & Date */}
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-950 text-xs">
                      {exp.designation}
                    </span>
                    <span className="text-slate-700 font-semibold font-mono text-[11px]">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {/* Line 2: Company & Location */}
                  <div className="flex justify-between items-baseline text-[11.5px] text-slate-800 font-medium italic mb-1">
                    <span>{exp.organization}</span>
                    <span className="not-italic text-slate-600 text-[11px]">{exp.location}</span>
                  </div>

                  {/* Accomplishment Bullets using Google XYZ Formula */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 text-[11px] leading-snug">
                      {exp.responsibilities.map((bullet, idx) => (
                        <li key={idx}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects & Technical Leadership */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Key Projects & Technical Leadership
            </h2>
            <div className="space-y-2.5">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <div>
                      <span className="font-bold text-slate-950 text-xs">{proj.title}</span>
                      {proj.role && <span className="text-slate-600 text-[11px]"> • {proj.role}</span>}
                    </div>
                    {proj.link && (
                      <span className="text-slate-600 font-mono text-[10.5px]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.techStack && (
                    <div className="text-[10.5px] text-slate-600 font-mono mb-0.5">
                      <span className="font-bold text-slate-700">Tech Stack:</span> {proj.techStack}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-800 text-[11px]">
                      {proj.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 text-xs">
                      {edu.degreeTitle}
                    </span>
                    <span className="text-slate-700 font-mono text-[11px] font-semibold">
                      {edu.passingYear}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] text-slate-700">
                    <span>{edu.instituteOrBoard}</span>
                    <span className="font-bold text-slate-900">
                      {edu.percentageOrCgpa || edu.divisionOrGrade}
                    </span>
                  </div>
                  {edu.majorSubjects && (
                    <div className="text-[10.5px] text-slate-600 mt-0.5">
                      Relevant Coursework: {edu.majorSubjects}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills & Competencies */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
              Technical Skills & Competencies
            </h2>
            <div className="text-[11px] text-slate-800 leading-relaxed">
              <div className="grid grid-cols-1 gap-1">
                <div>
                  <span className="font-bold text-slate-950">Core Competencies: </span>
                  {data.skills.map((s) => s.name).join(', ')}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Certifications & Credentials */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
              Certifications & Professional Credentials
            </h2>
            <div className="space-y-1 text-[11px]">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950">{cert.title}</span>
                    <span className="text-slate-600"> — {cert.issuingAuthority}</span>
                    {cert.licenseOrCertificateNo && (
                      <span className="text-slate-500 font-mono text-[10px]"> (ID: {cert.licenseOrCertificateNo})</span>
                    )}
                  </div>
                  <span className="text-slate-600 font-mono text-[10.5px]">{cert.issueYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Modern ATS Format (Clean, single/dual column with subtle accent lines)
  if (selectedTemplate.previewLayout === 'modern-ats') {
    return (
      <div 
        id="resume-printable-area"
        className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto p-8 sm:p-11 shadow-2xl rounded-sm font-sans print:p-0 print:shadow-none ${baseTextSize}`}
        style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
      >
        {/* Modern Header */}
        <header className="border-b-2 pb-4 mb-5 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            {data.fullName || 'Your Full Name'}
          </h1>
          {data.targetHeadline && (
            <p className={`text-xs sm:text-sm font-bold mt-1 ${accent.primary}`}>
              {data.targetHeadline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-slate-600 text-[11px]">
            {data.phone && (
              <span className="flex items-center gap-1">
                <Phone size={11} className={accent.icon} />
                {data.phone}
              </span>
            )}
            {data.email && (
              <span className="flex items-center gap-1">
                <Mail size={11} className={accent.icon} />
                {data.email}
              </span>
            )}
            {(data.city || data.province) && (
              <span className="flex items-center gap-1">
                <MapPin size={11} className={accent.icon} />
                {data.city ? `${data.city}, ` : ''}{data.province || 'Pakistan'}
              </span>
            )}
            {data.linkedinUrl && (
              <span className="flex items-center gap-1">
                <Globe size={11} className={accent.icon} />
                {data.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            )}
            {data.githubUrl && (
              <span className="flex items-center gap-1 font-mono">
                {data.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            )}
            {data.portfolioUrl && (
              <span className="flex items-center gap-1">
                {data.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            )}
            {data.showCnic && data.cnic && (
              <span className="font-mono">CNIC: {data.cnic}</span>
            )}
            {data.showDomicile && data.domicileDistrict && (
              <span>Domicile: {data.domicileDistrict}</span>
            )}
          </div>
        </header>

        {/* Summary */}
        {data.professionalSummary && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-1.5 border-b border-slate-200 ${accent.primary}`}>
              Professional Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {data.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-2 border-b border-slate-200 ${accent.primary}`}>
              Experience
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{exp.designation}</span>
                    <span className="text-slate-500 font-mono text-[10.5px]">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] font-medium">
                    {exp.organization} • {exp.location}
                  </div>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[11px]">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-2 border-b border-slate-200 ${accent.primary}`}>
              Key Projects & Technical Initiatives
            </h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">
                      {proj.title}
                      {proj.role && <span className="text-slate-500 font-normal ml-1">({proj.role})</span>}
                    </span>
                    {proj.link && (
                      <span className="text-slate-500 text-[10px] font-mono underline">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.techStack && (
                    <div className="text-slate-600 text-[10.5px] font-mono mt-0.5">
                      Stack: {proj.techStack}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[11px]">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-2 border-b border-slate-200 ${accent.primary}`}>
              Education
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline gap-2">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">
                      {edu.degreeTitle} <span className="font-normal text-slate-600">({edu.degreeLevel})</span>
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      {edu.instituteOrBoard} {edu.majorSubjects ? `• ${edu.majorSubjects}` : ''}
                    </div>
                  </div>
                  <div className="text-right shrink-0 text-[11px]">
                    <div className="font-bold text-slate-900">{edu.percentageOrCgpa || edu.divisionOrGrade}</div>
                    <div className="text-slate-500 font-mono text-[10px]">{edu.passingYear}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-2 border-b border-slate-200 ${accent.primary}`}>
              Key Skills & Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span 
                  key={skill.id}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-5">
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-2 border-b border-slate-200 ${accent.primary}`}>
              Certifications & Training
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[11px]">
                  <div className="font-bold text-slate-900">{cert.title}</div>
                  <div className="text-slate-600">{cert.issuingAuthority} ({cert.issueYear})</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h2 className={`font-bold tracking-wider uppercase text-xs pb-1 mb-1.5 border-b border-slate-200 ${accent.primary}`}>
              References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <span className="font-bold text-slate-900">{ref.name}</span>
                  {ref.organization && ` — ${ref.organization}`}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Tech & Digital Compact Format (High-density, developer/analyst/engineering focused)
  if (selectedTemplate.previewLayout === 'tech-compact') {
    return (
      <div 
        id="resume-printable-area"
        className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto p-7 sm:p-9 shadow-2xl rounded-sm font-sans print:p-0 print:shadow-none ${baseTextSize}`}
        style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
      >
        <header className="border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-display">
              {data.fullName || 'Candidate Name'}
            </h1>
            {data.targetHeadline && (
              <span className={`text-xs font-mono font-bold ${accent.subheading}`}>
                // {data.targetHeadline}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-slate-600 font-mono text-[10.5px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.city && <span>• {data.city}</span>}
            {data.linkedinUrl && <span>• {data.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            {data.githubUrl && <span>• {data.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            {data.portfolioUrl && <span>• {data.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            {data.showCnic && data.cnic && <span>• CNIC: {data.cnic}</span>}
          </div>
        </header>

        {/* Technical Skills Header Grid */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5 flex items-center justify-between">
              <span>Technical Skills & Core Competencies</span>
              <span className="text-[9px] text-slate-400 font-normal">ATS-Indexed</span>
            </h2>
            <div className="p-2.5 rounded-sm bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800">
              <strong className="text-slate-950">Proficiencies: </strong>
              {data.skills.map((s) => s.name).join(' • ')}
            </div>
          </section>
        )}

        {/* Summary */}
        {data.professionalSummary && (
          <section className="mb-4">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
              Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify text-[11.5px]">
              {data.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
              Experience
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 text-xs">
                      {exp.designation} <span className="font-normal text-slate-600 font-sans">@ {exp.organization}</span>
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[11px] leading-snug">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
              Projects & Technical Architecture
            </h2>
            <div className="space-y-2.5">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="font-bold text-slate-950">
                      {proj.title}
                      {proj.role && <span className="text-slate-600 font-normal ml-1">({proj.role})</span>}
                    </span>
                    {proj.link && <span className="text-slate-500 text-[10px] underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                  </div>
                  {proj.techStack && (
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                      <span className="text-slate-400">Stack:</span> {proj.techStack}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[11px]">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5 font-mono text-[11px]">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-slate-950 font-bold">{edu.degreeTitle}</strong> — {edu.instituteOrBoard}
                  </div>
                  <div className="text-slate-600 text-[10px]">
                    {edu.passingYear} ({edu.percentageOrCgpa || edu.divisionOrGrade})
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[10.5px] text-slate-700">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  • <strong className="text-slate-900">{c.title}</strong> — {c.issuingAuthority} ({c.issueYear})
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Executive Template (Distinctive Two-Tone Layout)
  if (selectedTemplate.previewLayout === 'executive') {
    return (
      <div 
        id="resume-printable-area"
        className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto shadow-2xl rounded-sm font-sans flex flex-col md:flex-row print:p-0 print:shadow-none ${baseTextSize}`}
        style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
      >
        {/* Left Column Sidebar */}
        <aside className="w-full md:w-[280px] bg-slate-900 text-white p-6 sm:p-7 shrink-0 print:bg-slate-900">
          <div className="text-center md:text-left mb-6">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              {data.fullName || 'Candidate'}
            </h1>
            {data.targetHeadline && (
              <p className="text-emerald-400 text-xs font-semibold mt-1">
                {data.targetHeadline}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="mb-6 space-y-2 text-[11px] text-slate-300">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">
              Contact Info
            </h3>
            {data.phone && <div className="flex items-center gap-1.5"><Phone size={12} className="text-emerald-400" /> {data.phone}</div>}
            {data.email && <div className="flex items-center gap-1.5 break-all"><Mail size={12} className="text-emerald-400" /> {data.email}</div>}
            {(data.city || data.province) && <div className="flex items-center gap-1.5"><MapPin size={12} className="text-emerald-400" /> {data.city}, {data.province}</div>}
            {data.showCnic && data.cnic && <div>CNIC: {data.cnic}</div>}
            {data.showDomicile && data.domicileDistrict && <div>Domicile: {data.domicileDistrict}</div>}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">
                Core Skills
              </h3>
              <div className="space-y-1.5 text-[11px]">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center text-slate-300">
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-emerald-400">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-slate-700 pb-1 mb-2">
                Licenses & Diplomas
              </h3>
              <div className="space-y-2 text-[10.5px] text-slate-300">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-semibold text-white">{cert.title}</div>
                    <div className="text-slate-400 text-[10px]">{cert.issuingAuthority} ({cert.issueYear})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Body */}
        <main className="flex-1 p-6 sm:p-8">
          {/* Summary */}
          {data.professionalSummary && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Professional Profile
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">
                {data.professionalSummary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs">{exp.designation}</span>
                      <span className="text-slate-500 font-mono text-[10.5px]">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] font-medium">
                      {exp.organization} • {exp.location}
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[11px]">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Academic Background
              </h2>
              <div className="space-y-2.5">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {edu.degreeTitle} <span className="font-normal text-slate-500">({edu.degreeLevel})</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">
                        {edu.instituteOrBoard}
                      </div>
                    </div>
                    <div className="text-right shrink-0 text-[11px]">
                      <div className="font-bold text-slate-900">{edu.percentageOrCgpa || edu.divisionOrGrade}</div>
                      <div className="text-slate-500 font-mono text-[10px]">{edu.passingYear}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                References
              </h2>
              <div className="space-y-1 text-[11px] text-slate-700">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <span className="font-bold text-slate-900">{ref.name}</span> — {ref.organization || 'Available upon request'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Minimal Template (Classic Typography & High-Density)
  return (
    <div 
      id="resume-printable-area"
      className={`resume-printable bg-white text-slate-900 w-full max-w-[820px] mx-auto p-8 sm:p-10 shadow-2xl rounded-sm font-serif print:p-0 print:shadow-none ${baseTextSize}`}
      style={{ minHeight: '1050px', ...zoomStyle, borderTop: '5px solid ' + (RESUME_ACCENT_HEX[data.accentColor] || RESUME_ACCENT_HEX.emerald), fontFamily: selectedTemplate.fontFamily }}
    >
      <div className="text-center pb-4 mb-4 border-b border-slate-400">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-serif">
          {data.fullName || 'Candidate Name'}
        </h1>
        {data.targetHeadline && (
          <p className="text-xs font-semibold text-slate-700 mt-1 italic font-sans">
            {data.targetHeadline}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-slate-600 font-sans text-[11px]">
          {data.phone && <span>{data.phone}</span>}
          {data.email && <span>{data.email}</span>}
          {data.city && <span>{data.city}, {data.province || 'Pakistan'}</span>}
          {data.linkedinUrl && <span>{data.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {data.githubUrl && <span>{data.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {data.showCnic && data.cnic && <span>CNIC: {data.cnic}</span>}
        </div>
      </div>

      {data.professionalSummary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
            Summary
          </h2>
          <p className="text-slate-800 leading-relaxed text-justify">
            {data.professionalSummary}
          </p>
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-sans">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-950">{edu.degreeTitle}</span> — {edu.instituteOrBoard}
                </div>
                <span className="font-sans text-[10.5px] text-slate-600 font-bold">
                  {edu.passingYear} ({edu.percentageOrCgpa || edu.divisionOrGrade})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-sans">
            Experience
          </h2>
          <div className="space-y-2.5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-sans">
                  <span className="font-bold text-slate-950">{exp.designation}</span>
                  <span className="text-[10.5px] text-slate-600">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-[11px] text-slate-700 italic">{exp.organization}, {exp.location}</div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700 text-[11px] font-sans">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-sans">
            Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="font-sans text-[11px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-950">{proj.title}</span>
                  {proj.techStack && <span className="text-slate-500 font-mono text-[10px]">{proj.techStack}</span>}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
            Skills
          </h2>
          <div className="font-sans text-[11px] text-slate-800">
            {data.skills.map((s) => s.name).join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
};
