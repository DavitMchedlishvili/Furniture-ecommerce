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

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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

// "use client";
// import { useState } from "react";
// import { createProductFunction} from "../../../../utils/products/createProductFunction";
// import { AiOutlineClose, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

// export function CreateProductForm() {
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   async function handleSubmit(event: React.FormEvent) {
//     event.preventDefault();

//     const formData = new FormData(event.target as HTMLFormElement);
//     const response = await createProductFunction(formData);

//     setModalMessage(response.message);
//     setModalVisible(true);

//     if (response.success) {
//       // Clear the form inputs
//       (event.target as HTMLFormElement).reset();}

//     if (response.success) {
//       setTimeout(() => {
//         setModalVisible(false);
//       }, 3000);
//     }
//   }

//   return (
//     <div className="w-full max-w-3xl m-8 mx-auto p-6 bg-gray-600 rounded-md">
//   {/* Modal */}
//   {modalVisible && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//     <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8 rounded-xl w-full sm:w-96 md:w-1/2 lg:w-1/3 shadow-2xl relative">
//       <button
//         onClick={() => setModalVisible(false)}
//         className="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl transition duration-200"
//       >
//         <AiOutlineClose />
//       </button>
//       <p className="text-3xl font-bold text-white text-center mb-6">
//         {modalMessage}
//       </p>
//       {modalMessage.includes("successfully") ? (
//         <div className="text-center text-yellow-300">
//           <AiOutlineCheckCircle className="inline-block text-5xl mb-4" />
//           <p>Product created successfully!</p>
//         </div>
//       ) : (
//         <div className="text-center text-red-400">
//           <AiOutlineCloseCircle className="inline-block text-5xl mb-4" />
//           <p>Failed to create product. Please try again.</p>
//         </div>
//       )}
//     </div>
//   </div>
// )}

//   <h2 className="text-2xl text-center font-semibold text-gray-100 dark:text-gray-200 mb-6">
//     Create Product
//   </h2>

//   <form onSubmit={handleSubmit} className="space-y-6">
//     {/* Form fields */}
//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="name"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Name
//       </label>
//       <input
//         data-cy="product-name-input"
//         type="text"
//         id="name"
//         name="name"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter the product name"
//         required
//       />
//     </div>

//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="price"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Price
//       </label>
//       <input
//         data-cy="product-price-input"
//         type="number"
//         id="price"
//         name="price"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter the product price"
//         required
//       />
//     </div>

//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="brand"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Brand
//       </label>
//       <input
//         data-cy="product-brand-input"
//         type="text"
//         id="brand"
//         name="brand"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter the product brand"
//         required
//       />
//     </div>

//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="category"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Category
//       </label>
//       <input
//         data-cy="product-category-input"
//         type="text"
//         id="category"
//         name="category"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter the product category"
//         required
//       />
//     </div>

//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="image"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Image URL
//       </label>
//       <input
//         data-cy="product-image-input"
//         type="text"
//         id="image"
//         name="image"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter image URL"
//         required
//       />
//     </div>

//     <div className="flex flex-col space-y-2">
//       <label
//         htmlFor="description"
//         className="text-sm font-medium text-gray-300 dark:text-gray-200"
//       >
//         Description
//       </label>
//       <textarea
//         data-cy="product-description-input"
//         id="description"
//         name="description"
//         className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//         placeholder="Enter product description"
//         required
//       ></textarea>
//     </div>

//     {/* Submit Button */}
//     <div className="flex justify-center">
//       <button
//         data-cy="create-product-button"
//         type="submit"
//         className="px-16 py-3 bg-purple-900 text-white rounded-md hover:bg-purple-800 focus:outline-none transition duration-300"
//       >
//         Submit
//       </button>
//     </div>
//   </form>
// </div>

//   );
// }
