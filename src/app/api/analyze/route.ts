import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { buildUserPrompt, SYSTEM_PROMPT } from "@/lib/prompts";
import { AnalysisResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;

function validateResult(data: unknown): data is AnalysisResult {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.overallScore === "number" &&
    d.overallScore >= 0 &&
    d.overallScore <= 100 &&
    typeof d.summary === "string" &&
    Array.isArray(d.codeQuality) &&
    Array.isArray(d.securityWarnings) &&
    Array.isArray(d.improvements) &&
    Array.isArray(d.recommendations)
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, language } = body;

    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "Code is required and cannot be empty." },
        { status: 400 }
      );
    }

    if (code.length > 50_000) {
      return NextResponse.json(
        { error: "Code exceeds the 50,000 character limit." },
        { status: 413 }
      );
    }

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(code, language || "unknown") },
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      throw new Error("Empty response received from AI model.");
    }

    let result: unknown;
    try {
      result = JSON.parse(raw);
    } catch {
      throw new Error("AI returned malformed JSON. Please try again.");
    }

    if (!validateResult(result)) {
      throw new Error("AI response did not match the expected structure.");
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[/api/analyze]", err);

    if (err && typeof err === "object" && "status" in err) {
      const apiErr = err as { status: number; message?: string };
      if (apiErr.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait a moment and try again." },
          { status: 429 }
        );
      }
    }

    const message =
      err instanceof Error ? err.message : "Analysis failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
