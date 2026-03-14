"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Paste Your Code",
    description: "Open the editor and paste any snippet. Full syntax highlighting for 12 languages.",
  },
  {
    number: "02",
    title: "Select Language",
    description: "Pick your language. Optionally add context to guide the AI reviewer.",
  },
  {
    number: "03",
    title: "Get Analysis",
    description: "Receive a structured report: score, security alerts, quality findings, and improvements.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-28 relative border-t border-foreground/6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
            — How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight max-w-xl">
            Three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <p className="text-5xl font-bold text-foreground/1 font-mono mb-5 select-none">
                {step.number}
              </p>
              <h3 className="font-semibold text-foreground text-sm mb-2">{step.title}</h3>
              <p className="text-foreground/40 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-foreground/6">
          <Link href="/review">
            <button className="btn-neon flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded">
              Try It Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
