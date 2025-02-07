"use client";
import React from "react";
import Image from "next/image";
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
    <div className="w-full  mt-4 p-4 transition-all hover:shadow-xl dark:bg-white rounded-lg">
      {/* Image */}
      <Image
        src={product.image || "/default-image.png"}
        alt={product.name || "Product image"}
        width={500}
        height={500}
        className="w-full h-64 object-cover rounded-lg"
      />

      <div className="flex justify-between mt-4">
        <span
          onClick={handleViewProduct}
          className="hover:underline cursor-pointer text-sm text-black dark:text-white"
        >
          View Product
        </span>

        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Price: {product.price}$
        </span>
      </div>

      <button
        className="w-full mt-4 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500 "
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductsCard;
