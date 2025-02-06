import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import DeleteButton from "@/app/[locale]/components/Buttons/DeleteButton";

import EditPostFunction from "@/app/[locale]/components/Buttons/EditPost/EditPost";

interface Params {
  id: number;
  locale: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const user = await supabase.auth.getUser();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.data.user?.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
        <p className="text-red-500">Error fetching profile. Please try again.</p>
      </div>
    );
  }

  const role = profile?.role;
  const isAdmin = role === "admin";

  const title = locale === "en" ? data.title : data.title_ka;
  const body = locale === "en" ? data.body : data.body_ka;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
      <div className="flex w-[80%] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <div className="image w-[50%] bg-white items-center flex justify-center">
          <Image
            src={data.image || "/default-image.png"}
            alt={data.title || "Post image"}
            width={500}
            height={500}
          />
        </div>
        <div className="content w-[50%] p-20 border-l-2 border-black bg-white">
          <ul className="flex flex-col justify-center gap-3">
            <li className="text-3xl font-bold">{title}</li>
            <li className="mt-2">{body}</li>
          </ul>

          {isAdmin && (
            <div>
              {/* Render the SaveButton client-side */}
              <EditPostFunction
                postId={id}
                initialTitle={data.title}
                initialBody={data.body}
                locale={locale}
              />

              <DeleteButton text={"post"} recordId={data.id} table="posts" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
