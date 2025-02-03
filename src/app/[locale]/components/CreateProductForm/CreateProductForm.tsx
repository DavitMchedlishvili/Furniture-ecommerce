// "use client";
// import React, { useRef, useState } from "react";
// import Input from "../Inputs/input";
// import SubmitButton from "../Buttons/SubmitButton";
// import SelectCategory from "../Buttons/SelectCategory/SelectCategory";
// import { createProductFunction } from "@/utils/products/createProductFunction";
// import { uploadPhoto } from "@/utils/uploadPhoto/uploadPhoto";

// const CreateProductForm = () => {
//   const [category, setCategory] = useState("");
  
//   // State for table fields
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [woodType, setWoodType] = useState("");
//   const [image, setImage] = useState("");
  
//   // State for chair fields
//   const [width, setWidth] = useState("");
//   const [seatHeight, setSeatHeight] = useState("");
//   const [totalHeight, setTotalHeight] = useState("");

//   const formRef = useRef<HTMLFormElement>(null);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCategory(e.target.value); // Update the category state
//   };

//   const handleUploadImage = async (file: File): Promise<string> => {
//     try {
//       const uploadedImageUrl = await uploadPhoto(file, "furniturePhotos");
//       return uploadedImageUrl; // Return the URL for immediate use
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   };

//   const handleImageUpload = async (file: File) => {
//     try {
//       const uploadedImageUrl = await handleUploadImage(file);
//       setImage(uploadedImageUrl);
//     } catch (error) {
//       console.error("Image upload failed", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formElement = formRef.current;
//     if (!formElement) return;

//     // Check if an image has been selected
//     const fileInput = formElement.querySelector<HTMLInputElement>('input[type="file"]');
//     let uploadedImageUrl = image; // Use state image if already set

//     if (fileInput?.files?.length) {
//       const file = fileInput.files[0];
//       uploadedImageUrl = await handleUploadImage(file); // Wait for upload and ensure it's a string
//     }

//     if (!uploadedImageUrl) {
//       alert("Please upload an image before submitting.");
//       return;
//     }

//     if (parseFloat(height) < 0 || parseFloat(weight) < 0 || parseFloat(width) < 0 || parseFloat(seatHeight) < 0) {
//       alert("Height, weight, width, and seat height must not be negative!");
//       return;
//     }

//     if (parseInt(seatHeight) >= parseInt(totalHeight)) {
//       alert("Seat height must be less than total height.");
//       return;
//     }

//     const formData = new FormData(formElement);
//     formData.append("image", uploadedImageUrl); // Ensure the uploaded image URL is included

//     const response = await createProductFunction(formData);

//     if (response.success) {
//       // Reset form states after successful submission
//       setHeight("");
//       setWeight("");
//       setWoodType("");
//       setWidth("");
//       setSeatHeight("");
//       setTotalHeight("");
//       setCategory("");
//       setImage("");
//       alert("Product created successfully!");
//     }
//   };

  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
//       <div className="w-full max-w-3xl mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
//         <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
//           Create Product
//         </h2>

//         <form ref={formRef} className="space-y-6">
//           {/* Name Field */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="name"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               Name
//             </label>
//             <Input
//               data-cy="product-name-input"
//               type="text"
//               id="name"
//               name="name"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="Enter the product name"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="name_ka"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               სახელი (Name in georgian)
              
//             </label>
//             <Input
//               data-cy="product-name-input"
//               type="text"
//               id="name_ka"
//               name="name_ka"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="დაწერეთ პროდუქტის სახელი"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="color_en"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               Color
//             </label>
//             <Input
//               data-cy="product-name-input"
//               type="text"
//               id="color_en"
//               name="color_en"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="Enter the product color"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="color_en"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               ფერი (Color in georgian)
//             </label>
//             <Input
//               data-cy="product-name-input"
//               type="text"
//               id="color_en"
//               name="color_en"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="დაწერეთ პროდუქტის ფერი"
//               required
//             />
//           </div>

//           {/* Price Field */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="price"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               Price
//             </label>
//             <Input
//               data-cy="product-price-input"
//               type="number"
//               id="price"
//               name="price"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
//               placeholder="Enter the product price"
//               required
//             />
//           </div>

//           <SelectCategory
//             value={category}
//             onChange={handleCategoryChange}
//             // Table Fields
//             height={height}
//             setHeight={setHeight}
//             weight={weight}
//             setWeight={setWeight}
//             // Chair Fields
//             width={width}
//             setWidth={setWidth}
//             seatHeight={seatHeight}
//             setSeatHeight={setSeatHeight}
//             totalHeight={totalHeight}
//             setTotalHeight={setTotalHeight}
//           />
           
