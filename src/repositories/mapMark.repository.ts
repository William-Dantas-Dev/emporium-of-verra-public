import { markType } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createMapMarkRepository = async (data: markType) => {
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
        mapsId: data.mapsId,
			})
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching class:', error);
    return error;
  }
}