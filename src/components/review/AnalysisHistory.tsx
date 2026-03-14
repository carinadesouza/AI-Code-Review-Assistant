"use client";

import { History, Trash2, Clock, Code2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HistoryEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface AnalysisHistoryProps {
  open: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onClear: () => void;
  onSelect?: (entry: HistoryEntry) => void;
}

export function AnalysisHistory({ open, onClose, history, onClear, onSelect }: AnalysisHistoryProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[380px] bg-background border-l border-foreground/10 p-0 flex flex-col gap-0"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-foreground/8 shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-sm font-mono text-foreground/60 uppercase tracking-wider">
              <History className="h-3.5 w-3.5" />
              History
              <span className="text-foreground/25 text-xs">({history.length})</span>
            </SheetTitle>
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="flex items-center gap-1.5 text-xs text-foreground/25 hover:text-foreground/60 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </SheetHeader>

        {/* Native scroll — reliable across all environments */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-8">
              <History className="h-6 w-6 text-foreground/10 mb-3" />
              <p className="text-xs text-foreground/25">No analyses yet.</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  className="w-full text-left p-4 border border-foreground/8 hover:border-foreground/25 bg-transparent hover:bg-foreground/3 rounded-sm transition-all group"
                  onClick={() => onSelect?.(entry)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3 w-3 text-foreground/25" />
                      <span className="text-xs text-foreground/50 font-mono capitalize">{entry.language}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-foreground/70">
                      {entry.result.overallScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-foreground/25 font-mono truncate mb-2">
                    {entry.codeSnippet}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-foreground/35">
                    <Clock className="h-2.5 w-2.5" />
                    {formatDate(entry.analyzedAt)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
