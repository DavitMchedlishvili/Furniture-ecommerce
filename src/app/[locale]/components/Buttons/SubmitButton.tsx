import React from "react";

interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;