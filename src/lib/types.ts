export interface AnalysisResult {
  overallScore: number;
  summary: string;
  codeQuality: string[];
  securityWarnings: string[];
  improvements: string[];
  recommendations: string[];
}

export interface HistoryEntry {
  id: string;
  language: string;
  codeSnippet: string;
  result: AnalysisResult;
  analyzedAt: string;
}

export interface Language {
  value: string;
  label: string;
  monacoId: string;
  exampleKey: string;
}
