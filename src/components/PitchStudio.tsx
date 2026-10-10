"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useUser } from "@/context/UserContext";
import { ScoreGauge } from "./ScoreGauge";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  HelpCircle,
  FileCheck,
  Send,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Share2,
} from "lucide-react";

interface PitchStudioProps {
  onPitchPublished?: () => void;
  onOpenDeck?: () => void;
  onOpenTeleprompter?: (script: string) => void;
}

const samplePresets = [
  {
    name: "PitchPulse (SaaS Capstone)",
    category: "AI & DevTools",
    title: "PitchPulse — Demo Day AI Pitch Auditor & Peer Review Network",
    tagline: "The AI Copilot that turns messy 3-minute scripts into winning investor pitches.",
    script: `Hello everyone, my name is Vanshika, and this is PitchPulse.

Did you know that 72% of founders lose their audience in the first 30 seconds of a Demo Day pitch? Most builders spend months building incredible software, only to deliver a rushed, jargon-heavy 3-minute talk that leaves investors and judges confused.

We experienced this exact problem firsthand. When preparing for our Capstone launch, we realized there are plenty of slide generators, but zero tools that critique your real spoken words, pace, and live demo delivery.

That's why we built PitchPulse — the AI Copilot and Peer Review Network designed specifically for Demo Day pitches and accelerator scripts.

Here is how it works:
First, you paste your 3-minute script or slide outline into PitchPulse. Our engine immediately calculates your Words Per Minute and highlights if you're speaking too fast or burying your hook.

Second, our multi-persona AI evaluates your pitch from three distinct angles: A Tier-1 VC partner checking your defensibility and moat, a Demo Day speaking coach sharpening your opening hook, and an ARIA technical reviewer verifying code architecture and database integrity.

Third, and most importantly: PitchPulse has an integrated Peer Review Exchange. Instead of practicing alone in your room, cohort peers and mentors can critique your pitch against a standardized rubric, vote on their favorite projects, and help you improve before you step on stage.

Under the hood, PitchPulse is a full-stack Next.js application built with TypeScript, Prisma ORM, and Google AI. We have already onboarded 12 active cohort builders who have exchanged over 35 peer reviews.

Our mission is simple: to make sure every great builder gets the Demo Day pitch they deserve. PitchPulse is live today on Vercel. Thank you!`,
  },
  {
    name: "DevScribe (Developer Tool)",
    category: "AI & DevTools",
    title: "DevScribe — Autonomous SDK & API Documentation Engine",
    tagline: "Zero-effort developer documentation synced automatically with git commits.",
    script: `Every engineering team hates writing documentation, and as a result, 65% of internal APIs are outdated or completely undocumented. DevScribe watches your GitHub pull requests, understands code changes using AST parsing, and automatically generates interactive OpenAPI docs and TypeScript SDKs. Stop wasting 5 hours every sprint writing markdown. With DevScribe, documentation is continuous and verified by compilers.`,
  },
  {
    name: "HyperLocal Bazaar (Marketplace)",
    category: "Marketplace",
    title: "CampusBazaar — Verified Student Escrow Marketplace",
    tagline: "Safe, student-verified peer trading for college campuses.",
    script: `College students lose over $800 every semester reselling textbooks to university bookstores at 10 cents on the dollar, while freshmen pay full retail price. General marketplaces like Craigslist or OLX are full of scammers and require risky off-campus meetups. CampusBazaar connects verified .edu students for safe on-campus handoffs with escrow payments.`,
  },
];

