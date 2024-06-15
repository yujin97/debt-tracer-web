import { getRequestCookieHeader } from "@/app/utils/getRequestCookieHeader";

interface UserInfo {
  userId: string;
  username: string;
}

export async function fetchUserInfo(): Promise<UserInfo | null> {
  const requestCookieHeader = getRequestCookieHeader();

  let response = null;
  let userInfo = null;

  try {
    response = await fetch(`http://127.0.0.1:8000/user`, {
      cache: "no-store",
      headers: {
        Cookie: requestCookieHeader,
      },
    });

    if (!response.ok) {
      return null;
    }
  } catch (e) {
    throw new Error("Failed to fetch data from the server", { cause: e });
  }

  try {
    userInfo = await response.json();
  } catch (e) {
    throw new Error("Failed to deserialise data", { cause: e });
  }

  return {
    userId: userInfo.user_id,
    username: userInfo.username,
  };
}
