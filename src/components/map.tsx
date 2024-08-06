"use client";
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, ImageOverlay, useMapEvent } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import { Sidebar } from './';
const ShowMarkers = dynamic(() => import('@/components/ShowMarkers'), {
  ssr: false,
});
import { MarkerModal } from './';
import { InteractiveMapContext } from '@/context/InteractiveMapContext';
import dynamic from 'next/dynamic';

const Map = ({ }: {}) => {
  const { mapData, setSelectedMap, markers } = InteractiveMapContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number, lng: number } | null>(null);

  const bounds: LatLngBoundsExpression = [[-0.1, -0.1], [0.1, 0.1]];
  const maxBounds: LatLngBoundsExpression = [[-1, -1], [1, 1]];

  const handleClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setClickedLocation({ lat, lng });
    setIsModalOpen(true);
  };


  return (
    <div className='flex flex-row h-full w-full p-0 m-0 overflow-hidden'>
      <Sidebar onClickBiome={setSelectedMap} />
      <div className='h-screen w-screen'>
        <MapContainer
          bounds={bounds}
          maxBounds={maxBounds}
          center={[-0.075, -0.01]}
          style={{ height: '2000px', width: '100vw', backgroundColor: 'rgb(17 24 39)' }}
          minZoom={12}
          maxZoom={20}
          zoom={13}
          zoomControl={false}
          attributionControl={false}
          className="h-screen w-screen z-0"
        >
          {mapData && <ImageOverlay url={mapData.image} bounds={bounds as LatLngBoundsExpression} />}
          {mapData && <ShowMarkers markers={mapData.mapMark} isCustom={false} />}
          <ShowMarkers markers={markers} isCustom={true} />
          <ClickHandler handleClick={handleClick} />
        </MapContainer>
        <MarkerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          lat={clickedLocation ? clickedLocation.lat : 0}
          lng={clickedLocation ? clickedLocation.lng : 0}
          mapsId={mapData ? mapData.id : 0}
        />
      </div>
    </div>
  );
};

const ClickHandler: React.FC<{ handleClick: (e: any) => void }> = ({ handleClick }) => {
  useMapEvent('click', handleClick);
  return null;
};

export default Map;
