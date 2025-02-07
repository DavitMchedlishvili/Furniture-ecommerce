import DeleteButton from "@/app/[locale]/components/Buttons/DeleteButton";
import EditProduct from "@/app/[locale]/components/Buttons/EditProducts/EditProduct";
// import AddToCartButton from "@/app/[locale]/components/Buttons/AddToCartButton"
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
  id: number;
  locale: string;
}

interface EditProductProps {
  productId: number;
  initialName: string;
  initialColor: string;
  initialWoodType: string;
  initialWidth: number;
  initialHeight: number;
  initialWeight: number;
  initialName_ka: string;
  initialColor_ka: string;
  initialWoodType_ka: string;
  initialDescription_ka: string;
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
    .single();

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
  const price = data.price;

  // Extract the category from the product data
  const category = data.category; // Assuming the product category is available in the data object

  // Define the attributes to display based on the category
  const isChairCategory = [
    "chairs",
    "arm chairs",
    "barstools",
    "lounge seats",
  ].includes(category?.toLowerCase());

  const isAccessoryCategory = category?.toLowerCase() === "accessories";

  if (data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
        <div className="flex flex-col md:flex-row w-full md:w-[80%] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
          <div className="image w-full md:w-[50%] bg-white flex justify-center mb-6 md:mb-0">
            <Image
              src={data.image || "/default-image.png"}
              alt={data.name || "Product image"}
              width={500}
              height={500}
            />
          </div>
          <div className="w-full md:w-[50%] p-6 md:p-20 border-l-2  border-black bg-white max-h-[600px] overflow-x-auto scrollbar">
            <div className="w-full mb-5">
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="font-bold">Name</p>
                  <p>{name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Color</p>
                  <p>{color}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Wood Type</p>
                  <p>{woodType}</p>
                </div>

                {/* Conditionally render based on the category */}
                {isChairCategory && (
                  <>
                    <div className="flex justify-between">
                      <p className="font-bold">Width</p>
                      <p>{data.width}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Total Height</p>
                      <p>{data.total_height}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Seat Height</p>
                      <p>{data.seat_height}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Weight</p>
                      <p>{data.weight}</p>
                    </div>
                  </>
                )}

                {isAccessoryCategory && (
                  <>
                    <div className="flex justify-between">
                      <p className="font-bold">Width</p>
                      <p>{data.width}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Height</p>
                      <p>{data.height}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Weight</p>
                      <p>{data.weight}</p>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <p className="font-bold">Description:</p>
                  <p className="flex-grow text-right">{description}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Price:</p>
                  <p className="flex-grow text-right">{price}</p>
                </div>
              </div>
            </div>

            <EditProduct
              productId={data.id}
              initialName={name}
              initialName_ka={data.name_ka}
              initialColor_ka={data.color_ka}
              initialWoodType_ka={data.wood_type_ka}
              initialDescription_ka={data.description_ka}
              initialColor={color}
              initialWoodType={woodType}
              initialDescription={description}
              initialPrice={data.price}
              locale={locale}
            />

            {isAdmin && <DeleteButton text={"product"} recordId={data.id} table="products" />}
          </div>
        </div>
      </div>
    );
  }
}
