import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import CustomButton from '@/components/CustomButton';
import SelectInput from '@/components/SelectInput';
import { createSkillConnection, updateSkillConnection } from '@/controllers/skillConnection.controller';
import { SkillConnection } from '@/types';

interface SkillConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillConnection: SkillConnection | null;
  actualSkillTreeId: number;
}

const SkillConnectionModal: React.FC<SkillConnectionModalProps> = ({ isOpen, onClose, skillConnection, actualSkillTreeId}) => {
  const [startPosition, setStartPosition] = useState(skillConnection?.startPosition || '');
  const [midPosition, setMidPosition] = useState(skillConnection?.midPosition || '');
  const [endPosition, setEndPosition] = useState(skillConnection?.endPosition || '');
  const [startAnchor, setStartAnchor] = useState(skillConnection?.startAnchor || 'top');
  const [endAnchor, setEndAnchor] = useState(skillConnection?.endAnchor || 'top');

  useEffect(() => {
    if (skillConnection) {
      setStartPosition(skillConnection.startPosition);
      setMidPosition(skillConnection.midPosition);
      setEndPosition(skillConnection.endPosition);
      setStartAnchor(skillConnection.startAnchor);
      setEndAnchor(skillConnection.endAnchor);
    }
  }, [skillConnection]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedSkillConnectionData: SkillConnection = {
      id: skillConnection?.id || 0,
      startPosition,
      midPosition,
      endPosition,
      startAnchor,
      endAnchor,
      skillTreeId: actualSkillTreeId,
    };

    if (skillConnection) {
      skillConnection.id && updateSkillConnection(updatedSkillConnectionData, skillConnection.id);
    } else {
      createSkillConnection(updatedSkillConnectionData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 text-black overflow-y-auto">
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h2 className="text-2xl mb-4 text-center text-white">{skillConnection ? 'Edit Skill Connection' : 'Create Skill Connection'}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Start Position"
            value={startPosition}
            onChange={(e) => setStartPosition(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Mid Position"
            value={midPosition}
            onChange={(e) => setMidPosition(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="End Position"
            value={endPosition}
            onChange={(e) => setEndPosition(e.target.value)}
            className="mb-4"
          />
          <SelectInput
            label="Start Anchor"
            value={startAnchor}
            defaultValue={startAnchor}
            onChange={(val: string) => setStartAnchor(val)}
            items={['top', 'bottom', 'right', 'left']}
            nullable={false}
          />
          <SelectInput
            label="End Anchor"
            value={endAnchor}
            defaultValue={endAnchor}
            onChange={(val: string) => setEndAnchor(val)}
            items={['top', 'bottom', 'right', 'left']}
            nullable={false}
          />
          <Input
            type="text"
            label="Skill Tree ID"
            value={actualSkillTreeId ? actualSkillTreeId.toString() : ''}
            onChange={(e) => {}}
            className="mb-4"
            disabled
          />
        </div>
        <div className="flex justify-between mt-4 gap-6">
          <CustomButton onClick={handleSave} title={skillConnection ? 'Save Changes' : 'Add Connection'} type={"submit"}/>
          <CustomButton onClick={onClose} title="Cancel" type={"submit"}/>
        </div>
      </div>
    </div>
  );
};

export default SkillConnectionModal;
