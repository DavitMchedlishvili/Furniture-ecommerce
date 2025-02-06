import ProductsCard from "@/app/[locale]/components/ProductsCard/ProductsCard";
import { addToCart } from "@/app/[locale]/hooks/addToCart";
import { createClient } from "@/utils/supabase/server";

import React from 'react'

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = params; // No need to await params

  if (!name) {
    return "invalid category name";
  }

  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", name);

  if (error) {
    console.log(error);
    return <div>Error fetching product details. Please try again later.</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  console.log(products);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700'>
      {products.length === 0 ? (
        <div className="text-center py-8">Sorry, there are no products.</div>
      ) : (
        <div className='flex gap-6 w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-100 dark:border-slate-800'>
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
