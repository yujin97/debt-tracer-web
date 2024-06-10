"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseSetCookie } from "@/app/utils/parseSetCookie";
import { parseRequestCookie } from "@/app/utils/parseRequestCookie";

export async function authenticate(
  _previousState: unknown,
  formData: FormData,
) {
  const cookieStore = cookies();

  // forwards request cookies to backend server
  const requestCookieHeader = cookieStore
    .getAll()
    .map(parseRequestCookie)
    .join("; ");

  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: requestCookieHeader,
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    // propagate cookies to client
    response.headers.getSetCookie().forEach((setCookie) => {
      const parsedSetCookie = parseSetCookie(setCookie);
      cookieStore.set(parsedSetCookie);
    });

    if (!response.ok) {
      return "Failed to authenticate user";
    }
  } catch (e) {
    return "Failed to authenticate user";
  }

  redirect("/");
}
