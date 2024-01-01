import { NextRequest, NextResponse } from "next/server";
import { COOKIE_AUTH_TOKEN, paths } from "./common/libs/contants";

export const middleware = async (request: NextRequest) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/dashboard") && !request.cookies.get(COOKIE_AUTH_TOKEN)) {
    return NextResponse.redirect(new URL(paths.login, request.url));
  }

  if (url.pathname === "/dashboard") {
    return NextResponse.redirect(new URL(paths.home, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    // skip these
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
