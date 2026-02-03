export const runtime = "nodejs";

import { files } from "lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { db } from "lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // get formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bodyUserId = formData.get("userId") as string | null;
    const parentId = formData.get("parentId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!bodyUserId || bodyUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert file -> Buffer (Node.js doesn't handle `File` directly)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");

    // Imagekit instance
    const imagekit = new ImageKit({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    });

    // Upload to ImageKit
    const uploaded = await imagekit.upload({
      file: base64File, // actual file buffer
      fileName: file.name,
      folder: `/droply/${userId}`, // organized per-user folder
    });

    // Prepare metadata for DB
    const fileData = {
      name: file.name,
      path: `/folders/${userId}`,
      size: file.size,
      type: file.type || "application/octet-stream",
      fileUrl: uploaded.url,
      thumbnailUrl: uploaded.thumbnailUrl || null,
      userId: userId,
      parentId: parentId ? parentId : null,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    // Save to DB
    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json({
      message: "File uploaded successfully",
      file: newFile,
    },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error uploading file:", error);

    return NextResponse.json(
      { error: "Failed to upload and save file" },
      { status: 500 }
    );
  }
}
