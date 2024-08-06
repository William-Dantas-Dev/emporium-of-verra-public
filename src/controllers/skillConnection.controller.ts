import { createSkillConnectionRepository, updateSkillConnectionRepository, deleteSkillConnectionById } from '@/repositories/skillConnection.repository';
import { ErrorMessage, SkillConnection } from '@/types';
import { ValidationError } from 'yup';

export const createSkillConnection = async(data: SkillConnection) => {
  try{
    const skillData = await createSkillConnectionRepository(data);
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

export const updateSkillConnection = async(data: SkillConnection, id: number) => {
  try{
    const skillData = await updateSkillConnectionRepository(data, id);
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

export const deleteSkillConnection = async(id: number) => {
  try{
    return await deleteSkillConnectionById(id);
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