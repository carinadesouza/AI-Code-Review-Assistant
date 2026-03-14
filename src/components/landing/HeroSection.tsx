"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 bg-background">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid" />

      {/* Radial fade at edges — uses CSS variable so it matches bg in both modes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--gradient-fade) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 border border-foreground/15 rounded-full text-xs text-foreground/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground" />
          </span>
           Developed by Carina De Souza
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.95] text-foreground neon-text">
          AI Code Review.
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-foreground/45 max-w-xl mx-auto mb-10 leading-relaxed">
          Paste any code snippet. Get security alerts, quality scores, and
          actionable improvements in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/review">
            <button className="btn-neon flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded">
              Analyze Code
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <Link href="#features">
            <button className="btn-neon-ghost flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded">
              See Features
            </button>
          </Link>
        </div>

        {/* Terminal mockup */}
        <div className="mt-20 mx-auto max-w-2xl">
          <div className="border border-foreground/10 rounded-lg overflow-hidden bg-[#0a0a0a] neon-card">
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Terminal className="h-3 w-3 text-white/30" />
                <span className="text-xs text-white/30 font-mono">
                  analysis-output.json
                </span>
              </div>
            </div>
            {/* Content — terminal stays dark regardless of theme */}
            <div className="p-5 text-left font-mono text-xs sm:text-sm leading-relaxed">
              <div className="space-y-1.5">
                <p>
                  <span className="text-white/30">{"{"}</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">
                    &quot;overallScore&quot;
                  </span>
                  <span className="text-white/30">: </span>
                  <span
                    className="text-white font-semibold"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.6)" }}
                  >
                    92
                  </span>
                  <span className="text-white/30">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">&quot;summary&quot;</span>
                  <span className="text-white/30">: </span>
                  <span className="text-white/70">
                    &quot;Clean, well-structured code...&quot;
                  </span>
                  <span className="text-white/30">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">
                    &quot;securityWarnings&quot;
                  </span>
                  <span className="text-white/30">: </span>
                  <span className="text-white/40">[</span>
                  <span className="text-white/70">
                    &quot;No critical issues&quot;
                  </span>
                  <span className="text-white/40">]</span>
                  <span className="text-white/30">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">
                    &quot;improvements&quot;
                  </span>
                  <span className="text-white/30">: </span>
                  <span className="text-white/40">[</span>
                  <span className="text-white/70">
                    &quot;Add input validation...&quot;
                  </span>
                  <span className="text-white/40">]</span>
                </p>
                <p>
                  <span className="text-white/30">{"}"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
