import { createMapMarkRepository } from '@/repositories/mapMark.repository';
import { ErrorMessage, markType } from '@/types';
import { ValidationError } from 'yup';

export const createMapMark = async(mapMark: markType) => {
  try{
    return await createMapMarkRepository(mapMark);
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