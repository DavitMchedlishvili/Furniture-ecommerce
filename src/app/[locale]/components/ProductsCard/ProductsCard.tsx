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
    <div className="w-full sm:w-[30%] md:w-[22%] lg:w-[22%] mt-4  p-4  transition-all  hover:shadow-lg hover:border-gray-400">
      {/* Image */}
      <div className="w-full h-[500px] bg-gray-100  mb-4 flex justify-center items-center">
        <span className="text-white text-center">IMAGE DIV</span>
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

