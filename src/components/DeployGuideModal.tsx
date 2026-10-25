import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, Globe, Cloud, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface DeployGuideModalProps {
  currentLang: Language;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = (key: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-950/5">
      
      {/* Title */}
      <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.howToDeploy}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Beginner-friendly guide to run locally and deploy to Cloudflare Pages & GitHub Pages for $0.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">

        {/* Step 1: Local Development */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span>Step 1: Run Locally on Your Computer</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Open your terminal or command prompt, clone your repository, install dependencies, and start the local dev server:
          </p>
          <div className="relative">
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
{`# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev`}
            </pre>
            <button
              onClick={() => copyCode('local', 'npm install\nnpm run dev')}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs flex items-center gap-1"
              aria-label="Copy code"
            >
              {copiedSnippet === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Step 2: Deploy to Cloudflare Pages */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
            <Cloud className="w-4 h-4 text-amber-500" />
            <span>Step 2: Deploy Free on Cloudflare Pages (Recommended)</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3">
            <li>Push your code to a new repository on <strong className="text-slate-900 dark:text-white">GitHub</strong>.</li>
            <li>Log into the <strong className="text-slate-900 dark:text-white">Cloudflare Dashboard</strong> and navigate to <em>Compute (Workers & Pages)</em>.</li>
            <li>Click <em>Create application</em> &rarr; <em>Pages</em> &rarr; <em>Connect to Git</em>.</li>
            <li>Select your repository and configure the build settings:</li>
          </ol>
          <div className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono space-y-1">
            <div><span className="text-slate-500">Framework preset:</span> <span className="text-cyan-400">Vite</span></div>
            <div><span className="text-slate-500">Build command:</span> <span className="text-cyan-400">npm run build</span></div>
            <div><span className="text-slate-500">Build output directory:</span> <span className="text-cyan-400">dist</span></div>
          </div>
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            ✓ Cloudflare Pages provides free unlimited bandwidth, worldwide CDN caching, and automatic SSL certificates.
          </p>
        </div>

        {/* Step 3: Self-Hosting a Cobalt Backend (Optional) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Step 3: Self-Host a Cobalt API (Optional for Power Users)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            If you wish to process restricted video streaming platforms without third-party rate limits, run your own private Cobalt Docker container:
          </p>
          <div className="relative">
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
{`docker run -d \\
  --name cobalt-api \\
  --restart always \\
  -p 9000:9000 \\
  -e API_URL="http://localhost:9000" \\
  ghcr.io/imputnet/cobalt:10`}
            </pre>
            <button
              onClick={() => copyCode('docker', 'docker run -d --name cobalt-api --restart always -p 9000:9000 -e API_URL="http://localhost:9000" ghcr.io/imputnet/cobalt:10')}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs flex items-center gap-1"
              aria-label="Copy code"
            >
              {copiedSnippet === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Then open <strong className="text-slate-800 dark:text-slate-200">Settings</strong> in this app, toggle on <em>Connect Self-Hosted Backend</em>, and input <code className="text-cyan-500 font-mono">http://localhost:9000</code>.
          </p>
        </div>

      </div>

    </div>
  );
};
