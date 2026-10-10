import React, { useState, useEffect, useRef } from 'react';
import {
  Swords,
  Users,
  Award,
  ThumbsUp,
  ShieldCheck,
  Plus,
  Clock,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  Share2,
  Search,
  BookOpen,
} from 'lucide-react';
import { MNEMONICS_DATA, MnemonicItem } from '../../lib/adaptiveLearning';

const BATTLE_QUESTIONS = [
  {
    q: 'The "Liaquat-Nehru Pact" of 1950 primarily dealt with:',
    options: ['Protection of Minorities', 'Kashmir Plebiscite', 'Water Sharing', 'Trade Route Access'],
    correct: 0,
  },
  {
    q: 'What is the sum of angles in a quadrilateral?',
    options: ['180°', '360°', '540°', '720°'],
    correct: 1,
  },
  {
    q: 'The famous "Bolan Pass" connects Quetta with:',
    options: ['Kandahar', 'Sibi & Jacobabad', 'Peshawar', 'Iran'],
    correct: 1,
  },
  {
    q: 'Synonym of "EPHEMERAL" is:',
    options: ['Permanent', 'Fleeting', 'Eternal', 'Sublime'],
    correct: 1,
  },
  {
    q: 'Who was the first woman judge of the Supreme Court of Pakistan?',
    options: ['Justice Ayesha A. Malik', 'Justice Majida Rizvi', 'Justice Nasira Iqbal', 'Justice Khalida Rashid'],
    correct: 0,
  },
];

interface Circle {
  id: string;
  name: string;
  targetExam: string;
  members: number;
  assignedTopic: string;
  avgAccuracy: number;
}

const INITIAL_CIRCLES: Circle[] = [
  {
    id: 'circle-1',
    name: 'Sukkur STS IBA Batch 2026',
    targetExam: 'STS BPS-05 to 15',
    members: 14,
    assignedTopic: 'Prepositions & Percentage Drills',
    avgAccuracy: 76,
  },
  {
    id: 'circle-2',
    name: 'Sindh CCE Aspirants Study Group',
    targetExam: 'SPSC CCE Screening',
    members: 22,
    assignedTopic: '1973 Constitution Articles 1-50',
    avgAccuracy: 68,
  },
];

