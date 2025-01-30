"use client";
import React from "react";
import { ProductProps } from "@/types/ProductProps";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface ProductCardProps {
  product: ProductProps;
  addToCart: (product: ProductProps) => Promise<string>;
}

const ProductsCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleViewProduct = () => {
    router.push(`/${locale}/products/${product.id}`);
  };

  const handleAddToCart = async () => {
    const message = await addToCart(product);
    console.log(message);
  };

  return ( 
    <div className="w-full sm:w-[30%] md:w-[22%] lg:w-[22%] mt-4 p-4 transition-all hover:shadow-[0px_10px_20px_rgba(0,0,0,0.2)] dark:bg-white">

      {/* Image */}
      <div className="w-full h-[500px] bg-gray-100 mb-4 flex justify-center items-center">
        <span className="text-white text-center">IMAGE DIV</span>

      </div>
      <div className="flex justify-between">
        <span
          onClick={handleViewProduct}
          className="hover:underline cursor-pointer"
        >
          View Product
        </span>

        <span>Price: {product.price}$</span>
      </div>

      <button className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
};

export default ProductsCard;
