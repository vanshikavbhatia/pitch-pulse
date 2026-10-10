"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Copy, Check, Clock, Sparkles } from "lucide-react";

interface TeleprompterProps {
  script?: string;
  onClose?: () => void;
}

const defaultScript = `Hello everyone, my name is Vanshika, and this is PitchPulse.

Did you know that 72% of founders lose their audience in the first 30 seconds of a Demo Day pitch? Most builders spend months building incredible software, only to deliver a rushed, jargon-heavy 3-minute talk that leaves investors and judges confused.

We experienced this exact problem firsthand. When preparing for our Capstone launch, we realized there are plenty of slide generators, but zero tools that critique your real spoken words, pace, and live demo delivery.

That's why we built PitchPulse — the AI Copilot and Peer Review Network designed specifically for Demo Day pitches and accelerator scripts.

Here is how it works:
First, you paste your 3-minute script or slide outline into PitchPulse. Our engine immediately calculates your Words Per Minute and highlights if you're speaking too fast or burying your hook.

Second, our multi-persona AI evaluates your pitch from three distinct angles: A Tier-1 VC partner checking your defensibility and moat, a Demo Day speaking coach sharpening your opening hook, and an ARIA technical reviewer verifying code architecture and database integrity.

Third, and most importantly: PitchPulse has an integrated Peer Review Exchange. Instead of practicing alone in your room, cohort peers and mentors can critique your pitch against a standardized rubric, vote on their favorite projects, and help you improve before you step on stage.

Under the hood, PitchPulse is a full-stack Next.js application built with TypeScript, Prisma ORM, and Google AI. We have already onboarded 12 active cohort builders who have exchanged over 35 peer reviews.

Our mission is simple: to make sure every great builder gets the Demo Day pitch they deserve. PitchPulse is live today on Vercel. Thank you!`;

const checkpoints = [
  { start: 0, end: 35, title: "0:00 - 0:35 · The Hook & Problem" },
  { start: 35, end: 70, title: "0:35 - 1:10 · The Solution & Why Now" },
  { start: 70, end: 125, title: "1:10 - 2:05 · Live Product Walkthrough" },
  { start: 125, end: 160, title: "2:05 - 2:40 · Real Traction & Tech Stack" },
  { start: 160, end: 180, title: "2:40 - 3:00 · The Ask & Live URL" },
];

export function TeleprompterModal({ script = defaultScript, onClose }: TeleprompterProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsElapsed < 180) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (secondsElapsed >= 180) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsElapsed]);

  const words = script.trim().split(/\s+/).length;
  const targetSeconds = 180;
  const secondsRemaining = Math.max(0, targetSeconds - secondsElapsed);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCheckpoint = checkpoints.find(
    (c) => secondsElapsed >= c.start && secondsElapsed < c.end
  );

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#0d1322] p-6 shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Demo Day Rehearsal Mode
            </span>
            <span className="text-xs text-slate-400 font-medium">3-Minute Capstone Limit</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">3-Minute Pitch Script & Teleprompter</h2>
        </div>

        {/* Timer Control Widget */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Time Remaining
            </span>
            <span
              className={`text-2xl font-mono font-bold tracking-tight ${
                secondsRemaining <= 30
                  ? "text-rose-400 animate-pulse"
                  : secondsRemaining <= 60
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {formatTime(secondsRemaining)}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-lg font-medium text-xs flex items-center justify-center transition ${
                isRunning
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
              }`}
              title={isRunning ? "Pause Timer" : "Start Pitch Timer"}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsElapsed(0);
              }}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Copy Script to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Checkpoint Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Current Milestone:{" "}
            <span className="text-white font-semibold">
              {activeCheckpoint ? activeCheckpoint.title : "Pitch Completed"}
            </span>
          </span>
          <span className="text-slate-400 font-mono">
            {words} words · ~{Math.round((words / 180) * 60)} WPM average pace
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${(secondsElapsed / 180) * 100}%` }}
          />
        </div>
      </div>

      {/* Teleprompter Script Container */}
      <div className="relative rounded-xl border border-slate-800/90 bg-slate-900/90 p-6 sm:p-8 max-h-[460px] overflow-y-auto leading-relaxed text-slate-200 font-sans text-base sm:text-lg space-y-4">
        {script.split("\n\n").map((para, idx) => (
          <p
            key={idx}
            className={`transition-all duration-300 ${
              idx === 0
                ? "text-white font-medium border-l-2 border-indigo-500 pl-3 py-1 bg-indigo-500/5 rounded-r"
                : ""
            }`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Tips footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Keep your speaking pace between 130 and 150 words per minute for clear delivery.</span>
        </div>
        <span className="text-slate-500">Target recording time: 2:45 to 3:00 minutes</span>
      </div>
    </div>
  );
}
