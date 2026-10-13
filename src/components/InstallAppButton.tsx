import React, { useEffect, useState } from 'react';
import { Download, X, Sparkles, Check, Share2, Smartphone } from 'lucide-react';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallAppButton: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    setIsInstalled(standalone);
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onBeforeInstall = (event: Event) => {
      // Prevent browser default mini-infobar to present the custom branded banner
      event.preventDefault();
      const promptEvent = event as InstallPromptEvent;
      setInstallPrompt(promptEvent);

      // Check if user has previously dismissed the banner in this session
      const dismissed = sessionStorage.getItem('muqabil_install_banner_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowHelp(false);
      setShowBanner(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      setShowHelp((open) => !open);
      return;
    }
    try {
      // Must call prompt() in direct response to user gesture
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setShowBanner(false);
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    } finally {
      setInstallPrompt(null);
      setShowBanner(false);
    }
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    try {
      sessionStorage.setItem('muqabil_install_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (isInstalled) return null;

  return (
    <>
      {/* 1. INTERACTIVE PWA INSTALL BANNER */}
      {showBanner && installPrompt && (
        <aside
          role="region"
          aria-label="Install MUQABIL application prompt"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[26rem] z-50 rounded-3xl bg-slate-950/95 text-white border border-emerald-500/40 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/30 border border-emerald-400/30">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white truncate">Install MUQABIL</h3>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    APP
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  Offline tests, instant OMR &amp; full-screen view
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismissBanner}
              aria-label="Close install banner"
              className="rounded-xl p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-3 transition shadow-md shadow-emerald-700/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={14} />
              <span>Install Now</span>
            </button>
            <button
              type="button"
              onClick={handleDismissBanner}
              className="rounded-xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 font-semibold py-2.5 px-3.5 transition cursor-pointer"
            >
              Later
            </button>
          </div>
        </aside>
      )}

      {/* 2. PERSISTENT FLOATING INSTALL BUTTON & MANUAL INSTRUCTIONS */}
      <div className="fixed bottom-20 left-4 z-40 sm:bottom-6">
        {showHelp && (
          <section
            aria-label="Install MUQABIL instructions"
            className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-emerald-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 p-5 text-sm text-slate-800 dark:text-slate-100 shadow-2xl animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">Install MUQABIL</h4>
                    <p className="text-[11px] text-slate-500">Fast offline-ready mobile web app</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 text-xs space-y-2 text-slate-600 dark:text-slate-300">
                  {isIos ? (
                    <div className="space-y-1.5">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Share2 size={13} className="text-blue-500" />
                        <span>iOS Safari Instructions:</span>
                      </p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>Tap the <strong>Share</strong> button (box with upward arrow).</li>
                        <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                        <li>Tap <strong>Add</strong> in the top-right corner.</li>
                      </ol>
                    </div>
                  ) : installPrompt ? (
                    <div className="space-y-1.5">
                      <p className="font-bold text-slate-900 dark:text-white">Ready to Install:</p>
                      <p>Click the button below to prompt native device installation.</p>
                      <button
                        type="button"
                        onClick={handleInstallClick}
                        className="w-full mt-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Download size={14} />
                        <span>Add to Home Screen</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">Browser Menu:</p>
                      <p>Open your browser menu (⋮) and tap <strong>“Install app”</strong> or <strong>“Add to Home screen”</strong>.</p>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
                  Once installed, practice tests and study notes open full-screen and work offline.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
                aria-label="Close install instructions"
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={16} />
              </button>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={handleInstallClick}
          className="flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 px-4 py-3 font-extrabold text-white shadow-xl transition active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 text-xs sm:text-sm"
          aria-label={installPrompt ? 'Install MUQABIL app' : 'Show instructions to install MUQABIL'}
        >
          <Download size={18} />
          <span>Install App</span>
        </button>
      </div>
    </>
  );
};
