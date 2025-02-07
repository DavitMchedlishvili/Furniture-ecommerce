"use server"
import { createClient } from "../supabase/server";

export async function editProduct(productId: number, updatedData: {
  name: string;
  name_ka: string;
  price: number;
  color_en: string;
  color_ka: string;
  wood_type_en: string;
  wood_type_ka: string;
  description_en: string;
  description_ka: string;
}) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        name: updatedData.name,
        name_ka: updatedData.name_ka,
        price: updatedData.price,
        color_en: updatedData.color_en,
        color_ka: updatedData.color_ka,
        wood_type_en: updatedData.wood_type_en,
        wood_type_ka: updatedData.wood_type_ka,
        description_en: updatedData.description_en,
        description_ka: updatedData.description_ka,
      })
      .eq("id", productId);

      console.log("Updated product:", data);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error };
  }
}