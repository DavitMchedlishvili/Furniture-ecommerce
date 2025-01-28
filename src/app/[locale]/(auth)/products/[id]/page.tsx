import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    locale: string; // Assuming locale is part of the URL path
    id: string; // Product ID is part of the URL
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = params; // Directly destructure params, no need to `await`

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

  // Use locale to determine which description and fields to show
  const description =
    locale === "en" ? data.description_en : data.description_ka;
  const name = locale === "en" ? data.name : data.name_ka;
  const color = locale === "en" ? data.color_en : data.color_ka;
  const woodType = locale === "en" ? data.wood_type_en : data.wood_type_ka;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800">
      <div className="flex w-[80%] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <div className="image w-[50%] bg-white items-center flex justify-center">
          <img src={data.image} alt={data.name} className="max-w-lg w-full" />
        </div>
        <div className="content w-[50%] p-20 border-l-2 border-black bg-white">
          <ul className="flex flex-col justify-center gap-3">
            <li className="text-3xl font-bold">{name}</li>
            <li className="mt-4 text-xl">Color: {color}</li>
            <li className="mt-4 text-xl">Wood Type: {woodType}</li>
            <li className="mt-2">{description}</li>
            <li className="mt-4 text-xl">Price: ${data.price}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
