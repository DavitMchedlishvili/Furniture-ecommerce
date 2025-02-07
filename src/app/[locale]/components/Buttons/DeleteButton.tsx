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
import { deleteRecord } from "@/utils/deleteRecord/deleteRecord";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";


interface DeleteButtonProps {
  text: string;
  recordId: number;
  table: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ text, recordId, table }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const result = await deleteRecord(table, recordId);
  
      if (result.success) {
        // Handle successful deletion, e.g., show a message or refresh the list
        console.log(`${text} deleted successfully`);
        router.push(`/${locale}/${table}`); // Redirect to the products page with the current locale
      } else {
        // Show the error message in an alert
        const error = result.error as { message: string; details: string };
        alert(`Failed to delete ${text}. Error: ${error.message}\nDetails: ${error.details}`);
      }
      
    } catch (error) {

      alert(`An unexpected error occurred while deleting ${text}. Please try again.`);
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
