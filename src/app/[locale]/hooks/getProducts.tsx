import { createClient } from '@/utils/supabase/server';

const getProducts = async (category?: string) => {
  const supabase = await createClient();
  
  let query = supabase.from('products').select('*');

  // If a category is provided, filter products by category
  if (category) {
    query = query.eq('category', category); // Assuming 'category' is the column name in your Supabase table
  }

  const { data, error } = await query;

  // Handle error by returning null
  if (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }

  // If no products are found, return null
  if (!data || data.length === 0) {
    return null; // Return null if no products found
  }

  console.log("data", data);
  return data;
};

export default getProducts;

