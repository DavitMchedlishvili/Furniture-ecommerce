"use client";
import React, { useEffect, useState } from "react";
import fetchCart from "../../hooks/fetchCart";
import CheckoutFormCart from "../../components/PurchaseProducts/CartCheckout";
import { useLocale, useTranslations } from "next-intl";
import { CartItems } from "@/types/CartItems";
import Image from "next/image";
import LoadingSpinner from "../../loading";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const locale = useLocale();
  const t = useTranslations("Cart");

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
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 dark:text-white">
      <div className="flex flex-col w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 dark:text-white">
          {t("YourCart")}
        </h1>

        {loading ? (
          <LoadingSpinner/>
        ) : cartItems.length === 0 ? (
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            {t("EmptyCartMessage")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                className="flex flex-col bg-white border border-black shadow-md dark:bg-slate-700 dark:border-slate-600"
                key={item.id}
              >
                <div className="w-full h-70 bg-gray-100 dark:bg-slate-600 mb-4 flex justify-center items-center rounded-t-lg">
                  <Image
                    src={item.image || "/default-image.png"}
                    alt={item.name || "Product image"}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="px-4 py-3">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                    {t("Price")}: ${item.price}
                  </p>
                  <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                    {t("Quantity")}: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <CheckoutFormCart
            uiMode="hosted"
            locale={locale}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;



