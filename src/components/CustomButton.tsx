import React from 'react';

interface CustomButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  onClick: () => void;
}

const CustomButton = ({ type, title, onClick }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full px-4 py-2 whitespace-nowrap rounded border-4 border-indigo-500 bg-indigo-500 text-white shadow-sm hover:border-indigo-400 hover:bg-indigo-400 focus-visible:outline-indigo-600"
    >
      {title}
    </button>
  );
};

export default CustomButton;
