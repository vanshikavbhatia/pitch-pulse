import { NextRequest, NextResponse } from "next/server";
import { analyzePitch } from "@/lib/aiAuditor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      scriptContent,
      title = "Capstone Pitch",
      category = "AI & DevTools",
      targetMinutes = 3.0,
    } = body;

    if (!scriptContent || scriptContent.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your pitch script to analyze." },
        { status: 400 }
      );
    }

    const analysis = await analyzePitch(scriptContent, title, category, Number(targetMinutes) || 3.0);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("POST /api/analyze error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to run AI pitch audit" },
      { status: 500 }
    );
  }
}
