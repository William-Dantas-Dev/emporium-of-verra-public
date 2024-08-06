"use client";
import { SkillType } from '@/types';
import React, { useState, useRef, useEffect } from 'react';

interface SkillTreeItemProps {
  skill: SkillType;
  isItemSelected: boolean;
  clickable: boolean;
  handleSkillClick: (id: number) => void;
  selectedSkills: number[];
}

const SkillTreeItem = ({ skill, isItemSelected, clickable, handleSkillClick, selectedSkills }: SkillTreeItemProps) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ left: string, top: string, transform: string }>({ left: '50%', top: '100%', transform: 'translateX(-50%)' });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const positionCalculated = useRef(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
    if (!positionCalculated.current) {
      updateTooltipPosition();
      positionCalculated.current = true;
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
    positionCalculated.current = false;
  };

  const handleOptionSelected = (skillOption: SkillType) => {
    if (skillOption.id !== undefined) {
      setSelectedSkill(skillOption);
    }
  };

  const replaceImageTags = (description: string) => {
    const imageTagRegex = /\{imageIcon\('(.*?)'\)\}/g;
    return description.replace(imageTagRegex, (match, p1) => `<img class='inline h-4 w-4' src='${p1}' alt='${p1}' />`);
  };

  const skillToDisplay = selectedSkill ?? skill;

  const updateTooltipPosition = () => {
    if (!tooltipRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const iconRect = tooltipRef.current.parentElement!.getBoundingClientRect();
    let position = { left: '50%', top: '100%', transform: 'translateX(-50%)' };

    if (tooltipRect.bottom > windowHeight) {
      position = { left: '50%', top: '0', transform: 'translate(-50%, -100%)' };
    }

    if (tooltipRect.right > windowWidth) {
      position = { left: '0', top: '50%', transform: 'translate(-100%, -50%)' };
    }

    if (tooltipRect.left < 0) {
      position = { left: '100%', top: '50%', transform: 'translate(0, -50%)' };
    }

    if (tooltipRect.top < 0) {
      position = { left: '50%', top: '100%', transform: 'translateX(-50%)' };
    }

    setTooltipPosition(position);
  };

  // Calculate the position index
  const positionIndex = skill.line * 12 + skill.position;

  return (
    <div className="relative group" onMouseLeave={handleMouseLeave}>
      <img
        src={skillToDisplay.image}
        alt={`Item ${skillToDisplay.id}`}
        className={`size-10 object-cover ${!skillToDisplay.isActiveSkill && "rounded-full"}
          ${skillToDisplay.isDefaultActive && `border-4 border-yellow-500`}
          ${isItemSelected && `border-4 border-yellow-500`}
          ${clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
        `}
        onClick={() => (clickable && skillToDisplay.id !== undefined) && !skillToDisplay.isDefaultActive && handleSkillClick(skillToDisplay.id)}
        onMouseEnter={handleMouseEnter}
      />
      {/* Render index circle if positionIndex is in selectedSkills */}
      {selectedSkills.includes(positionIndex) && (
        <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold z-0">
          {selectedSkills.indexOf(positionIndex) + 1}
        </div>
      )}
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute bg-gray-900 text-white rounded-lg shadow-lg p-4 w-[500px] whitespace-normal z-50"
          style={{ left: tooltipPosition.left, top: tooltipPosition.top, transform: tooltipPosition.transform }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-[480px]">
            <div className="flex items-start mb-2">
              <img src={skillToDisplay.image} alt={skillToDisplay.name} className="w-12 h-12 mr-2" />
              <div className="text-lg font-semibold w-60">{skillToDisplay.name}</div>
            </div>
            <ul className="list-disc pl-5 mb-2">
              {skillToDisplay.nivel > 0 && <li><strong>Nível:</strong> {skillToDisplay.nivel}</li>}
              {skillToDisplay.manaCost > 0 && <li><strong>Mana:</strong> {skillToDisplay.manaCost}</li>}
              {skillToDisplay.cooldown > 0 && <li><strong>Cooldown:</strong> {skillToDisplay.cooldown}s</li>}
              {skillToDisplay.castTime > 0 && <li><strong>Cast Time:</strong> {skillToDisplay.castTime}s</li>}
              {skillToDisplay.range > 0 && <li><strong>Range:</strong> {skillToDisplay.range}m</li>}
            </ul>
            <div className="text-sm mb-4 w-full">
              <strong>Description:</strong>
              <div dangerouslySetInnerHTML={{ __html: replaceImageTags(skillToDisplay.description) }} />
            </div>
            {skill.chooseableSkills && skill.chooseableSkills.length > 0 && (
              <div className='w-full pr-2'>
                <div className="text-lg font-semibold mb-2">Chooseable Skills:</div>
                {skill.chooseableSkills.map((skillOption) => (
                  <div
                    key={skillOption.id}
                    className="w-full flex items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => skillOption.id !== undefined && handleOptionSelected(skillOption)}
                  >
                    <img
                      src={skillOption.image}
                      alt={skillOption.name}
                      className="w-12 h-12 mr-2"
                    />
                    <div className="w-full">
                      <div className="font-semibold text-lg">{skillOption.name}</div>
                      <div className="text-sm">{skillOption.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTreeItem;
