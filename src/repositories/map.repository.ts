const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllMaps = async () => {
  try {
    const response = await fetch(`${apiUrl}/maps`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching maps:', error);
    return error;
  }
};

export const getMapByNameRepository = async (name: string) => {
  try {
    const normalizedMap = name.replace(/\s+/g, '').toLowerCase();
    const response = await fetch(`${apiUrl}/mapByName/${normalizedMap}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching class:', error);
    return error;
  }
}

export const createMapMark = async (data: {
  name: string;
  image: string;
  type: string;
  description: string;
  icon: string;
  isFixed: boolean;
  lat: number;
  lng: number;
}) => {
  try {
    const response = await fetch(`${apiUrl}/mapMarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        image: data.image,
        type: data.type,
        description: data.description,
        icon: data.icon,
        isFixed: data.isFixed,
        lat: data.lat,
        lng: data.lng,
        mapsId: 1,
			})
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching class:', error);
    return error;
  }
}