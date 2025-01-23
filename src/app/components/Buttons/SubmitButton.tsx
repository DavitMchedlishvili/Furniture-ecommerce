import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;