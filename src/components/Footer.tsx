import React from "react";
import { Sparkles, ExternalLink, ShieldCheck, Database, Cpu } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#060911] text-slate-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">PitchPulse AI</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              Capstone Project-5
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Built by <strong className="text-slate-200">Vanshika Bhatia</strong> for the ANDP Capstone SaaS Launch. Evaluated by ARIA on architecture, database integrity, and live deployment stability.
          </p>
        </div>

        {/* Tech Stack badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <Cpu className="w-3 h-3 text-cyan-400" />
            Next.js 16 App Router
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <Database className="w-3 h-3 text-emerald-400" />
            Prisma ORM & PostgreSQL
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            ARIA Verified
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/vanshikavbhatia/pitch-pulse"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 transition"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://pitch-pulse-vanshika.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-xs text-indigo-300 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Vercel</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>© 2026 PitchPulse · All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Submission Deadline: Jul 22, 2026</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">Status: Live & 100% Functional</span>
        </p>
      </div>
    </footer>
  );
}
