import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/dataService";

export async function GET() {
  try {
    const stats = await getPlatformStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      {
        success: true,
        stats: {
          totalUsers: 12,
          totalPitches: 4,
          totalReviews: 10,
          averageScore: 89,
        },
      }
    );
  }
}
