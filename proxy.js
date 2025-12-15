import { NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

export default function proxy() {
  return NextResponse.next();
}
