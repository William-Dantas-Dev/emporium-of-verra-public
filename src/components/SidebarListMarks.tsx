import { InteractiveMapContext } from '@/context/InteractiveMapContext';
import { CategoryType, markType } from '@/types';
import CustomIcon from './CustomIcon';
import Image from 'next/image';

interface SidebarListMarksProps {
  marks: CategoryType[];
  setMarks: (marks: CategoryType[]) => void;
  title: string;
  isCustomMarks: boolean;
}

const SidebarListMarks = ({ marks, setMarks, title, isCustomMarks } : SidebarListMarksProps) => {
  const { mapData, markers } = InteractiveMapContext();

  const handleClick = (id: number) => {
    const newMarks = marks.map((mark) => (
      mark.id === id ? { ...mark, visible: !mark.visible } : mark
    ));
    setMarks(newMarks);
  };

  return (
    <div className='px-2 py-4'>
      <h2 className="text-lg font-semibold mb-4 text-white text-center bg-gray-900 py-2">{title}</h2>
      <div className="grid grid-cols-2 gap-1">
        {marks.map((mark) => {
          let quantity = 0;
          if (isCustomMarks) {
            quantity = markers.filter((markType: markType) => markType.type === mark.name).length;
          } else {
            quantity = mapData ? mapData.mapMark.filter((markType: markType) => markType.type === mark.name).length : 0;
          }
          return (
            <button
              key={mark.id}
              onClick={() => handleClick(mark.id)}
              className={`w-full flex items-center text-white hover:bg-gray-600 py-1 ${
                !mark.visible ? 'line-through opacity-50' : ''
              }`}
            >
              <Image src={mark.imageUrl} alt={mark.imageUrl} width={25} height={25} className='ml-2'/>
              <p className="text-sm self-center w-full text-start ml-3">{mark.name}</p>
              <p className="text-sm ml-auto mr-3 self-center">{quantity}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarListMarks;
