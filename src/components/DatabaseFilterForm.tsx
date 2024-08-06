"use client";
import { biomes, enchants, itemsTypes, levels, rarity, servers, statusOptions } from '@/constants';
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react'
import SelectInput from './SelectInput';
import SelectInputGroup from './SelectInputGroup';

const DatabaseFilterForm = () => {
  const [search, setSearch] = useState('');
  const [itemTypeSelect, setItemTypeSelect] = useState<string>('');
  const [levelSelect, setLevelSelect] = useState('');


  return (
    <div className='justify-center w-full px-5'>
      <form action="" className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 justify-center items-center content-center py-3'>
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          type="text"
          label="Search Items"
          className={`col-span-1 sm:col-span-2`}
        />
        <SelectInputGroup label={'Select Type'} value={itemTypeSelect} defaultValue='' onChange={setItemTypeSelect} items={itemsTypes} nullable={true}/>
        <SelectInput label={'Select Level'} value={levelSelect} defaultValue='' onChange={setLevelSelect} items={levels} nullable={true}/>
      </form>
    </div>
  )
}

export default DatabaseFilterForm
