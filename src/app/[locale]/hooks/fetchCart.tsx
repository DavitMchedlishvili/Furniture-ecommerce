"use server"
import { createClient } from '@/utils/supabase/server';

export async function fetchCart() {

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return (userError)
  }


  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select(
      "id, cartItem (id, quantity, product_id, name, name_ka, image, price, stripe_price_id)"
    )
    .eq("user_id", user.id)
    .single();

    if(cartError || !cart){
        return (cartError)
    }

    console.log(cart)
    return cart

};

export default fetchCart;