"use server";

import { cookies } from "next/headers";
import { parseSetCookie } from "@/app/utils/parseSetCookie";

export async function authenticate(
  _previousState: unknown,
  formData: FormData,
) {
  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    // propagate cookies
    const cookieStore = cookies();

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

  return undefined;
}
