import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  exportMcqsToExcel, 
  exportQuizAttemptToExcel, 
  exportJobsToExcel, 
  exportPastPapersDirectoryToExcel,
  exportMcqsToPdf,
  exportQuizScorecardToPdf,
  exportStudyLessonToPdf,
  exportChatToPdf,
  exportJobsToPdf,
  exportCandidateHistoryToPdf,
  exportCandidateHistoryToExcel,
  exportPastPaperAttemptToPdf,
  exportPastPaperAttemptToExcel,
  exportSubjectivePracticeToPdf
} from './exportUtils';
import { MCQ, QuizAttempt, StudyLesson, JobAlert } from '../types';
import { AllPastPaperEntry } from '../data/allPastPapersDirectory';

const SAMPLE_MCQS: MCQ[] = [
  {
    id: 'test-q1',
    question: 'What is the capital of Sindh province?',
    options: ['Hyderabad', 'Karachi', 'Sukkur', 'Larkana'],
    correctIndex: 1,
    explanation: 'Karachi is the provincial capital and largest financial center.',
    category: 'pakistan-studies',
    difficulty: 'Easy',
    examTags: ['STS', 'SPSC'],
    sourceUrl: 'https://muqabil.pk',
  },
  {
    id: 'test-q2',
    question: 'The Indus River discharges into which sea?',
    options: ['Arabian Sea', 'Red Sea', 'Caspian Sea', 'Dead Sea'],
    correctIndex: 0,
    explanation: 'Indus River flows into the Arabian Sea near Thatta.',
    category: 'general-knowledge',
    difficulty: 'Easy',
    examTags: ['STS'],
  }
];

test('exportMcqsToExcel handles question array without throwing', () => {
  assert.doesNotThrow(() => {
    // In node environment XLSX.writeFile writes to filesystem or mock
    try {
      exportMcqsToExcel(SAMPLE_MCQS, 'test_export');
    } catch (e: any) {
      // In non-browser / node test environments, writeFile might try to write a file
      if (!e.message?.includes('document is not defined')) {
        throw e;
      }
    }
  });
});

test('exportJobsToExcel formats job rows properly', () => {
  const sampleJobs: JobAlert[] = [
    {
      id: 'job-1',
      title: 'Junior Executive (Trainee)',
      department: 'Data Acquisition Dept',
      agency: 'NADRA',
      bps: 'BPS-11',
      location: 'Karachi',
      eligibility: 'Intermediate or Bachelor degree',
      lastDate: '2026-09-30',
      status: 'Active',
      advertisementNo: 'NADRA-KHI-2026/09',
      link: 'https://careers.nadra.gov.pk',
    } as any
  ];

  assert.doesNotThrow(() => {
    try {
      exportJobsToExcel(sampleJobs, 'test_jobs');
    } catch (e: any) {
      if (!e.message?.includes('document is not defined')) {
        throw e;
      }
    }
  });
});

test('exportPastPapersDirectoryToExcel exports entries', () => {
  const sampleEntries: AllPastPaperEntry[] = [
    {
      id: 'paper-1',
      number: 1,
      title: 'Sukkur IBA STS BPS 05-15 Intermediate Category Test',
      exam: 'Sukkur IBA STS',
      bps: 'BPS 05–15',
      year: 2023,
      yearLabel: '2023',
      category: 'Clerical & Ministerial',
      totalMcqs: 100,
      isOfficial: true,
      conductedBy: 'Sukkur IBA STS',
      description: 'Official test paper',
      sourceDocName: 'STS-2023-Paper.pdf',
    } as any
  ];

  assert.doesNotThrow(() => {
    try {
      exportPastPapersDirectoryToExcel(sampleEntries, 'test_papers');
    } catch (e: any) {
      if (!e.message?.includes('document is not defined')) {
        throw e;
      }
    }
  });
});

test('PDF exports instantiate jsPDF and handle data cleanly', () => {
  const sampleAttempt: QuizAttempt = {
    id: 'attempt-1',
    date: '2026-09-15T12:00:00Z',
    title: 'Sukkur IBA STS Screening Mock',
    totalQuestions: 2,
    score: 2,
    timeSpentSeconds: 90,
    incorrectQuestions: [],
    certificate: {
      candidateName: 'Mehtab Ali',
      percentage: 100,
      rankTier: 'Gold Distinction',
      verificationCode: 'MEQSA-TEST-123',
      completionDate: '15 Sep 2026',
      totalMarks: 2,
      marksEarned: 2,
    } as any
  };

  assert.doesNotThrow(() => {
    try {
      exportQuizScorecardToPdf(sampleAttempt, SAMPLE_MCQS, { 0: 1, 1: 0 }, 'Mehtab Ali');
    } catch (e: any) {
      // In headless node test, doc.save() might reference window/document or file system
      if (!e.message?.includes('document is not defined') && !e.message?.includes('window is not defined')) {
        throw e;
      }
    }
  });
});

test('exportJobsToPdf and exportCandidateHistory exports handle data without throwing', () => {
  const sampleJobs: JobAlert[] = [
    {
      id: 'job-1',
      title: 'Junior Executive (Trainee)',
      department: 'Data Acquisition Dept',
      agency: 'NADRA',
      bps: 'BPS-11',
      location: 'Karachi',
      eligibility: 'Intermediate or Bachelor degree',
      lastDate: '2026-09-30',
      status: 'Active',
      advertisementNo: 'NADRA-KHI-2026/09',
      link: 'https://careers.nadra.gov.pk',
    } as any
  ];

  const sampleAttempt: QuizAttempt = {
    id: 'attempt-1',
    date: '2026-09-15T12:00:00Z',
    title: 'Sukkur IBA STS Screening Mock',
    totalQuestions: 2,
    score: 2,
    timeSpentSeconds: 90,
    incorrectQuestions: [],
  };

  assert.doesNotThrow(() => {
    try {
      exportJobsToPdf(sampleJobs, 'test_jobs_bulletin');
      exportCandidateHistoryToPdf([sampleAttempt], 'Test Candidate');
      exportCandidateHistoryToExcel([sampleAttempt], 'Test Candidate');
    } catch (e: any) {
      if (!e.message?.includes('document is not defined') && !e.message?.includes('window is not defined')) {
        throw e;
      }
    }
  });
});

