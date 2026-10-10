import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllPitches } from "@/lib/dataService";
import { analyzePitch } from "@/lib/aiAuditor";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q")?.toLowerCase();

    let pitches = await getAllPitches();

    if (category && category !== "All") {
      pitches = pitches.filter((p) => p.category === category);
    }

    if (query) {
      pitches = pitches.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.user.name.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ success: true, pitches });
  } catch (error) {
    console.error("GET /api/pitches error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pitches" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = "usr_vanshika",
      title,
      tagline,
      category = "AI & DevTools",
      stage = "MVP",
      targetMinutes = 3.0,
      scriptContent,
      slidesData,
      demoUrl,
      repoUrl,
    } = body;

    if (!title || !scriptContent) {
      return NextResponse.json(
        { success: false, error: "Title and pitch script are required." },
        { status: 400 }
      );
    }

    // Run AI Analysis
    const analysis = await analyzePitch(scriptContent, title, category, targetMinutes);

    // Ensure user exists or use default
    let authorUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!authorUser) {
      authorUser = await prisma.user.findFirst();
    }
    const finalUserId = authorUser?.id || "usr_vanshika";

    // Save pitch to database with relational analysis
    const pitch = await prisma.pitch.create({
      data: {
        userId: finalUserId,
        title,
        tagline: tagline || title,
        category,
        stage,
        targetMinutes: Number(targetMinutes) || 3.0,
        scriptContent,
        slidesData: slidesData ? JSON.stringify(slidesData) : null,
        demoUrl,
        repoUrl,
        overallScore: analysis.overallScore,
        hookScore: analysis.hookScore,
        problemScore: analysis.problemScore,
        marketScore: analysis.marketScore,
        techScore: analysis.techScore,
        deliveryScore: analysis.deliveryScore,
        wordsPerMinute: analysis.wordsPerMinute,
        isPublished: true,
        analysis: {
          create: {
            overallScore: analysis.overallScore,
            hookScore: analysis.hookScore,
            problemScore: analysis.problemScore,
            marketScore: analysis.marketScore,
            techScore: analysis.techScore,
            deliveryScore: analysis.deliveryScore,
            estimatedMinutes: analysis.estimatedMinutes,
            wordCount: analysis.wordCount,
            wordsPerMinute: analysis.wordsPerMinute,
            hookCritique: analysis.hookCritique,
            problemCritique: analysis.problemCritique,
            marketCritique: analysis.marketCritique,
            techCritique: analysis.techCritique,
            deliveryCritique: analysis.deliveryCritique,
            punchyHookSuggestions: JSON.stringify(analysis.punchyHookSuggestions),
            investorQa: JSON.stringify(analysis.investorQa),
            actionPlan: JSON.stringify(analysis.actionPlan),
          },
        },
      },
      include: {
        analysis: true,
        user: true,
      },
    });

    // Record activity
    await prisma.activityLog.create({
      data: {
        userId: finalUserId,
        userName: authorUser?.name || "Cohort Founder",
        action: "SUBMITTED_PITCH",
        targetTitle: title,
        details: `Scored ${analysis.overallScore}/100 on Demo Day AI Audit.`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, pitch, analysis });
  } catch (error) {
    console.error("POST /api/pitches error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create and analyze pitch" },
      { status: 500 }
    );
  }
}
