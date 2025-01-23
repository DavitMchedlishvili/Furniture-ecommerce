import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";



export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const locale = url.pathname.split('/')[1];  
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error during code exchange:", error.message);
        return NextResponse.redirect(`${url.origin}/${locale}/auth/error`); 
      }

      return NextResponse.redirect(`${url.origin}/${locale}`); 
    } catch (error) {
      console.error("Unexpected error during code exchange:", error);
      return NextResponse.redirect(`${url.origin}/${locale}/auth/error`); 
    }
  }

  return NextResponse.redirect(`${url.origin}/${locale}/auth/error`);
}