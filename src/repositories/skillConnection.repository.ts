import { SkillConnection } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSkillConnectionRepository = async (data: SkillConnection) => {
  try {
    const response = await fetch(`${apiUrl}/skillConnection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startPosition: data.startPosition,
        midPosition: data.midPosition,
        endPosition: data.endPosition,
        startAnchor: data.startAnchor,
        endAnchor: data.endAnchor,
        skillTreeId: data.skillTreeId
      })
    });
    const skillData = await response.json();
    return skillData;
  } catch (error) {
    //console.error('Error fetching skill:', error);
    return error;
  }
}

export const updateSkillConnectionRepository = async (data: SkillConnection, id: number) => {
  try {
    const response = await fetch(`${apiUrl}/skillConnection/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startPosition: data.startPosition,
        midPosition: data.midPosition,
        endPosition: data.endPosition,
        startAnchor: data.startAnchor,
        endAnchor: data.endAnchor,
        skillTreeId: data.skillTreeId
      })
    });
    const skillData = await response.json();
    return skillData;
  } catch (error) {
    console.error('Error fetching skill:', error);
    return error;
  }
}

export const deleteSkillConnectionById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/skillConnection/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const skillTreeData = await response.json();
    return skillTreeData;
  } catch (error) {
    //console.error('Error fetching skillTree:', error);
    return error;
  }
}