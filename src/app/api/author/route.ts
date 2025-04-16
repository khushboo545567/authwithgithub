// NOT IN WORKING
import connectDB from "@/lib/connectMongo";
import Author from "@/models/author";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await auth();
    console.log("session is :", session);

    if (!session || !session.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { name, email, image } = session.user;

    // check if user already exist in DB
    let author = await Author.findOne({ email });

    //if user does not exist create new one
    if (!author) {
      author = await Author.create({ name, email, image });
      console.log("new author created", author);
    } else {
      console.log("author already exist", author);
    }

    return NextResponse.json({ message: "author authenticated", author });
  } catch (err) {
    console.error("❌ Error creating author:", err);

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
