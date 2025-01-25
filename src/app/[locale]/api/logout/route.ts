import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();


  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data: user, error: userError } =
    await supabase.auth.getUser();
  console.log("user data:", user);
  if (userError) {
    console.error("user error:", userError);
  }

  await supabase.auth.signOut();

  return NextResponse.json({ message: "Logged out successfully" });
}