"use client";

import { motion } from "framer-motion";
import { LucideIcon, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "quality" | "security" | "improvements" | "recommendations";

interface ResultCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  variant: CardVariant;
  delay?: number;
}

const variantAccent: Record<CardVariant, string> = {
  quality:         "border-l-white/60",
  security:        "border-l-white/60",
  improvements:    "border-l-white/60",
  recommendations: "border-l-white/60",
};

export function ResultCard({ title, icon: Icon, items, variant, delay = 0 }: ResultCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <div className={cn(
        "border border-white/8 border-l-2 bg-black rounded-sm overflow-hidden",
        variantAccent[variant]
      )}>
        {/* Header */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors"
          onClick={() => setExpanded((e) => !e)}
        >
          <div className="flex items-center gap-2.5">
            <Icon className="h-3.5 w-3.5 text-white/40" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">{title}</span>
            <span className="text-xs text-white/20 font-mono">{items.length}</span>
          </div>
          {expanded
            ? <ChevronUp className="h-3.5 w-3.5 text-white/25" />
            : <ChevronDown className="h-3.5 w-3.5 text-white/25" />
          }
        </button>

        {/* Body */}
        {expanded && (
          <div className="px-4 pb-4 space-y-2.5 border-t border-white/5">
            {items.length === 0 ? (
              <div className="flex items-center gap-2 pt-3 text-xs text-white/30">
                <CheckCircle2 className="h-3.5 w-3.5 text-white/40" />
                No issues found
              </div>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + i * 0.04 }}
                  className="flex items-start gap-3 pt-2.5 text-xs text-white/50 leading-relaxed"
                >
                  {variant === "security" && item.toLowerCase().includes("no critical") ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-white/50 mt-0.5 shrink-0" />
                  ) : (
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" />
                  )}
                  <span>{item}</span>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
