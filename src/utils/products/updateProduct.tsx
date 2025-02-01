"use server"
import { createClient } from "../supabase/server";

export async function updateProduct(productId: number, updatedData: {
  name: string;
  name_ka: string;
  price: number;
  image: string;
  user_id: number;
  color_en: string;
  color_ka: string;
  height: number;
  total_height: number;
  seat_height: number;
  width: number;
  weight: number;
  wood_type_en: string;
  wood_type_ka: string;
  category: string;
  description_en: string;
  description_ka: string;
}) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name: updatedData.name,
        name_ka: updatedData.name_ka,
        price: updatedData.price,
        image: updatedData.image,
        user_id: updatedData.user_id,
        color_en: updatedData.color_en,
        color_ka: updatedData.color_ka,
        height: updatedData.height,
        total_height: updatedData.total_height,
        seat_height: updatedData.seat_height,
        width: updatedData.width,
        weight: updatedData.weight,
        wood_type_en: updatedData.wood_type_en,
        wood_type_ka: updatedData.wood_type_ka,
        category: updatedData.category,
        description_en: updatedData.description_en,
        description_ka: updatedData.description_ka,
      })
      .eq("id", productId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error };
  }
}

