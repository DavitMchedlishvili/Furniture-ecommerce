// "use client"
// import { deleteProduct } from "@/utils/products/deleteProduct";
// import { useRouter } from "next/navigation";
// import { useLocale } from "next-intl";
// import React from "react";

// interface DeleteButtonProps {
//   text: string;
//   productId: number; // Add productId as a prop
// }

// const DeleteButton: React.FC<DeleteButtonProps> = ({ text, productId }) => {
//   const router = useRouter();
//   const locale = useLocale();

//   const handleDelete = async (event: React.FormEvent) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const result = await deleteProduct(productId);
//     if (result.success) {
//       // Handle successful deletion, e.g., show a message or refresh the list
//       console.log(`${text} deleted successfully`);
//       router.push(`/${locale}/products`); // Redirect to the products page with the current locale
//     } else {
//       // Handle error if deletion failed
//       console.error(`Failed to delete ${text}:`, result.error);
//     }
//   };

//   return (
//     <div>
//       <button
//         className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
//         onClick={handleDelete}
//       >
//         Delete {text}
//       </button>
//     </div>
//   );
// };

// export default DeleteButton;
"use client"  // Ensures this component is treated as client-side
import { deleteProduct } from "@/utils/products/deleteProduct";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";

interface DeleteButtonProps {
  text: string;
  productId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ text, productId }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const result = await deleteProduct(productId);
    if (result.success) {
      // Handle successful deletion, e.g., show a message or refresh the list
      console.log(`${text} deleted successfully`);
      router.push(`/${locale}/products`); // Redirect to the products page with the current locale
    } else {
      // Handle error if deletion failed
      console.error(`Failed to delete ${text}:`, result.error);
    }
  };

  return (
    <div>
      <button
        className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-red-400 dark:bg-slate-700 dark:hover:bg-red-400"
        onClick={handleDelete}
      >
        Delete {text}
      </button>
    </div>
  );
};

export default DeleteButton;
