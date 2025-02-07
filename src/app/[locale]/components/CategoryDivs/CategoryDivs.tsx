import { Link } from "@/i18n/routing";
import React from "react";


const CategoryDivs = () => {
  return (
    <div className="w-[90%] m-auto mt-5 flex flex-col gap-5">
      <h1 className="underline my-5 text-lg bold">
        CATEGORIES
      </h1>
      <div className="flex  justify-between gap-5">
        <Link className="w-[45%] overflow-hidden" href={"/products/category/chairs"}>
          <div
            className="h-[400px] bg-[url('/assets/chairs.webp')] bg-cover bg-center flex items-center justify-center text-white hover:text-black text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"          >
            Chairs
          </div>
        </Link>

        <Link className="w-[30%] overflow-hidden" href={"/products/category/barstools"}>
          <div
            className="h-[400px] bg-[url('/assets/barstools.webp')] bg-cover bg-center flex items-center justify-center text-white hover:text-black text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"          >
            Bar Stools
          </div>
        </Link>

        <Link className="w-[25%] overflow-hidden" href={"en/products/category/armchairs"}>
          <div
            className="h-[400px] bg-[url('/assets/armchairs.webp')] bg-cover bg-center flex items-center justify-center text-white hover:text-black text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            Arm chairs
          </div>
        </Link>

      </div>
      <div className="flex  justify-between gap-5">


        <Link className="w-[25%] overflow-hidden" href={"en/products/category/loungeseats"}>
          <div
            className="h-[400px] bg-[url('/assets/loungeseats.webp')] bg-cover bg-center flex items-center justify-center text-black hover:text-white text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            Lounge Seats
          </div>
        </Link>
       
        <Link className="w-[30%] overflow-hidden" href={"/products/category/accessories"}>
          <div
            className="h-[400px] bg-[url('/assets/accessories.webp')] bg-cover bg-center flex items-center justify-center text-white hover:text-black text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"          >
            Accessories
          </div>
        </Link>

        <Link className="w-[45%] overflow-hidden" href={"/products/category/tables"}>
          <div
            className="h-[400px] bg-[url('/assets/tables.webp')] bg-cover bg-center flex items-center justify-center text-white hover:text-black text-xl font-bold cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"          >
            Tables
          </div>
        </Link>

      </div>



    </div>






  );
};

export default CategoryDivs;
