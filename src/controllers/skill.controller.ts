import { createSkillRepository, deleteSkillById, updateSkillRepository } from '@/repositories/skill.repository';
import { ErrorMessage, SkillType } from '@/types';
import { ValidationError } from 'yup';

export const createSkill = async(data: SkillType) => {
  try{
    const skillData = await createSkillRepository(data);
    return skillData;
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

export const updateSkill = async(data: SkillType, id: number) => {
  try{
    const skillData = await updateSkillRepository(data, id);
    return skillData;
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

export const deleteSkill = async(id: number) => {
  try{
    return await deleteSkillById(id);
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