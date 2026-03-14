"use client";

import { useState, useCallback } from "react";
import { AnalysisResult } from "@/lib/types";

interface AnalysisState {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    result: null,
    loading: false,
    error: null,
  });

  const analyze = useCallback(async (code: string, language: string): Promise<AnalysisResult | null> => {
    setState({ result: null, loading: true, error: null });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setState({ result: data, loading: false, error: null });
      return data;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setState({ result: null, loading: false, error: message });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ result: null, loading: false, error: null });
  }, []);

  return { ...state, analyze, reset };
}
