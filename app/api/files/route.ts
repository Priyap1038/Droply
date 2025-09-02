import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const parentId = searchParams.get("parentId");

    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userFiles = [];

    if (parentId) {
      console.log("Fetching with parentId:", parentId);

      userFiles = await db
        .select()
        .from(files)
        .where(
          and(eq(files.userId, userId), eq(files.parentId, parentId.toString())) // ✅ cast explicitly
        );
    } else {
      console.log("Fetching root level files for user:", userId);

      userFiles = await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), isNull(files.parentId)));
    }

    console.log("Fetched files:", userFiles);

    return NextResponse.json(userFiles);
  } catch (error: any) {
    console.error("Error fetching files:", error);

    return NextResponse.json(
      {
        error: "Error fetching files",
        details: error?.message || error,
      },
      { status: 500 }
    );
  }
}
