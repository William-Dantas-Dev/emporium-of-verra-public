const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createArchetypeRepository = async (data: {name: string, description: string, backgroundImage: string}) => {
  try {
    const response = await fetch(`${apiUrl}/archetype`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        backgroundImage: data.backgroundImage,
			})
    });
    const archetypeData = await response.json();
    return archetypeData;
  } catch (error) {
    //console.error('Error fetching archetype:', error);
    return error;
  }
}

export const updateArchetypeRepository = async (data: {name: string, description: string, backgroundImage: string}, id: number) => {
  try {
    const response = await fetch(`${apiUrl}/archetype/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        backgroundImage: data.backgroundImage,
			})
    });
    const archetypeData = await response.json();
    return archetypeData;
  } catch (error) {
    //console.error('Error fetching archetype:', error);
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

export const allSkillsTree = async () => {
  try {
    const response = await fetch(`${apiUrl}/skillTree`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const skillTData = await response.json();
    return skillTData;
  } catch (error) {
    //console.error('Error fetching skillT:', error);
    return error;
  }
}