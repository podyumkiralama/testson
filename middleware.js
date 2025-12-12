import { NextResponse } from "next/server";

// The previous middleware attempted to post-process HTML responses using the
// Edge Runtime's HTMLRewriter. Middleware runs _before_ a route is rendered,
// so trying to modify the response body there can trigger runtime failures on
// Vercel's edge network (which surface as sporadic ERR_CONNECTION_RESET
// responses for users). We now simply pass requests through untouched to avoid
// those intermittent crashes.

export const config = {
  matcher: ["/:path*"],
};

export default function proxy() {
  return NextResponse.next();
}
