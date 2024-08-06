"use client";
import React, { useEffect, useState } from 'react';
import { CategoryType } from '@/types';

interface CustomSelectImageProps {
  value: string;
  onChange: (value: string) => void;
  values: CategoryType[];
}

const CustomSelectImage = ({ value, onChange, values }: CustomSelectImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onChange(values[0].name);
  }, [])

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center p-2 border border-gray-300 rounded-md bg-white h-12"
      >
        {values.find(option => option.name === value)?.imageUrl && (
          <img
            src={values.find(option => option.name === value)?.imageUrl}
            alt={value}
            className="w-6 h-6 mr-2"
          />
        )}
        {value}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {values.map(option => (
            <div
              key={option.name}
              onClick={() => handleSelect(option.name)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              {option.imageUrl && (
                <img src={option.imageUrl} alt={option.name} className="w-6 h-6 mr-2" />
              )}
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectImage;
