import { Select, SelectItem, SelectSection } from '@nextui-org/react'
import React from 'react'

interface SelectInputProps {
  label: string;
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
  items: string[],
  nullable: boolean,
}

const SelectInput = ({ label, value, defaultValue, onChange, items, nullable} : SelectInputProps) => {  
  return (
    <Select
      label={label}
      placeholder={label}
      value={value}
      defaultSelectedKeys={[defaultValue]}
      disallowEmptySelection={!nullable}
      onChange={(e) => {onChange(e.target.value)}}
    >
      {
        items.map((item, index) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))
      }
    </Select>
  )
}

export default SelectInput
