"use client";
import { markCategories } from '@/constants';
import { getMapByName } from '@/controllers/map.controller';
import { CategoryType, MapType, Mark } from '@/types';
import { createContext, useCallback, useContext, useEffect, useState} from 'react';

const MapContext = createContext<any>(undefined);

const defaultMap: MapType = {
  id: 0,
  name: "Don't Has Map",
  image: "/maps/dont-have-map-for-this-zone.jpg",
  mapMark: [],
}

export function InteractiveMapAppWrapper({ children } : { children: React.ReactNode}) {
  const [categories, setCategories] = useState<CategoryType[]>(markCategories);
  const [customCategories, setCustomCategories] = useState<CategoryType[]>(markCategories);
  const [markers, setMarkers] = useState<Mark[]>([]);
  const [selectedMap, setSelectedMap] = useState("theworldofverra");
  const [mapData, setMapData] = useState<MapType>();

  const getMap = useCallback(async () => {
    const data = await getMapByName(selectedMap);
    const mapMarks = JSON.parse(localStorage.getItem('mapMarks') || '[]');
    setMarkers(mapMarks);
    setMapData(!data.Error ? data : defaultMap);
  }, [selectedMap]);

  const updateMarks = useCallback(async () => {
    const mapMarks = JSON.parse(localStorage.getItem('mapMarks') || '[]');
    setMarkers(mapMarks);
  }, []);

  useEffect(() => {
    getMap();
  }, [getMap]);

  return (
    <MapContext.Provider value={{
      mapData,
      setSelectedMap,
      categories,
      setCategories,
      customCategories,
      setCustomCategories,
      markers,
      setMarkers,
      updateMarks,
    }}>
      {children}
    </MapContext.Provider>
  )
}

export function InteractiveMapContext(){
  return useContext(MapContext);
}