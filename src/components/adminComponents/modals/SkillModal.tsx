import React, { useState, useEffect } from 'react';
import { SkillType } from '@/types';
import { Input, Textarea } from '@nextui-org/react';
import CustomButton from '@/components/CustomButton';
import SelectInput from '@/components/SelectInput';
import { createSkill, updateSkill } from '@/controllers/skill.controller';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillType | null;
}

const SkillModal: React.FC<SkillModalProps> = ({ isOpen, onClose, skill }) => {
  const [name, setName] = useState(skill?.name || '');
  const [description, setDescription] = useState(skill?.description || '');
  const [image, setImage] = useState(skill?.image || '');
  const [type, setType] = useState(skill?.isActiveSkill ? 'Active' : 'Passive');
  const [cooldown, setCooldown] = useState<string>(skill?.cooldown?.toString() || '0');
  const [manaCost, setManaCost] = useState<string>(skill?.manaCost?.toString() || '0');
  const [range, setRange] = useState<string>(skill?.range?.toString() || '0');
  const [isStartSkill, setIsStartSkill] = useState<Boolean>(skill?.isStartSkill || false);
  const [costToActive, setCostToActive] = useState<string>(skill?.costToActive?.toString() || '1');
  const [nivel, setNivel] = useState<string>(skill?.nivel?.toString() || '1');
  const [cost, setCost] = useState<string>(skill?.cost?.toString() || '1');
  const [castTime, setCastTime] = useState<string>(skill?.castTime?.toString() || '0');
  const [line, setLine] = useState<string>(skill?.line?.toString() || '1');
  const [position, setPosition] = useState<string>(skill?.position?.toString() || '1');
  const [skillPreview, setSkillPreview] = useState(skill?.skillPreview || '');
  const [isDefaultActive, setIsDefaultActive] = useState<Boolean>(skill?.isDefaultActive || false);
  const [skillTreeId, setSkillTreeId] = useState<string>(skill?.skillTreeId?.toString() || '1');

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDescription(skill.description);
      setImage(skill.image);
      setType(skill.isActiveSkill ? 'Active' : 'Passive');
      setCooldown(skill.cooldown?.toString() || '0');
      setManaCost(skill.manaCost?.toString() || '0');
      setRange(skill.range?.toString() || '0');
      setIsStartSkill(skill.isStartSkill);
      setCostToActive(skill.costToActive?.toString() || '1');
      setNivel(skill.nivel?.toString() || '1');
      setCost(skill.cost?.toString() || '1');
      setCastTime(skill.castTime?.toString() || '0');
      setLine(skill.line?.toString() || '1');
      setPosition(skill.position?.toString() || '1');
      setSkillPreview(skill.skillPreview);
      setIsDefaultActive(skill.isDefaultActive);
      setSkillTreeId(skill.skillTreeId?.toString() || '1');
    }
  }, [skill]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedSkill: SkillType = {
      id: skill?.id,
      image,
      name,
      description,
      isActiveSkill: type === 'Active',
      isStartSkill,
      costToActive: parseInt(costToActive, 10),
      nivel: parseInt(nivel, 10),
      cooldown: parseFloat(cooldown),
      manaCost: parseInt(manaCost, 10),
      range: parseInt(range, 10),
      cost: parseInt(cost, 10),
      castTime: parseFloat(castTime),
      line: parseInt(line, 10),
      position: parseInt(position, 10),
      skillPreview,
      isDefaultActive,
      skillTreeId: parseInt(skillTreeId, 10),
      chooseableSkills: [],
      EffectSkills: [],
    };

    if (skill) {
      skill.id && updateSkill(updatedSkill, skill.id);
    } else {
      createSkill(updatedSkill);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 text-black overflow-y-auto">
      <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h2 className="text-2xl mb-4 text-center text-white">{skill ? 'Edit Skill' : 'Create Skill'}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mb-4"
          />
          <SelectInput
            label="Skill Type"
            value={type}
            defaultValue={type}
            onChange={(val: string) => setType(val)}
            items={['Active', 'Passive']}
            nullable={false}
          />
          <Input
            type="text"
            label="Cooldown"
            value={cooldown}
            onChange={(e) => setCooldown(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Mana Cost"
            value={manaCost}
            onChange={(e) => setManaCost(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Cost to Activate"
            value={costToActive}
            onChange={(e) => setCostToActive(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Level"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Cast Time"
            value={castTime}
            onChange={(e) => setCastTime(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="mb-4"
          />
          <Input
            type="text"
            label="Skill Preview"
            value={skillPreview}
            onChange={(e) => setSkillPreview(e.target.value)}
            className="mb-4"
          />
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={Boolean(isDefaultActive)}
                onChange={() => setIsDefaultActive(!isDefaultActive)}
                className="form-checkbox"
              />
              <span className="ml-2 text-white">Default Active</span>
            </label>
          </div>
          <div className="col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={Boolean(isStartSkill)}
                onChange={() => setIsStartSkill(!isStartSkill)}
                className="form-checkbox"
              />
              <span className="ml-2 text-white">Start Skill</span>
            </label>
          </div>
          <div className="col-span-2">
            <Input
              type="text"
              label="Skill Tree ID"
              value={skillTreeId}
              onChange={(e) => setSkillTreeId(e.target.value)}
              className="mb-4"
              disabled
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-6">
          <CustomButton onClick={handleSave} title={skill ? 'Save Changes' : 'Add Skill'} type={"submit"}/>
          <CustomButton onClick={onClose} title="Cancel" type={"reset"}/>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
