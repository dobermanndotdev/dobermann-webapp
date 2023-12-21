import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const cookieToken = cookies().get(COOKIE_AUTH_TOKEN);

  if (pathname.startsWith("/dashboard")) {
    if (!cookieToken || !cookieToken.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
