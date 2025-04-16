import { createPitch } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("API received data:", formData);
    const result = await createPitch(null, formData, formData.pitch);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
