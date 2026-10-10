import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { MCQ, QuizAttempt, StudyLesson, PastPaper, JobAlert } from '../types';
import { AllPastPaperEntry } from '../data/allPastPapersDirectory';
import { TeachingLicenseSubjectiveQuestion } from '../data/teachingLicenseSubjectiveData';

export interface McqPdfExportOptions {
  title?: string;
  subtitle?: string;
  candidateName?: string;
  rollNumber?: string;
  includeAnswers?: boolean;
  includeExplanations?: boolean;
  includeOmrSheet?: boolean;
  subject?: string;
  examService?: string;
}

/**
 * Cleanly format text for PDF to avoid character encoding issues
 */
function sanitizeForPdf(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

/**
 * 1. EXPORT MCQs TO EXCEL (.xlsx)
 * Generates structured, professional spreadsheet with all question details
 */
export function exportMcqsToExcel(
  mcqs: MCQ[],
  filenamePrefix: string = 'MUQABIL_MCQs_Bank',
  metadata?: { subject?: string; filterName?: string }
): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  // Prepare structured rows
  const rows = mcqs.map((m, index) => {
    const correctLetter = String.fromCharCode(65 + m.correctIndex);
    const correctText = m.options[m.correctIndex] || '';

    return {
      'Q#': index + 1,
      'Question Text': m.question,
      'Option A': m.options[0] || '',
      'Option B': m.options[1] || '',
      'Option C': m.options[2] || '',
      'Option D': m.options[3] || '',
      'Option E': m.options[4] || '',
      'Correct Option': correctLetter,
      'Correct Answer': correctText,
      'Explanation / Notes': m.explanation || '',
      'Subject / Category': m.category || '',
      'Subtopic': m.subtopic || '',
      'Difficulty Level': m.difficulty || 'Medium',
      'Testing Body / Commission': (m.examTags || []).join(', ') || 'STS / General',
      'Source / Provenance': m.sourceUrl || m.submittedBy || 'MUQABIL Curated Bank',
      'Question ID': m.id,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths for readability in Microsoft Excel & Google Sheets
  worksheet['!cols'] = [
    { wch: 6 },   // Q#
    { wch: 55 },  // Question Text
    { wch: 25 },  // Option A
    { wch: 25 },  // Option B
    { wch: 25 },  // Option C
    { wch: 25 },  // Option D
    { wch: 20 },  // Option E
    { wch: 14 },  // Correct Option
    { wch: 28 },  // Correct Answer
    { wch: 45 },  // Explanation
    { wch: 20 },  // Subject
    { wch: 20 },  // Subtopic
    { wch: 14 },  // Difficulty
    { wch: 25 },  // Testing Body
    { wch: 30 },  // Source
    { wch: 18 },  // ID
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MCQ Question Bank');

  // Add Metadata / Overview sheet
  const metaRows = [
    { Parameter: 'Portal', Value: 'MUQABIL (muqabil.pk) — Har Test Mein Sab Se Agay' },
    { Parameter: 'Export Date', Value: new Date().toLocaleString() },
    { Parameter: 'Subject / Filter', Value: metadata?.subject || metadata?.filterName || 'All Subjects' },
    { Parameter: 'Total Questions', Value: mcqs.length },
    { Parameter: 'Format', Value: 'Standard Competitive Examination MCQs (FPSC, SPSC, STS IBA, PPSC)' },
    { Parameter: 'Official Website', Value: 'https://muqabil.pk' },
  ];
  const metaSheet = XLSX.utils.json_to_sheet(metaRows);
  metaSheet['!cols'] = [{ wch: 22 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(workbook, metaSheet, 'Overview & Info');

  XLSX.writeFile(workbook, filename);
}

/**
 * 2. EXPORT QUIZ ATTEMPT & SCORECARD TO EXCEL (.xlsx)
 */
export function exportQuizAttemptToExcel(
  attempt: QuizAttempt,
  questions: MCQ[],
  userAnswers: Record<number, number>,
  candidateName: string = 'Candidate'
): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `MUQABIL_Scorecard_${attempt.title.replace(/\s+/g, '_')}_${dateStr}.xlsx`;

  const minutes = Math.floor(attempt.timeSpentSeconds / 60);
  const seconds = attempt.timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;
  const accuracy = Math.round((attempt.score / (Object.keys(userAnswers).length || 1)) * 100);

  // Sheet 1: Summary Report
  const summaryRows = [
    { Field: 'Candidate Name', Value: candidateName },
    { Field: 'Test / Mock Title', Value: attempt.title },
    { Field: 'Completion Date & Time', Value: new Date(attempt.date).toLocaleString() },
    { Field: 'Total Questions', Value: attempt.totalQuestions },
    { Field: 'Questions Attempted', Value: Object.keys(userAnswers).length },
    { Field: 'Correct Answers', Value: attempt.score },
    { Field: 'Incorrect Answers', Value: attempt.incorrectQuestions.length },
    { Field: 'Unanswered / Skipped', Value: attempt.totalQuestions - Object.keys(userAnswers).length },
    { Field: 'Final Marks Obtained', Value: `${attempt.score} / ${attempt.totalQuestions}` },
    { Field: 'Accuracy Rate', Value: `${accuracy}%` },
    { Field: 'Time Spent', Value: timeFormatted },
    { Field: 'Performance Tier', Value: attempt.certificate?.rankTier || 'National Merit Participant' },
    { Field: 'Verification Code', Value: attempt.certificate?.verificationCode || 'MEQSA-SCORE-2026' },
    { Field: 'Platform', Value: 'MUQABIL (muqabil.pk)' },
  ];

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{ wch: 25 }, { wch: 50 }];

  // Sheet 2: Item by Item Detailed Analysis
  const itemRows = questions.map((q, idx) => {
    const userPickIndex = userAnswers[idx];
    const isAnswered = userPickIndex !== undefined;
    const isCorrect = isAnswered && userPickIndex === q.correctIndex;
    const userPickLetter = isAnswered ? String.fromCharCode(65 + userPickIndex) : 'Skipped';
    const userPickText = isAnswered ? (q.options[userPickIndex] || '') : 'None';
    const correctLetter = String.fromCharCode(65 + q.correctIndex);
    const correctText = q.options[q.correctIndex] || '';

    return {
      'Q#': idx + 1,
      'Question': q.question,
      'Your Selection': `${userPickLetter}: ${userPickText}`,
      'Correct Answer': `${correctLetter}: ${correctText}`,
      'Result': !isAnswered ? 'SKIPPED' : isCorrect ? 'CORRECT (+1)' : 'WRONG (0)',
      'Subject': q.category,
      'Explanation': q.explanation || '',
    };
  });

  const itemsSheet = XLSX.utils.json_to_sheet(itemRows);
  itemsSheet['!cols'] = [
    { wch: 6 },
    { wch: 50 },
    { wch: 25 },
    { wch: 25 },
    { wch: 15 },
    { wch: 18 },
    { wch: 45 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Scorecard Summary');
  XLSX.utils.book_append_sheet(workbook, itemsSheet, 'Question Analysis');

  XLSX.writeFile(workbook, filename);
}

/**
 * 3. EXPORT JOBS DIRECTORY TO EXCEL (.xlsx)
 */
export function exportJobsToExcel(jobs: JobAlert[], filenamePrefix: string = 'MUQABIL_Govt_Jobs_Pakistan'): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  const rows = jobs.map((j, i) => ({
    'Sr#': i + 1,
    'Job Title': j.title,
    'Department / Ministry': j.department,
    'Agency / Organization': j.agency,
    'BPS / Scale': j.bps,
    'Location / Province': j.location,
    'Eligibility & Qualifications': j.eligibility,
    'Application Deadline': j.lastDate,
    'Status': j.status,
    'Advertisement No.': j.advertisementNo,
    'Official Source Link': (j as any).link || j.applyUrl || j.sourceUrl || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 32 },
    { wch: 30 },
    { wch: 25 },
    { wch: 12 },
    { wch: 20 },
    { wch: 45 },
    { wch: 18 },
    { wch: 12 },
    { wch: 22 },
    { wch: 40 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Open Vacancies');
  XLSX.writeFile(workbook, filename);
}

/**
 * 4. EXPORT ALL PAST PAPERS DIRECTORY TO EXCEL (.xlsx)
 */
export function exportPastPapersDirectoryToExcel(
  papers: AllPastPaperEntry[],
  filenamePrefix: string = 'MUQABIL_Past_Papers_Index'
): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  const rows = papers.map((p, i) => ({
    'Sr#': i + 1,
    'Paper Title': p.title,
    'Testing Body / Commission': p.exam,
    'Year': p.yearLabel || '',
    'Subject Category': p.category,
    'Total MCQs': p.sampleQuestionsCount || 100,
    'Paper Classification': p.hasPdfDownload ? 'Official Past Paper' : 'Syllabus Aligned Practice',
    'Paper ID': p.id,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 45 },
    { wch: 22 },
    { wch: 10 },
    { wch: 22 },
    { wch: 14 },
    { wch: 25 },
    { wch: 24 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Past Papers Directory');
  XLSX.writeFile(workbook, filename);
}

/**
 * 5. HIGH-QUALITY PROGRAMMATIC PDF GENERATOR FOR MCQs QUESTION BOOKLETS
 * Uses jsPDF with professional typography, header banners, watermarks, question numbering, and answer key.
 */
export function exportMcqsToPdf(
  mcqs: MCQ[],
  options: McqPdfExportOptions = {}
): void {
  const {
    title = 'Competitive Examination Practice Paper',
    subtitle = 'Sukkur IBA STS BPS 05–15, SPSC CCE, FPSC & Provincial Screening',
    candidateName,
    rollNumber,
    includeAnswers = false,
    includeExplanations = false,
    includeOmrSheet = true,
    subject = 'General Knowledge & Subject Test',
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const drawHeader = (pageNumber: number, totalPagesEst?: number) => {
    // Top Brand Strip
    doc.setFillColor(4, 120, 87); // Emerald 700
    doc.rect(margin, y, contentWidth, 18, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('MUQABIL (مقابل) — muqabil.pk', margin + 4, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text("Pakistan's Premier Competitive Examination Portal • Har Test Mein Sab Se Agay", margin + 4, y + 13);

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setFontSize(8);
    doc.text(`Date: ${dateStr}`, pageWidth - margin - 4, y + 7, { align: 'right' });
    doc.text(`Page ${pageNumber}`, pageWidth - margin - 4, y + 13, { align: 'right' });

    y += 22;
  };

  const drawFooter = (pageNumber: number) => {
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('MUQABIL (muqabil.pk) • For interactive mock tests & AI mentoring, visit https://muqabil.pk', margin, pageHeight - 6);
    doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  let currentPage = 1;
  drawHeader(currentPage);

  // Document Title & Metadata Box
  doc.setDrawColor(16, 185, 129);
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(sanitizeForPdf(title), margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`${sanitizeForPdf(subtitle)} • Subject: ${sanitizeForPdf(subject)}`, margin + 4, y + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(4, 120, 87);
  doc.text(`Total Questions: ${mcqs.length} • Max Time: ${Math.max(15, mcqs.length)} Minutes • Negative Marking: 0.25 (If standard)`, margin + 4, y + 16);

  y += 24;

  // Candidate particulars box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentWidth, 12, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Candidate Name: ${candidateName || '___________________________'}`, margin + 3, y + 7);
  doc.text(`Roll / CNIC No: ${rollNumber || '___________________________'}`, margin + (contentWidth / 2), y + 7);
  doc.text('Sign: ______________', pageWidth - margin - 4, y + 7, { align: 'right' });

  y += 16;

  // Instructions
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Instructions: Read each question carefully. Choose the single most appropriate option (A, B, C, or D).', margin, y);
  y += 6;

  // Render MCQs
  mcqs.forEach((mcq, idx) => {
    // Check if new page needed
    if (y > pageHeight - 35) {
      drawFooter(currentPage);
      doc.addPage();
      currentPage += 1;
      y = margin;
      drawHeader(currentPage);
    }

    const qNum = `${idx + 1}.`;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);

    const questionLines = doc.splitTextToSize(`${qNum} ${sanitizeForPdf(mcq.question)}`, contentWidth - 4);
    doc.text(questionLines, margin + 2, y);
    y += questionLines.length * 4.5 + 2;

    // Render Options (Two columns or 4 rows)
    const options = mcq.options.slice(0, 4);
    const colWidth = (contentWidth - 6) / 2;

    options.forEach((opt, optIdx) => {
      const letter = String.fromCharCode(65 + optIdx);
      const isCorrect = includeAnswers && optIdx === mcq.correctIndex;

      const col = optIdx % 2;
      const optX = margin + 4 + col * colWidth;
      const optY = y + Math.floor(optIdx / 2) * 4.8;

      if (isCorrect) {
        doc.setFillColor(220, 252, 231);
        doc.roundedRect(optX - 1.5, optY - 3.2, colWidth - 2, 4.2, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(4, 120, 87);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
      }

      doc.setFontSize(8);
      const optText = doc.splitTextToSize(`(${letter}) ${sanitizeForPdf(opt)}`, colWidth - 4);
      doc.text(optText[0] || '', optX, optY);
    });

    y += 12;

    // Optional inline explanation if includeExplanations is true
    if (includeExplanations && mcq.explanation) {
      if (y > pageHeight - 25) {
        drawFooter(currentPage);
        doc.addPage();
        currentPage += 1;
        y = margin;
        drawHeader(currentPage);
      }

      doc.setFillColor(241, 245, 249);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      const expLines = doc.splitTextToSize(`Note: ${sanitizeForPdf(mcq.explanation)}`, contentWidth - 6);
      doc.roundedRect(margin + 2, y - 3, contentWidth - 4, expLines.length * 3.8 + 2, 1, 1, 'F');
      doc.text(expLines, margin + 4, y);
      y += expLines.length * 3.8 + 5;
    } else {
      y += 2;
    }

    // Divider line between questions
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(margin + 2, y - 1, pageWidth - margin - 2, y - 1);
  });

  // Appendix: Official Answer Key Table at end if includeAnswers is true or separate key
  if (includeAnswers || includeOmrSheet) {
    drawFooter(currentPage);
    doc.addPage();
    currentPage += 1;
    y = margin;
    drawHeader(currentPage);

    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('OFFICIAL ANSWER KEY & OMR EVALUATION GRID', margin + 4, y + 5.5);
    y += 13;

    // Grid of answers (5 columns of 20 or scaled)
    const itemsPerCol = 25;
    const numCols = Math.ceil(mcqs.length / itemsPerCol);
    const gridColWidth = contentWidth / Math.max(1, numCols);

    for (let col = 0; col < numCols; col++) {
      const colStartX = margin + col * gridColWidth;
      for (let row = 0; row < itemsPerCol; row++) {
        const itemIdx = col * itemsPerCol + row;
        if (itemIdx >= mcqs.length) break;

        const mcq = mcqs[itemIdx];
        const keyLetter = String.fromCharCode(65 + mcq.correctIndex);
        const itemY = y + row * 6;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text(`${itemIdx + 1}.`, colStartX + 2, itemY);

        if (includeAnswers) {
          doc.setFillColor(16, 185, 129);
          doc.circle(colStartX + 14, itemY - 1.2, 2.2, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(7.5);
          doc.text(keyLetter, colStartX + 14, itemY - 0.2, { align: 'center' });
        } else {
          // Empty bubble for student self-testing
          ['A', 'B', 'C', 'D'].forEach((l, bIdx) => {
            const bx = colStartX + 10 + bIdx * 6;
            doc.setDrawColor(148, 163, 184);
            doc.circle(bx, itemY - 1.2, 2.2, 'D');
            doc.setTextColor(100, 116, 139);
            doc.setFontSize(6);
            doc.text(l, bx, itemY - 0.3, { align: 'center' });
          });
        }
      }
    }
  }

  drawFooter(currentPage);

  // Save the PDF
  const cleanTitle = (options.title || 'MUQABIL_Question_Paper').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${cleanTitle}.pdf`);
}

/**
 * 6. EXPORT QUIZ SCORECARD RESULT TO PDF
 */
export function exportQuizScorecardToPdf(
  attempt: QuizAttempt,
  questions: MCQ[],
  userAnswers: Record<number, number>,
  candidateName: string = 'Candidate'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(margin, y, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MUQABIL (مقابل) — OFFICIAL EXAMINATION SCORECARD', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text("Sukkur IBA STS Screening, SPSC CCE & FPSC Competitive Testing Portal", margin + 6, y + 14);

  const dateStr = new Date(attempt.date).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  doc.setFontSize(8);
  doc.text(`Exam Date: ${dateStr}`, pageWidth - margin - 6, y + 8, { align: 'right' });
  doc.text(`Code: ${attempt.certificate?.verificationCode || 'MEQSA-SCORE-2026'}`, pageWidth - margin - 6, y + 14, { align: 'right' });

  y += 28;

  // Candidate & Test Details Card
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Test Name: ${sanitizeForPdf(attempt.title)}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Candidate Name: ${sanitizeForPdf(candidateName)}`, margin + 4, y + 12);
  doc.text(`Rank Tier: ${attempt.certificate?.rankTier || 'National Merit Participant'}`, margin + 4, y + 18);

  const mins = Math.floor(attempt.timeSpentSeconds / 60);
  const secs = attempt.timeSpentSeconds % 60;
  doc.text(`Time Spent: ${mins}m ${secs}s`, margin + (contentWidth / 2), y + 12);
  const answeredCount = Object.keys(userAnswers).length;
  doc.text(`Questions Attempted: ${answeredCount} / ${attempt.totalQuestions}`, margin + (contentWidth / 2), y + 18);

  y += 32;

  // Score Highlight Banner
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const passed = percentage >= 50;

  doc.setFillColor(passed ? 4 : 185, passed ? 120 : 28, passed ? 87 : 28); // Emerald or Crimson
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(`${attempt.score} / ${attempt.totalQuestions} MARKS`, margin + 8, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Percentage: ${percentage}% • Status: ${passed ? 'QUALIFIED (Passed)' : 'NEEDS PRACTICE'}`, margin + 8, y + 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(attempt.certificate?.rankTier || '', pageWidth - margin - 8, y + 13, { align: 'right' });

  y += 28;

  // Breakdown Summary Table
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SECTION / METRIC', margin + 3, y + 4.5);
  doc.text('TOTAL QUESTIONS', margin + 60, y + 4.5);
  doc.text('CORRECT', margin + 100, y + 4.5);
  doc.text('INCORRECT', margin + 130, y + 4.5);
  doc.text('ACCURACY', pageWidth - margin - 4, y + 4.5, { align: 'right' });

  y += 8;

  const accuracyVal = answeredCount > 0 ? Math.round((attempt.score / answeredCount) * 100) : 0;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Overall Test Aggregate', margin + 3, y + 4);
  doc.text(String(attempt.totalQuestions), margin + 60, y + 4);
  doc.text(String(attempt.score), margin + 100, y + 4);
  doc.text(String(attempt.incorrectQuestions.length), margin + 130, y + 4);
  doc.text(`${accuracyVal}%`, pageWidth - margin - 4, y + 4, { align: 'right' });

  y += 10;

  // Question Analysis Section
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('QUESTION-BY-QUESTION ATTEMPT LOG & EXPLANATIONS', margin, y);
  y += 6;

  questions.forEach((q, idx) => {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = margin;
    }

    const userPick = userAnswers[idx];
    const isAnswered = userPick !== undefined;
    const isCorrect = isAnswered && userPick === q.correctIndex;

    const userLetter = isAnswered ? String.fromCharCode(65 + userPick) : 'Skipped';
    const correctLetter = String.fromCharCode(65 + q.correctIndex);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(isCorrect ? 4 : isAnswered ? 185 : 100, isCorrect ? 120 : isAnswered ? 28 : 116, isCorrect ? 87 : isAnswered ? 28 : 139);

    const statusBadge = isCorrect ? '✓ CORRECT' : isAnswered ? '✗ WRONG' : '○ SKIPPED';
    doc.text(`Q${idx + 1}. [${statusBadge}]`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const qText = doc.splitTextToSize(sanitizeForPdf(q.question), contentWidth - 45);
    doc.text(qText, margin + 32, y);

    y += Math.max(qText.length * 4, 4);

    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Your Answer: ${userLetter} | Correct: ${correctLetter} (${sanitizeForPdf(q.options[q.correctIndex] || '')})`, margin + 32, y);

    y += 5;
  });

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('MUQABIL Scorecard System • Verified automatically at https://muqabil.pk', margin, pageHeight - 6);

  doc.save(`MUQABIL_Scorecard_${attempt.title.replace(/\s+/g, '_')}.pdf`);
}

/**
 * 7. EXPORT STUDY LESSON TO PDF
 */
export function exportStudyLessonToPdf(lesson: StudyLesson): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(4, 120, 87);
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('MUQABIL (مقابل) — High-Yield Revision Study Notes', margin + 4, y + 7);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Sukkur IBA STS BPS 05–15, STEDA Teaching License, SPSC CCE & FPSC', margin + 4, y + 13);
  y += 24;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize(sanitizeForPdf(lesson.title), contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 5 + 4;

  // Read Time & Audience
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Read Time: ${lesson.readTime} • Level: ${lesson.audience === 'kids' ? 'Foundation / School' : 'Competitive Exam Candidate'}`, margin, y);
  y += 7;

  // Explanation / Content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  const expLines = doc.splitTextToSize(sanitizeForPdf(lesson.explanation), contentWidth);
  doc.text(expLines, margin, y);
  y += expLines.length * 4.5 + 6;

  // Important Points
  if (lesson.importantPoints?.length) {
    if (y > pageHeight - 35) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(4, 120, 87);
    doc.text('KEY POINTS & REVISION SUMMARY', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    lesson.importantPoints.forEach(point => {
      if (y > pageHeight - 20) { doc.addPage(); y = margin; }
      const pLines = doc.splitTextToSize(`• ${sanitizeForPdf(point)}`, contentWidth - 4);
      doc.text(pLines, margin + 2, y);
      y += pLines.length * 4.2;
    });
    y += 4;
  }

  // Formulas
  if (lesson.formulas?.length) {
    if (y > pageHeight - 35) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('IMPORTANT FORMULAS & SHORTCUTS', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    lesson.formulas.forEach(form => {
      if (y > pageHeight - 20) { doc.addPage(); y = margin; }
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(margin, y - 3, contentWidth, 6, 1, 1, 'F');
      doc.text(sanitizeForPdf(form), margin + 4, y + 1);
      y += 8;
    });
  }

  // MCQs if attached
  if (lesson.mcqs?.length) {
    if (y > pageHeight - 35) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(4, 120, 87);
    doc.text('LESSON PRACTICE MCQS & ANSWERS', margin, y);
    y += 6;

    lesson.mcqs.forEach((q, i) => {
      if (y > pageHeight - 30) { doc.addPage(); y = margin; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const qLines = doc.splitTextToSize(`${i + 1}. ${sanitizeForPdf(q.question)}`, contentWidth);
      doc.text(qLines, margin, y);
      y += qLines.length * 4 + 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      q.options.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        const isCorrect = oIdx === q.correctIndex;
        doc.setTextColor(isCorrect ? 4 : 51, isCorrect ? 120 : 65, isCorrect ? 87 : 85);
        doc.text(`   (${letter}) ${sanitizeForPdf(opt)} ${isCorrect ? ' [Correct]' : ''}`, margin + 2, y);
        y += 4;
      });
      y += 2;
    });
  }

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('MUQABIL Revision Series • Study online at https://muqabil.pk', margin, pageHeight - 6);

  const cleanName = lesson.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`MUQABIL_Notes_${cleanName}.pdf`);
}

/**
 * 8. EXPORT AI CHAT MENTOR TRANSCRIPT AS PDF STUDY GUIDE
 */
export function exportChatToPdf(
  messages: Array<{ role: string; content: string; timestamp?: number; model?: string }>,
  mentorRoleName: string = 'Gemini Exam Mentor'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(88, 28, 135); // Purple 900
  doc.rect(margin, y, contentWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`MUQABIL (مقابل) — AI Study Mentoring Guide`, margin + 4, y + 8);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mentor: ${sanitizeForPdf(mentorRoleName)} • Generated from live study session`, margin + 4, y + 14);

  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 4, y + 8, { align: 'right' });
  doc.text(`muqabil.pk`, pageWidth - margin - 4, y + 14, { align: 'right' });

  y += 26;

  messages.forEach((msg) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = margin;
    }

    const isUser = msg.role === 'user';
    const cleanContent = sanitizeForPdf(
      msg.content
        .replace(/<<<NAVIGATE:[\s\S]*?>>>/g, '')
        .replace(/<<<QUIZ_MCQ:[\s\S]*?>>>/g, '')
        .replace(/[#*`~]/g, '')
    );

    // Sender Label Box
    doc.setFillColor(isUser ? 241 : 243, isUser ? 245 : 232, isUser ? 249 : 255);
    doc.roundedRect(margin, y, contentWidth, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(isUser ? 15 : 109, isUser ? 23 : 40, isUser ? 42 : 217);
    doc.text(isUser ? 'Candidate / Question:' : `AI Mentor (${sanitizeForPdf(msg.model || mentorRoleName)}):`, margin + 3, y + 5);
    y += 10;

    // Body text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const lines = doc.splitTextToSize(cleanContent, contentWidth - 4);
    
    for (let i = 0; i < lines.length; i++) {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines[i], margin + 2, y);
      y += 4.5;
    }

    y += 6;
  });

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('MUQABIL AI Study Assistant • Visit https://muqabil.pk for interactive guidance', margin, pageHeight - 6);

  doc.save(`MUQABIL_AI_Study_Guide_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * 9. EXPORT JOBS BULLETIN TO PDF
 * Generates an official, publication-quality Pakistan Government Vacancies Bulletin
 */
export function exportJobsToPdf(
  jobs: JobAlert[],
  filenamePrefix: string = 'MUQABIL_Govt_Jobs_Pakistan'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  let currentPage = 1;

  const drawHeader = (pageNum: number) => {
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(margin, y, contentWidth, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('MUQABIL (مقابل) — OFFICIAL PAKISTAN JOBS BULLETIN', margin + 4, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text('Federal & Provincial Open Vacancies (BPS 05–19) • Verified Direct Application Directory', margin + 4, y + 14);

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`Issue Date: ${dateStr}`, pageWidth - margin - 4, y + 8, { align: 'right' });
    doc.text(`Page ${pageNum}`, pageWidth - margin - 4, y + 14, { align: 'right' });

    y += 24;
  };

  const drawFooter = (pageNum: number) => {
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('MUQABIL (muqabil.pk) • Apply directly at official portal links listed. All postings checked.', margin, pageHeight - 6);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  drawHeader(currentPage);

  // Summary box
  doc.setDrawColor(16, 185, 129);
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`Active Verified Openings: ${jobs.length} Positions`, margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('Organizations: FPSC, SPSC, PPSC, Sukkur IBA STS, NADRA, Universities, & Autonomous Bodies', margin + 4, y + 10.5);
  y += 18;

  // Render Job Cards
  jobs.forEach((job, idx) => {
    if (y > pageHeight - 38) {
      drawFooter(currentPage);
      doc.addPage();
      currentPage += 1;
      y = margin;
      drawHeader(currentPage);
    }

    // Card container
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'FD');

    // Title & Scale
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}. ${sanitizeForPdf(job.title)}`, margin + 3, y + 5);

    doc.setFillColor(4, 120, 87);
    doc.roundedRect(pageWidth - margin - 22, y + 1.5, 19, 5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text(sanitizeForPdf(job.bps), pageWidth - margin - 12.5, y + 5, { align: 'center' });

    // Ministry / Agency & Location
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(`Agency: ${sanitizeForPdf(job.agency)} • Dept: ${sanitizeForPdf(job.department)} • ${sanitizeForPdf(job.location)}`, margin + 3, y + 10);

    // Eligibility & Deadline
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const eligText = doc.splitTextToSize(`Req: ${sanitizeForPdf(job.eligibility)}`, contentWidth - 48);
    doc.text(eligText[0] || '', margin + 3, y + 15);

    // Deadline pill
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(185, 28, 28);
    doc.text(`Last Date: ${sanitizeForPdf(job.lastDate)}`, pageWidth - margin - 3, y + 15, { align: 'right' });

    // Official portal note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Ref: ${sanitizeForPdf(job.advertisementNo || 'Official Advert')} | Direct: ${sanitizeForPdf((job as any).link || job.applyUrl || job.sourceUrl || '')}`, margin + 3, y + 19.5);

    y += 25;
  });

  drawFooter(currentPage);
  const dateStr = new Date().toISOString().split('T')[0];
  doc.save(`${filenamePrefix}_${dateStr}.pdf`);
}

/**
 * 10. EXPORT CANDIDATE PRACTICE HISTORY & TRANSCRIPT TO PDF
 */
export function exportCandidateHistoryToPdf(
  attempts: QuizAttempt[],
  candidateName: string = 'Candidate'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  let currentPage = 1;

  const drawHeader = (pageNum: number) => {
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(margin, y, contentWidth, 22, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('MUQABIL (مقابل) — OFFICIAL CANDIDATE PERFORMANCE TRANSCRIPT', margin + 4, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text('Cumulative Mock Examination Records • Sukkur IBA STS, SPSC, FPSC Prep Portal', margin + 4, y + 14);

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setTextColor(255, 255, 255);
    doc.text(`Issued: ${dateStr}`, pageWidth - margin - 4, y + 8, { align: 'right' });
    doc.text(`Page ${pageNum}`, pageWidth - margin - 4, y + 14, { align: 'right' });

    y += 26;
  };

  const drawFooter = (pageNum: number) => {
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('MUQABIL Official Record • Personal study progression record verified at https://muqabil.pk', margin, pageHeight - 6);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  drawHeader(currentPage);

  // Calculate aggregates
  const totalQuestions = attempts.reduce((sum, item) => sum + item.totalQuestions, 0);
  const totalScore = attempts.reduce((sum, item) => sum + item.score, 0);
  const totalSeconds = attempts.reduce((sum, item) => sum + item.timeSpentSeconds, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
  const totalHours = (totalSeconds / 3600).toFixed(1);

  // Candidate particulars banner
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Candidate Name: ${sanitizeForPdf(candidateName)}`, margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`Total Tests Completed: ${attempts.length} Exam Sessions`, margin + 4, y + 12);
  doc.text(`Total Questions Answered: ${totalQuestions.toLocaleString()}`, margin + 4, y + 17);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(4, 120, 87);
  doc.text(`Overall Aggregate Accuracy: ${avgAccuracy}%`, margin + (contentWidth / 2), y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`Total Practice Time: ${totalHours} Hours (${Math.round(totalSeconds / 60)} Mins)`, margin + (contentWidth / 2), y + 12);
  doc.text(`Portal Status: Active Registered Aspirant`, margin + (contentWidth / 2), y + 17);

  y += 24;

  // Table Header
  doc.setFillColor(4, 120, 87);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('SR#', margin + 2, y + 4.5);
  doc.text('TEST / MOCK EXAMINATION TITLE', margin + 12, y + 4.5);
  doc.text('DATE', margin + 92, y + 4.5);
  doc.text('SCORE', margin + 120, y + 4.5);
  doc.text('%', margin + 138, y + 4.5);
  doc.text('TIME', margin + 148, y + 4.5);
  doc.text('TIER / CREDENTIAL', pageWidth - margin - 2, y + 4.5, { align: 'right' });
  y += 8;

  // Table Rows
  attempts.forEach((item, idx) => {
    if (y > pageHeight - 20) {
      drawFooter(currentPage);
      doc.addPage();
      currentPage += 1;
      y = margin;
      drawHeader(currentPage);

      // Re-draw table header
      doc.setFillColor(4, 120, 87);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text('SR#', margin + 2, y + 4.5);
      doc.text('TEST / MOCK EXAMINATION TITLE', margin + 12, y + 4.5);
      doc.text('DATE', margin + 92, y + 4.5);
      doc.text('SCORE', margin + 120, y + 4.5);
      doc.text('%', margin + 138, y + 4.5);
      doc.text('TIME', margin + 148, y + 4.5);
      doc.text('TIER / CREDENTIAL', pageWidth - margin - 2, y + 4.5, { align: 'right' });
      y += 8;
    }

    const pct = item.totalQuestions > 0 ? Math.round((item.score / item.totalQuestions) * 100) : 0;
    const mins = Math.floor(item.timeSpentSeconds / 60);
    const secs = item.timeSpentSeconds % 60;
    const dateFormatted = new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y - 1, contentWidth, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(String(idx + 1), margin + 2, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.text(sanitizeForPdf(item.title).slice(0, 48), margin + 12, y + 3);
    doc.text(dateFormatted, margin + 92, y + 3);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(pct >= 50 ? 4 : 185, pct >= 50 ? 120 : 28, pct >= 50 ? 87 : 28);
    doc.text(`${item.score}/${item.totalQuestions}`, margin + 120, y + 3);
    doc.text(`${pct}%`, margin + 138, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${mins}m ${secs}s`, margin + 148, y + 3);

    const tier = item.certificate?.rankTier || (pct >= 80 ? 'Gold' : pct >= 65 ? 'Silver' : pct >= 50 ? 'Bronze' : 'Participant');
    doc.text(tier, pageWidth - margin - 2, y + 3, { align: 'right' });

    y += 6.5;
  });

  drawFooter(currentPage);
  const cleanCandidate = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`MUQABIL_Transcript_${cleanCandidate}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * 11. EXPORT CANDIDATE PRACTICE HISTORY TO EXCEL (.xlsx)
 */
export function exportCandidateHistoryToExcel(
  attempts: QuizAttempt[],
  candidateName: string = 'Candidate'
): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `MUQABIL_Practice_History_${candidateName.replace(/\s+/g, '_')}_${dateStr}.xlsx`;

  const totalQuestions = attempts.reduce((sum, item) => sum + item.totalQuestions, 0);
  const totalScore = attempts.reduce((sum, item) => sum + item.score, 0);
  const totalSeconds = attempts.reduce((sum, item) => sum + item.timeSpentSeconds, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  // Sheet 1: Candidate Overview
  const summaryRows = [
    { Field: 'Candidate Name', Value: candidateName },
    { Field: 'Export Date', Value: new Date().toLocaleString() },
    { Field: 'Total Tests Completed', Value: attempts.length },
    { Field: 'Total Questions Answered', Value: totalQuestions },
    { Field: 'Total Correct Marks', Value: totalScore },
    { Field: 'Overall Aggregate Accuracy', Value: `${avgAccuracy}%` },
    { Field: 'Total Study Time (Mins)', Value: Math.round(totalSeconds / 60) },
    { Field: 'Portal', Value: 'MUQABIL (muqabil.pk)' },
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{ wch: 28 }, { wch: 45 }];

  // Sheet 2: Detailed Attempt History
  const attemptRows = attempts.map((a, i) => {
    const mins = Math.floor(a.timeSpentSeconds / 60);
    const secs = a.timeSpentSeconds % 60;
    const pct = a.totalQuestions > 0 ? Math.round((a.score / a.totalQuestions) * 100) : 0;

    return {
      'Sr#': i + 1,
      'Test Title': a.title,
      'Date Completed': new Date(a.date).toLocaleDateString(),
      'Total Questions': a.totalQuestions,
      'Marks Obtained': a.score,
      'Percentage (%)': `${pct}%`,
      'Result Status': pct >= 50 ? 'PASSED (Qualified)' : 'NEEDS PRACTICE',
      'Time Spent': `${mins}m ${secs}s`,
      'Performance Tier': a.certificate?.rankTier || 'National Merit Participant',
      'Verification Code': a.certificate?.verificationCode || 'MEQSA-SCORE-2026',
      'Attempt ID': a.id,
    };
  });

  const attemptsSheet = XLSX.utils.json_to_sheet(attemptRows);
  attemptsSheet['!cols'] = [
    { wch: 6 },
    { wch: 40 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 14 },
    { wch: 20 },
    { wch: 14 },
    { wch: 22 },
    { wch: 24 },
    { wch: 36 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Candidate Overview');
  XLSX.utils.book_append_sheet(workbook, attemptsSheet, 'Quiz & Test Attempts');
  XLSX.writeFile(workbook, filename);
}

/**
 * 12. EXPORT PAST PAPER PRACTICE RESULT SCORECARD TO PDF
 */
export function exportPastPaperAttemptToPdf(
  paper: PastPaper,
  result: {
    correct: number;
    total?: number;
    percentage: number;
    accuracy: number;
    skipped: number;
    incorrectQuestions?: any[];
    subjects?: Record<string, { correct: number; total: number }>;
  },
  answers: Record<string, number>,
  elapsedSeconds: number,
  candidateName: string = 'Candidate'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(4, 120, 87); // Emerald 700
  doc.rect(margin, y, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('MUQABIL (مقابل) — OFFICIAL PAST PAPER SCORECARD', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`${paper.exam} • ${paper.year} • Authentic Competitive Exam Simulation`, margin + 6, y + 14);

  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 6, y + 8, { align: 'right' });
  doc.text(`muqabil.pk`, pageWidth - margin - 6, y + 14, { align: 'right' });

  y += 28;

  // Details box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(`Paper: ${sanitizeForPdf(paper.title)}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`Candidate: ${sanitizeForPdf(candidateName)}`, margin + 4, y + 12);
  doc.text(`Testing Commission: ${sanitizeForPdf(paper.exam)} (${paper.year})`, margin + 4, y + 17);

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  doc.text(`Time Taken: ${mins}m ${secs}s`, margin + (contentWidth / 2), y + 12);
  doc.text(`Unanswered / Skipped: ${result.skipped} MCQs`, margin + (contentWidth / 2), y + 17);

  y += 30;

  // Score Banner
  const totalQ = paper.mcqs.length;
  const isPassed = result.percentage >= 50;
  doc.setFillColor(isPassed ? 4 : 185, isPassed ? 120 : 28, isPassed ? 87 : 28);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`${result.correct} / ${totalQ} MARKS (${result.percentage}%)`, margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Accuracy: ${result.accuracy}% • Status: ${isPassed ? 'QUALIFIED (Met Passing Benchmark)' : 'NEEDS PRACTICE (<50%)'}`, margin + 6, y + 16);

  y += 26;

  // Subject breakdown table
  if (result.subjects && Object.keys(result.subjects).length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('SUBJECT SECTION', margin + 3, y + 4);
    doc.text('CORRECT / TOTAL', margin + 80, y + 4);
    doc.text('SECTION ACCURACY', margin + 125, y + 4);
    doc.text('STATUS', pageWidth - margin - 4, y + 4, { align: 'right' });
    y += 7;

    Object.entries(result.subjects).forEach(([subj, data]) => {
      const subjPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(subj.replace(/-/g, ' ').toUpperCase(), margin + 3, y + 4);
      doc.text(`${data.correct} / ${data.total}`, margin + 80, y + 4);
      doc.text(`${subjPct}%`, margin + 125, y + 4);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(subjPct >= 70 ? 4 : 185, subjPct >= 70 ? 120 : 28, subjPct >= 70 ? 87 : 28);
      doc.text(subjPct >= 70 ? 'On Track' : 'Needs Practice', pageWidth - margin - 4, y + 4, { align: 'right' });
      y += 5.5;
    });

    y += 4;
  }

  // Question Analysis
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('DETAILED QUESTION ATTEMPTS & EXPLANATIONS', margin, y);
  y += 6;

  paper.mcqs.forEach((q, idx) => {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = margin;
    }

    const userPick = answers[q.id];
    const isAnswered = userPick !== undefined;
    const isCorrect = isAnswered && userPick === q.correctIndex;
    const userLetter = isAnswered ? String.fromCharCode(65 + userPick) : 'Skipped';
    const correctLetter = String.fromCharCode(65 + q.correctIndex);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(isCorrect ? 4 : isAnswered ? 185 : 100, isCorrect ? 120 : isAnswered ? 28 : 116, isCorrect ? 87 : isAnswered ? 28 : 139);
    doc.text(`Q${idx + 1}. [${isCorrect ? '✓ CORRECT' : isAnswered ? '✗ WRONG' : '○ SKIPPED'}]`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    const qLines = doc.splitTextToSize(sanitizeForPdf(q.question), contentWidth - 45);
    doc.text(qLines, margin + 32, y);
    y += Math.max(qLines.length * 3.8, 3.8);

    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(`Your Pick: ${userLetter} | Correct: ${correctLetter} (${sanitizeForPdf(q.options[q.correctIndex] || '')})`, margin + 32, y);
    y += 4.5;
  });

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('MUQABIL Past Paper Verification System • muqabil.pk', margin, pageHeight - 6);

  const cleanName = paper.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`MUQABIL_Scorecard_${cleanName}.pdf`);
}

/**
 * 13. EXPORT PAST PAPER PRACTICE ATTEMPT TO EXCEL (.xlsx)
 */
export function exportPastPaperAttemptToExcel(
  paper: PastPaper,
  result: {
    correct: number;
    total?: number;
    percentage: number;
    accuracy: number;
    skipped: number;
  },
  answers: Record<string, number>,
  elapsedSeconds: number,
  candidateName: string = 'Candidate'
): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const cleanName = paper.title.replace(/\s+/g, '_');
  const filename = `MUQABIL_Scorecard_${cleanName}_${dateStr}.xlsx`;

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;

  // Sheet 1: Summary
  const summaryRows = [
    { Field: 'Candidate Name', Value: candidateName },
    { Field: 'Paper Title', Value: paper.title },
    { Field: 'Exam / Commission', Value: paper.exam },
    { Field: 'Year', Value: paper.year },
    { Field: 'Date Attempted', Value: new Date().toLocaleString() },
    { Field: 'Total Questions', Value: paper.mcqs.length },
    { Field: 'Correct Answers', Value: result.correct },
    { Field: 'Accuracy Rate', Value: `${result.accuracy}%` },
    { Field: 'Score Percentage', Value: `${result.percentage}%` },
    { Field: 'Unanswered / Skipped', Value: result.skipped },
    { Field: 'Time Spent', Value: `${mins}m ${secs}s` },
    { Field: 'Status', Value: result.percentage >= 50 ? 'QUALIFIED (Passed)' : 'NEEDS PRACTICE' },
    { Field: 'Platform', Value: 'MUQABIL (muqabil.pk)' },
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{ wch: 25 }, { wch: 45 }];

  // Sheet 2: Item by Item
  const itemRows = paper.mcqs.map((q, idx) => {
    const userPickIndex = answers[q.id];
    const isAnswered = userPickIndex !== undefined;
    const isCorrect = isAnswered && userPickIndex === q.correctIndex;
    const userPickLetter = isAnswered ? String.fromCharCode(65 + userPickIndex) : 'Skipped';
    const userPickText = isAnswered ? (q.options[userPickIndex] || '') : 'None';
    const correctLetter = String.fromCharCode(65 + q.correctIndex);
    const correctText = q.options[q.correctIndex] || '';

    return {
      'Q#': idx + 1,
      'Question Text': q.question,
      'Your Selection': `${userPickLetter}: ${userPickText}`,
      'Correct Answer': `${correctLetter}: ${correctText}`,
      'Result': !isAnswered ? 'SKIPPED' : isCorrect ? 'CORRECT (+1)' : 'WRONG (0)',
      'Category': q.category,
      'Explanation / Notes': q.explanation || '',
    };
  });

  const itemsSheet = XLSX.utils.json_to_sheet(itemRows);
  itemsSheet['!cols'] = [
    { wch: 6 },
    { wch: 50 },
    { wch: 25 },
    { wch: 25 },
    { wch: 15 },
    { wch: 18 },
    { wch: 45 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Scorecard Summary');
  XLSX.utils.book_append_sheet(workbook, itemsSheet, 'Question Analysis');
  XLSX.writeFile(workbook, filename);
}

/**
 * 14. EXPORT SUBJECTIVE CRQ / ERQ PRACTICE TO PDF
 */
export function exportSubjectivePracticeToPdf(
  question: TeachingLicenseSubjectiveQuestion,
  candidateAnswer?: string,
  feedback?: any
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(109, 40, 217); // Purple 700
  doc.rect(margin, y, contentWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`MUQABIL (مقابل) — ${question.type} SUBJECTIVE PRACTICE DOSSIER`, margin + 4, y + 8);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`STEDA Teaching License · ${question.area} • ${question.subject}`, margin + 4, y + 14);

  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 4, y + 8, { align: 'right' });
  doc.text(`Marks: ${question.marks} | Time: ${question.suggestedMinutes}m`, pageWidth - margin - 4, y + 14, { align: 'right' });

  y += 26;

  // Prompt Box
  doc.setDrawColor(216, 180, 254);
  doc.setFillColor(250, 245, 255);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`QUESTION PROMPT (${question.type} · ${question.marks} Marks):`, margin + 4, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const promptLines = doc.splitTextToSize(sanitizeForPdf(question.prompt), contentWidth - 8);
  doc.text(promptLines, margin + 4, y + 10);
  y += 22;

  // Answer Plan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(109, 40, 217);
  doc.text('STRUCTURED ANSWER PLAN:', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  question.answerPlan.forEach((step, i) => {
    doc.text(`${i + 1}. ${sanitizeForPdf(step)}`, margin + 2, y);
    y += 4.5;
  });
  y += 3;

  // Model Answer
  if (y > pageHeight - 45) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text('OFFICIAL BENCHMARK MODEL ANSWER:', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const modelLines = doc.splitTextToSize(sanitizeForPdf(question.modelAnswer), contentWidth);
  modelLines.forEach((line: string) => {
    if (y > pageHeight - 15) { doc.addPage(); y = margin; }
    doc.text(line, margin, y);
    y += 4.2;
  });
  y += 4;

  // Candidate Response if present
  if (candidateAnswer && candidateAnswer.trim()) {
    if (y > pageHeight - 45) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 58, 138);
    doc.text('CANDIDATE WRITTEN RESPONSE:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    const ansLines = doc.splitTextToSize(sanitizeForPdf(candidateAnswer), contentWidth);
    ansLines.forEach((line: string) => {
      if (y > pageHeight - 15) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 4.2;
    });
    y += 4;
  }

  // Self-Marking Rubric
  if (y > pageHeight - 35) { doc.addPage(); y = margin; }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('MARKING RUBRIC BREAKDOWN:', margin, y);
  y += 5;
  question.rubric.forEach((r) => {
    if (y > pageHeight - 15) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(`• ${sanitizeForPdf(r.criterion)} [${r.marks} Marks]`, margin + 2, y);
    y += 4.5;
  });

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.text('MUQABIL Subjective Practice Lab • STEDA / STS Aligned Skills • muqabil.pk', margin, pageHeight - 6);

  doc.save(`MUQABIL_${question.type}_${question.id}.pdf`);
}

