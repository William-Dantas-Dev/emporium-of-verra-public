"use client"
import { markCategories } from '@/constants';
import { InteractiveMapContext } from '@/context/InteractiveMapContext';
import { CategoryType, Mark } from '@/types';
import { ShareIcon } from '@heroicons/react/24/solid';
import { Icon } from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

interface ShowMarkersProps {
  markers: Mark[];
  isCustom: boolean;
}

const ShowMarkers = ({ markers, isCustom } : ShowMarkersProps) => {
  const { categories, customCategories } = InteractiveMapContext();

  function verifyVisible(type: string): boolean {
    let isVisible = true;
    if (isCustom) {
      const category = customCategories.find((category: CategoryType) => {
        return category.name == type;
      });
      isVisible = category?.visible ?? true;
    } else {
      const category = categories.find((category: CategoryType) => {
        return category.name == type;
      });
      isVisible = category?.visible ?? true;
    }
    return isVisible;
  }

  function createCustomIcon(markerType: string) {
    const category = markCategories.find((cat) => cat.name === markerType);
    const iconUrl = category?.imageUrl ?? '/mapIcons/PinDefault.png'; // Use a default icon if no URL is found

    return new Icon({
      iconUrl: iconUrl,
      iconSize: [20, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      className: '',
    });
  }

  return (
    <>
      {markers.map((marker, index) => {
        return (
          verifyVisible(marker.type) && (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(marker.type)}
            >
              <Popup className='rounded-lg w-80' closeButton={false}>
                {marker.image && <img src={marker.image} alt="Icon" className='h-full w-96 object-contain' />}
                <div className="flex items-center justify-between ">
                  <h1 className="text-2xl text-black">{marker.name}</h1>
                  <ShareIcon className='w-6 h-6' />
                </div>
                <div>
                  <span className="text-black">{marker.type}</span>
                </div>
                <span className="text-black">{marker.description}</span>
              </Popup>
            </Marker>
          )
        );
      })}
    </>
  );
}

export default ShowMarkers;
