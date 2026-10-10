"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  Sparkles,
  Users,
  Presentation,
  Mic,
  CheckCircle2,
  ChevronDown,
  UserPlus,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./GithubIcon";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { currentUser, allUsers, setCurrentUser, createUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Founder");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    await createUser(newName, newEmail, newRole);
    setShowSignupModal(false);
    setNewName("");
    setNewEmail("");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("studio")}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    PitchPulse
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full">
                    AI v2.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Demo Day AI Pitch Auditor & Peer Network
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("studio")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "studio"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Studio
            </button>
            <button
              onClick={() => setActiveTab("showcase")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "showcase"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Cohort Pitches
              <span className="px-1 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 rounded font-bold">
                12+
              </span>
            </button>
            <button
              onClick={() => setActiveTab("deck")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "deck"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              7-Slide Deck
            </button>
            <button
              onClick={() => setActiveTab("teleprompter")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "teleprompter"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              3-Min Script
            </button>
            <button
              onClick={() => setActiveTab("aria")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "aria"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ARIA Checklist
            </button>
          </nav>

          {/* Right side: User Switcher & GitHub */}
          <div className="flex items-center gap-2.5">
            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/70 hover:bg-slate-800 text-xs font-medium text-slate-200 transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-slate-600"
                />
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                  <div className="px-2.5 py-1.5 border-b border-slate-800 mb-1.5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Active Persona
                    </p>
                    <p className="text-xs font-medium text-slate-200 truncate">{currentUser.name}</p>
                    <span className="text-[10px] text-indigo-400">{currentUser.role}</span>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1">
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          setCurrentUser(u);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 transition ${
                          currentUser.id === u.id
                            ? "bg-indigo-600/20 text-indigo-300 font-medium"
                            : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={u.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                          alt={u.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <div className="truncate">
                          <p className="truncate leading-tight">{u.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{u.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 mt-2 pt-1.5">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setShowSignupModal(true);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-cyan-400 hover:bg-slate-800 flex items-center gap-2 font-medium"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Add / Join as New Real User
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/vanshikavbhatia/pitch-pulse"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-900/90 py-1.5 px-2">
        <button
          onClick={() => setActiveTab("studio")}
          className={`px-2 py-1 text-[11px] font-medium rounded ${
            activeTab === "studio" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab("showcase")}
          className={`px-2 py-1 text-[11px] font-medium rounded ${
            activeTab === "showcase" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Pitches (12+)
        </button>
        <button
          onClick={() => setActiveTab("deck")}
          className={`px-2 py-1 text-[11px] font-medium rounded ${
            activeTab === "deck" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          7 Slides
        </button>
        <button
          onClick={() => setActiveTab("teleprompter")}
          className={`px-2 py-1 text-[11px] font-medium rounded ${
            activeTab === "teleprompter" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          3-Min Script
        </button>
        <button
          onClick={() => setActiveTab("aria")}
          className={`px-2 py-1 text-[11px] font-medium rounded ${
            activeTab === "aria" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          ARIA Check
        </button>
      </div>

      {/* New User Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Join PitchPulse Cohort</h3>
            <p className="text-xs text-slate-400 mb-4">
              Create a profile to audit your pitch, give peer feedback, and count toward the 10 real users requirement.
            </p>

            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@startup.io"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Founder">Founder</option>
                  <option value="Cohort Peer">Cohort Peer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="VC / Angel Investor">VC / Angel Investor</option>
                  <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
                >
                  Register Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
