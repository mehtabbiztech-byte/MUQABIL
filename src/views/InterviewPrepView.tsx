import React, { useState } from 'react';
import { Brain, ClipboardList, FlaskConical, LayoutDashboard, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { InterviewModuleId } from '../types';
import { InterviewReadinessBoard } from '../components/interview/InterviewReadinessBoard';
import { MockInterviewRoom } from '../components/interview/MockInterviewRoom';
import { InterviewQuestionBank } from '../components/interview/InterviewQuestionBank';
import { PersonalityAssessment } from '../components/interview/PersonalityAssessment';
import { AnswerFeedbackLab } from '../components/interview/AnswerFeedbackLab';

const MODULES: { id: InterviewModuleId; label: string; icon: React.ReactNode; tone: string }[] = [
  { id: 'overview', label: 'Readiness board', icon: <LayoutDashboard className="h-4 w-4" />, tone: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' },
  { id: 'mock', label: 'Mock interview', icon: <Mic className="h-4 w-4" />, tone: 'bg-indigo-600 text-white' },
  { id: 'bank', label: 'Question bank', icon: <ClipboardList className="h-4 w-4" />, tone: 'bg-emerald-600 text-white' },
  { id: 'personality', label: 'Personality assessment', icon: <Brain className="h-4 w-4" />, tone: 'bg-purple-600 text-white' },
  { id: 'feedback', label: 'Answer feedback', icon: <FlaskConical className="h-4 w-4" />, tone: 'bg-teal-600 text-white' },
];

export const InterviewPrepView: React.FC = () => {
  const { interviewModule, openInterviewModule } = useApp();
  const [feedbackQuestionId, setFeedbackQuestionId] = useState<string | null>(null);

  return (
    <div id="interview-prep-view" className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {MODULES.map((module) => {
          const active = interviewModule === module.id;
          return (
            <button
              key={module.id}
              onClick={() => openInterviewModule(module.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs font-extrabold transition cursor-pointer sm:text-sm ${
                active
                  ? `${module.tone} shadow-md`
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {module.icon}
              <span>{module.label}</span>
            </button>
          );
        })}
      </div>

      {interviewModule === 'overview' && <InterviewReadinessBoard onOpenModule={openInterviewModule} />}

      {interviewModule === 'mock' && <MockInterviewRoom onOpenQuestionBank={() => openInterviewModule('bank')} />}

      {interviewModule === 'bank' && (
        <InterviewQuestionBank
          onPractiseQuestion={() => openInterviewModule('mock')}
          onAnalyseQuestion={(questionId) => {
            setFeedbackQuestionId(questionId);
            openInterviewModule('feedback');
          }}
        />
      )}

      {interviewModule === 'personality' && <PersonalityAssessment />}

      {interviewModule === 'feedback' && <AnswerFeedbackLab initialQuestionId={feedbackQuestionId} />}
    </div>
  );
};
