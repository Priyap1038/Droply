import { auth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bodyUserId = formData.get("userId") as string;
    const parentId = formData.get("parentId") as string | null;

    console.log("formdata keys:", Array.from(formData.keys()));

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (bodyUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert file → base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");

    // ImageKit instance
    const imageKit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
    });

    // Upload to ImageKit
    const uploadResponse = await imageKit.upload({
      file: base64File,
      fileName: file.name,
      folder: `/uploads/${userId}`,
      useUniqueFileName: true,
    });

    // Save file metadata to database
    const [newFile] = await db
      .insert(files)
      .values({
        name: file.name,
        path: uploadResponse.filePath,
        size: file.size,
        type: file.type,
        fileUrl: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl ?? null,
        userId,
        parentId: parentId || null,
        isFolder: false,
        isStarred: false,
        isTrash: false,
      })
      .returning();

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        file: newFile,
        url: uploadResponse.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error?.message || error },
      { status: 500 }
    );
  }
}
