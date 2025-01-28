import { createClient } from '@/utils/supabase/server';

const getProducts = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
  .from('products')
  .select('*')

  // Handle error by returning null
  if (error) {
    console.error("Error fetching products:", error.message);
    return null; // Return null on error
  }

  // If no products are found, return null
  if (!data || data.length === 0) {
    return null; // Return null if no products found
  }

  console.log("data", data)
  return data
};

export default getProducts;

