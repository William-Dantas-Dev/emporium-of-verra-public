"use client";
import { biomes, enchants, itemsTypes, levels, rarity, servers, statusOptions } from '@/constants';
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react'
import SelectInput from './SelectInput';
import SelectInputGroup from './SelectInputGroup';

const FilterForm = () => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [itemTypeSelect, setItemTypeSelect] = useState<string>('');
  const [levelSelect, setLevelSelect] = useState('');
  const [enchantSelect, setEnchantSelect] = useState('');
  const [raritySelect, setRaritySelect] = useState('');
  const [serverSelect, setServerSelect] = useState('');
  const [biomeSelect, setBiomeSelect] = useState('');

  const onChangeSelectedStatus = (event: any) => {
    setSelectedStatus(event.target.value);
  };
  
  return (
    <div className='justify-center w-full px-5'>
      <form action="" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 justify-center items-center content-center py-3'>
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          type="text"
          label="Search Items"
          className={`col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6`}
        />
        <Select
          label="Select Status"
          placeholder="Select Status"
          selectionMode="multiple"
          className="col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-6"
          value={selectedStatus}
          onChange={onChangeSelectedStatus}
        >
          {statusOptions.map((status, index) => (
            <SelectItem key={status+index} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
        <SelectInputGroup label={'Select Type'} value={itemTypeSelect} defaultValue='' onChange={setItemTypeSelect} items={itemsTypes} nullable={true}/>
        <SelectInput label={'Select Level'} value={levelSelect} defaultValue='' onChange={setLevelSelect} items={levels} nullable={true}/>
        <SelectInput label={'Select Enchant'} value={enchantSelect} defaultValue='' onChange={setEnchantSelect} items={enchants} nullable={true}/>
        <SelectInput label={'Select Rarity'} value={raritySelect} defaultValue='' onChange={setRaritySelect} items={rarity} nullable={true}/>
        <SelectInputGroup label={'Select Server'} value={serverSelect} defaultValue='NA-1' onChange={setServerSelect} items={servers} nullable={false}/>
        <SelectInput label={'Select Biome'} value={biomeSelect} defaultValue='' onChange={setBiomeSelect} items={biomes} nullable={true}/>
      </form>
    </div>
  )
}

export default FilterForm
