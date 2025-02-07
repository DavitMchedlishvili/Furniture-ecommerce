export interface InputProps {
    label?: string,
    type?: string,
    name?: string
    id?: string
    value?: string | number
    placeholder?: string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) =>void;
    required?: boolean,
    error?: string,
    className?: string
    min?: string
  };


  