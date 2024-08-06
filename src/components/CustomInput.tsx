import React from 'react'

export interface CustomInputProps {
  title: string;
  type: string;
  placeholder: string;
  onChange: (value : string) => void;
  error: string;
}

const CustomInput = ({title, type, placeholder, error, onChange} : CustomInputProps) => {
  return (
    <div className="mt-2 w-full">
      <input
        id={title}
        name={title}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
      />
    {error && <p className="text-red-500">{error}</p>}
  </div>
  )
}

export default CustomInput
