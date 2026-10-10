/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CmsContentProvider } from './context/CmsContentContext';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { CustomDomainModal } from './components/CustomDomainModal';
import { CertificateModal } from './components/CertificateModal';
import { AttractiveBackground } from './components/AttractiveBackground';
import { SidebarLayout } from './components/SidebarLayout';
import { SplitWorkspaceLayout } from './components/SplitWorkspaceLayout';
import { ZenFocusLayout } from './components/ZenFocusLayout';
import { LayoutSwitcherModal } from './components/LayoutSwitcherModal';
import { InstallAppButton } from './components/InstallAppButton';

// Views are lazy-loaded so the initial bundle only contains the app shell.
// Each view (and the large data banks it owns) ships as its own chunk and is
// fetched on first visit.
const HomeView = React.lazy(() => import('./views/HomeView').then((m) => ({ default: m.HomeView })));
const McqsView = React.lazy(() => import('./views/McqsView').then((m) => ({ default: m.McqsView })));
const QuizView = React.lazy(() => import('./views/QuizView').then((m) => ({ default: m.QuizView })));
const PastPapersView = React.lazy(() => import('./views/PastPapersView').then((m) => ({ default: m.PastPapersView })));
const CurrentAffairsView = React.lazy(() => import('./views/CurrentAffairsView').then((m) => ({ default: m.CurrentAffairsView })));
const ExamsView = React.lazy(() => import('./views/ExamsView').then((m) => ({ default: m.ExamsView })));
const JobsView = React.lazy(() => import('./views/JobsView').then((m) => ({ default: m.JobsView })));
const StudyNotesView = React.lazy(() => import('./views/StudyNotesView').then((m) => ({ default: m.StudyNotesView })));
const RankingsView = React.lazy(() => import('./views/RankingsView').then((m) => ({ default: m.RankingsView })));
const AboutView = React.lazy(() => import('./views/AboutView').then((m) => ({ default: m.AboutView })));
const SavedMcqsView = React.lazy(() => import('./views/SavedMcqsView').then((m) => ({ default: m.SavedMcqsView })));
const AdminView = React.lazy(() => import('./views/AdminView').then((m) => ({ default: m.AdminView })));
const LearningLabView = React.lazy(() => import('./views/LearningLabView').then((m) => ({ default: m.LearningLabView })));
const GeminiChatView = React.lazy(() => import('./views/GeminiChatView').then((m) => ({ default: m.GeminiChatView })));
const ResumeView = React.lazy(() => import('./views/ResumeView').then((m) => ({ default: m.ResumeView })));

const ViewLoader: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center" role="status" aria-label="Loading section">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
  </div>
);
import { WordMeaningPopup } from './components/WordMeaningPopup';
import { GeminiFloatingWidget } from './components/GeminiFloatingWidget';
import { AgeEligibilityCalculator } from './components/AgeEligibilityCalculator';
import { AgeEligibilityModal } from './components/AgeEligibilityModal';
import { PrintablePastPaperModal } from './components/PrintablePastPaperModal';
import { TechnicalDetailsModal } from './components/TechnicalDetailsModal';

const TabContent: React.FC = () => {
  const { tab } = useApp();
  return (
    <React.Suspense fallback={<ViewLoader />}>
      {tab === 'home' && <HomeView />}
      {tab === 'mcqs' && <McqsView />}
      {tab === 'quiz' && <QuizView />}
      {tab === 'past-papers' && <PastPapersView />}
      {tab === 'current-affairs' && <CurrentAffairsView />}
      {tab === 'exams' && <ExamsView />}
      {tab === 'jobs' && <JobsView />}
      {tab === 'resume' && <ResumeView />}
      {tab === 'study-notes' && <StudyNotesView />}
      {tab === 'rankings' && <RankingsView />}
      {tab === 'learning-lab' && <LearningLabView />}
      {tab === 'ai-chat' && <GeminiChatView />}
      {tab === 'about' && <AboutView />}
      {tab === 'bookmarks' && <SavedMcqsView initialSubTab="bookmarks" />}
      {tab === 'mistakes' && <SavedMcqsView initialSubTab="mistakes" />}
      {tab === 'age-calculator' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AgeEligibilityCalculator />
        </div>
      )}
      {tab === 'past-papers-pdf' && <PastPapersView />}
    </React.Suspense>
  );
};

const MainContent: React.FC = () => {
  const { 
    domainModalOpen, 
    setDomainModalOpen,
    techModalOpen,
    setTechModalOpen,
    activeCertificate,
    isCertificateModalOpen,
    closeCertificateModal,
    updateCertificateCandidateName,
  } = useApp();

  const { shellLayout, getContainerClass, getContentSpacingClass } = useLayout();

  if (window.location.pathname.startsWith('/admin')) {
    return (
      <React.Suspense fallback={<ViewLoader />}>
        <AdminView />
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-500 relative selection:bg-purple-600 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Eye-catching ambient background lighting & patterns */}
      <AttractiveBackground />

      {/* Dynamic Shell Layout Rendering */}
      {shellLayout === 'sidebar' ? (
        <SidebarLayout>
          <TabContent />
        </SidebarLayout>
      ) : shellLayout === 'split' ? (
        <SplitWorkspaceLayout>
          <TabContent />
        </SplitWorkspaceLayout>
      ) : shellLayout === 'zen' ? (
        <ZenFocusLayout>
          <TabContent />
        </ZenFocusLayout>
      ) : (
        /* Classic Standard Top-Nav Layout */
        <>
          <Navbar />
          
          <main className={`flex-1 relative z-10 w-full max-w-full pb-16 sm:pb-0 ${getContainerClass()} ${getContentSpacingClass()}`}>
            <TabContent />
          </main>

          <Footer />
        </>
      )}

      {/* Global Modals & Controls */}
      <SearchModal />
      <AuthModal />
      <ContactModal />
      <AgeEligibilityModal />
      <PrintablePastPaperModal />
      <CustomDomainModal 
        isOpen={domainModalOpen} 
        onClose={() => setDomainModalOpen(false)} 
      />
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          isOpen={isCertificateModalOpen}
          onClose={closeCertificateModal}
          onUpdateCandidateName={updateCertificateCandidateName}
        />
      )}

      {/* Layout Settings Dialog */}
      <LayoutSwitcherModal />

      {/* Technical Details & Specifications Manual Modal */}
      <TechnicalDetailsModal 
        isOpen={techModalOpen} 
        onClose={() => setTechModalOpen(false)} 
      />

      {/* Floating Gemini AI Chatbot accessible across all pages */}
      <GeminiFloatingWidget />
      <InstallAppButton />

      {/* Click any readable word for Simple English, Urdu and Sindhi meanings */}
      <WordMeaningPopup />

    </div>
  );
};

export default function App() {
  const isAdminPath = window.location.pathname.replace(/\/$/, '') === '/admin';
  return (
    <AppProvider>
      <LayoutProvider>
        <CmsContentProvider>
          {isAdminPath ? (
            <React.Suspense fallback={<ViewLoader />}>
              <AdminView />
            </React.Suspense>
          ) : (
            <MainContent />
          )}
        </CmsContentProvider>
      </LayoutProvider>
    </AppProvider>
  );
}

