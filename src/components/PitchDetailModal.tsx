"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { ScoreGauge } from "./ScoreGauge";
import {
  X,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  ExternalLink,
  Share2,
  Check,
} from "lucide-react";

interface PitchDetailModalProps {
  pitchId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewModal: (pitchId: string, pitchTitle: string) => void;
}

export function PitchDetailModal({
  pitchId,
  isOpen,
  onClose,
  onOpenReviewModal,
}: PitchDetailModalProps) {
  const { currentUser } = useUser();
  const [pitch, setPitch] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [upvoting, setUpvoting] = useState(false);

  const fetchPitch = async () => {
    if (!pitchId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pitches/${pitchId}`);
      const data = await res.json();
      if (data.success) {
        setPitch(data.pitch);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && pitchId) {
      fetchPitch();
    }
  }, [isOpen, pitchId]);

  if (!isOpen || !pitchId) return null;

  const handleUpvote = async () => {
    if (upvoting || !pitch) return;
    setUpvoting(true);
    try {
      const res = await fetch(`/api/pitches/${pitch.id}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (data.success) {
        setPitch({
          ...pitch,
          upvoteCount: data.upvoteCount,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpvoting(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analysis = pitch?.analysis;
  const punchyHooks = analysis?.punchyHookSuggestions
    ? JSON.parse(analysis.punchyHookSuggestions)
    : [];
  const investorQa = analysis?.investorQa
    ? JSON.parse(analysis.investorQa)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-y-auto flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {loading || !pitch ? (
          <div className="py-20 text-center text-slate-400">Loading pitch details...</div>
        ) : (
          <div className="space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  {pitch.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  {pitch.stage} Stage
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white">{pitch.title}</h2>
              <p className="text-sm text-slate-300 mt-1">{pitch.tagline}</p>

              {/* Author badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pitch.user?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                    alt={pitch.user?.name}
                    className="w-8 h-8 rounded-full border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {pitch.user?.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{pitch.user?.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpvote}
                    disabled={upvoting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{pitch.upvoteCount} Upvotes</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? "Link Copied!" : "Share"}</span>
                  </button>

                  <button
                    onClick={() => onOpenReviewModal(pitch.id, pitch.title)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Critique Pitch</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Score Overview */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <ScoreGauge score={pitch.overallScore} size="lg" />
                <div>
                  <h4 className="text-sm font-bold text-white">AI Auditor Evaluation</h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-0.5">
                    Evaluated by ARIA & Tier-1 VC scoring models. Paced at {pitch.wordsPerMinute} WPM.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block">{pitch.hookScore}</span>
                  <span className="text-[10px] text-slate-400">Hook</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block">{pitch.problemScore}</span>
                  <span className="text-[10px] text-slate-400">Problem</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 block">{pitch.techScore}</span>
                  <span className="text-[10px] text-slate-400">Tech Depth</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">{pitch.deliveryScore}</span>
                  <span className="text-[10px] text-slate-400">Pacing</span>
                </div>
              </div>
            </div>

            {/* Script Text */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Spoken Pitch Script (3 Minutes)
              </h4>
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-56 overflow-y-auto space-y-3 font-sans">
                {pitch.scriptContent.split("\n\n").map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Punchy Hooks suggestions if present */}
            {punchyHooks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  AI-Generated Alternative Hooks
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {punchyHooks.map((h: string, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                      &ldquo;{h}&rdquo;
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Peer Reviews Stream */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Cohort Peer Critiques ({pitch.reviews?.length || 0})
                </h4>
                <button
                  onClick={() => onOpenReviewModal(pitch.id, pitch.title)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  + Leave Critique
                </button>
              </div>

              {pitch.reviews?.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  No peer critiques yet. Be the first cohort peer to review this pitch!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {pitch.reviews.map((rev: any) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rev.reviewer?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                            alt={rev.reviewer?.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-semibold text-white">
                            {rev.reviewer?.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {rev.reviewer?.role}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{rev.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
