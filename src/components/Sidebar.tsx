"use client"
import React, { useState } from 'react';
import { SidebarListMarks } from './';
import { biomes } from '@/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { InteractiveMapContext } from '@/context/InteractiveMapContext';

interface sideBarProps {
  onClickBiome: (name: string) => void,
}

const Sidebar = ({ onClickBiome } : sideBarProps) => {
  const { categories, customCategories, setCategories, setCustomCategories} = InteractiveMapContext();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex flex-row h-full relative">
        <input
          type="checkbox"
          id="drawer-toggle"
          className="relative sr-only peer"
          checked={isOpen}
          onChange={toggleDrawer}
        />
        <label
          htmlFor="drawer-toggle"
          className="z-10 absolute left-0 top-4 transform -translate-y-1/2 p-2 transition-all duration-500 bg-gray-200 peer-checked:rotate-180 peer-checked:left-96"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          )}
        </label>
        {isOpen && (
          <div
            className="absolute top-0 left-0 z-20 w-96 h-full bg-gray-800 shadow-lg px-2 overflow-y-auto"
            style={{
              transition: 'transform 500ms ease-in-out',
              transform: 'translateX(0)'
            }}
          >
            <div className="px-2 py-4">
              <a href='/'><h1 className="text-2xl font-semibold mb-4 text-white text-center py-2">Emporium Of Verra</h1></a>
              <h2 className="text-lg font-semibold mb-4 text-white text-center bg-gray-900 py-2">Biomes</h2>
              <div className="grid grid-cols-3 gap-1">
                <div className="gap-1 flex col-span-3">
                  <button onClick={() => {onClickBiome("theworldofverra")}} className="text-ms text-black bg-white hover:bg-gray-200 w-full py-2">The World Of Verra</button>
                </div>
                {biomes.map((biome, index) => {
                  return (
                    <div key={index} className="gap-1 flex">
                      <button onClick={() => onClickBiome(biome.toLowerCase())} className="text-ms text-black bg-white hover:bg-gray-200 w-full">
                        {biome}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <SidebarListMarks  marks={categories} title="Categories" setMarks={setCategories} isCustomMarks={false}/>
            <SidebarListMarks  marks={customCategories} title="Custom Marks" setMarks={setCustomCategories} isCustomMarks={true}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
