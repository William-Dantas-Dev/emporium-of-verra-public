import { getMapByNameRepository } from '@/repositories/map.repository';
import { ErrorMessage } from '@/types';
import { ValidationError } from 'yup';

export const createMap = async(data: {name: string, description: string, backgroundImage: string}) => {
  try{
    //const archetypeData = await createArchetypeRepository(data);
    //return archetypeData;
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

export const updateMap = async(data: {name: string, description: string, backgroundImage: string}, id: number) => {
  try{
    //const archetypeData = await updateArchetypeRepository(data, id);
    //return archetypeData;
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

export const getMapByName = async(name: string) => {
  try{
    return await getMapByNameRepository(name);
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