export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq, and } from "drizzle-orm";

console.log("📁 Create Folder API route hit");


export async function POST(request: NextRequest) {
  try {
    // Get authenticated user ID
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, userId: bodyUserId, parentId = null } = body;

    // Ensure the client-side userId matches the authenticated user
    if (bodyUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate folder name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    // If parent folder is specified, verify it exists and belongs to the user
    if (parentId) {
      const [parentFolder] = await db
        .select()
        .from(files)
        .where(
          and(
            eq(files.id, parentId),
            eq(files.userId, userId),
            eq(files.isFolder, true)
          )
        );

      if (!parentFolder) {
        return NextResponse.json(
          { error: "Parent folder not found or unauthorized" },
          { status: 404 }
        );
      }
    }

    const folderId = uuidv4(); // Use this ID in both 'id' and 'path'

    // Create the folder entry
    const [newFolder] = await db
      .insert(files)
      .values({
        id: folderId,
        name: name.trim(),
        path: `/folders/${userId}/${folderId}`,
        size: 0,
        type: "folder",
        fileUrl: "",
        thumbnailUrl: null,
        userId,
        parentId,
        isFolder: true,
        isStarred: false,
        isTrash: false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Folder created successfully",
      folder: newFolder,
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}
