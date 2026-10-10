import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pitchId } = await params;
    const body = await req.json();

    const {
      reviewerId = "usr_alex",
      rating = 5,
      hookRating = 5,
      clarityRating = 5,
      viabilityRating = 5,
      feedback,
    } = body;

    if (!feedback || feedback.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Feedback comment cannot be empty." },
        { status: 400 }
      );
    }

    // Verify reviewer exists or fallback to existing user
    let reviewer = await prisma.user.findUnique({ where: { id: reviewerId } });
    if (!reviewer) {
      reviewer = await prisma.user.findFirst();
    }
    const finalReviewerId = reviewer?.id || "usr_alex";

    const review = await prisma.review.create({
      data: {
        pitchId,
        reviewerId: finalReviewerId,
        rating: Math.min(5, Math.max(1, Number(rating))),
        hookRating: Math.min(5, Math.max(1, Number(hookRating))),
        clarityRating: Math.min(5, Math.max(1, Number(clarityRating))),
        viabilityRating: Math.min(5, Math.max(1, Number(viabilityRating))),
        feedback: feedback.trim(),
        upvotes: 0,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },
      },
    });

    // Record activity
    const pitch = await prisma.pitch.findUnique({
      where: { id: pitchId },
      select: { title: true },
    });

    await prisma.activityLog.create({
      data: {
        userId: finalReviewerId,
        userName: reviewer?.name || "Peer Reviewer",
        action: "REVIEWED_PITCH",
        targetTitle: pitch?.title || "Pitch",
        details: `Left a ${rating}-star critique: "${feedback.slice(0, 60)}..."`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("POST /api/pitches/[id]/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
