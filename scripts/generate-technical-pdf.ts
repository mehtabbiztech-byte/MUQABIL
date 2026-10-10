import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

export function generateTechnicalPdf(): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2);

  // Helper colors
  const primaryDark = [10, 37, 27];      // Emerald-950
  const emeraldAccent = [16, 185, 129];  // Emerald-500
  const slateText = [51, 65, 85];        // Slate-700
  const lightBg = [248, 250, 252];       // Slate-50
  const borderCol = [226, 232, 240];      // Slate-200

  function addHeaderFooter(pageNum: number, totalPagesPlaceholder: boolean = false) {
    if (pageNum === 1) return; // Skip cover

    // Top Header
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, 8, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 185, 129);
    doc.text('MUQABIL (muqabil.pk)', margin + 2, 12.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Technical Architecture & System Specification Manual', margin + 37, 12.5);
    doc.text('v1.0.0 Production', pageWidth - margin - 2, 12.5, { align: 'right' });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, 16, pageWidth - margin, 16);

    // Bottom Footer
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('MUQABIL Platform Engineering • Founded & Built by Mehtab Ali (mehtabbiztech@gmail.com)', margin, pageHeight - 8);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  function drawSectionTitle(y: number, number: string, title: string): number {
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(6, 78, 59);
    doc.text(`${number}. ${title.toUpperCase()}`, margin + 4, y + 5.5);

    return y + 12;
  }

  function drawSubSectionTitle(y: number, title: string): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, y);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 1.5, margin + 40, y + 1.5);
    return y + 5;
  }

  function drawKeyValueTable(y: number, items: [string, string][], col1Width: number = 55): number {
    let currentY = y;
    doc.setFontSize(8);

    items.forEach(([key, val], idx) => {
      const rowBg = idx % 2 === 0 ? [255, 255, 255] : [248, 250, 252];
      doc.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
      
      const splitVal = doc.splitTextToSize(val, contentWidth - col1Width - 4);
      const rowHeight = Math.max(6, (splitVal.length * 3.5) + 2.5);

      if (currentY + rowHeight > pageHeight - 16) {
        doc.addPage();
        currentY = 22;
      }

      doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
      doc.setDrawColor(241, 245, 249);
      doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(key, margin + 2, currentY + 4);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(splitVal, margin + col1Width, currentY + 4);

      currentY += rowHeight;
    });

    return currentY + 3;
  }

  function drawBulletList(y: number, bullets: string[]): number {
    let currentY = y;
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    bullets.forEach(b => {
      const split = doc.splitTextToSize(b, contentWidth - 6);
      const bHeight = split.length * 3.6 + 1.5;

      if (currentY + bHeight > pageHeight - 16) {
        doc.addPage();
        currentY = 22;
      }

      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 2, currentY + 2.2, 0.9, 'F');

      doc.setFont('helvetica', 'normal');
      doc.text(split, margin + 5, currentY + 3.2);

      currentY += bHeight;
    });

    return currentY + 2;
  }

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  // Background Header Banner
  doc.setFillColor(6, 44, 34); // Deep Emerald
  doc.rect(0, 0, pageWidth, 90, 'F');

  // Decorative Accent Bar
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 90, pageWidth, 3, 'F');

  // Badge
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(margin, 16, 68, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL TECHNICAL SPECIFICATION', margin + 3, 20.3);

  // Main Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('MUQABIL (مقابل)', margin, 35);

  doc.setFontSize(14);
  doc.setTextColor(167, 243, 208);
  doc.text('Comprehensive Technical Architecture & Engineering Reference', margin, 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(209, 250, 229);
  const subtitle = 'Full-Stack Architecture, React 19 Frontend, Node/Express Backend, Cloud Firestore Database, 16-Year CSS Subjective Exam Engine & Automated PDF/Excel Subsystems.';
  const splitSub = doc.splitTextToSize(subtitle, contentWidth - 10);
  doc.text(splitSub, margin, 52);

  // Key stats strip on cover
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 70, contentWidth, 14, 2, 2, 'F');
  doc.setDrawColor(209, 250, 229);
  doc.setLineWidth(0.5);

  const stats = [
    { label: 'PLATFORM VERSION', val: 'v1.0.0 (Production)' },
    { label: 'AUTHENTIC MCQS', val: '1,200+ Solved Items' },
    { label: 'PAST PAPERS ARCHIVE', val: '216+ Curated Exams' },
    { label: 'CSS SUBJECTIVE', val: '16 Consecutive Years' }
  ];

  stats.forEach((st, i) => {
    const xPos = margin + 4 + (i * (contentWidth / 4));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(st.label, xPos, 75);
    doc.setFontSize(8.5);
    doc.setTextColor(6, 78, 59);
    doc.text(st.val, xPos, 80);
  });

  // Metadata Card on Cover
  let coverY = 105;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, coverY, contentWidth, 68, 2.5, 2.5, 'FD');
  doc.setDrawColor(226, 232, 240);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PLATFORM & ENGINEERING METADATA', margin + 5, coverY + 8);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.line(margin + 5, coverY + 10, margin + 75, coverY + 10);

  const metaRows: [string, string][] = [
    ['Platform Name', 'MUQABIL (مقابل) — muqabil.pk'],
    ['Owner & Lead Architect', 'Mehtab Ali (mehtabbiztech@gmail.com)'],
    ['Repository', 'https://github.com/mehtabbiztech-byte/MUQABIL'],
    ['Development Cloud URL', 'https://ais-dev-6e5ixbujhnpia3hxh5kq5u-943067006095.asia-east1.run.app'],
    ['Production Domain', 'https://muqabil.pk (Secondary: muqabilprep.com)'],
    ['Firestore Database ID', 'ai-studio-matbstsprep-90fe2907-d1f4-4ae9-982e-e6829a98ebb9'],
    ['Cloud Region', 'Google Cloud Run (asia-east1)'],
    ['Document Generation Date', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
  ];

  coverY = drawKeyValueTable(coverY + 13, metaRows, 48);

  // Executive Scope Summary on Cover
  coverY = 182;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE PURPOSE & ARCHITECTURAL SUMMARY', margin, coverY);
  doc.line(margin, coverY + 1.5, margin + 85, coverY + 1.5);

  coverY += 6;
  const execText = 'MUQABIL is an enterprise-grade competitive examination preparation platform architected specifically for Pakistani civil service, screening, and recruitment aspirants. It unifies extensive testing agencies (FPSC, PPSC, SPSC, BPSC, KPPSC, Sukkur IBA STS, NTS, ETEA, FIA, Police, ASF, STEDA Teaching License) into a high-performance, single-page application (SPA). This document outlines the end-to-end technical architecture, component hierarchies, data structures, cloud persistence rules, API integrations, and client-side document compilers.';
  const splitExec = doc.splitTextToSize(execText, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(splitExec, margin, coverY);

  // Sign-off box at bottom of cover
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, pageHeight - 32, contentWidth, 18, 2, 2, 'F');
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, pageHeight - 32, contentWidth, 18, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 101, 52);
  doc.text('CONFIDENTIAL & COMPREHENSIVE SPECIFICATION', margin + 4, pageHeight - 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(21, 128, 61);
  doc.text('Compiled directly from live codebase repository, security declarations, and application dependency manifests.', margin + 4, pageHeight - 19);

  // ==========================================
  // PAGE 2: TABLE OF CONTENTS & ARCHITECTURE
  // ==========================================
  doc.addPage();
  addHeaderFooter(2);
  let y = 24;

  y = drawSectionTitle(y, '1', 'Table of Contents & Architectural Topology');

  const toc = [
    ['1. Executive Overview & Platform Philosophy', 'Page 2'],
    ['2. Comprehensive Technology Stack Matrix', 'Page 3'],
    ['3. Google Cloud Firestore Database & Security Rules', 'Page 4'],
    ['4. Core Data Banks & 16-Year CSS Subjective Architecture', 'Page 5'],
    ['5. Subsystem Implementations (CBT, PDF Engine, OMR)', 'Page 6'],
    ['6. Server-Side APIs, Security & Cloud Deployment', 'Page 7'],
    ['7. Multi-Shell Layout Architecture & Responsive Engine', 'Page 8'],
  ];

  y = drawKeyValueTable(y, toc as [string, string][], 140);
  y += 3;

  y = drawSubSectionTitle(y, '1.1 System Architecture Overview');
  const archText = 'MUQABIL employs a modern Client-Server Single Page Architecture (SPA) augmented with an Express proxy layer and Google Cloud backend services. The frontend is built on React 19 and Vite 8, featuring pure client-side state transitions with zero screen flickering. The backend acts as a secure reverse proxy for AI capabilities (Gemini 2.5 Flash), environment secret handling, and static asset delivery. Persistence is managed via Firebase Firestore with role-based security rules enforcing candidate privacy and administrative controls.';
  const splitArch = doc.splitTextToSize(archText, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(splitArch, margin, y);
  y += (splitArch.length * 3.6) + 4;

  y = drawSubSectionTitle(y, '1.2 Architectural Layers');
  const archLayers = [
    'Presentation Tier: React 19 functional components utilizing Tailwind CSS v4, Lucide React, and Framer Motion for responsive, accessible, dark/light interactive interfaces.',
    'Application State Tier: Multi-context architecture (AppContext, CmsContentContext, LayoutContext) with synchronized LocalStorage failovers for uninterrupted offline quiz attempts.',
    'Document Generation Tier: Client-side jsPDF and SheetJS (XLSX) engines that compile candidate scorecards, answer keys, OMR bubble sheets, and Excel catalogs without server round-trips.',
    'AI Intelligence Tier: Google GenAI TypeScript SDK proxying requests to Gemini 2.5 Flash for automated question explanation, vocabulary deconstruction, and syllabus blueprint extraction.',
    'Cloud Persistence Tier: Google Cloud Firestore database with real-time listeners for candidate attempts, mistake review notebooks, and nationwide leaderboards.'
  ];
  y = drawBulletList(y, archLayers);

  // ==========================================
  // PAGE 3: TECHNOLOGY STACK MATRIX
  // ==========================================
  doc.addPage();
  addHeaderFooter(3);
  y = 24;

  y = drawSectionTitle(y, '2', 'Technology Stack & Dependency Matrix');

  y = drawSubSectionTitle(y, '2.1 Core Technologies & Runtime Environment');
  const coreTech: [string, string][] = [
    ['Frontend Framework', 'React 19.0.1 (Strict Functional Components, Hooks, Concurrent Features)'],
    ['Language & Typing', 'TypeScript 5.8.3 (Strict null checks, comprehensive type definitions)'],
    ['Styling & UI Engine', 'Tailwind CSS v4.1.14 (@tailwindcss/vite, theme-driven token system)'],
    ['Build Tool & Bundler', 'Vite 8.3.0 (Fast HMR development pipeline, optimized chunking build)'],
    ['Server Runtime', 'Node.js LTS with Express 5.2.1 and TSX 4.21.0 execution engine'],
    ['Production Bundler', 'Esbuild 0.28.2 (Compiles server.ts to single CJS bundle for Cloud Run)'],
    ['Cloud Platform', 'Google Cloud Platform (GCP) Cloud Run (asia-east1 containerized service)'],
    ['Database & Auth', 'Firebase Firestore 12.18.0 & Firebase Authentication SDK']
  ];
  y = drawKeyValueTable(y, coreTech, 50);
  y += 2;

  y = drawSubSectionTitle(y, '2.2 Client-Side Libraries & Specialized Modules');
  const clientLibs: [string, string][] = [
    ['PDF Document Engine', 'jsPDF 4.2.1 (Vector graphic drawings, multi-page compilation, OMR sheets)'],
    ['Spreadsheet Engine', 'SheetJS / xlsx 0.18.5 (Bidirectional Excel generation, tabular reports)'],
    ['Iconography', 'Lucide React 1.45.0 (600+ high-resolution, lightweight SVG vector icons)'],
    ['Animations & Layouts', 'Motion / Framer Motion 13.2.0 (Spring animations, tab switches, modal fades)'],
    ['Gamification & FX', 'Canvas Confetti 1.9.4 (Particle physics celebration on quiz completion)'],
    ['AI Generation SDK', '@google/genai 2.22.0 (Official Google GenAI SDK for Gemini 2.5 Flash)']
  ];
  y = drawKeyValueTable(y, clientLibs, 50);
  y += 2;

  y = drawSubSectionTitle(y, '2.3 Project Directory Structure & Codebase Layout');
  const dirTree = [
    '/src/views: High-level application views (Home, Quiz, PastPapers, Jobs, Analytics, CSS Subjective, Notes, About)',
    '/src/components: Reusable modular components (Navbar, Footer, Modals, Exam Simulators, OMR Sheet Generator)',
    '/src/data: Curated authentic repositories (MCQs Bank, 216+ Directory Papers, 16-Year CSS Subjective Bank, Jobs, Syllabi)',
    '/src/context: Context API providers for user profile, exam sessions, layout modes, and dynamic CMS content',
    '/src/lib: Algorithmic utilities (exportUtils.ts for PDF/Excel, paperResults.ts for scoring, firebase.ts for Cloud connection)',
    '/server.ts: Express full-stack entry point proxying API routes, serving static assets, and mounting Vite middleware',
    '/public: Static assets (16 official FPSC CSS Current Affairs PDFs from 2010 to 2025, branding logos, icons)'
  ];
  y = drawBulletList(y, dirTree);

  // ==========================================
  // PAGE 4: DATABASE & SECURITY RULES
  // ==========================================
  doc.addPage();
  addHeaderFooter(4);
  y = 24;

  y = drawSectionTitle(y, '3', 'Firestore Database Architecture & Security Rules');

  y = drawSubSectionTitle(y, '3.1 Cloud Firestore Collections Schema');
  const firestoreCollections: [string, string][] = [
    ['Collection: users', 'Documents: { uid, email, displayName, role: "candidate"|"admin", targetExams: string[], bookmarks: string[], streakDays: number, createdAt, lastLoginAt }'],
    ['Collection: attempts', 'Documents: { id, userId, paperId, examTitle, score, totalQuestions, accuracy, percentage, durationSeconds, answersMap, subjectBreakdown, timestamp }'],
    ['Collection: saved_mistakes', 'Documents: { id, userId, questionId, chosenIndex, correctIndex, explanation, reviewCount, mastered: boolean, updatedAt }'],
    ['Collection: leaderboards', 'Documents: { id, period: "daily"|"weekly"|"alltime", userId, userName, points, testsCompleted, rank, percentile }'],
    ['Collection: cms_content', 'Documents: { id, key, title, announcement, activeBanners, publishedAt, updatedBy }']
  ];
  y = drawKeyValueTable(y, firestoreCollections, 48);
  y += 2;

  y = drawSubSectionTitle(y, '3.2 Firebase Security Rules (firestore.rules)');
  const rulesSummary = [
    'Granular Role-Based Access Control (RBAC): Enforces authentication checks on all mutable operations. Guest users have restricted write permissions to ephemeral sessions.',
    'User Data Isolation: Users may only read and write their own attempt logs, bookmarks, and mistake notebooks (enforcing request.auth.uid == resource.data.userId).',
    'Admin Privilege Separation: Content management collections (cms_content, jobs_bulletin) are protected; only authorized admin UIDs can perform write/update/delete operations.',
    'Schema Validation: Enforces constraints on quiz attempt payloads, score percentages (0 to 100), and timestamps to protect leaderboard integrity.'
  ];
  y = drawBulletList(y, rulesSummary);
  y += 2;

  y = drawSubSectionTitle(y, '3.3 Authentication Providers & Session Security');
  const authDetails: [string, string][] = [
    ['Supported Auth Modes', 'Firebase Auth Email/Password, Google OAuth 2.0 Identity Provider, Anonymous Guest Sessions'],
    ['Token Management', 'JWT Bearer token handled automatically by Firebase SDK with secure client-side token rotation'],
    ['State Sync Strategy', 'Hybrid caching: Active session attempts are cached in IndexedDB/LocalStorage, sync to Firestore on completion']
  ];
  y = drawKeyValueTable(y, authDetails, 48);

  // ==========================================
  // PAGE 5: CORE DATA BANKS & CSS SUBJECTIVE
  // ==========================================
  doc.addPage();
  addHeaderFooter(5);
  y = 24;

  y = drawSectionTitle(y, '4', 'Core Content Repositories & CSS Subjective Engine');

  y = drawSubSectionTitle(y, '4.1 Verified MCQs Bank & Testing Agency Mappings');
  const dataBanks: [string, string][] = [
    ['Total MCQs Bank', '1,200+ authenticated multi-choice questions with verified answer keys, detailed explanations, and syllabi codes'],
    ['Subject Coverage', 'English Grammar/Vocab, Pakistan Affairs, Current Affairs, General Knowledge, Everyday Science, Math/IQ, Islamic Studies, Computer/IT, Sindhi, Urdu, Pedagogy'],
    ['Testing Agencies', 'Federal Public Service Commission (FPSC), Punjab (PPSC), Sindh (SPSC), Khyber Pakhtunkhwa (KPPSC), Balochistan (BPSC), Sukkur IBA STS, NTS, ETEA, ASF, FIA, Police']
  ];
  y = drawKeyValueTable(y, dataBanks, 48);
  y += 2;

  y = drawSubSectionTitle(y, '4.2 Master Directory Archive (Up to 1,000 Capacity)');
  const dirOverview = [
    'Chronologically & Numbered Indexed: Entries #1 through #200 cover premier provincial and federal recruitment tests (Assistant, Tehsildar, Sub-Inspector, Junior Clerk, Lecturer, Inspector).',
    'Entries #201 to #216: Dedicated 16-year sequence of FPSC CSS Current Affairs Past Papers (2010 to 2025).',
    'Interactive Linking: Selecting any past paper automatically loads its linked family of cadre-specific tests, year-wise sets, and CBT model exams.'
  ];
  y = drawBulletList(y, dirOverview);
  y += 2;

  y = drawSubSectionTitle(y, '4.3 FPSC CSS Current Affairs 16-Year Subjective Architecture');
  const cssOverview: [string, string][] = [
    ['Years Available', 'Complete 16 consecutive years: 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025'],
    ['Exam Format', 'Part-I (20 MCQs, 30 Mins) + Part-II (80 Marks Subjective Essay, Attempt 4 of 7 Questions, 20 Marks Each)'],
    ['Descriptive Engine Features', 'FPSC Paper View (CssSubjectivePaperView.tsx), 180-min official timer, 4-of-7 question selection tracker, model outlines, theory frameworks, scratchpad with local autosave, source PDFs']
  ];
  y = drawKeyValueTable(y, cssOverview, 48);

  // ==========================================
  // PAGE 6: SUBSYSTEM IMPLEMENTATIONS
  // ==========================================
  doc.addPage();
  addHeaderFooter(6);
  y = 24;

  y = drawSectionTitle(y, '5', 'Subsystem Implementations & Export Engines');

  y = drawSubSectionTitle(y, '5.1 Computer-Based Test (CBT) Simulation Subsystem');
  const cbtFeatures = [
    'Official Clock & Negative Marking: Configurable timer countdown with optional 0.25 mark penalty for wrong answers (matching PPSC/PMS criteria).',
    'Palette Navigation: Instant navigation grid showing Answered (green), Skipped (amber), and Unattempted (slate) questions.',
    'Instant Scorecard & Analysis: Real-time calculation of percentage, accuracy ratio, speed velocity, and subject-wise breakdown upon paper submission.',
    'Adaptive Mistake Notebook: Automatic logging of wrong choices into the Spaced Repetition Mistake Notebook for re-testing.'
  ];
  y = drawBulletList(y, cbtFeatures);
  y += 2;

  y = drawSubSectionTitle(y, '5.2 Client-Side Document Export Engine (exportUtils.ts)');
  const exportEngines: [string, string][] = [
    ['Candidate Scorecard (PDF)', 'Generates branded verification certificates with QR codes, time elapsed, subject performance charts, and answer summaries.'],
    ['Question Booklet & OMR (PDF)', 'Generates full printable 100-MCQ test booklets with official FPSC/STS headers, instructions, answer keys, and bubble-fill OMR sheets.'],
    ['Subjective Exam Paper (PDF)', 'Compiles complete descriptive examination questions, model outlines, and essay structures with official commission letterheads.'],
    ['Data Bank Export (Excel)', 'Generates formatted .xlsx workbooks using SheetJS, exporting questions with options, keys, explanations, and syllabus taxonomy tags.'],
    ['Jobs & Directory Index (Excel)', 'Exports all 1,000 capacity directory records, deadlines, BPS scales, and department URLs in tabular format.']
  ];
  y = drawKeyValueTable(y, exportEngines, 50);

  // ==========================================
  // PAGE 7: APIS, SECURITY & DEPLOYMENT
  // ==========================================
  doc.addPage();
  addHeaderFooter(7);
  y = 24;

  y = drawSectionTitle(y, '6', 'Server APIs, Security & Cloud Deployment');

  y = drawSubSectionTitle(y, '6.1 Server-Side Endpoints (server.ts)');
  const apiEndpoints: [string, string][] = [
    ['GET /api/health', 'Returns server uptime, memory usage, timestamp, and environment health check.'],
    ['POST /api/ai/explain', 'Proxies question prompts to Google Gemini 2.5 Flash for high-yield explanations and distractor trap analysis.'],
    ['POST /api/ai/syllabus', 'Analyzes job post titles and generates verified percentage subject breakdown recommendations.'],
    ['Static Serving', 'Express serves precompiled client bundles with gzip compression, caching headers, and SPA index fallback.']
  ];
  y = drawKeyValueTable(y, apiEndpoints, 48);
  y += 2;

  y = drawSubSectionTitle(y, '6.2 Security & Operational Integrity');
  const securityPoints = [
    'Zero Secret Exposure: API keys (including GEMINI_API_KEY) are confined to server-side process.env; client code communicates strictly via /api/* routes.',
    'Iframe & Sandbox Compliance: Strict adherence to AI Studio and modern browser constraints (no window.alert or window.open; replaced with non-blocking toast notifications and in-app viewers).',
    'Cross-Site Scripting (XSS) Sanitization: Dynamic content, question texts, and search strings are rigorously sanitized before DOM rendering and PDF document injection.'
  ];
  y = drawBulletList(y, securityPoints);
  y += 2;

  y = drawSubSectionTitle(y, '6.3 Cloud Infrastructure & Deployment Configuration');
  const deployConfig: [string, string][] = [
    ['Target Platform', 'Google Cloud Run (Containerized Node.js service)'],
    ['Port & Networking', 'Port 3000 mapped with reverse-proxy edge routing'],
    ['Domain & DNS', 'Primary: muqabil.pk | Secondary: muqabilprep.com (Automated SSL termination, edge CDN caching)'],
    ['Source Code Management', 'Git repository connected to GitHub (https://github.com/mehtabbiztech-byte/MUQABIL)']
  ];
  y = drawKeyValueTable(y, deployConfig, 48);

  // ==========================================
  // PAGE 8: MULTI-SHELL LAYOUT ENGINE
  // ==========================================
  doc.addPage();
  addHeaderFooter(8);
  y = 24;

  y = drawSectionTitle(y, '7', 'Multi-Shell Layout Engine & Responsive Architecture');

  y = drawSubSectionTitle(y, '7.1 Four Interchangeable Application Shells');
  const layoutMatrix: [string, string][] = [
    ['1. Standard Top Nav', 'Classic government testing portal layout with sticky responsive header, news announcements ticker, mega-menus, and container centering. Familiar for laptops & desktops.'],
    ['2. Executive Sidebar', 'Modern administrative LMS workspace with collapsible left navigation rail (80px rail / 288px expanded), top breadcrumbs, profile streak counter, and instant search bar.'],
    ['3. Dual Split Workspace', 'Two-column master-detail layout featuring persistent syllabus index, priority exam rooms, and subject categories on the left alongside an uninterrupted reading canvas on the right.'],
    ['4. Zen Focus Mode', 'Distraction-free exam immersion layout stripping out surrounding clutter, featuring a subtle escape pill at top and a floating glass bottom command hub with live study stopwatch and font scaler.']
  ];
  y = drawKeyValueTable(y, layoutMatrix, 50);
  y += 2;

  y = drawSubSectionTitle(y, '7.2 Layout State Management & Fine-Grained Controls (LayoutContext.tsx)');
  const layoutStateDetails = [
    'Pure Context Synchronization: LayoutContext manages shellLayout, containerWidth, contentDensity, fontSize, and sidebarCollapsed with immediate localStorage persistence.',
    'Viewport Container Scaling: Standard (1280px max-width), Widescreen (1536px max-width), and Fluid (100% edge-to-edge) for full ultra-wide monitor utilization.',
    'Information Density Scaling: Comfortable (generous padding), Standard (balanced touch targets), and Compact (maximum item scanning density).',
    'Fatigue-Free Typography: Dynamic font size scalers (Normal 100%, Large 112%, Extra Large 125%) synced via root HTML text-scale utility classes.',
    'Instant 1-Click Layout Switcher: Segmented inline controls and compact header dropdowns allowing candidates to switch layout modes instantly without leaving active tests.'
  ];
  y = drawBulletList(y, layoutStateDetails);
  y += 2;

  y = drawSubSectionTitle(y, '7.3 Summary Sign-Off & Verification');
  const signOff: [string, string][] = [
    ['Platform Status', 'Production Operational (All 4 Layout Shells & 16-Year CSS Subjective Active)'],
    ['Architecture Certified By', 'Mehtab Ali — Lead Systems Engineer (mehtabbiztech@gmail.com)'],
    ['Online Repository', 'https://github.com/mehtabbiztech-byte/MUQABIL'],
    ['Production Domain', 'https://muqabil.pk']
  ];
  y = drawKeyValueTable(y, signOff, 50);

  // Save PDF to public folder
  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath1 = path.join(outputDir, 'MUQABIL_Technical_Specification_Document.pdf');
  const outputPath2 = path.join(outputDir, 'technical-details-muqabil.pdf');

  const pdfBytes = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outputPath1, pdfBytes);
  fs.writeFileSync(outputPath2, pdfBytes);

  console.log(`Generated technical PDF at: ${outputPath1} (${pdfBytes.length} bytes)`);
  console.log(`Generated technical PDF at: ${outputPath2} (${pdfBytes.length} bytes)`);

  return outputPath1;
}

generateTechnicalPdf();
