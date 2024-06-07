interface ResponseCookie {
  name: string;
  value: string;
  expires?: number;
  httpOnly?: boolean;
  maxAge?: number;
  priority?: "low" | "medium" | "high";
  sameSite?: true | false | "lax" | "strict" | "none";
  secure?: boolean | undefined;
  path?: string | undefined;
}

export function parseSetCookie(setCookie: string): ResponseCookie {
  const [cookie, ...options] = setCookie.split(";");
  const [name, value = ""] = cookie.split("=");

  let expires, httpOnly, maxAge, priority, sameSite, secure, path;

  const sanitisedOptions = options.map((option) => {
    const trimmed = option.trim();
    const [key, value] = trimmed.split("=");
    return { key, value: value === "" ? true : value };
  });

  sanitisedOptions.forEach(({ key, value }) => {
    switch (key) {
      case "HttpOnly":
        httpOnly = true;
        break;
      case "Expires":
        if (typeof value === "string") {
          expires = Number(value);
        }
        break;
      case "Max-Age":
        if (typeof value === "string") {
          maxAge = Number(value);
        }
        break;
      case "Priority":
        if (typeof value === "string") {
          if (value === "Low" || value === "Medium" || value === "High") {
            priority = value.toLowerCase() as "low" | "medium" | "high";
          }
        }
        break;
      case "SameSite":
        if (typeof value === "string") {
          if (value === "Lax" || value === "Strict" || value === "None") {
            sameSite = value.toLowerCase() as "lax" | "strict" | "none";
          }
        }
        if (typeof value === "boolean") {
          sameSite = true;
        }
        break;
      case "Secure":
        secure = true;
        break;
      case "Path":
        if (typeof value === "string") {
          path = value;
        }
        break;
      default:
        break;
    }
  });

  return {
    name,
    value,
    expires,
    httpOnly,
    maxAge,
    priority,
    sameSite,
    secure,
    path,
  };
}
