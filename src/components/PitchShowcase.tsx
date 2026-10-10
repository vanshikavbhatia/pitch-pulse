"use client";

import React, { useState, useEffect } from "react";
import { ScoreGauge } from "./ScoreGauge";
import { ReviewModal } from "./ReviewModal";
import { PitchDetailModal } from "./PitchDetailModal";
import {
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Sparkles,
  Users,
  Award,
  RefreshCw,
} from "lucide-react";

const categories = [
  "All",
  "AI & DevTools",
  "FinTech",
  "SaaS & Productivity",
  "Health & Bio",
  "Marketplace",
];

export function PitchShowcase() {
  const [pitches, setPitches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeModalPitchId, setActiveModalPitchId] = useState<string | null>(null);
  const [reviewModalData, setReviewModalData] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const fetchPitches = async () => {
    setLoading(true);
    try {
      let url = "/api/pitches";
      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (searchQuery.trim()) params.append("q", searchQuery.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPitches(data.pitches);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitches();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Stats */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1322] p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              10+ Real Users Requirement · Met
            </span>
            <span className="text-xs text-slate-400 font-medium">Cohort Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Cohort Pitch Exchange</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Browse active pitches, leave structured rubrics, and upvote peer capstones before final Demo Day pitches.
          </p>
        </div>

        {/* Live Cohort Traction Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-base font-bold text-indigo-400 block">12</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Founders</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-base font-bold text-emerald-400 block">{pitches.length}</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Live Pitches</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-base font-bold text-cyan-400 block">35+</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Peer Reviews</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search pitches or founders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Pitches Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Fetching cohort pitches from database...</span>
        </div>
      ) : pitches.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
          No pitches found matching your criteria. Try switching categories or publish one from the AI Studio!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pitches.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl border border-slate-800 bg-[#0d1322] hover:border-slate-700 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      {p.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {p.stage}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {p.wordsPerMinute} WPM
                  </span>
                </div>

                {/* Pitch Title and Tagline */}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>
              </div>

              {/* Score and Author Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.user?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                    alt={p.user?.name}
                    className="w-7 h-7 rounded-full border border-slate-700 object-cover"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block leading-tight">
                      {p.user?.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block leading-tight">
                      {p.user?.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Score badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-white">{p.overallScore}</span>
                    <span className="text-[9px] text-slate-400 font-medium">/ 100</span>
                  </div>

                  {/* Upvotes */}
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <ThumbsUp className="w-3 h-3 text-indigo-400" />
                    <span>{p.upvoteCount}</span>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => setActiveModalPitchId(p.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <PitchDetailModal
        pitchId={activeModalPitchId}
        isOpen={Boolean(activeModalPitchId)}
        onClose={() => setActiveModalPitchId(null)}
        onOpenReviewModal={(id, title) => {
          setActiveModalPitchId(null);
          setReviewModalData({ id, title });
        }}
      />

      {reviewModalData && (
        <ReviewModal
          pitchId={reviewModalData.id}
          pitchTitle={reviewModalData.title}
          isOpen={Boolean(reviewModalData)}
          onClose={() => setReviewModalData(null)}
          onReviewSubmitted={() => {
            fetchPitches();
          }}
        />
      )}
    </div>
  );
}
