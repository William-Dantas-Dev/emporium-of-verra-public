import { skillTreeByName, createArchetypeRepository, updateArchetypeRepository, allSkillsTree } from '@/repositories/skillTree.repository';
import { ErrorMessage } from '@/types';
import { ValidationError } from 'yup';

export const createArchetype = async(data: {name: string, description: string, backgroundImage: string}) => {
  try{
    const archetypeData = await createArchetypeRepository(data);
    return archetypeData;
  }catch (e) {
    let errors: ErrorMessage[] = [];
    if (e instanceof ValidationError) {
      e.inner.forEach(error => {
        const errorObject: ErrorMessage = {
          name: error.path || '',
          message: error.message,
        }
        errors.push(errorObject);
      });
    } else {
      console.error('Unexpected error:', e);
    }
    return {
      type: "Error",
      errors: errors,
    };
  }
};

export const updateArchetype = async(data: {name: string, description: string, backgroundImage: string}, id: number) => {
  try{
    const archetypeData = await updateArchetypeRepository(data, id);
    return archetypeData;
  }catch (e) {
    let errors: ErrorMessage[] = [];
    if (e instanceof ValidationError) {
      e.inner.forEach(error => {
        const errorObject: ErrorMessage = {
          name: error.path || '',
          message: error.message,
        }
        errors.push(errorObject);
      });
    } else {
      console.error('Unexpected error:', e);
    }
    return {
      type: "Error",
      errors: errors,
    };
  }
};

export const getSkillTreeByName = async(name: string) => {
  try{
    const archetypeData = await skillTreeByName(name);
    return archetypeData;
  }catch (e) {
    let errors: ErrorMessage[] = [];
    if (e instanceof ValidationError) {
      e.inner.forEach(error => {
        const errorObject: ErrorMessage = {
          name: error.path || '',
          message: error.message,
        }
        errors.push(errorObject);
      });
    } else {
      console.error('Unexpected error:', e);
    }
    return {
      type: "Error",
      errors: errors,
    };
  }
};

export const getAllSkillTree = async() => {
  try{
    const skillsTreeData = await allSkillsTree();
    return skillsTreeData;
  }catch (e) {
    let errors: ErrorMessage[] = [];
    if (e instanceof ValidationError) {
      e.inner.forEach(error => {
        const errorObject: ErrorMessage = {
          name: error.path || '',
          message: error.message,
        }
        errors.push(errorObject);
      });
    } else {
      console.error('Unexpected error:', e);
    }
    return {
      type: "Error",
      errors: errors,
    };
  }
};