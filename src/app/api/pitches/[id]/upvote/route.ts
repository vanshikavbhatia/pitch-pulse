import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pitchId } = await params;
    const body = await req.json().catch(() => ({}));
    const { userId = "usr_vanshika" } = body;

    const existing = await prisma.upvote.findUnique({
      where: {
        pitchId_userId: { pitchId, userId },
      },
    });

    let upvoted = false;
    if (existing) {
      await prisma.upvote.delete({
        where: { id: existing.id },
      });
      await prisma.pitch.update({
        where: { id: pitchId },
        data: { upvoteCount: { decrement: 1 } },
      });
      upvoted = false;
    } else {
      await prisma.upvote.create({
        data: { pitchId, userId },
      });
      await prisma.pitch.update({
        where: { id: pitchId },
        data: { upvoteCount: { increment: 1 } },
      });
      upvoted = true;
    }

    const updated = await prisma.pitch.findUnique({
      where: { id: pitchId },
      select: { upvoteCount: true },
    });

    return NextResponse.json({
      success: true,
      upvoted,
      upvoteCount: updated?.upvoteCount ?? 0,
    });
  } catch (error) {
    console.error("POST /api/pitches/[id]/upvote error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle upvote" },
      { status: 500 }
    );
  }
}
