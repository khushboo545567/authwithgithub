import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ParseServerResponseAction<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export async function checkAuth() {
  const session = await auth();
  if (!session) {
    return { error: "not signed in", status: "ERROR" };
  }
  return session;
}
