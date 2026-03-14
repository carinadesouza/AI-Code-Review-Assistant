import { Language } from "./types";

export const LANGUAGES: Language[] = [
  { value: "javascript", label: "JavaScript", monacoId: "javascript", exampleKey: "js" },
  { value: "typescript", label: "TypeScript", monacoId: "typescript", exampleKey: "ts" },
  { value: "python", label: "Python", monacoId: "python", exampleKey: "py" },
  { value: "java", label: "Java", monacoId: "java", exampleKey: "java" },
  { value: "go", label: "Go", monacoId: "go", exampleKey: "go" },
  { value: "rust", label: "Rust", monacoId: "rust", exampleKey: "rs" },
  { value: "cpp", label: "C++", monacoId: "cpp", exampleKey: "cpp" },
  { value: "csharp", label: "C#", monacoId: "csharp", exampleKey: "cs" },
  { value: "php", label: "PHP", monacoId: "php", exampleKey: "php" },
  { value: "ruby", label: "Ruby", monacoId: "ruby", exampleKey: "rb" },
  { value: "swift", label: "Swift", monacoId: "swift", exampleKey: "swift" },
  { value: "kotlin", label: "Kotlin", monacoId: "kotlin", exampleKey: "kt" },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];
