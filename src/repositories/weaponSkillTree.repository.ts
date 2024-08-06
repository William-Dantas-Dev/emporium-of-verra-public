const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createWeaponTypeRepository = async (data: {name: string, description: string, backgroundImage: string}) => {
  try {
    const response = await fetch(`${apiUrl}/weaponType`, {
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
    const weaponTypeData = await response.json();
    return weaponTypeData;
  } catch (error) {
    //console.error('Error fetching weaponType:', error);
    return error;
  }
}

export const updateWeaponTypeRepository = async (data: {name: string, description: string, backgroundImage: string}, id: number) => {
  try {
    const response = await fetch(`${apiUrl}/weaponType/${id}`, {
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
    const weaponTypeData = await response.json();
    return weaponTypeData;
  } catch (error) {
    //console.error('Error fetching weaponType:', error);
    return error;
  }
}

export const WeaponTypeByName = async (name: string) => {
  try {
    const response = await fetch(`${apiUrl}/weaponTypeByName/${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const weaponTypeData = await response.json();
    return weaponTypeData;
  } catch (error) {
    //console.error('Error fetching weaponType:', error);
    return error;
  }
}