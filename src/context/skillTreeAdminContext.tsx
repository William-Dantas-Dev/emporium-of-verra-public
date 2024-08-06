"use client"
import { deleteSkill } from '@/controllers/skill.controller';
import { getAllSkillTree } from '@/controllers/skillTree.controller';
import { SkillTree } from '@/types';
import { createContext, useState, useContext, useCallback, useEffect} from 'react';

const SkillTreeAdminCalculatorClassContext = createContext<any>(undefined);

export function SkillAdminCalculatorAppWrapper({ children } : { children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false);

  const [stateSelect, setStateSelect] = useState("Archetype");

  const [skillsTreeData, setSkillsTreeData] = useState<SkillTree[]>();


  const getArchetype = useCallback(async () => {
    setSkillsTreeData(await getAllSkillTree());      
  }, []);

  const removeSkill = useCallback(async (id: number) => {
    await deleteSkill(id);  
    getArchetype();    
  }, []);
  const createSkill = useCallback(async (id: number) => {
    await deleteSkill(id);  
    getArchetype();    
  }, []);

  useEffect(() => {
    getArchetype();
  },[getArchetype]);

  return (
    <SkillTreeAdminCalculatorClassContext.Provider value={{
      stateSelect,
      setStateSelect,

      loading,
      skillsTreeData,
      setSkillsTreeData,

      removeSkill,
      createSkill,

      
    }}>
      {children}
    </SkillTreeAdminCalculatorClassContext.Provider>
  )
}

export function SkillTreeAdminContext(){
  return useContext(SkillTreeAdminCalculatorClassContext);
}