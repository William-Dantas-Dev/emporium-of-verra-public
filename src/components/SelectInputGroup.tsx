import { Select, SelectItem, SelectSection } from '@nextui-org/react'
import React from 'react'

interface SelectInputGroupProps {
  label: string;
  value: string;
  defaultValue: string,
  onChange: (value: string) => void;
  items: {group: string, options: Array<string>}[],
  nullable: boolean,
}

const SelectInputGroup = ({ label, value, defaultValue, onChange, items, nullable} : SelectInputGroupProps) => {
  const headingClasses = "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";
  return (
    <Select
      label={label}
      placeholder={label}
      value={value}
      defaultSelectedKeys={[defaultValue]}
      disallowEmptySelection={!nullable}
      scrollShadowProps={{
        isEnabled: false,
      }}
      onChange={(e) => {onChange(e.target.value)}}
    >
      {
        items.map((item, index) => (
          <SelectSection title={item.group} key={item.group+index} classNames={{
          heading: headingClasses,
        }}>
            {item.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectSection>
        ))
      }
    </Select>
  )
}

export default SelectInputGroup