export const CommunityCompetitive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'battle' | 'circles' | 'mnemonics'>('battle');

  // Battle State
  const [battleActive, setBattleActive] = useState(false);
  const [battleQuestionIdx, setBattleQuestionIdx] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [battleTimer, setBattleTimer] = useState(60);
  const [selectedBattleOption, setSelectedBattleOption] = useState<number | null>(null);
  const [opponentName] = useState('Practice Bot (Simulated)');
  const timerIntervalRef = useRef<number | null>(null);

  // Circles State
  const [circles, setCircles] = useState<Circle[]>(INITIAL_CIRCLES);
  const [newCircleName, setNewCircleName] = useState('');
  const [newCircleExam, setNewCircleExam] = useState('STS BPS-05 to 15');

  // Mnemonics State
  const [mnemonics, setMnemonics] = useState<MnemonicItem[]>(MNEMONICS_DATA);
  const [mnemonicSearch, setMnemonicSearch] = useState('');
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [showAddMnemonicModal, setShowAddMnemonicModal] = useState(false);
  const [newMnemonicTitle, setNewMnemonicTitle] = useState('');
  const [newMnemonicText, setNewMnemonicText] = useState('');
  const [newMnemonicMeaning, setNewMnemonicMeaning] = useState('');
  const [newMnemonicSubject, setNewMnemonicSubject] = useState('Pakistan Affairs');

  // Battle loop timer
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const startMatch = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setBattleActive(true);
    setBattleTimer(60);
    setUserScore(0);
    setOpponentScore(0);
    setBattleQuestionIdx(0);
    setSelectedBattleOption(null);

    let secs = 60;
    timerIntervalRef.current = window.setInterval(() => {
      secs -= 1;
      setBattleTimer(secs);

      // Opponent auto-answers periodically
      if (secs === 48 || secs === 35 || secs === 20 || secs === 8) {
        setOpponentScore((prev) => Math.min(5, prev + 1));
      }

      if (secs <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        setBattleActive(false);
      }
    }, 1000);
  };

  const handleBattleAnswer = (idx: number) => {
    if (selectedBattleOption !== null) return;
    setSelectedBattleOption(idx);

    const isCorrect = idx === BATTLE_QUESTIONS[battleQuestionIdx].correct;
    if (isCorrect) {
      setUserScore((s) => s + 1);
    }

    setTimeout(() => {
      if (battleQuestionIdx + 1 < BATTLE_QUESTIONS.length && battleTimer > 0) {
        setBattleQuestionIdx((q) => q + 1);
        setSelectedBattleOption(null);
      } else {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        setBattleActive(false);
      }
    }, 800);
  };

  // Mnemonic upvote
  const handleUpvoteMnemonic = (id: string) => {
    if (votedIds.has(id)) return;
    setVotedIds((prev) => new Set(prev).add(id));
    setMnemonics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, upvotes: m.upvotes + 1 } : m))
    );
  };

  // Add mnemonic
  const handleCreateMnemonic = () => {
    if (!newMnemonicTitle.trim() || !newMnemonicText.trim()) return;
    const item: MnemonicItem = {
      id: `mn-custom-${Date.now()}`,
      title: newMnemonicTitle.trim(),
      mnemonic: newMnemonicText.trim(),
      meaning: newMnemonicMeaning.trim(),
      subject: newMnemonicSubject,
      verifiedBy: 'Submitted by You (Under Review)',
      upvotes: 1,
      tags: [newMnemonicSubject, 'User Contributed'],
    };
    setMnemonics([item, ...mnemonics]);
    setShowAddMnemonicModal(false);
    setNewMnemonicTitle('');
    setNewMnemonicText('');
    setNewMnemonicMeaning('');
  };

  // Create circle
  const handleCreateCircle = () => {
    if (!newCircleName.trim()) return;
    const c: Circle = {
      id: `c-${Date.now()}`,
      name: newCircleName.trim(),
      targetExam: newCircleExam,
      members: 1,
      assignedTopic: 'New Cohort Diagnostic Quiz',
      avgAccuracy: 0,
    };
    setCircles([c, ...circles]);
    setNewCircleName('');
  };

  const filteredMnemonics = mnemonics.filter(
    (m) =>
      m.title.toLowerCase().includes(mnemonicSearch.toLowerCase()) ||
      m.mnemonic.toLowerCase().includes(mnemonicSearch.toLowerCase()) ||
      m.subject.toLowerCase().includes(mnemonicSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('battle')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'battle'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>1v1 Practice Showdown</span>
          </button>

          <button
            onClick={() => setActiveTab('circles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'circles'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Study Circles & Academies</span>
          </button>

          <button
            onClick={() => setActiveTab('mnemonics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'mnemonics'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Mnemonics ({mnemonics.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
          Pillar 4: Community & Competitive Learning
        </span>
      </div>

      {/* 4A. 1v1 TIMED PRACTICE SHOWDOWN (simulated opponent, no multiplayer backend) */}
      {activeTab === 'battle' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-purple-950 to-slate-900 text-white border border-rose-500/30 shadow-xl">
            {/* Header / Scoreboard */}
            <div className="flex items-center justify-between">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  You (Candidate)
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
                  {userScore}
                </span>
              </div>

              <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                  Time Remaining
                </span>
                <span className="text-3xl font-black font-mono text-amber-300">
                  00:{String(battleTimer).padStart(2, '0')}
                </span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  {opponentName}
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono text-rose-400">
                  {opponentScore}
                </span>
              </div>
            </div>

            {/* Active Battle Arena */}
            {battleActive && battleTimer > 0 && battleQuestionIdx < BATTLE_QUESTIONS.length ? (
              <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-4 shadow-md">
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                  <span>Question {battleQuestionIdx + 1} of 5</span>
                  <span>Fastest answer gets point</span>
                </div>

                <h4 className="text-base sm:text-lg font-black">
                  {BATTLE_QUESTIONS[battleQuestionIdx].q}
                </h4>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {BATTLE_QUESTIONS[battleQuestionIdx].options.map((opt, idx) => {
                    const isSelected = selectedBattleOption === idx;
                    const isCorrect = idx === BATTLE_QUESTIONS[battleQuestionIdx].correct;
                    let btnClass = 'bg-slate-50 dark:bg-slate-800 hover:border-indigo-400 border-slate-200 dark:border-slate-700';

                    if (selectedBattleOption !== null) {
                      if (isCorrect) btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                      else if (isSelected) btnClass = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedBattleOption !== null}
                        onClick={() => handleBattleAnswer(idx)}
                        className={`p-3.5 rounded-xl border-2 text-left font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {selectedBattleOption !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center space-y-3">
                {userScore > 0 || opponentScore > 0 ? (
                  <div className="p-4 rounded-2xl bg-white/10 max-w-md mx-auto space-y-1">
                    <Trophy className="w-8 h-8 text-amber-300 mx-auto" />
                    <h4 className="text-lg font-black">
                      {userScore > opponentScore
                        ? '🏆 Victory! You outpaced your opponent!'
                        : userScore === opponentScore
                        ? '🤝 It is a Tie! Equal speed & accuracy.'
                        : '⚔️ Match Ended! Practice and rematch.'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      Final Score: You {userScore} — {opponentScore} {opponentName}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-300">
                    Start a 60-second rapid MCQ practice match against a simulated opponent and beat their pace to top the scoreboard.
                  </p>
                )}

                <button
                  onClick={startMatch}
                  className="px-8 py-3 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-100 transition cursor-pointer inline-flex items-center gap-2"
                >
                  <Swords className="w-4 h-4 text-rose-600" />
                  <span>{userScore > 0 || opponentScore > 0 ? 'Rematch Again' : 'Start 1v1 Practice Match'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4B. ACADEMY & TEACHER COHORT PORTALS */}
      {activeTab === 'circles' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60">
            <div>
              <h3 className="text-base sm:text-lg font-black text-sky-950 dark:text-sky-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                <span>Study Circles & Academy Cohort Hub</span>
              </h3>
              <p className="text-xs text-sky-800/80 dark:text-sky-300 mt-0.5">
                Join or establish a private cohort for your academy, coaching center, or local peers to share diagnostic batches.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newCircleName}
                onChange={(e) => setNewCircleName(e.target.value)}
                placeholder="Circle Name (e.g. Sukkur Toppers)..."
                className="px-3.5 py-2 rounded-xl text-xs border border-sky-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleCreateCircle}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white font-black text-xs hover:bg-sky-500 transition cursor-pointer shrink-0"
              >
                + Create Circle
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {circles.map((circle) => (
              <div
                key={circle.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm hover:border-sky-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {circle.targetExam}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    {circle.members} Active Candidates
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {circle.name}
                </h4>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <span className="text-slate-400 font-bold block">Current Cohort Assignment:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{circle.assignedTopic}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-500">
                    Cohort Avg: <strong>{circle.avgAccuracy || 72}%</strong>
                  </span>
                  <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition cursor-pointer">
                    Open Cohort Leaderboard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4C. CROWDSOURCED & VERIFIED MNEMONICS LIBRARY */}
      {activeTab === 'mnemonics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-fuchsia-600" />
                <span>Verified Top Scorer Mnemonics</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Peer-tested memory shortcuts validated against official past papers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mnemonicSearch}
                  onChange={(e) => setMnemonicSearch(e.target.value)}
                  placeholder="Search mnemonics..."
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <button
                onClick={() => setShowAddMnemonicModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Share Mnemonic</span>
              </button>
            </div>
          </div>

          {/* Mnemonics Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredMnemonics.map((item) => {
              const hasVoted = votedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-900/60 bg-white dark:bg-slate-900 space-y-3 shadow-sm hover:border-fuchsia-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300">
                      {item.subject}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {item.verifiedBy}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>

                  <div className="p-3 rounded-xl bg-fuchsia-50/80 dark:bg-fuchsia-950/40 border border-fuchsia-200 dark:border-fuchsia-900/60 font-black text-fuchsia-900 dark:text-fuchsia-200 text-sm">
                    {item.mnemonic}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.meaning}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleUpvoteMnemonic(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        hasVoted
                          ? 'bg-fuchsia-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-fuchsia-100'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{hasVoted ? 'Helpful (Voted)' : 'Helpful'} • {item.upvotes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Mnemonic Modal */}
          {showAddMnemonicModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 max-w-lg w-full space-y-4 shadow-2xl">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    Contribute a Proven Mnemonic
                  </h4>
                  <button
                    onClick={() => setShowAddMnemonicModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Topic / Concept:
                    </label>
                    <input
                      type="text"
                      value={newMnemonicTitle}
                      onChange={(e) => setNewMnemonicTitle(e.target.value)}
                      placeholder="e.g. Mughal Emperors Chronology"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      The Mnemonic Acronym / Phrase:
                    </label>
                    <input
                      type="text"
                      value={newMnemonicText}
                      onChange={(e) => setNewMnemonicText(e.target.value)}
                      placeholder="e.g. BHAJSA (Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb)"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Meaning / Breakdown:
                    </label>
                    <textarea
                      rows={3}
                      value={newMnemonicMeaning}
                      onChange={(e) => setNewMnemonicMeaning(e.target.value)}
                      placeholder="Explain what each letter represents..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowAddMnemonicModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateMnemonic}
                    className="px-5 py-2 rounded-xl bg-fuchsia-600 text-white font-black text-xs hover:bg-fuchsia-500 transition cursor-pointer"
                  >
                    Submit for Peer Verification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
