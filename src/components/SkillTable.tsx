"use client";
import React, { useEffect, useState } from 'react';
import { SkillType } from '@/types';
import { ShowSkillTable, SkillPreviewModal} from './';
import { SkillCalculatorContext } from '@/context/skillTreeContext';

const SkillTable = () => {
  const { archetypeData, weaponTypeData, universalData } = SkillCalculatorContext();

  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [activeSkills, setActiveSkills] = useState<SkillType[]>([]);
  const [passiveSkills, setPassiveSkills] = useState<SkillType[]>([]);
  const [weaponSkills, setWeaponSkills] = useState<SkillType[]>([]);
  const [universalSkills, setUniversalSkills] = useState<SkillType[]>([]);

  useEffect(() => {
    const classSkills = archetypeData?.skills ?? [];
    setActiveSkills(classSkills.filter((skill: SkillType) => skill.isActiveSkill));
    setPassiveSkills(classSkills.filter((skill: SkillType) => !skill.isActiveSkill));
    setWeaponSkills(weaponTypeData?.skills ?? []);
    setUniversalSkills(universalData?.skills ?? []);
  }, [archetypeData, weaponTypeData, universalData]);

  return (
    <>
      <SkillPreviewModal
        isOpen={isOpenPreviewModal}
        setIsOpen={setIsOpenPreviewModal}
        previewUrl={previewUrl}
      />
      <div className="overflow-x-auto sm:px-10 px-2 pt-10">
        <ShowSkillTable
          title='Active Skills'
          skills={activeSkills}
          setPreviewUrl={setPreviewUrl}
          setIsOpenPreviewModal={setIsOpenPreviewModal}
        />
        <ShowSkillTable
          title='Passive Skills'
          skills={passiveSkills}
          setPreviewUrl={setPreviewUrl}
          setIsOpenPreviewModal={setIsOpenPreviewModal}
        />
        <ShowSkillTable
          title='Weapon Skills'
          skills={weaponSkills}
          setPreviewUrl={setPreviewUrl}
          setIsOpenPreviewModal={setIsOpenPreviewModal}
        />
        <ShowSkillTable
          title='Universal Skills'
          skills={universalSkills}
          setPreviewUrl={setPreviewUrl}
          setIsOpenPreviewModal={setIsOpenPreviewModal}
        />
      </div>
    </>
  );
};

export default SkillTable;
