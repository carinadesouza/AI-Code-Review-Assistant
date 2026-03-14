"use client";

import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";

interface MonacoEditorWrapperProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

const defineTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("black-neon", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment",     foreground: "404040", fontStyle: "italic" },
      { token: "keyword",     foreground: "888888" },
      { token: "string",      foreground: "bbbbbb" },
      { token: "number",      foreground: "aaaaaa" },
      { token: "type",        foreground: "cccccc" },
      { token: "function",    foreground: "dddddd" },
      { token: "variable",    foreground: "e8e8e8" },
      { token: "identifier",  foreground: "d0d0d0" },
      { token: "delimiter",   foreground: "555555" },
      { token: "operator",    foreground: "666666" },
    ],
    colors: {
      "editor.background":              "#0a0a0a",
      "editor.foreground":              "#d0d0d0",
      "editor.lineHighlightBackground": "#111111",
      "editor.selectionBackground":     "#ffffff18",
      "editor.inactiveSelectionBackground": "#ffffff0a",
      "editorLineNumber.foreground":    "#333333",
      "editorLineNumber.activeForeground": "#666666",
      "editorCursor.foreground":        "#ffffff",
      "editorIndentGuide.background":   "#1a1a1a",
      "editorIndentGuide.activeBackground": "#333333",
      "editorBracketMatch.background":  "#ffffff15",
      "editorBracketMatch.border":      "#ffffff30",
      "scrollbar.shadow":               "#00000000",
      "scrollbarSlider.background":     "#ffffff08",
      "scrollbarSlider.hoverBackground":"#ffffff15",
      "scrollbarSlider.activeBackground":"#ffffff25",
    },
  });
};

export default function MonacoEditorWrapper({ code, language, onChange }: MonacoEditorWrapperProps) {
  const handleMount: OnMount = (editor) => {
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 13,
      lineHeight: 22,
      fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Monaco, monospace',
      fontLigatures: true,
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      wordWrap: "on",
      renderLineHighlight: "line",
      smoothScrolling: true,
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      lineNumbers: "on",
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      automaticLayout: true,
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        vertical: "auto",
        horizontal: "auto",
        verticalScrollbarSize: 4,
        horizontalScrollbarSize: 4,
      },
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      theme="black-neon"
      beforeMount={defineTheme}
      onChange={(val) => onChange(val ?? "")}
      onMount={handleMount}
    />
  );
}
