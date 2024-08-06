"use client";
import { createMapMark } from '@/controllers/mapMark.controller';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { CustomButton, CustomSelectImage, SelectInput } from './';
import { markCategories, markTypes } from '@/constants';
import { InteractiveMapContext } from '@/context/InteractiveMapContext';
import { Input, Textarea } from '@nextui-org/react';

interface MarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
  mapsId: number;
}

const MarkerModal = ({ isOpen, onClose, lat, lng, mapsId }: MarkerModalProps) => {
  const { updateMarks } = InteractiveMapContext();
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [icon, setIcon] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    const mapMark = {
      name: name,
      image: image,
      type: type,
      description: description,
      icon: icon,
      isFixed: session?.user.type == 'admin' ? false : true,
      lat: lat,
      lng: lng,
      mapsId: mapsId,
    };

    if (session?.user.type == 'admin') {
      createMapMark(mapMark);
    } else {
      const existingMarks = JSON.parse(localStorage.getItem('mapMarks') || '[]');
      existingMarks.push(mapMark);
      localStorage.setItem('mapMarks', JSON.stringify(existingMarks));
      updateMarks();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 text-black">
      <div className='bg-gray-800'>
        <h2 className="text-2xl my-4 text-center text-white">Create Mark</h2>
        <div className="px-6 rounded shadow-lg grid grid-cols-2 gap-3">
          <div>
            <div>
              <Input type="text" label="Name" onChange={(e) => setName(e.target.value)} color={!'errors.name'? 'danger' : 'default'}/>
              {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
            </div>
          </div>
          <div>
            <Input type="text" label="Description" onChange={(e) => setDescription(e.target.value)} color={!'errors.description'? 'danger' : 'default'}/>
            {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
          </div>
          <div>
            <SelectInput label={'Select Type'} value={type} defaultValue='Nodes' onChange={setType} items={markTypes} nullable={false}/>
          </div>
          {
            session?.user.type == 'admin' &&
            <div>
              <Input value={image} type="text" label="Image" onChange={(e) => setImage(e.target.value)} color={!'errors.description'? 'danger' : 'default'}/>
            </div>
          }
          <div className={`${session?.user.type == 'admin' ? 'col-span-2' : 'col-span-1'}`}>
            <Input disabled value={`${(lat * 1)}, ${(lng * 1)}`} type="text" label="Lat,Lng" color={!'errors.description'? 'danger' : 'default'}/>
          </div>
        </div>
        <div className='px-6 py-4 flex justify-between'>
          <button onClick={handleSave} className="bg-blue-800 hover:bg-blue-500 text-white p-2 rounded mr-2 w-1/2">Save</button>
          <button onClick={onClose} className="bg-red-800 hover:bg-red-500 text-white p-2 rounded w-1/2">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
