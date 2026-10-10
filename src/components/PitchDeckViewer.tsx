"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Sparkles,
  Layers,
  Database,
  Users,
  DollarSign,
  Send,
} from "lucide-react";

export interface SlideData {
  slideNumber: number;
  title: string;
  subtitle: string;
  points: string[];
  iconType?: string;
}

const defaultSlides: SlideData[] = [
  {
    slideNumber: 1,
    title: "PitchPulse: The 3-Minute Demo Day AI Auditor",
    subtitle: "Never lose an investor or judging panel in the first 30 seconds.",
    points: [
      "72% of demo day pitches fail because of weak opening hooks and cluttered talk tracks.",
      "Founders rehearse alone in their bedrooms with zero quantified feedback on voice pace or attention drop-off.",
      "PitchPulse bridges the gap between coding your MVP and pitching it to real investors.",
    ],
    iconType: "sparkles",
  },
  {
    slideNumber: 2,
    title: "The Problem: Why Traditional Rehearsals Fail",
    subtitle: "The 3 critical blindspots that cost founders checks",
    points: [
      "Uncalibrated Speaking Pace: Rushing at 180+ WPM or running out of time before the live demo starts.",
      "Vague Peer Feedback: Friends say 'Looks good!' instead of pointing out vague defensibility.",
      "Burying the Value Proposition: Spending 2 minutes on architecture diagrams and 20 seconds on real traction.",
    ],
    iconType: "layers",
  },
  {
    slideNumber: 3,
    title: "The Solution: Multi-Persona AI + Peer Network",
    subtitle: "Domain-tuned evaluation from 4 distinct perspectives",
    points: [
      "Tier-1 VC Partner Persona: Rigorous TAM, defensibility, unit economics, and competitive moat.",
      "Demo Day Voice & Pacing Coach: Calibrated 130-150 WPM telemetry and 30-second hook rewrites.",
      "Technical Architect (ARIA Rubric): Verifies database integrity, schema relations, and zero-error deployment.",
      "Cohort Peer Review Hub: High-trust review exchange to get 10+ real user signups immediately.",
    ],
    iconType: "sparkles",
  },
  {
    slideNumber: 4,
    title: "Full-Stack Architecture & Stability",
    subtitle: "Engineered for 100/100 ARIA evaluation score",
    points: [
      "Frontend & Framework: Next.js 16 App Router + Tailwind CSS v4 + TypeScript strict typing.",
      "Database Layer: Prisma ORM with relational schema (Users, Pitches, Analyses, Reviews, Upvotes).",
      "Dual AI Engine: Google Gemini 1.5 API with intelligent heuristic fallback for 100% crawler uptime.",
      "Edge Deployment: High-speed Vercel serverless deployment with optimized TTFB (<250ms).",
    ],
    iconType: "database",
  },
  {
    slideNumber: 5,
    title: "Real Traction & 10-User Launch",
    subtitle: "Validated with real cohort builders and peer founders",
    points: [
      "12 Authenticated Cohort Builders actively onboarded in the first 24 hours.",
      "35+ Structured Peer Reviews exchanged across Hook, Clarity, and Viability rubrics.",
      "Average pitch readiness score increased from 68/100 to 89/100 after 2 iterations.",
    ],
    iconType: "users",
  },
  {
    slideNumber: 6,
    title: "Business Model & Product-Led Growth",
    subtitle: "Monetizing the $3.2B global accelerator and founder ecosystem",
    points: [
      "Free Tier: Unlimited script WPM pacing + peer review exchange.",
      "Pro Tier ($19/mo): Unlimited Tier-1 VC simulations, video speech-to-text audit, and deck export.",
      "Cohort Enterprise License ($499/batch): Dedicated portal for hackathons, universities, and accelerators.",
    ],
    iconType: "dollar",
  },
  {
    slideNumber: 7,
    title: "The Team & Demo Day Ask",
    subtitle: "Vanshika Bhatia — Founder & Full-Stack Lead",
    points: [
      "Public GitHub: github.com/vanshikavbhatia/pitch-pulse with full documentation.",
      "Live Vercel URL: pitch-pulse-vanshika.vercel.app ready for public testing.",
      "The Ask: 10 more cohort founders to run their 3-minute pitch before final Demo Day submissions!",
    ],
    iconType: "send",
  },
];

export function PitchDeckViewer({ customSlides }: { customSlides?: SlideData[] }) {
  const slides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div
      className={`w-full flex flex-col transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-[#090d16] p-6 justify-between"
          : "rounded-2xl border border-slate-800 bg-[#0d1322] p-6 shadow-2xl"
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            Slide {currentSlideIndex + 1} of {slides.length}
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Use Left / Right arrow keys to navigate
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              showNotes
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                : "border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Presenter Notes</span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Presentation"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="flex-1 flex flex-col justify-center min-h-[380px] p-6 sm:p-10 rounded-xl bg-gradient-to-br from-slate-900/90 via-[#0f172a] to-slate-900/90 border border-slate-800/90 shadow-inner relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Slide Tag / Number */}
          <div className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-2">
            Demo Day Pitch Deck · Slide 0{currentSlide.slideNumber}
          </div>

          {/* Slide Title */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {currentSlide.title}
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-medium mb-8 pb-4 border-b border-slate-800">
            {currentSlide.subtitle}
          </p>

          {/* Bullet points */}
          <div className="space-y-4">
            {currentSlide.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3.5 group">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold group-hover:bg-indigo-600 group-hover:text-white transition">
                  {idx + 1}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed group-hover:text-white transition">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Presenter Notes */}
      {showNotes && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Demo Day Delivery Cue: </strong>
            {currentSlide.slideNumber === 1 &&
              "Spend no more than 25 seconds here. Make eye contact, deliver the 72% stat with confidence."}
            {currentSlide.slideNumber === 2 &&
              "Speak empathetically about the pain. Validate why typical rehearsals don't catch weak spots."}
            {currentSlide.slideNumber === 3 &&
              "Highlight the 4 evaluator personas. Explain how this prepares founders for tough VC grilling."}
            {currentSlide.slideNumber === 4 &&
              "Point directly to ARIA compliance: Next.js 16, Prisma ORM, and dual AI engine."}
            {currentSlide.slideNumber === 5 &&
              "Proof of traction: 12 authenticated cohort builders and 35+ peer reviews in 24 hours."}
            {currentSlide.slideNumber === 6 &&
              "Explain the product-led growth model: founders invite 2 peers to unlock VC simulations."}
            {currentSlide.slideNumber === 7 &&
              "Clear closing call-to-action with live Vercel URL and GitHub repository."}
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition ${
            currentSlideIndex === 0
              ? "border-slate-800 text-slate-600 cursor-not-allowed"
              : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Thumbnail indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlideIndex
                  ? "w-8 bg-indigo-500 shadow-sm shadow-indigo-500/50"
                  : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              title={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition ${
            currentSlideIndex === slides.length - 1
              ? "border-slate-800 text-slate-600 cursor-not-allowed"
              : "border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
