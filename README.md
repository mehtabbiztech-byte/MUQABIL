# MUQABIL (`muqabil.pk`) — Competitive Exam Preparation Platform

**GitHub Repository:** [https://github.com/mehtabbiztech-byte/MUQABIL](https://github.com/mehtabbiztech-byte/MUQABIL)

MUQABIL is a premier React 19, TypeScript, Vite, Tailwind CSS and Google Gemini-powered preparation platform for competitive examinations across Pakistan—including Sukkur IBA STS BPS-05 to 15 (Graduation, Intermediate, Matriculation), SPSC CCE, STEDA Sindh Teaching License, FPSC, CSS MPT, and provincial recruitments.

## Content transparency

- The STS bank contains 5,000 **generated practice items** built from deterministic templates. It is not presented as 5,000 official past-paper questions.
- The sourced Current Affairs collection reports its actual distinct Pakistan and World question counts in the interface.
- Past-paper entries are labelled as an official record, official sample or reconstructed/tagged practice selection.
- Certificates are personal practice-completion records. MEQSA does not assign national ranks or nationally calculated percentiles.
- Official agency links are provided where available, but MEQSA is independent and is not endorsed by an examination authority.
- Interview preparation content is practice material: mock panels, AI coaching and the personality self-assessment produce practice guidance, never official marks, eligibility predictions or psychometric certification. Every exam dossier carries a verification note and links the official portal.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

## Prepare for the Future — Smart Study Planner

Open **Prepare for the Future** from the main navigation or home-page hero. Choose an organization and position, then configure study mode, current level, fixed exam date, daily time, target score and weak areas. Position choices load dynamically and custom positions are supported.

Where a position links to a published STS record, the planner uses its listed topics and section percentages and carries those weights into the schedule. Other selected subjects use MUQABIL's topic bank; these mappings are study aids, not substitutes for the latest official notice. Every mapped topic gets a topic-level task. A coverage/time check warns when the available days and daily budget cannot fit the syllabus; in that case all topics remain visible in the roadmap, with overloaded days called out instead of being silently dropped.

The roadmap includes learn/notes/MCQ tasks, spaced review, weekly timed quizzes, a syllabus checklist and progress history. Completing a planned mock opens a real MUQABIL quiz; its result and subject-level accuracy return to the matching plan and shift future work toward weak performance. Rebalancing preserves completed work and leaves the exam date unchanged; an expired date must be edited explicitly. Manual score entry is also available.

Multiple plans are saved locally. **Export & Print** can download a full JSON backup and restore it later, or export schedule tasks to an `.ics` calendar file (calendar applications can then provide their own reminders; MUQABIL does not send push notifications). Account cloud sync is optional, off by default, and requires sign-in; records are private to the signed-in user under the `users/{uid}/study_plans` Firestore subcollection. Deploy the matching `firestore.rules` to enable it. If the network or rules are unavailable, local storage and JSON backup remain available. Optional Gemini personalisation is a separate opt-in at plan generation; only the selected exam/syllabus details needed for that request are sent. The AI Mentor's contextual prompt is not sent until the learner chooses to send it. Readiness is a study-progress indicator, not a predicted result or official score.

## Verification

```bash
npm run lint
npm test
npm run validate:sts
npm run validate:current-affairs
npm run build
```

The GitHub Actions quality workflow runs the same checks for every pull request and every push to `main`.

## Deployment

The Vercel project uses:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

Production is <https://muqabil-test.vercel.app>. The health endpoint is `/api/health`.

GitHub Pages is published by `.github/workflows/pages.yml` to <https://mehtabbiztech-byte.github.io/MUQABIL/>. Vite builds that site with a `/MUQABIL/` base path (`GITHUB_ACTIONS=true`), while Vercel and local development build for `/`. Do not add a `*.vercel.app` CNAME — those hostnames belong to Vercel, and GitHub Pages would redirect github.io at a domain it cannot serve.

Enabling Pages is a one-time repository-administration step that only a repository owner can perform, because a workflow token can deploy to a Pages site but can never create one (see [actions/configure-pages#40](https://github.com/actions/configure-pages/issues/40)):

1. Open <https://github.com/mehtabbiztech-byte/MUQABIL/settings/pages>.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Re-run **Deploy to GitHub Pages**, or push to `main`.

Until that is done the workflow builds the site, explains the missing setting and skips only the deployment steps; it does not fail, so a red run on `main` never means the deploy is broken.

## Firebase CMS

Firebase Authentication and Firestore power the optional editorial CMS. See `FIREBASE_AUTH_SETUP.md`, `CMS_SETUP.md`, `firestore.rules` and `firestore.indexes.json`.

Create administrator records only through a trusted Firebase console or administrative environment. Client applications cannot create administrator privileges.

## Privacy

The code does not make a GitHub repository or Vercel deployment private. Repository visibility and Vercel Deployment Protection must be configured in their respective account dashboards before private testing.

## Maintainer

Mehtab Ali — Founder and Academic Lead

For project questions or feedback, open a GitHub issue at [https://github.com/mehtabbiztech-byte/MUQABIL/issues](https://github.com/mehtabbiztech-byte/MUQABIL/issues).

## Teaching License writing practice

Open Teaching License → CRQ & ERQ Writing Practice. Existing question plans,
model answers and practice rubrics now accompany a timed writing session.
Answers and absolute deadlines are saved on the current device; leaving the
page does not pause the timer. Submission or expiry locks the response. A new
attempt clears that question’s saved response after confirmation.

After submission, learners can explicitly request criterion-by-criterion AI
feedback and revision steps. Feedback is practice guidance, not official marking
or a predicted exam score. The server requires `GEMINI_API_KEY` (the same key used
by the existing AI services). The endpoint is available in both the Express
server and Vercel at `/api/subjective-feedback`. Without the key, model answers
and rubrics remain available for self-review. Answers are sent to the AI provider
only when feedback is requested; AI feedback itself is not persisted.


## Interview Preparation Module

Open **Interview Prep** in the main navigation (Home also links straight into it).
The module covers the spoken stage that MCQ practice cannot reach:

- **Mock interview room** - choose an exam format (CSS/FPSC, PMS, PPSC posts, SPSC
  CCE, STS BPS-05 to 15, NTS-tested recruitment or a departmental panel), a panel
  format and a question count. The panel rotates through named seats (chairperson,
  current-affairs member, subject specialist, psychologist, communication
  evaluator), each answer is timed, and cross-questioning follows every answer.
  A session ends with a practice report and a printable PDF transcript.
- **AI interviewer** - when `GEMINI_API_KEY` is set, the panel seat asks the next
  question and cross-questions what the candidate actually wrote. Without a key
  the module falls back to the curated question bank and the local analyser, so
  nothing is blocked.
- **Answer feedback** - every answer is scored against seven transparent practice
  criteria (directness, structure, substance, relevance, clarity, composure,
  concision) by a local structural analyser, with optional AI criterion comments,
  quoted evidence, missing points and a rewritten opening.
- **Personality assessment** - 24 statements and 8 situational scenarios across
  six behavioural dimensions, producing a practice profile with panel questions
  to rehearse and a two-week review checkpoint. Results stay in the browser.

Question bank: 98 curated prompts across ten areas, each with the expected
cross-questions, an answer skeleton, what the panel listens for and the two
mistakes that damage good answers. Interview weights, panel composition and
qualifying rules change by cycle and by post, so every exam dossier carries a
`sourceNote`, a last-reviewed date and a link to the official portal (FPSC, PPSC,
SPSC, Sukkur IBA STS, NTS) rather than an unverifiable figure.

The server endpoint is `/api/interview-coach` (POST, plus GET for metadata) in
both the Express server and Vercel. It is rate-limited per client IP, treats
candidate answers as untrusted text, validates every model response before it
reaches the browser, and never produces official marks or a predicted interview
score. Practice reports are personal study records, not commission documents.

## Install MUQABIL as an app

On a supported browser, open the live site and select **Install App**. If the browser does not show an install prompt, use its menu and choose **Install app** or **Add to Home screen**. On iPhone or iPad, open MUQABIL in Safari, tap **Share**, then choose **Add to Home Screen**.

The installable web app caches its shell and same-origin files that have been opened. Sign-in, Firebase sync, live CMS updates, AI services, and uncached online resources require an internet connection. This PWA does not bundle Firebase credentials or server secrets into a download.
