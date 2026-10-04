import React, { useState } from 'react';
import { 
  Globe, 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  Server, 
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomDomainModal: React.FC<CustomDomainModalProps> = ({ isOpen, onClose }) => {
  const [domainInput, setDomainInput] = useState('muqabil.pk');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const cleanDomain = domainInput.trim().replace(/^https?:\/\//, '').replace(/\/$/, '') || 'muqabil.pk';
  const isSubdomain = cleanDomain.split('.').length > 2 && !cleanDomain.startsWith('www.');

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vercel Deployment Guide</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Add Custom Domain to MEQSA Study Platform
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Domain Transition Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Current Vercel URL
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Target Custom Domain
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 truncate max-w-xs" title="muqabil.vercel.app">
                muqabil.vercel.app
              </span>
              <div className="flex items-center gap-2 text-emerald-400 font-bold shrink-0">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm text-emerald-300">muqabil.pk</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Linking <strong className="text-white">muqabil.pk</strong> will replace the temporary preview URL with your official domain.
            </p>
          </div>

          {/* Domain Input Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Domain Name:
            </label>
            <div className="relative">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="muqabil.pk"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Live DNS records calculated below for <strong className="text-emerald-600 dark:text-emerald-400">{cleanDomain}</strong>.
            </p>
          </div>

          {/* DNS Records Box */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Required DNS Records at Your Registrar</span>
            </h3>

            {/* A Record */}
            {!isSubdomain && (
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold">
                      A Record
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Root Domain ({cleanDomain})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy('76.76.21.21', 'a_record')}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    {copiedKey === 'a_record' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'a_record' ? 'Copied' : 'Copy IP'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-sans block">Type</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">A</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-sans block">Name / Host</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">@</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-sans block">Value / Target</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">76.76.21.21</span>
                  </div>
                </div>
              </div>
            )}

            {/* CNAME Record */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-600 text-white text-[11px] font-bold">
                    CNAME Record
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isSubdomain ? `Subdomain (${cleanDomain})` : `WWW Alias (www.${cleanDomain})`}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('cname.vercel-dns.com', 'cname_record')}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {copiedKey === 'cname_record' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cname_record' ? 'Copied' : 'Copy Target'}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-sans block">Type</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">CNAME</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-sans block">Name / Host</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {isSubdomain ? cleanDomain.split('.')[0] : 'www'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-sans block">Value / Target</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">cname.vercel-dns.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Step Process */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3 Quick Steps in Vercel:
            </h4>
            
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <div>
                  <strong>Add Domain in Vercel Dashboard:</strong> Go to <strong>Project Settings → Domains</strong>, enter <code className="text-emerald-600 font-mono">{cleanDomain}</code>, and click <strong>Add</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <div>
                  <strong>Add DNS Records at Registrar:</strong> Go to your domain provider (e.g. PKNIC, Namecheap, GoDaddy, Cloudflare) and paste the <strong>A</strong> and <strong>CNAME</strong> records above.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </span>
                <div>
                  <strong>Automatic SSL:</strong> Vercel verifies the DNS propagation and automatically provisions a free <strong>HTTPS SSL certificate</strong> via Let's Encrypt.
                </div>
              </div>
            </div>
          </div>

          {/* Domain & HTTPS Security Note */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Domain Security (muqabil.pk)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Vercel provisions a free, auto-renewing Let's Encrypt SSL certificate within minutes of adding your DNS records. Once DNS verifies, <code className="font-mono font-bold">https://muqabil.pk</code> (or <code className="font-mono">https://muqabil.vercel.app</code>) goes live with fast edge caching and end-to-end HTTPS encryption.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Included in project root: <code className="font-mono text-emerald-600 font-bold">vercel.json</code> &amp; <code className="font-mono text-emerald-600 font-bold">README.md</code>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