//            <div className="flex flex-col">
//             <label
//               htmlFor="woodType_en"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               Wood Type
//             </label>
//             <Input
//               data-cy="product-wood-type-input"
//               type="text"
//               id="woodType_en"
//               name="woodType_en"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="Enter the wood type"
//               required
//               min="0"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="woodType_ka"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               ხის ტიპი (Wood type in georgian)
//             </label>
//             <Input
//               data-cy="product-wood-type-input"
//               type="text"
//               id="woodType_ka"
//               name="woodType_ka"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="დაწერეთ ხის ტიპი"
//               required
//               min="0"
//             />
//           </div>

//           {/* Image URL Field */}
//           <div className="flex flex-col space-y-2">
//             <label
//               htmlFor="image"
//               className="font-bold text-gray-700 dark:text-black"
//             >
//               Image URL
//             </label>
//             <Input
//               data-cy="product-image-input"
//               type="file"
//               id="image"
//               name="image"
//               className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
//               placeholder="Enter image URL"
//               required
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   handleUploadImage(e.target.files[0]);
//                 }
//               }}       />
//           </div>
//           <div className="flex flex-col  space-y-2">
//             <label
//               htmlFor="description_en"
//               className="font-bold text-gray-700 dark:text-black my-4 "
//             >
//               Description
//             </label>
//             <textarea
//               data-cy="product-description-input"
//               id="description_en"
//               name="description_en"
//               className="w-full p-3  border border-gray-400 dark:border-gray-600 dark:bg-slate-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
//               placeholder="Enter product description"
//               required
//             ></textarea>
//           </div>

//           <div className="flex flex-col  space-y-2">
//             <label
//               htmlFor="description_ka"
//               className="font-bold text-gray-700 dark:text-black my-4 "
//             >
//               აღწერა (Description in georgian)
//             </label>
//             <textarea
//               data-cy="product-description-input"
//               id="description_ka"
//               name="description_ka"
//               className="w-full p-3  border border-gray-400 dark:border-gray-600 dark:bg-slate-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
//               placeholder="დაწერეთ პროდუქტის აღწერა"
//               required
//             ></textarea>
//           </div>

//           <SubmitButton onClick={handleSubmit} text="Create Product" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProductForm;

"use client";
import React, { useState, useRef} from "react";
import Input from "../Inputs/input";
import SubmitButton from "../Buttons/SubmitButton";
import SelectCategory from "../Buttons/SelectCategory/SelectCategory";
import { createProductFunction } from "@/utils/products/createProductFunction";
import { uploadPhoto } from "@/utils/uploadPhoto/uploadPhoto";


