"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Star, MessageSquare, X, Send } from "lucide-react";

interface ReviewModalProps {
  pitchId: string;
  pitchTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export function ReviewModal({
  pitchId,
  pitchTitle,
  isOpen,
  onClose,
  onReviewSubmitted,
}: ReviewModalProps) {
  const { currentUser } = useUser();
  const [rating, setRating] = useState(5);
  const [hookRating, setHookRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [viabilityRating, setViabilityRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setError("Please write constructive peer feedback.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/pitches/${pitchId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerId: currentUser.id,
          rating,
          hookRating,
          clarityRating,
          viabilityRating,
          feedback,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onReviewSubmitted();
        onClose();
      } else {
        setError(data.error || "Failed to submit review");
      }
    } catch (err) {
      setError("Network error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Cohort Peer Review
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">Critique Pitch</h3>
          <p className="text-xs text-slate-400 truncate mt-0.5">{pitchTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reviewer persona display */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Reviewing as:</span>
            <div className="flex items-center gap-2 text-white font-medium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                alt={currentUser.name}
                className="w-4 h-4 rounded-full"
              />
              <span>{currentUser.name}</span>
              <span className="text-[10px] text-indigo-400">({currentUser.role})</span>
            </div>
          </div>

          {/* Rating sliders / stars */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Overall Impression (1-5★)
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? "fill-amber-400" : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Opening Hook (1-5★)
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setHookRating(star)}
                    className="p-1 text-indigo-400 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= hookRating ? "fill-indigo-400" : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback comment */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Constructive Critique & Polish Suggestions
            </label>
            <textarea
              rows={4}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What worked well in this pitch? Was the 30-second hook clear? How could their Demo Day delivery improve?"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? "Submitting..." : "Submit Peer Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
