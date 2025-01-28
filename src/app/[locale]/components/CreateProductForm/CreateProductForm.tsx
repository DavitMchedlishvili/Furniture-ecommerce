"use client";
import React, { useRef, useState } from "react";
import Input from "../Inputs/input";
import SubmitButton from "../Buttons/SubmitButton";
import SelectCategory from "../Buttons/SelectCategory/SelectCategory";
import { createProductFunction } from "@/utils/products/createProductFunction";

const CreateProductForm = () => {
  const [category, setCategory] = useState("");

  // State for table fields
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [woodType, setWoodType] = useState("");

  // State for chair fields
  const [width, setWidth] = useState("");
  const [seatHeight, setSeatHeight] = useState("");
  const [totalHeight, setTotalHeight] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value); // Update the category state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use the ref to get the form element directly
    const formElement = formRef.current;

    if (formElement) {
      const formData = new FormData(formElement);
      const response = await createProductFunction(formData);

      if (
        parseFloat(height) < 0 ||
        parseFloat(weight) < 0 ||
        parseFloat(width) < 0 ||
        parseFloat(seatHeight) < 0
      ) {
        alert("Height, weight, width, and seat height must not be negative!");
        return;
      }

      if (parseInt(seatHeight) >= parseInt(totalHeight)) {
        alert("Seat height must be less than total height.");
      } else {
        // Proceed with form submission logic
        alert("Product created successfully!");
      }

      if (response.success) {
        formElement.reset();
        setHeight("");
        setWeight("");
        setWoodType("");
        setWidth("");
        setSeatHeight("");
        setTotalHeight("");
        setCategory("");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
      <div className="w-full max-w-3xl mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
        <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
          Create Product
        </h2>

        <form ref={formRef} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-bold text-gray-700 dark:text-black"
            >
              Name
            </label>
            <Input
              data-cy="product-name-input"
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the product name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Color"
              className="font-bold text-gray-700 dark:text-black"
            >
              Color
            </label>
            <Input
              data-cy="product-name-input"
              type="text"
              id="color"
              name="color"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the product color"
              required
            />
          </div>

          {/* Price Field */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="font-bold text-gray-700 dark:text-black"
            >
              Price
            </label>
            <Input
              data-cy="product-price-input"
              type="number"
              id="price"
              name="price"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
              placeholder="Enter the product price"
              required
            />
          </div>

          <SelectCategory
            value={category}
            onChange={handleCategoryChange}
            // Table Fields
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            woodType={woodType}
            setWoodType={setWoodType}
            // Chair Fields
            width={width}
            setWidth={setWidth}
            seatHeight={seatHeight}
            setSeatHeight={setSeatHeight}
            totalHeight={totalHeight}
            setTotalHeight={setTotalHeight}
          />

          {/* Image URL Field */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="image"
              className="font-bold text-gray-700 dark:text-black"
            >
              Image URL
            </label>
            <Input
              data-cy="product-image-input"
              type="text"
              id="image"
              name="image"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="flex flex-col  space-y-2">
            <label
              htmlFor="description"
              className="font-bold text-gray-700 dark:text-black my-4 "
            >
              Description
            </label>
            <textarea
              data-cy="product-description-input"
              id="description"
              name="description"
              className="w-full p-3  border border-gray-400 dark:border-gray-600 dark:bg-slate-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <SubmitButton onClick={handleSubmit} text="Create Product" />
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;

