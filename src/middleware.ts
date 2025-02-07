import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server"; // Your custom createClient function
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const nextIntlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {

 nextIntlMiddleware(req)


  const supabase = createClient();
  const { data, error } = await (await supabase).auth.getSession();

 

  const session = data?.session;

  const isLoginPage = req.nextUrl.pathname.includes("/login");
  const isRestrictedPage = [
    "/contact",
    "/profile",
    "/blog",
    "/about",
    "/products",
    "/create-product",
    "/posts",
  ].some((path) => req.nextUrl.pathname.includes(path));



  // If there's no session and trying to access a restricted page
  if (!session && isRestrictedPage && !isLoginPage) {
    const locale = req.nextUrl.pathname.startsWith("/ka") ? "ka" : "en";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    console.log("Redirecting to login:", loginUrl.toString()); // Log the redirection URL
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to default locale if not in /en or /ka
  if (
    !req.nextUrl.pathname.startsWith("/en") &&
    !req.nextUrl.pathname.startsWith("/ka")
  ) {
    const defaultLocale = "en";
    const redirectUrl = new URL(
      `/${defaultLocale}${req.nextUrl.pathname}`,
      req.url
    );
    console.log("Redirecting to default locale:", redirectUrl.toString()); // Log redirection to default locale
    return NextResponse.redirect(redirectUrl); // Redirect to default locale
  }

  const intlResponse = await nextIntlMiddleware(req);
  if (intlResponse) {
  return intlResponse; 
}

  return NextResponse.next();
}


export const config = {
  matcher: ["/", "/(ka|en)/:path*"], // Match all paths for both English and Georgian locales
};



// import { NextResponse, NextRequest } from "next/server";
// import { createClient } from "./utils/supabase/server"; // Your custom createClient function
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// const nextIntlMiddleware = createMiddleware(routing);

// export async function middleware(req: NextRequest) {
//   nextIntlMiddleware(req);

//   const supabase = createClient();
//   const { data, error: sessionError } = await (await supabase).auth.getSession();

//   // Use supabase.auth.getUser() to securely get the authenticated user
//   const { data: sessionData, error: userError } = await (await supabase).auth.getSession();
//   const user = sessionData?.session?.user;

//   const isLoginPage = req.nextUrl.pathname.includes("/login");
//   const isRestrictedPage = [
//     "/contact",
//     "/profile",
//     "/blog",
//     "/about",
//     "/products",
//     "/create-product",
//     "/posts",
//     "/create-post",
//   ].some((path) => req.nextUrl.pathname.includes(path));

//   // If there's no user and trying to access a restricted page
//   if (!user && isRestrictedPage && !isLoginPage) {
//     const locale = req.nextUrl.pathname.startsWith("/ka") ? "ka" : "en";
//     const loginUrl = new URL(`/${locale}/login`, req.url);
//     console.log("Redirecting to login:", loginUrl.toString()); // Log the redirection URL
//     return NextResponse.redirect(loginUrl);
//   }

//   // If the user is logged in, check if their role is not admin
//   if (user) {
//     // Fetch user profile and check if they are an admin
//     const client = await supabase;
//     const userId = sessionData?.session?.user?.id; // Accessing user id from session object
//     const { data: profileData, error } = await client
//       .from("profiles")
//       .select("role")
//       .eq("user_id", userId)
//       .single();

//     if (error) {
//       console.error("Error fetching role:", error);
//     }

//     const isAdmin = profileData?.role === "admin"; // Assuming 'role' is stored in profile data

//     // Restrict access to /create-product and /create-post for non-admin users
//     const isCreateProductOrPostPage = [
//       "/create-product",
//       "/create-post",
//     ].some((path) => req.nextUrl.pathname.includes(path));

//     if (!isAdmin && isCreateProductOrPostPage) {
//       const locale = req.nextUrl.pathname.startsWith("/ka") ? "ka" : "en";
//       const redirectUrl = new URL(`/`, req.url); // Redirect to profile or another page
//       console.log("Redirecting non-admin to profile:", redirectUrl.toString()); // Log the redirection URL
//       return NextResponse.redirect(redirectUrl);
//     }
//   }

//   // Redirect to default locale if not in /en or /ka
//   if (
//     !req.nextUrl.pathname.startsWith("/en") &&
//     !req.nextUrl.pathname.startsWith("/ka")
//   ) {
//     const defaultLocale = "en";
//     const redirectUrl = new URL(
//       `/${defaultLocale}${req.nextUrl.pathname}`,
//       req.url
//     );
//     console.log("Redirecting to default locale:", redirectUrl.toString()); // Log redirection to default locale
//     return NextResponse.redirect(redirectUrl); // Redirect to default locale
//   }

//   const intlResponse = await nextIntlMiddleware(req);
//   if (intlResponse) {
//     return intlResponse;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/(ka|en)/:path*"], // Match all paths for both English and Georgian locales
// };


