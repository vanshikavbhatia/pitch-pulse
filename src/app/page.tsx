"use client";

import React, { useState } from "react";
import { UserProvider } from "@/context/UserContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PitchStudio } from "@/components/PitchStudio";
import { PitchShowcase } from "@/components/PitchShowcase";
import { PitchDeckViewer } from "@/components/PitchDeckViewer";
import { TeleprompterModal } from "@/components/TeleprompterModal";
import { AriaChecklist } from "@/components/AriaChecklist";
import {
  Sparkles,
  Zap,
  Users,
  Presentation,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("studio");
  const [customTeleprompterScript, setCustomTeleprompterScript] = useState<string | undefined>(
    undefined
  );

  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="max-w-3xl">
                {/* Cohort Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Capstone Project-5 · Launch · 10 Real Users · Demo Day Pitch</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Win Demo Day in the{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    First 30 Seconds.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
                  The AI Pitch Auditor & Cohort Peer Critique Network. Evaluate your 3-minute talk track against Tier-1 VC rubrics, dial in your WPM voice pacing, and practice with real cohort builders.
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-5 justify-center sm:justify-start">
                  <button
                    onClick={() => setActiveTab("studio")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === "studio"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-cyan-300" />
                    AI Pitch Studio
                  </button>
                  <button
                    onClick={() => setActiveTab("showcase")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === "showcase"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    Cohort Pitches (12 Users)
                  </button>
                  <button
                    onClick={() => setActiveTab("deck")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === "deck"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Presentation className="w-3.5 h-3.5 text-indigo-400" />
                    7-Slide Deck
                  </button>
                  <button
                    onClick={() => setActiveTab("teleprompter")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === "teleprompter"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    3-Min Script
                  </button>
                  <button
                    onClick={() => setActiveTab("aria")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === "aria"
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ARIA Audit
                  </button>
                </div>
              </div>

              {/* Verified Rubric Widget */}
              <div className="w-full sm:w-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col gap-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Demo Day Evaluation Criteria
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Original Idea (Not a Clone)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Live Public Vercel URL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Prisma & PostgreSQL Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>10+ Real User Signups (12 Seeded)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>5-7 Slide Pitch Deck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>3-Minute Live Demo Pitch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          {activeTab === "studio" && (
            <PitchStudio
              onPitchPublished={() => setActiveTab("showcase")}
              onOpenDeck={() => setActiveTab("deck")}
              onOpenTeleprompter={(script) => {
                setCustomTeleprompterScript(script);
                setActiveTab("teleprompter");
              }}
            />
          )}

          {activeTab === "showcase" && <PitchShowcase />}

          {activeTab === "deck" && <PitchDeckViewer />}

          {activeTab === "teleprompter" && (
            <TeleprompterModal script={customTeleprompterScript} />
          )}

          {activeTab === "aria" && <AriaChecklist />}
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}
