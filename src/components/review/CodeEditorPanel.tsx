"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Play, Trash2, FlaskConical, Code2, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageSelector } from "./LanguageSelector";
import { Language, AnalysisResult } from "@/lib/types";
import { DEFAULT_LANGUAGE } from "@/lib/languages";
import { EXAMPLES } from "@/lib/examples";

const MonacoEditorWrapper = dynamic(
  () => import("./MonacoEditorWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#0a0a0a] flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-none bg-white/3" />
      </div>
    ),
  }
);

interface CodeEditorPanelProps {
  onAnalyze: (code: string, language: string) => Promise<AnalysisResult | null>;
  onResult: (result: AnalysisResult, language: string, code: string) => void;
  loading: boolean;
}

export function CodeEditorPanel({ onAnalyze, onResult, loading }: CodeEditorPanelProps) {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  const lineCount = useMemo(() => (code ? code.split("\n").length : 0), [code]);
  const charCount = code.length;
  const isOverLimit = charCount > 45_000;
  const canAnalyze = code.trim().length > 0 && !loading && !isOverLimit;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    const result = await onAnalyze(code, selectedLanguage.label);
    if (result) onResult(result, selectedLanguage.label, code);
  };

  return (
    <div className="h-full flex flex-col border border-white/8 bg-black overflow-hidden rounded-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 mr-1">
          <Code2 className="h-3.5 w-3.5 text-white/30" />
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Editor</span>
        </div>

        <LanguageSelector selected={selectedLanguage} onSelect={setSelectedLanguage} />

        {/* Stats */}
        <span className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${
          isOverLimit
            ? "text-white/60 border-white/20 bg-white/5"
            : "text-white/20 border-transparent"
        }`}>
          {lineCount}L&nbsp;{charCount.toLocaleString()}C
          {isOverLimit && " — limit!"}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setCode(EXAMPLES[selectedLanguage.exampleKey] ?? EXAMPLES["js"])}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/35 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-sm transition-all disabled:opacity-30"
          >
            <FlaskConical className="h-3 w-3" />
            <span className="hidden sm:inline">Example</span>
          </button>

          <button
            onClick={() => setCode("")}
            disabled={loading || code.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/35 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-sm transition-all disabled:opacity-30"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed btn-neon"
          >
            {loading ? (
              <><Loader2 className="h-3 w-3 animate-spin" />Analyzing…</>
            ) : (
              <><Play className="h-3 w-3" />Analyze</>
            )}
          </button>
        </div>
      </div>

      {/* Monaco */}
      <div className="flex-1 min-h-0 bg-[#0a0a0a]">
        <MonacoEditorWrapper
          code={code}
          language={selectedLanguage.monacoId}
          onChange={setCode}
        />
      </div>

      {/* Empty hint */}
      {code.trim().length === 0 && (
        <div className="px-4 py-2 border-t border-white/5 text-xs text-white/18 font-mono shrink-0">
          paste code or click <span className="text-white/35">example</span>
        </div>
      )}
    </div>
  );
}
