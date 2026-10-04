import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppButton: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    setIsInstalled(standalone);
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowHelp(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) {
      setShowHelp((open) => !open);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setIsInstalled(true);
    setInstallPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 sm:bottom-6">
      {showHelp && (
        <section
          aria-label="Install MUQABIL instructions"
          className="mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-slate-800 shadow-2xl dark:border-emerald-900 dark:bg-slate-900 dark:text-slate-100"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold">Install MUQABIL</h2>
              <p className="mt-2">
                {isIos
                  ? 'In Safari, tap Share, then Add to Home Screen.'
                  : 'Open your browser menu and choose “Install app” or “Add to Home screen”.'}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                The app shell and files you open can be available offline after loading. Sign-in, Firebase sync, live CMS updates and AI features need an internet connection.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              aria-label="Close install instructions"
              className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3 font-bold text-white shadow-xl transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        aria-label={installPrompt ? 'Install MUQABIL app' : 'Show instructions to install MUQABIL'}
      >
        <Download size={18} />
        <span>Install App</span>
      </button>
    </div>
  );
};
