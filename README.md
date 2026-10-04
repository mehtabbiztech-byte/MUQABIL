# MEQSA Study Platform

MEQSA is a React, TypeScript, Vite and Firebase learning platform for Pakistani learners—from primary classes through university, recruitment tests and competitive examinations.

## Content transparency

- The STS bank contains 5,000 **generated practice items** built from deterministic templates. It is not presented as 5,000 official past-paper questions.
- The sourced Current Affairs collection reports its actual distinct Pakistan and World question counts in the interface.
- Past-paper entries are labelled as an official record, official sample or reconstructed/tagged practice selection.
- Certificates are personal practice-completion records. MEQSA does not assign national ranks or nationally calculated percentiles.
- Official agency links are provided where available, but MEQSA is independent and is not endorsed by an examination authority.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

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

The health endpoint is available at `/api/health`.

## Firebase CMS

Firebase Authentication and Firestore power the optional editorial CMS. See `FIREBASE_AUTH_SETUP.md`, `CMS_SETUP.md`, `firestore.rules` and `firestore.indexes.json`.

Create administrator records only through a trusted Firebase console or administrative environment. Client applications cannot create administrator privileges.

## Privacy

The code does not make a GitHub repository or Vercel deployment private. Repository visibility and Vercel Deployment Protection must be configured in their respective account dashboards before private testing.

## Maintainer

Mehtab Ali — Founder and Academic Lead

For project questions, open a GitHub issue in this repository.

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


## Install MUQABIL as an app

On a supported browser, open the live site and select **Install App**. If the browser does not show an install prompt, use its menu and choose **Install app** or **Add to Home screen**. On iPhone or iPad, open MUQABIL in Safari, tap **Share**, then choose **Add to Home Screen**.

The installable web app caches its shell and same-origin files that have been opened. Sign-in, Firebase sync, live CMS updates, AI services, and uncached online resources require an internet connection. This PWA does not bundle Firebase credentials or server secrets into a download.