const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    name_ka: "",
    color_en: "",
    color_ka: "",
    price: "",
    woodType_en: "",
    woodType_ka: "",
    height: "",
    weight: "",
    width: "",
    seatHeight: "",
    totalHeight:"",
    category: "",
    description_en: "",
    description_ka: "",
    image: null as string | null,
  });

  // const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }));

    // Reset seatHeight and totalHeight to null for "Accessories" category
    if (selectedCategory === "Accessories" || selectedCategory === "Tables") {
      setFormData((prevState) => ({
        ...prevState,
        seatHeight: "0",
        totalHeight: "0",
      }));
    }
  };

  

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      setLoading(true); // Set loading to true when file is selected
      const imageUrl = await uploadPhoto(file, "furniturePhotos");
      setFormData({
        ...formData,
        image: imageUrl, // Set the uploaded image URL in the state
      });
      setLoading(false); // Set loading to false after the image is uploaded
    }
  };

  
    
    
    


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      const { name, name_ka, color_en, color_ka, price, woodType_en, woodType_ka, height, weight, width, seatHeight, totalHeight, category, description_en, description_ka, image } = formData;
    
      // Validate form data
      if (!image) {
        alert("Please upload an image before submitting.");
        return;
      }
    
      if (parseFloat(height) < 0 || parseFloat(weight) < 0 || parseFloat(width) < 0 || parseFloat(seatHeight) < 0) {
        alert("Height, weight, width, and seat height must not be negative!");
        return;
      }
    
      if (parseInt(seatHeight) > parseInt(totalHeight)) {
        alert("Seat height must be less than total height.");
        return;
      }
    
      // Prepare form data for submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", name);
      formDataToSubmit.append("name_ka", name_ka);
      formDataToSubmit.append("color_en", color_en);
      formDataToSubmit.append("color_ka", color_ka);
      formDataToSubmit.append("price", price);
      formDataToSubmit.append("woodType_en", woodType_en);
      formDataToSubmit.append("woodType_ka", woodType_ka);
      formDataToSubmit.append("height", height);
      formDataToSubmit.append("weight", weight);
      formDataToSubmit.append("width", width);
      formDataToSubmit.append("seatHeight", seatHeight);
      formDataToSubmit.append("totalHeight", totalHeight);
      formDataToSubmit.append("category", category);
      formDataToSubmit.append("description_en", description_en);
      formDataToSubmit.append("description_ka", description_ka);
      if (image) {
        formDataToSubmit.append("image", image);
      }
    
      // Call your product creation function
      const response = await createProductFunction(formDataToSubmit);
    
      if (response.success) {
        console.log("success");
      }
    };
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      <div className="w-full max-w-3xl mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
        <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
          Create Product
        </h2>

        <form  className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold text-gray-700 dark:text-black">
              Name
            </label>
            <Input
              data-cy="product-name-input"
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Name in Georgian */}
          <div className="flex flex-col">
            <label htmlFor="name_ka" className="font-bold text-gray-700 dark:text-black">
              სახელი (Name in Georgian)
            </label>
            <Input
              data-cy="product-name-input"
              type="text"
              id="name_ka"
              name="name_ka"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="დაწერეთ პროდუქტის სახელი"
              value={formData.name_ka}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Color Fields */}
          <div className="flex flex-col">
            <label htmlFor="color_en" className="font-bold text-gray-700 dark:text-black">
              Color
            </label>
            <Input
              data-cy="product-color-input"
              type="text"
              id="color_en"
              name="color_en"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the product color"
              value={formData.color_en}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="color_ka" className="font-bold text-gray-700 dark:text-black">
              ფერი (Color in Georgian)
            </label>
            <Input
              data-cy="product-color-input"
              type="text"
              id="color_ka"
              name="color_ka"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="დაწერეთ პროდუქტის ფერი"
              value={formData.color_ka}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Price Field */}
          <div className="flex flex-col">
            <label htmlFor="price" className="font-bold text-gray-700 dark:text-black">
              Price
            </label>
            <Input
              data-cy="product-price-input"
              type="number"
              id="price"
              name="price"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
              placeholder="Enter the product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <SelectCategory
            value={formData.category}
            onChange={handleCategoryChange}
            // Table Fields
            height={formData.height}
            setHeight={(value) => setFormData((prev) => ({ ...prev, height: value as string }))}
            weight={formData.weight}
            setWeight={(value) => setFormData((prev) => ({ ...prev, weight: value as string }))}
            // Chair Fields
            width={formData.width}
            setWidth={(value) => setFormData((prev) => ({ ...prev, width: value as string }))}
            seatHeight={formData.seatHeight}
            setSeatHeight={(value) => setFormData((prev) => ({ ...prev, seatHeight: value.toString() }))}
            totalHeight={formData.totalHeight}
            setTotalHeight={(value) => setFormData((prev) => ({ ...prev, totalHeight: value.toString() }))}
          />

          {/* Wood Type Fields */}
          <div className="flex flex-col">
            <label htmlFor="woodType_en" className="font-bold text-gray-700 dark:text-black">
              Wood Type
            </label>
            <Input
              data-cy="product-wood-type-input"
              type="text"
              id="woodType_en"
              name="woodType_en"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="Enter the wood type"
              value={formData.woodType_en}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="woodType_ka" className="font-bold text-gray-700 dark:text-black">
              ხის ტიპი (Wood Type in Georgian)
            </label>
            <Input
              data-cy="product-wood-type-input"
              type="text"
              id="woodType_ka"
              name="woodType_ka"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              placeholder="დაწერეთ ხის ტიპი"
              value={formData.woodType_ka}
              onChange={handleInputChange}
              required
            />
          </div>

  
    
      
          <div className="flex flex-col space-y-2">
            <label htmlFor="image" className="font-bold text-gray-700 dark:text-black">
              Image
            </label>
            <Input
              data-cy="product-image-input"
              type="file"
              id="image"
              name="image"
              className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300"
              onChange={handleFileChange}
            />
            {loading && (
              <div className="flex justify-center items-center mt-2">
                <div className="w-6 h-6 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Description Fields */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="description_en" className="font-bold text-gray-700 dark:text-black my-4">
              Description
            </label>
            <textarea
              data-cy="product-description-input"
              id="description_en"
              name="description_en"
              className="w-full p-3 border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600"
              placeholder="Enter the product description"
              value={formData.description_en}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description_ka" className="font-bold text-gray-700 dark:text-black my-4">
              აღწერა (Description in Georgian)
            </label>
            <textarea
              data-cy="product-description-input"
              id="description_ka"
              name="description_ka"
              className="w-full p-3 border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600"
              placeholder="დაწერეთ პროდუქტის აღწერა"
              value={formData.description_ka}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <SubmitButton text="Create Product" />
        </form>
      </div>
    </div>
  );
};


export default CreateProductForm





