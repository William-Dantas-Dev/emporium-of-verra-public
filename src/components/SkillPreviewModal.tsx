import React from 'react'

interface SkillPreviewModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  previewUrl: string;
}


const SkillPreviewModal = ({ isOpen, setIsOpen, previewUrl } : SkillPreviewModalProps) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black"
          onClick={handleClickOutside}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-screen-lg overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Skill Preview</h2>
              <button onClick={toggleModal} className="text-black">X</button>
            </div>
            <div className="mt-4">
              <iframe
                width="100%"
                height="500px"
                src={previewUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SkillPreviewModal
