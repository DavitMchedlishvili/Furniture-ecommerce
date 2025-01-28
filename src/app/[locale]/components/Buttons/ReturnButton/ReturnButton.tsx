'use client'

import { useRouter } from "next/navigation";

const ReturnButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      style={{ padding: "10px 20px", cursor: "pointer" }}
    >
      Return Back
    </button>
  );
};

export default ReturnButton;