import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { user } from "@heroui/theme";
import { error } from "console";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { useId } from "react";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const serachParams = request.nextUrl.searchParams;
    const queryUserId = serachParams.get("userId");
    const parentId = serachParams.get("parentId");

    if (!queryUserId || queryUserId !== userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    //  fetch files from database

    let userFiles;
    if (parentId) {
      // fetching from soecific folder
      await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), eq(files.parentId, parentId)));
    } else {
      await db
        .select()
        .from(files)
        .where(and(eq(files.userId, userId), isNull(files.parentId)));
    }

    return NextResponse.json(userFiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Error to fetch the data" },
      { status: 500 }
    );
  }
}
