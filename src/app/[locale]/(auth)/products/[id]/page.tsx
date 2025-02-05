import DeleteButton from "@/app/[locale]/components/Buttons/DeleteButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

import { notFound } from "next/navigation";

interface Params {
  id: number;
  locale: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, id } = await params;

  // Create the Supabase client for querying data
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single(); // Query for a single product based on ID

  if (error || !data) {
    notFound(); // If there's an error or no data, trigger the 404 page
  }

  const user = await supabase.auth.getUser(); // Get the authenticated user
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.data.user?.id)
    .single(); // Use single() since we expect one user

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
        <p className="text-red-500">
          Error fetching profile. Please try again.
        </p>
      </div>
    );
  }

  const role = profile?.role; // Extract role if available

  // Check if the user is an admin
  const isAdmin = role === "admin";

  // Use locale to determine which description and fields to show
  const description =
    locale === "en" ? data.description_en : data.description_ka;
  const name = locale === "en" ? data.name : data.name_ka;
  const color = locale === "en" ? data.color_en : data.color_ka;
  const woodType = locale === "en" ? data.wood_type_en : data.wood_type_ka;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
      <div className="flex w-[80%] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <div className="image w-[50%] bg-white items-center flex justify-center">
          <Image
            src={data.image || "/default-image.png"}
            alt={data.name || "Product image"}
            width={500}
            height={500}
          />
        </div>
        <div className="content w-[50%] p-20 border-l-2 border-black bg-white">
          <ul className="flex flex-col justify-center gap-3">
            <li className="text-3xl font-bold">{name}</li>
            <li className="mt-4 text-xl">Color: {color}</li>
            <li className="mt-4 text-xl">Wood Type: {woodType}</li>
            <li className="mt-2">{description}</li>
            <li className="mt-4 text-xl">Price: ${data.price}</li>
          </ul>

          {isAdmin && <DeleteButton text={"product"} productId={data.id} />}
        </div>
      </div>
    </div>
  );
}
