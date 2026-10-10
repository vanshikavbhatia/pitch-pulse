import { NextRequest, NextResponse } from "next/server";
import { getPitchById } from "@/lib/dataService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pitch = await getPitchById(id);

    if (!pitch) {
      return NextResponse.json(
        { success: false, error: "Pitch not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, pitch });
  } catch (error) {
    console.error("GET /api/pitches/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
