import { createClient } from "@/utils/supabase/server";

export default async function getOrders() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, quantity, product_id, name, name_ka, image, price, stripe_price_id")
    .eq("user_id", user.id);

  if (ordersError || !orders) {
    return [];
  }

  return orders;
}