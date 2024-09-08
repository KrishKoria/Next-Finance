import { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/login?refresh=true", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
