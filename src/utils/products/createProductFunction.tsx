"use server";
import Stripe from "stripe";
import { createClient } from "../supabase/server";

export async function createProductFunction(formData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
   const supabase = await createClient();
  
    const userResponse = await supabase.auth.getUser();
    const user_id = userResponse.data?.user?.id;
  
    if (!user_id) {
      return { success: false, message: 'User not authenticated.' };
    }

    const name= formData.get("name") as string;
    const name_ka= formData.get("name_ka") as string;
    const description_en = formData.get("description_en") as string;
    const description_ka = formData.get("description_ka") as string;
    const image = formData.get("image") as string;
    const price = Number(formData.get('price'));
    const category= formData.get('category') as string;
    const color_en = formData.get('color_en') as string;
    const color_ka = formData.get('color_ka') as string;
    const height = formData.get('height') as string;
    const total_height = formData.get('totalHeight') as string;
    const seat_height = formData.get("seatHeight") as string;
    const width = formData.get("width") as string;
    const wood_type_en = formData.get("woodType_en") as string;
    const wood_type_ka = formData.get("woodType_ka") as string;
    const weight = formData.get("weight") as string;

  try {
    const stripeProduct = await stripe.products.create({
      name,
      images: [image],
    });
    console.log({ stripeProduct });
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price,
      currency: "usd",
    });
    const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      name_ka,
      price,
      image,
      user_id,
      color_en,
      color_ka,
      height,
      total_height,
      seat_height,
      width,
      weight,
      wood_type_en,
      wood_type_ka,
      category,
      description_en,
      description_ka,
      stripe_product_id: stripeProduct.id,
      stripe_price_id: stripePrice.id,
    })
    

  if (error) {
    console.error("Error inserting into Supabase:", error);
    return {
      success: false,
      message: "Failed to insert product into the database.",
    };
  }

  console.log("Product inserted into Supabase:", data);

  return {
    success: true,
    message: "Product created successfully",
  };
} catch (error) {
  console.error("Error creating product:", error);

  return {
    success: false,
    message: "Error creating product. Please try again.",
  };
  }
}