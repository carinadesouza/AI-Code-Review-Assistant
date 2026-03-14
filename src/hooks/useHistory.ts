"use client";

import { useState, useEffect, useCallback } from "react";
import { HistoryEntry, AnalysisResult } from "@/lib/types";
import { generateId } from "@/lib/utils";

const HISTORY_KEY = "codereview_history";
const MAX_HISTORY = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // ignore corrupt data
    }
  }, []);

  const addEntry = useCallback(
    (language: string, code: string, result: AnalysisResult) => {
      setHistory((prev) => {
        const entry: HistoryEntry = {
          id: generateId(),
          language,
          codeSnippet: code.slice(0, 200),
          result,
          analyzedAt: new Date().toISOString(),
        };
        const next = [entry, ...prev].slice(0, MAX_HISTORY);
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        } catch {
          // storage might be full
        }
        return next;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
