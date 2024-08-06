import React from 'react';

interface CustomIconProps {
  type: string;
  imageUrl: string;
}

const CustomIcon= ({ type, imageUrl } : CustomIconProps) => {
  const initial = type.charAt(0).toUpperCase();
  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${imageUrl} text-white border-2 border-black`}>
      <span className="text-xl font-bold">{initial}</span>
    </div>
  );
};

export default CustomIcon;
