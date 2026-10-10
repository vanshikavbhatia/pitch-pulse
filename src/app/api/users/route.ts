import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/dataService";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role = "Founder", bio, githubUrl } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name, role, bio, githubUrl },
      create: {
        name,
        email,
        role,
        bio,
        githubUrl,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save user profile" },
      { status: 500 }
    );
  }
}
