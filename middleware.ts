import { log } from "console";
import { auth } from "./auth";

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log("Middleware invoked on path", req.nextUrl.pathname);
  console.log("Is logged in?", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