export function PitchStudio({
  onPitchPublished,
  onOpenDeck,
  onOpenTeleprompter,
}: PitchStudioProps) {
  const { currentUser } = useUser();
  const [title, setTitle] = useState(samplePresets[0].title);
  const [tagline, setTagline] = useState(samplePresets[0].tagline);
  const [category, setCategory] = useState(samplePresets[0].category);
  const [stage, setStage] = useState("Launched");
  const [targetMinutes, setTargetMinutes] = useState(3.0);
  const [scriptContent, setScriptContent] = useState(samplePresets[0].script);

  const [isAuditing, setIsAuditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const wordCount = scriptContent.trim().split(/\s+/).filter(Boolean).length;
  const estimatedMins = (wordCount / 138).toFixed(1);

  const handleAudit = async () => {
    if (!scriptContent.trim()) return;
    setIsAuditing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scriptContent,
          title,
          category,
          targetMinutes,
        }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        if (data.analysis.overallScore >= 85) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (e) {
      console.error("Audit error:", e);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/pitches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          title,
          tagline,
          category,
          stage,
          targetMinutes,
          scriptContent,
          repoUrl: "https://github.com/vanshikavbhatia/pitch-pulse",
          demoUrl: "https://pitch-pulse-vanshika.vercel.app",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
        });
        setTimeout(() => setSaveSuccess(false), 4000);
        if (onPitchPublished) onPitchPublished();
      }
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const loadPreset = (preset: (typeof samplePresets)[0]) => {
    setTitle(preset.title);
    setTagline(preset.tagline);
    setCategory(preset.category);
    setScriptContent(preset.script);
    setAnalysis(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Editor & Configuration Section */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1322] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Interactive Studio
              </span>
              <span className="text-xs text-slate-400">Step 1: Draft or Load Script</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">3-Minute Demo Day Pitch Studio</h2>
          </div>

          {/* Quick preset loader */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 mr-1 font-medium">Load Preset:</span>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="AI & DevTools">AI & DevTools</option>
              <option value="FinTech">FinTech</option>
              <option value="SaaS & Productivity">SaaS & Productivity</option>
              <option value="Health & Bio">Health & Bio</option>
              <option value="Marketplace">Marketplace</option>
            </select>
          </div>
        </div>

        {/* Pitch Script Textarea */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span>Spoken Talk Track / Script</span>
              <span className="text-[10px] text-indigo-400 font-normal">
                (Target: 350-450 words for 3 minutes)
              </span>
            </label>

            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-mono">
                <strong className="text-white">{wordCount}</strong> words
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-400" />
                ~<strong className="text-white">{estimatedMins}</strong> mins
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  wordCount >= 320 && wordCount <= 460
                    ? "bg-emerald-500/20 text-emerald-300"
                    : wordCount < 320
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {wordCount >= 320 && wordCount <= 460
                  ? "Optimal Pacing"
                  : wordCount < 320
                  ? "Too Brief"
                  : "Too Long"}
              </span>
            </div>
          </div>

          <textarea
            rows={10}
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            placeholder="Paste your 3-minute pitch speech here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        {/* Action button toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {onOpenTeleprompter && (
              <button
                onClick={() => onOpenTeleprompter(scriptContent)}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition"
              >
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Test in Teleprompter
              </button>
            )}
            {onOpenDeck && (
              <button
                onClick={onOpenDeck}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                View 7-Slide Deck
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAudit}
              disabled={isAuditing || !scriptContent.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Auditing with Multi-Persona AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  Run Live ARIA & VC Audit
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Dashboard */}
      {analysis && (
        <div className="rounded-2xl border border-indigo-500/30 bg-[#0d1322] p-6 shadow-2xl space-y-6 animate-fadeIn">
          {/* Header score card */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ScoreGauge
                score={analysis.overallScore}
                label="Overall Pitch Score"
                size="lg"
                subtext="Calibrated to VC & Demo Day standard"
              />

              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {analysis.overallScore >= 90
                      ? "Demo Day Ready"
                      : analysis.overallScore >= 80
                      ? "Strong Pitch · Ready for Polish"
                      : "Needs Rehearsal"}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {analysis.wordCount} words · ~{analysis.estimatedMinutes} mins
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Multi-Persona Audit Complete
                </h3>
                <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
                  Evaluated across Hook Urgency, Value Proposition, Technical Defensibility (ARIA rubric), and Voice Pacing.
                </p>
              </div>
            </div>

            {/* Save to Database Button */}
            <div className="flex flex-col items-end gap-2 w-full lg:w-auto">
              <button
                onClick={handleSaveToDatabase}
                disabled={isSaving}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving to Prisma Database...
                  </>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Saved to Database & Cohort Hub!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Save & Publish to Cohort Review Network
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-400">
                Logged under: <strong className="text-slate-200">{currentUser.name}</strong>
              </span>
            </div>
          </div>

          {/* Metric Sub-gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <ScoreGauge score={analysis.hookScore} size="sm" />
              <span className="text-xs font-bold text-white mt-2">Hook Urgency</span>
              <span className="text-[10px] text-slate-400 text-center mt-1">First 30 seconds</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <ScoreGauge score={analysis.problemScore} size="sm" />
              <span className="text-xs font-bold text-white mt-2">Problem Fit</span>
              <span className="text-[10px] text-slate-400 text-center mt-1">Pain clarity</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <ScoreGauge score={analysis.techScore} size="sm" />
              <span className="text-xs font-bold text-white mt-2">Tech Defensibility</span>
              <span className="text-[10px] text-slate-400 text-center mt-1">ARIA architecture</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <ScoreGauge score={analysis.deliveryScore} size="sm" />
              <span className="text-xs font-bold text-white mt-2">Voice & Pacing</span>
              <span className="text-[10px] text-slate-400 text-center mt-1">138 WPM optimal</span>
            </div>
          </div>

          {/* Deep-dive Critiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Opening Hook Critique</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{analysis.hookCritique}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Technical & ARIA Review</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{analysis.techCritique}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>Commercial & Market Fit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{analysis.marketCritique}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Clock className="w-4 h-4" />
                <span>Delivery & Timing Telemetry</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{analysis.deliveryCritique}</p>
            </div>
          </div>

          {/* 3 Punchy Hook Rewrites */}
          {analysis.punchyHookSuggestions && analysis.punchyHookSuggestions.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  3 High-Impact Hook Rewrites (Generated by AI)
                </h4>
                <span className="text-[10px] text-slate-400">Click to preview</span>
              </div>

              <div className="space-y-2">
                {analysis.punchyHookSuggestions.map((hook: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start justify-between gap-3 group hover:border-indigo-500/40 transition"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                      <p className="italic text-slate-200">&ldquo;{hook}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investor Q&A Grilling Prep */}
          {analysis.investorQa && analysis.investorQa.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                Anticipated Demo Day Panel Q&A (Be Ready For These)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.investorQa.map((qa: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                    <p className="text-xs font-semibold text-white">Q: {qa.question}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-emerald-400">Model Answer: </strong>
                      {qa.suggestedAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Plan */}
          {analysis.actionPlan && analysis.actionPlan.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider mb-2">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                Immediate Action Plan Before Going On Stage
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {analysis.actionPlan.map((action: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
