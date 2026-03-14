"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, History } from "lucide-react";
import { cn } from "@/lib/utils";

// Theme toggle imports — uncomment when re-enabling the button:
// import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  onHistoryOpen?: () => void;
}

export function Navbar({ onHistoryOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  // Theme toggle state — uncomment when re-enabling the button:
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setMounted(true);  // uncomment with theme toggle
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-foreground/8 bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 border border-foreground/20 rounded group-hover:border-foreground/60 group-hover:shadow-[0_0_12px_rgba(128,128,128,0.2)] transition-all duration-200">
              <Code2 className="h-3.5 w-3.5 text-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">
              CodeReview<span className="text-foreground/40">AI</span>
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {onHistoryOpen && (
              <button
                onClick={onHistoryOpen}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground/50 hover:text-foreground border border-transparent hover:border-foreground/20 rounded transition-all duration-200"
              >
                <History className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">History</span>
              </button>
            )}
            <Link href="/">
              <button className="px-3 py-1.5 text-xs text-foreground/50 hover:text-foreground border border-transparent hover:border-foreground/20 rounded transition-all duration-200">
                Home
              </button>
            </Link>
            {/* ─── Theme toggle ──────────────────────────────────────────────
            Uncomment the block below (and the imports at the top) to enable:

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 text-foreground/50 hover:text-foreground border border-transparent hover:border-foreground/20 rounded transition-all duration-200 ml-1"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark"
                  ? <Sun className="h-3.5 w-3.5" />
                  : <Moon className="h-3.5 w-3.5" />
                }
              </button>
            )}
            ─────────────────────────────────────────────────────────────── */}

            <Link href="/review" className="ml-2">
              <button className="btn-neon px-4 py-1.5 text-xs font-medium rounded">
                Start Review
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
