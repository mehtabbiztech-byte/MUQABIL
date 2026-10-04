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

import { HomeView } from './views/HomeView';
import { McqsView } from './views/McqsView';
import { QuizView } from './views/QuizView';
import { PastPapersView } from './views/PastPapersView';
import { CurrentAffairsView } from './views/CurrentAffairsView';
import { ExamsView } from './views/ExamsView';
import { JobsView } from './views/JobsView';
import { StudyNotesView } from './views/StudyNotesView';
import { RankingsView } from './views/RankingsView';
import { AboutView } from './views/AboutView';
import { SavedMcqsView } from './views/SavedMcqsView';
import { AdminView } from './views/AdminView';
import { LearningLabView } from './views/LearningLabView';
import { GeminiChatView } from './views/GeminiChatView';
import { ResumeView } from './views/ResumeView';
import { WordMeaningPopup } from './components/WordMeaningPopup';
import { GeminiFloatingWidget } from './components/GeminiFloatingWidget';
import { AgeEligibilityCalculator } from './components/AgeEligibilityCalculator';
import { AgeEligibilityModal } from './components/AgeEligibilityModal';
import { PrintablePastPaperModal } from './components/PrintablePastPaperModal';

const TabContent: React.FC = () => {
  const { tab } = useApp();
  return (
    <>
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
    </>
  );
};

const MainContent: React.FC = () => {
  const { 
    domainModalOpen, 
    setDomainModalOpen,
    activeCertificate,
    isCertificateModalOpen,
    closeCertificateModal,
    updateCertificateCandidateName,
  } = useApp();

  const { shellLayout, getContainerClass, getContentSpacingClass } = useLayout();

  if (window.location.pathname.startsWith('/admin')) return <AdminView />;

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
        <CmsContentProvider>{isAdminPath ? <AdminView /> : <MainContent />}</CmsContentProvider>
      </LayoutProvider>
    </AppProvider>
  );
}

