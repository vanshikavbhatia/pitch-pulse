import React from "react";

interface ScoreGaugeProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  subtext?: string;
}

export function ScoreGauge({
  score,
  label = "Overall Score",
  size = "md",
  subtext,
}: ScoreGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 90) return { stroke: "#10b981", text: "text-emerald-400", bg: "bg-emerald-500/10" };
    if (s >= 80) return { stroke: "#6366f1", text: "text-indigo-400", bg: "bg-indigo-500/10" };
    if (s >= 70) return { stroke: "#f59e0b", text: "text-amber-400", bg: "bg-amber-500/10" };
    return { stroke: "#ef4444", text: "text-rose-400", bg: "bg-rose-500/10" };
  };

  const { stroke, text } = getColor(score);
  const radius = size === "lg" ? 42 : size === "md" ? 34 : 24;
  const strokeWidth = size === "lg" ? 7 : size === "md" ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const dimension = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimension}
          height={dimension}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className={`font-black tracking-tight ${text} ${
              size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-sm"
            }`}
          >
            {score}
          </span>
          {size !== "sm" && (
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              / 100
            </span>
          )}
        </div>
      </div>
      {label && (
        <span
          className={`font-medium text-slate-300 mt-1.5 ${
            size === "lg" ? "text-sm" : "text-xs"
          }`}
        >
          {label}
        </span>
      )}
      {subtext && <span className="text-[10px] text-slate-400">{subtext}</span>}
    </div>
  );
}
