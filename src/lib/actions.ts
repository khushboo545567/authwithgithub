"use server";

import connectDB from "./connectMongo";
import { checkAuth, ParseServerResponseAction } from "./utils";
import Startup from "@/models/startup";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await checkAuth();
  if ("error" in session) return ParseServerResponseAction(session);

  await connectDB();

  try {
    const { title, description, category, link } = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch")
    );

    const authorId = session?.user?.id || "unknown-user";

    const newStartup = new Startup({
      title,
      description,
      category,
      image: link,
      pitch,
      author: authorId,
    });

    await newStartup.save();
    return { success: true, message: "startup created successfully" };
  } catch (error) {
    console.error("Error creating startup:", error);
    return {
      success: false,
      message: error || "Failed to create startup",
    };
  }
};
