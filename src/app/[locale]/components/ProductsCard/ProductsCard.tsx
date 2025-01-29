"use client";
import React from "react";
import { ProductProps } from "@/types/ProductProps";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface ProductCardProps {
  product: ProductProps;
}

const ProductsCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleViewProduct = () => {
    router.push(`/${locale}/products/${product.id}`);
  };

  return (
    <div className="w-full sm:w-[30%] md:w-[22%] lg:w-[22%] m-4 bg-white  p-4 transition-all hover:shadow-2xl hover:border-gray-400 dark:hover:border-gray-950">
      <div className="w-full h-[500px] bg-white  mb-4 flex justify-center items-center">
       <img src={product.image} alt="image" />
      </div>

      <span
        onClick={handleViewProduct}
        className="hover:underline cursor-pointer"
      >
        View Product
      </span>
    </div>
  );
};

export default ProductsCard;

