import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
    
        <div className="w-full md:w-[50%] flex justify-center items-center p-4">
          <Image
            src={data.image || "/default-image.png"}
            alt={data.title || "defaultImageAlt"} // Translated alt text
            width={500}
            height={500}
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-[50%] p-6 md:p-10 border-t-2 md:border-l-2 md:border-t-0 border-black bg-white dark:bg-slate-700 max-h-[600px] overflow-y-auto">
          <ul className="flex flex-col gap-3">
            <li className="text-2xl md:text-3xl font-bold">{title}</li>
            <li className="mt-2 text-sm md:text-base">{body}</li>
          </ul>

          {isAdmin && (
            <div className="mt-6 flex flex-col gap-4">
              {/* Edit Post Button */}
              <EditPostFunction
                postId={id}
                initialTitle={data.title}
                initialBody={data.body}
                initialTitle_ka={data.title_ka}
                initialBody_ka={data.body_ka}
              />

              {/* Delete Button */}
              <DeleteButton text={"deletePost"} recordId={data.id} table="posts" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
