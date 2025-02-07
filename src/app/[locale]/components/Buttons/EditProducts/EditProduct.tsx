"use client"; // Indicating that this is a client component
import { editProduct } from "@/utils/products/editProducts";
import { useState } from "react";

interface EditProductProps {
    productId: number;
    initialName: string;
    initialName_ka: string;
    initialColor: string;
    initialColor_ka: string;
    initialWoodType: string;
    initialWoodType_ka: string;
    initialDescription: string;
    initialDescription_ka: string;
    initialPrice: number;
    locale: string;
}

export default function EditProduct({
    productId,
    initialName,
    initialName_ka,
    initialColor,
    initialColor_ka,
    initialWoodType,
    initialWoodType_ka,
    initialDescription,
    initialDescription_ka,
    initialPrice,
    locale,
}: EditProductProps) {
    const [formData, setFormData] = useState({
        name: initialName,
        name_ka: initialName_ka,
        color: initialColor,
        color_ka: initialColor_ka,
        woodType: initialWoodType,
        woodType_ka: initialWoodType_ka,
        description: initialDescription,
        description_ka: initialDescription_ka,
        price: initialPrice,
        locale
    });

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Manage whether to show the form

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setErrorMessage("");

        const updatedData = {
            name: formData.name,
            name_ka: formData.name_ka,
            price: formData.price,
            color_en: formData.color,
            color_ka: formData.color_ka,
            wood_type_en: formData.woodType,
            wood_type_ka: formData.woodType_ka,
            description_en: formData.description,
            description_ka: formData.description_ka,
        };

        console.log("Submitting with data:", updatedData);

        const { success, error } = await editProduct(productId, updatedData);

        setIsSaving(false);

        if (success) {
            alert("Product updated successfully");
            window.location.reload();
        } else {
            console.error("Error details:", error);
            setErrorMessage("Error updating product. Please try again.");
        }
    };

    return (
        <div>
            {/* Edit Button */}
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
                >
                    Edit Product
                </button>
            ) : (
                // Form to edit product
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name_ka" className="block text-lg">
                                Name ქართულად
                            </label>
                            <input
                                type="text"
                                id="name_ka"
                                name="name_ka"
                                value={formData.name_ka}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="color" className="block text-lg">
                                Color
                            </label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="woodType" className="block text-lg">
                                Wood Type
                            </label>
                            <input
                                type="text"
                                id="woodType"
                                name="woodType"
                                value={formData.woodType}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-lg">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-lg">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </form>

                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
}
