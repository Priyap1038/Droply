import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // parse request body 
    const body = await request.json();
    const {imagekit,userId:bodyUserId} = body;

    if(bodyUserId !== userId){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if(!imagekit || !imagekit.urlEndpoint)

  } catch (error) {

  }
}
