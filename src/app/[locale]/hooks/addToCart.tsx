import { ProductProps } from "@/types/ProductProps";
import { createClient } from "@/utils/supabase/server";


export const addToCart = async (product: ProductProps): Promise<string> => {
  "use server";

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Please log in to continue");
    }
    const user_id = user.id;
    console.log(user_id);

    const { data: existingCart, error: existingCartError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (existingCartError) {
      // Insert a new cart if it doesn't exist
      const { data: newCart, error: newCartError } = await supabase
        .from("cart")
        .insert({ user_id })
        .select();

      if (newCartError) {
        throw new Error(newCartError.message);
      }

      // The newCart contains the created cart
      const existingCart = newCart[0];
      console.log(existingCart);
    }

    // Check if the product already exists in the cart
    const { data: existingCartItem, error: cartItemError } = await supabase
      .from("cartItem")
      .select("id, quantity")
      .eq("cart_id", existingCart?.id)
      .eq("product_id", product.id)
      .single();

    if (cartItemError && cartItemError.code !== "PGRST116") {
      throw new Error("Error checking cart item: " + cartItemError.message);
    }

    // Update the quantity if the product exists
    if (existingCartItem) {
      const { error: updateError } = await supabase
        .from("cartItem")
        .update({ quantity: existingCartItem.quantity + 1 })
        .eq("id", existingCartItem.id);

      if (updateError) {
        throw new Error(
          "Error updating cart item quantity: " + updateError.message
        );
      }
    } else {
      const { error: insertError } = await supabase.from("cartItem").insert({
        name: product.name,
        cart_id: existingCart?.id,
        product_id: product.id,
        quantity: 1,
        stripe_product_id: product.stripe_product_id,
        stripe_price_id: product.stripe_price_id,
        image: product.image,
        price: product.price,
        name_ka: product.name_ka,
      });

      if (insertError) {
        throw new Error(
          "Error adding product to cartItems: " + insertError.message
        );
      }
    }

    return `Great choice! ${product.name} has been added to your cart. Head to your cart to review and complete your order.`;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding product to cart:", err.message);
      return "Error adding product to cart: " + err.message;
    } else {
      console.error("Unexpected error adding product to cart:", err);
      return "Unexpected error adding product to cart";
    }
  }
};
