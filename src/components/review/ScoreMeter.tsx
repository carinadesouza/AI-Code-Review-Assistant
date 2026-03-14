"use client";

import { useEffect, useState } from "react";

interface ScoreMeterProps {
  score: number;
}

function getScoreColor(score: number): { stroke: string; glow: string; text: string } {
  if (score >= 75) return {
    stroke: "#22c55e",                                           // green-500
    glow: "drop-shadow(0 0 8px rgba(34,197,94,0.7)) drop-shadow(0 0 16px rgba(34,197,94,0.35))",
    text: "rgba(34,197,94,0.8)",
  };
  if (score >= 50) return {
    stroke: "#f97316",                                           // orange-500
    glow: "drop-shadow(0 0 8px rgba(249,115,22,0.7)) drop-shadow(0 0 16px rgba(249,115,22,0.35))",
    text: "rgba(249,115,22,0.8)",
  };
  return {
    stroke: "#ef4444",                                           // red-500
    glow: "drop-shadow(0 0 8px rgba(239,68,68,0.7)) drop-shadow(0 0 16px rgba(239,68,68,0.35))",
    text: "rgba(239,68,68,0.8)",
  };
}

function getLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 30) return "Poor";
  return "Critical";
}

export function ScoreMeter({ score }: ScoreMeterProps) {
  const [animated, setAnimated] = useState(0);

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 80);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="120" height="120" className="-rotate-90">
          {/* Track */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"
          />
          {/* Arc */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.4s ease",
              filter: color.glow,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold tabular-nums"
            style={{ color: color.stroke, textShadow: `0 0 24px ${color.text}` }}
          >
            {Math.round(animated)}
          </span>
          <span className="text-xs text-white/30 font-mono">/100</span>
        </div>
      </div>
      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: color.stroke }}>
        {getLabel(score)}
      </span>
    </div>
  );
}
