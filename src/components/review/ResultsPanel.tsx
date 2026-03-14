"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Shield, Wrench, BookOpen, Copy, Check, AlertCircle, Terminal } from "lucide-react";
import { AnalysisResult } from "@/lib/types";
import { ScoreMeter } from "./ScoreMeter";
import { ResultCard } from "./ResultCard";
import { DownloadButton } from "./DownloadButton";

interface ResultsPanelProps {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  language: string;
}

function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-28 w-28 rounded-full bg-white/5" />
          <div className="h-3 w-16 bg-white/5 rounded" />
        </div>
      </div>
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-4/5" />
      <div className="h-3 bg-white/5 rounded w-3/5" />
      <div className="mt-6 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-white/4 rounded-sm border border-white/5" />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
      <div className="mb-5 border border-white/10 rounded p-4">
        <Terminal className="h-7 w-7 text-white/20" />
      </div>
      <h3 className="text-sm font-medium text-white/50 mb-1">Ready to analyze</h3>
      <p className="text-xs text-white/25 max-w-xs leading-relaxed">
        Paste code, select a language, and click{" "}
        <span className="text-white/50">Analyze Code</span> to get a detailed AI review.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8">
      <div className="mb-4 border border-white/15 rounded p-3">
        <AlertCircle className="h-6 w-6 text-white/40" />
      </div>
      <h3 className="text-sm font-medium text-white/60 mb-2">Analysis failed</h3>
      <p className="text-xs text-white/30 max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}

export function ResultsPanel({ result, loading, error, language }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col border border-white/8 bg-black overflow-hidden rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-white/30" />
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Output</span>
        </div>
        {result && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/35 hover:text-white/60 border border-white/8 hover:border-white/20 rounded transition-all"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "JSON"}
            </button>
            <DownloadButton result={result} language={language} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading && <LoadingSkeleton />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && !result && <EmptyState />}
        {!loading && !error && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 space-y-3"
          >
            {/* Score + summary */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 border border-white/8 rounded-sm">
              <ScoreMeter score={result.overallScore} />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2">Summary</p>
                <p className="text-sm text-white/55 leading-relaxed">{result.summary}</p>
              </div>
            </div>

            {/* Cards */}
            <ResultCard title="Code Quality"     icon={CheckSquare} items={result.codeQuality}       variant="quality"         delay={0.04} />
            <ResultCard title="Security"          icon={Shield}      items={result.securityWarnings}  variant="security"        delay={0.08} />
            <ResultCard title="Improvements"      icon={Wrench}      items={result.improvements}      variant="improvements"    delay={0.12} />
            <ResultCard title="Recommendations"   icon={BookOpen}    items={result.recommendations}   variant="recommendations" delay={0.16} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
