"use client"
import { skillTreeBard } from '@/constants/SkillTree/BardSkillTree';
import { getSkillTreeByName } from '@/controllers/skillTree.controller';
import { SkillTree } from '@/types';
import { createContext, useState, useContext, useCallback, useEffect} from 'react';

const SkillCalculatorClassContext = createContext<any>(undefined);

const skillTreeDefault = {
  id: 0,
  name: '',
  description: '',
  backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/emporium-of-verra.appspot.com/o/default-background.png?alt=media&token=3f60335b-380e-4218-abdb-ac6a48b810a6',
  lineQty: "20",
	positionsQty: "20",
	minWidth: "1500",
	maxWidth: "2200",
  type: "Archetype",
  skills: [],
  SkillConnection: [],
  combos: [],
  createdAt: '',
  updatedAt: '',
};

export function SkillCalculatorAppWrapper({ children } : { children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [archetypeData, setArchetypeData] = useState<SkillTree>();

  const [stateSelect, setStateSelect] = useState("Archetype");

  const [selectedArchetype, setSelectedArchetype] = useState('Ranger');
  const [selectedSecondaryArchetype, setSelectedSecondaryArchetype] = useState('');
  const [archetypeMaxPoints, setArchetypeMaxPoints] = useState(14);
  const [selectedArchetypeSkills, setSelectedArchetypeSkills] = useState<number[]>([]);

  const [weaponTypeData, setWeaponTypeData] = useState<SkillTree>();
  const [selectedWeapon, setSelectedWeapon] = useState('Shortbow');
  const [weaponMaxPoints, setWeaponMaxPoints] = useState(14);
  const [selectedWeaponSkills, setSelectedWeaponSkills] = useState<number[]>([]);

  const [universalData, setUniversalData] = useState<SkillTree>();
  const [universalMaxPoints, setUniversalMaxPoints] = useState(14);
  const [selectedUniversalSkills, setSelectedUniversalSkills] = useState<number[]>([]);


  const getArchetype = useCallback(async () => {
    // if(selectedArchetype == "Bard"){
    //   setArchetypeData(skillTreeBard);
    // }else{
    //   setArchetypeData(skillTreeDefault);
    // }
    try {
      setLoading(true);
      const archetype = await getSkillTreeByName(selectedArchetype);
      setSelectedArchetypeSkills([]);
      if (archetype instanceof Error || archetype.message?.includes("TypeError: Failed to fetch") || archetype.message?.includes("Not Found SkillTree")) {
        setArchetypeData(skillTreeDefault);
      } else {
        setArchetypeData(archetype);
      }
      setLoading(false);
    } catch (error) {
      setArchetypeData(skillTreeDefault);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedArchetype]);

  useEffect(() => {
    getArchetype();
  },[getArchetype]);

  const getWeaponType = useCallback(async () => {
    try {
      setLoading(true);
      const weaponType = await getSkillTreeByName(selectedWeapon);
      setSelectedWeaponSkills([]);

      if (weaponType instanceof Error || weaponType.message?.includes("TypeError: Failed to fetch") || weaponType.message?.includes("Not Found SkillTree")) {
        setWeaponTypeData(skillTreeDefault);
      } else {
        setWeaponTypeData(weaponType);
      }
      setLoading(false);
    } catch (error) {
      setWeaponTypeData(skillTreeDefault);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedWeapon]);

  useEffect(() => {
    getWeaponType();
  },[getWeaponType]);

  const getUniversalTree = useCallback(async () => {
    try {
      setLoading(true);
      const universal = await getSkillTreeByName('Universal');
      setSelectedUniversalSkills([]);
      if (universal instanceof Error || universal.message?.includes("TypeError: Failed to fetch") || universal.message?.includes("Not Found SkillTree")) {
        setUniversalData(skillTreeDefault);
      } else {
        setUniversalData(universal);
      }
      setLoading(false);
    } catch (error) {
      setUniversalData(skillTreeDefault);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedWeapon]);

  useEffect(() => {
    getUniversalTree();
  },[getUniversalTree]);

  return (
    <SkillCalculatorClassContext.Provider value={{
      stateSelect,
      setStateSelect,

      loading,
      archetypeData,
      selectedArchetype,

      setSelectedArchetype,
      getArchetype,
      selectedSecondaryArchetype,
      setSelectedSecondaryArchetype,
      archetypeMaxPoints,
      setArchetypeMaxPoints,
      selectedArchetypeSkills,
      setSelectedArchetypeSkills,

      weaponTypeData,
      selectedWeapon,
      setSelectedWeapon,
      getWeaponType,
      weaponMaxPoints,
      setWeaponMaxPoints,
      selectedWeaponSkills,
      setSelectedWeaponSkills,

      universalData,
      setUniversalData,
      universalMaxPoints,
      setUniversalMaxPoints,
      selectedUniversalSkills,
      setSelectedUniversalSkills,
    }}>
      {children}
    </SkillCalculatorClassContext.Provider>
  )
}

export function SkillCalculatorContext(){
  return useContext(SkillCalculatorClassContext);
}