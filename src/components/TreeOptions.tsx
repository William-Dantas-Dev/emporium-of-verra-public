"use client";
import React, { useState } from 'react';
import { SkillCalculatorContext } from '@/context/skillTreeContext';
import { allArchetypes, allWeapons } from '@/constants';


const TreeOptions = () => {
  const {
    archetypeMaxPoints,
    setArchetypeMaxPoints,
    selectedArchetypeSkills,

    weaponMaxPoints,
    setWeaponMaxPoints,
    selectedWeaponSkills,

    selectedArchetype,
    setSelectedArchetype,
    selectedSecondaryArchetype,
    setSelectedSecondaryArchetype,
    selectedWeapon,
    setSelectedWeapon,
    stateSelect
  } = SkillCalculatorContext();

  return (
    <>
      <div className="flex items-center space-x-4 p-4 bg-gray-900 text-white justify-between">
        <div className='flex items-center space-x-4'>
          <label className="whitespace-nowrap">Max points:</label>
            <input 
              id="max-points" 
              type="number" 
              className="w-16 p-1 bg-gray-800 border border-gray-600 rounded text-center text-white" 
              value={stateSelect == 'Archetype' ? archetypeMaxPoints : weaponMaxPoints}
              onChange={(e) => {
                if(stateSelect == 'Archetype'){
                  setArchetypeMaxPoints(Number(e.target.value));
                }else{
                  setWeaponMaxPoints(Number(e.target.value));
                }
              }}
            />
          <label className="mr-2 whitespace-nowrap">
            {`Points remaining: ${stateSelect == 'Archetype' ?
            archetypeMaxPoints - selectedArchetypeSkills.length
            :
            weaponMaxPoints - selectedWeaponSkills.length}`}
          </label>
          <div className='flex items-center'>
            {stateSelect == 'Archetype' &&
              <>
                <label className="text-white mx-2">First Archetype: </label>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedArchetype}
                  onChange={(e) => { setSelectedArchetype(e.target.value) }}
                >
                  <option value="">Select an option</option>
                  {
                    allArchetypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
                <label className="text-white mx-2">Second Archetype: </label>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedSecondaryArchetype}
                  onChange={(e) => { setSelectedSecondaryArchetype(e.target.value) }}
                >
                  <option value="">Select an option</option>
                  {
                    allArchetypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
              </>
            }
            {stateSelect == 'Weapon' &&
              <>
                <label className="text-white mx-2">Weapon: </label>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedWeapon}
                  onChange={(e) => { setSelectedWeapon(e.target.value) }}
                >
                  <option value="">Select an option</option>
                  {
                    allWeapons.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TreeOptions
