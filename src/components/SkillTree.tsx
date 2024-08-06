"use client";
import { SkillTreeCalculator, TreeOptions } from '@/components';
import { SkillCalculatorContext } from '@/context/skillTreeContext';
const SkillTree = () => {
  const {
    archetypeData,
    selectedArchetypeSkills,
    setSelectedArchetypeSkills,
    archetypeMaxPoints,
    selectedArchetype,
    setSelectedArchetype,

    weaponTypeData,
    selectedWeaponSkills,
    setSelectedWeaponSkills,
    weaponMaxPoints,
    selectedWeapon,
    setSelectedWeapon,

    universalData,
    selectedUniversalSkills,
    setSelectedUniversalSkills,
    universalMaxPoints,


    stateSelect,
    setStateSelect,
  } = SkillCalculatorContext();

  return (
    <div className='2xl:px-10 p-0'>
      <div className='min-w-full grid overflow-x-auto 2xl:overflow-visible'>
        <div className='justify-self-center rounded border-2 border-gray-600'>
          <div className='pt-2 bg-gray-800'>
            <button
                onClick={() => setStateSelect("Archetype")}
                className={`px-4 py-2 ${stateSelect == "Archetype" && "border-b-4 border-indigo-500"} text-white rounded`}
              >
                Archetypes
            </button>
            <button
                onClick={() => setStateSelect("Weapon")}
                className={`px-4 py-2 ${stateSelect == "Weapon" && "border-b-4 border-indigo-500"} text-white rounded`}
              >
                Weapons
            </button>
            <button
                onClick={() => setStateSelect("Universal")}
                className={`px-4 py-2 ${stateSelect == "Universal" && "border-b-4 border-indigo-500"} text-white rounded`}
              >
                Universal
            </button>
          </div>
          <TreeOptions />
          { stateSelect == "Archetype" &&
            archetypeData && <SkillTreeCalculator
              data={archetypeData} 
              selectedSkills={selectedArchetypeSkills}
              setSelectedSkills={setSelectedArchetypeSkills}
              maxPoints={archetypeMaxPoints}
            />
          }
          { stateSelect == "Weapon" &&
            weaponTypeData && <SkillTreeCalculator
              data={weaponTypeData} 
              selectedSkills={selectedWeaponSkills}
              setSelectedSkills={setSelectedWeaponSkills}
              maxPoints={weaponMaxPoints}
            />
          }
          {/* { stateSelect == "SkillBook" &&
            <SkillTreeCalculator
              data={archetypeData} 
              selectedSkills={selectedArchetypeSkills}
              setSelectedSkills={setSelectedArchetypeSkills}
              maxPoints={archetypeMaxPoints}
            />
          } */}
          { stateSelect == "Universal" &&
            universalData && <SkillTreeCalculator
              data={universalData} 
              selectedSkills={selectedUniversalSkills}
              setSelectedSkills={setSelectedUniversalSkills}
              maxPoints={universalMaxPoints}
            />
          }
          
        </div>
      </div>
    </div>
  )
}

export default SkillTree
