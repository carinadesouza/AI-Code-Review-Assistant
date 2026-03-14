import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CodeReviewAI — AI-Powered Code Review",
  description:
    "Paste your code and get instant AI-powered analysis: code quality, security warnings, improvements, and best-practice recommendations.",
  keywords: ["code review", "AI", "static analysis", "security", "best practices"],
  openGraph: {
    title: "CodeReviewAI — AI-Powered Code Review",
    description: "Instant AI code analysis powered by Llama 3.3 70B via Groq.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased font-sans", inter.variable, jetbrainsMono.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delay={300}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
