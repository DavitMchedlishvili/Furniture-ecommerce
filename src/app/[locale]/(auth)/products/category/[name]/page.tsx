import ProductsCard from "@/app/[locale]/components/ProductsCard/ProductsCard";
import { addToCart } from "@/app/[locale]/hooks/addToCart";
import { createClient } from "@/utils/supabase/server";
import { ProductProps } from "@/types/ProductProps"

import React from "react";


interface PageProps {
    name: string;
}

export default async function Category({
  params,
}: {
  params: Promise<PageProps>;
}) {
  const { name } = await params;

  if (!name) {
    return <div>Invalid category name</div>;
  }

  const supabase = await createClient();

  // Fetch the products and specify the correct type for the data
  const { data: products, error } = await supabase
  .from("products")
  .select("*")
  .eq("category", name) as { data: ProductProps[]; error: Error | null };


  if (error) {
    console.log(error);
    return <div>Error fetching product details. Please try again later.</div>;
  }

  if (!products || products.length === 0) {
    return <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
    <div className="flex w-[50%] items-center justify-center gap-6  p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-100 dark:border-slate-800">
      No products found for this category.
    </div>
  </div>
  
  }

  console.log(products);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
      {products.length === 0 ? (
        <div className="text-center py-8">Sorry, there are no products.</div>
      ) : (
        <div className="flex gap-6 w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-100 dark:border-slate-800">
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};


