"use client";
import React, { useEffect, useState } from "react";
import fetchCart from "../../hooks/fetchCart";
import CheckoutFormCart from "../../components/PurchaseProducts/CartCheckout";
import { useLocale } from "next-intl";
import { CartItems } from "@/types/CartItems";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchCart();
        if (data && "cartItem" in data && Array.isArray(data.cartItem)) {
          setCartItems(data.cartItem);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchProducts();
  }, []); // No need to include cartItems in the dependency array

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
      <div className="flex flex-col w-[80%] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">
            Your cart is empty. Add some products to it!
          </p>
        ) : (
          <div className="bg-white m-5 flex flex-col gap-3 ">
            {cartItems.map((item) => (
              <ul className="flex flex-col justify-center  bg-white border-2 border-black" key={item.id}>
                {" "}
                {/* key applied to <ul> */}
                <li className="text-3xl font-bold">{item.name}</li>
                <li className="mt-4 text-xl">Price: ${item.price}</li>
              </ul>
            ))}
          </div>
        )}
        <CheckoutFormCart
          uiMode="hosted"
          locale={locale}
          cartItems={cartItems}
        />
      </div>
      <div className="mt-8 flex justify-end"></div>
    </div>
  );
};

export default CartPage;

