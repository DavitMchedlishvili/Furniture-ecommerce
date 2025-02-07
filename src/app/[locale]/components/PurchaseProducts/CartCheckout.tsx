"use client";

import React, { useState } from "react";
import { JSX } from "react";
import { createCheckoutSession } from "@/actions/stripe";
import { CartItems } from "@/types/CartItems";

// interface CartItemType {
//   id: string | number;
//   stripe_price_id: string;
//   quantity: number;
//   name: string;
//   image: string;
//   price: number;
//   product_id: string | number;
// }

interface CheckoutFormProps {
  uiMode: "hosted";
  locale: string;
  cartItems: CartItems[];
}

export default function CheckoutFormCart({
  uiMode,
  locale,
  cartItems,
}: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const formAction = async (): Promise<void> => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("uiMode", uiMode);
      formData.append("locale", locale);
      formData.append("purchaseType", "cart");
      formData.append(
        "lineItems",
        JSON.stringify(
          cartItems.map((product) => ({
            id: product.id,
            price: product.stripe_price_id,
            quantity: product.quantity,
            product_id:product.product_id
          }))
        )
      );

      const { url } = await createCheckoutSession(formData);

      if (url) {
        window.location.assign(url);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className={`w-[40%] mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={formAction}
        disabled={loading}
        data-cy="buy-button"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-t-4 border-black border-solid rounded-full animate-spin"></div>
            <span className="ml-3">Processing...</span>
          </span>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
}