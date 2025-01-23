import React from 'react';
import { InputProps } from '../../../types/InputProps';


const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full p-2 mt-4  border border-black  dark:bg-customBlueGray dark:text-white focus:outline-none focus:ring-1 focus:ring-black"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};


export default Input;