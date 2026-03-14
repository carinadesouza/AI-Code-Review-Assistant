"use client";

import { Zap, Shield, Lightbulb, Code2, Download, History } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get comprehensive code reviews in seconds via Groq ultra-fast inference.",
  },
  {
    icon: Shield,
    title: "Security Scanning",
    description: "Detects SQL injection, XSS, hardcoded secrets, and other OWASP Top 10 issues.",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Targeted, actionable improvements based on your actual code — not generic tips.",
  },
  {
    icon: Code2,
    title: "12 Languages",
    description: "JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, PHP, Ruby, Swift, Kotlin.",
  },
  {
    icon: Download,
    title: "Export Reports",
    description: "Download your analysis as a formatted Markdown file for PRs or team sharing.",
  },
  {
    icon: History,
    title: "History Tracking",
    description: "Your last 20 analyses are saved locally. Revisit and compare code versions.",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="py-28 relative border-t border-foreground/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
            — Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight max-w-xl">
            Everything for better code.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="h-full bg-background p-8 group hover:bg-foreground/3 transition-colors duration-300"
            >
              <div className="mb-5">
                <feature.icon className="h-5 w-5 text-foreground/40 group-hover:text-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2">{feature.title}</h3>
              <p className="text-foreground/40 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
