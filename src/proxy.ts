import type { NextRequest } from "next/server";

export const config = {
  matcher: "/auth/:path*",
};

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // console.log(request, "proxy request");
  //   return NextResponse.redirect(new URL("/home", request.url));
}
