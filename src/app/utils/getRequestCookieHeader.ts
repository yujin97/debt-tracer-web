import { cookies } from "next/headers";
import { parseRequestCookie } from "@/app/utils/parseRequestCookie";

export function getRequestCookieHeader() {
  const cookieStore = cookies();

  return cookieStore.getAll().map(parseRequestCookie).join("; ");
}
