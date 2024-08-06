import { SkillType } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSkillRepository = async (data: SkillType) => {
  try {
    const response = await fetch(`${apiUrl}/skill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const skillData = await response.json();
    return skillData;
  } catch (error) {
    //console.error('Error fetching skill:', error);
    return error;
  }
}

export const updateSkillRepository = async (data: SkillType, id: number) => {
  try {
    const response = await fetch(`${apiUrl}/skill/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        image: data.image,
        description: data.description,
        isActiveSkill: data.isActiveSkill,
        isStartSkill: data.isStartSkill,
        costToActive: data.costToActive,
        nivel: data.nivel,
        cooldown: data.cooldown,
        manaCost: data.manaCost,
        range: data.range,
        cost: data.cost,
        castTime: data.castTime,
        line: data.line,
        position: data.position,
        skillPreview: data.skillPreview,
        isDefaultActive: data.isDefaultActive,
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

export const skillTreeByName = async (name: string) => {
  try {
    const response = await fetch(`${apiUrl}/skillTreeByName/${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const archetypeData = await response.json();
    return archetypeData;
  } catch (error) {
    //console.error('Error fetching archetype:', error);
    return error;
  }
}

export const deleteSkillById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/skill/${id}`, {
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