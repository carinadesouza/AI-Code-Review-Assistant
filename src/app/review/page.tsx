"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CodeEditorPanel } from "@/components/review/CodeEditorPanel";
import { ResultsPanel } from "@/components/review/ResultsPanel";
import { AnalysisHistory } from "@/components/review/AnalysisHistory";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useHistory } from "@/hooks/useHistory";
import { AnalysisResult } from "@/lib/types";

export default function ReviewPage() {
  const { result, loading, error, analyze } = useAnalysis();
  const { history, addEntry, clearHistory } = useHistory();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("JavaScript");

  const handleResult = (analysisResult: AnalysisResult, language: string, code: string) => {
    setCurrentLanguage(language);
    addEntry(language, code, analysisResult);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onHistoryOpen={() => setHistoryOpen(true)} />

      <main className="flex-1 pt-14">
        {/* Page header */}
        <div className="border-b border-white/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <h1 className="text-sm font-mono text-white/40 uppercase tracking-widest">
              — Code Review
            </h1>
          </div>
        </div>

        {/* Editor + Results */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-[calc(100vh-160px)] min-h-[600px]">
            <CodeEditorPanel
              onAnalyze={analyze}
              onResult={handleResult}
              loading={loading}
            />
            <ResultsPanel
              result={result}
              loading={loading}
              error={error}
              language={currentLanguage}
            />
          </div>
        </div>
      </main>

      <Footer />

      <AnalysisHistory
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClear={clearHistory}
      />
    </div>
  );
}
