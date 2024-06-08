interface RequestCookie {
  name: string;
  value: string;
}

export function parseRequestCookie({ name, value }: RequestCookie): string {
  return `${name}=${value}`;
}
