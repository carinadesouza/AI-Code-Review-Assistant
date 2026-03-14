# CodeReviewAI

An AI-powered code review web app built with Next.js 14, TypeScript, and Groq's Llama 3.3 70B. Paste any code snippet and receive a structured analysis covering code quality, security vulnerabilities, improvements, and best-practice recommendations.

## Features

- **Instant AI Analysis** — Powered by Llama 3.3 70B via Groq's fast inference
- **12 Languages** — JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, PHP, Ruby, Swift, Kotlin
- **Monaco Editor** — Full VS Code-style editor with syntax highlighting
- **Security Scanning** — Detects OWASP Top 10 and common vulnerabilities
- **Structured Output** — Score, summary, quality, security, improvements, recommendations
- **Analysis History** — Last 20 reviews saved in localStorage
- **Export to Markdown** — Download your analysis as a `.md` file
- **Dark Mode Default** — Toggle between dark and light themes
- **Responsive** — Works on desktop and mobile

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (base-nova style)
- [Groq SDK](https://console.groq.com/) — `llama-3.3-70b-versatile`
- [Monaco Editor](https://github.com/suren-atoyan/monaco-react)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your [Groq API key](https://console.groq.com):

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles + CSS variables (dark default)
│   ├── layout.tsx            # Root layout with ThemeProvider + TooltipProvider
│   ├── page.tsx              # Landing page (hero, features, how-it-works)
│   ├── review/page.tsx       # Code review page (editor + results)
│   └── api/analyze/route.ts  # Secure server-side Groq API route
├── components/
│   ├── layout/               # Navbar (sticky glass), Footer
│   ├── landing/              # HeroSection, FeatureCards, HowItWorks
│   └── review/               # CodeEditorPanel, ResultsPanel, ScoreMeter,
│                             # ResultCard, AnalysisHistory, DownloadButton
├── hooks/
│   ├── useAnalysis.ts        # fetch /api/analyze with loading/error state
│   └── useHistory.ts         # localStorage history (max 20 entries)
├── lib/
│   ├── types.ts              # AnalysisResult, HistoryEntry, Language interfaces
│   ├── languages.ts          # 12 supported languages with Monaco IDs
│   ├── examples.ts           # Flawed example snippets per language
│   ├── prompts.ts            # Groq system prompt + user prompt builder
│   ├── groq.ts               # Server-side Groq client singleton
│   └── utils.ts              # cn(), generateId(), formatDate(), score helpers
└── providers/
    └── ThemeProvider.tsx     # next-themes wrapper (dark default)
```

## AI Response Schema

```json
{
  "overallScore": 72,
  "summary": "The code is functional but has several security concerns...",
  "codeQuality": ["Inconsistent naming conventions detected", "..."],
  "securityWarnings": ["SQL injection risk on line 12", "..."],
  "improvements": ["Use parameterized queries to prevent injection", "..."],
  "recommendations": ["Consider adopting an ORM like Prisma", "..."]
}
```

## Security Notes

- `GROQ_API_KEY` lives in `.env.local` — never committed, never sent to the browser
- All AI calls are proxied through the server-side `/api/analyze` route
- Input validated on both client (char limit, empty guard) and server
- Groq rate-limit errors (429) are caught and returned as user-friendly messages

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `GROQ_API_KEY` in **Project Settings → Environment Variables**
4. Deploy
