import {getAuth } from "@clerk/nextjs/server";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Clerk authentication (sync, no await)
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bodyUserId = formData.get("userId") as string;

    console.log('formdata kys:', Array.from(formData.keys()))
    
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
      file: base64File, // base64 string required
      fileName: file.name,
      folder: "/upload",
    });

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        url: uploadResponse.url,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error saving file:", error);

    let message = error instanceof Error? error.message: "Unknown error";

    return NextResponse.json({error: message},{status: 500});
  }
}
