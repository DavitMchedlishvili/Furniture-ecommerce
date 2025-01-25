export interface InputProps {
    label?: string,
    type?: string,
    name?: string
    value?: string
    placeholder?: string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) =>void;
    required?: boolean,
    error?: string,
    className?: string
  };


  