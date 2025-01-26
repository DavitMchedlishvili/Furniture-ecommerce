import React from "react";

interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (event: React.FormEvent) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled, onClick }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
        onClick={onClick} // Use onClick here
        disabled={disabled} // Set disabled prop
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;