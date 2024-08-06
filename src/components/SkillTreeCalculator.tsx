"use client";
import { SkillTree } from '@/types';
import SkillTreeItem from './SkillTreeItem';
import { useEffect, useState } from 'react';
import { SkillConnections } from './';
import { useSession } from 'next-auth/react';

interface SkillTreeCalculatorProps {
  data: SkillTree;
  selectedSkills: number[];
  setSelectedSkills: (skills: number[]) => void;
  maxPoints: number;
}

const SkillTreeCalculator = ({
  data,
  selectedSkills,
  setSelectedSkills,
  maxPoints,
}: SkillTreeCalculatorProps) => {
  const { data: session, status } = useSession();
  const [unlockedSkills, setUnlockedSkills] = useState<number[]>([]);

  useEffect(() => {
    if (data.skills && data.SkillConnection) {
      const initialUnlockedSkills = data.skills.filter(skill => {
        const isNotConnected = !data.SkillConnection.some(connection => {
          const [endLine, endPos] = connection.endPosition.split('-').map(Number);          
          return endLine * 12 + endPos === skill.line * 12 + skill.position;
        });
        const hasEnoughSelectedSkills = selectedSkills.length >= skill.costToActive;
        return isNotConnected;
      }).map(skill => skill.line * 12 + skill.position);
      setUnlockedSkills(initialUnlockedSkills);
    } else {
      setUnlockedSkills([]);
    }
  }, [data]);

  const handleSkillClick = (id: number) => {
    if ((maxPoints - selectedSkills.length) > 0 || selectedSkills.includes(id)) {
      if (unlockedSkills.includes(id)) {
        if (selectedSkills.includes(id)) {
          const dependentSkills = data.SkillConnection
            .filter((connection) => {
              const [startLine, startPos] = connection.startPosition.split('-').map(Number);
              return (startLine * 12 + startPos) === id;
            })
            .map((connection) => {
              const [endLine, endPos] = connection.endPosition.split('-').map(Number);
              return (endLine * 12 + endPos);
            })
            .filter((endId) => selectedSkills.includes(endId));

          if (dependentSkills.length > 0) {
            return;
          }
          
          setSelectedSkills(selectedSkills.filter((skillId) => skillId !== id));

          const newUnlockedSkills = unlockedSkills.filter((skillId) => {
            return !data.SkillConnection.some((connection) => {
              const [startLine, startPos] = connection.startPosition.split('-').map(Number);
              const [endLine, endPos] = connection.endPosition.split('-').map(Number);
              return (startLine * 12 + startPos) === id && (endLine * 12 + endPos) === skillId;
            });
          });

          setUnlockedSkills(newUnlockedSkills);
        } else {
          setSelectedSkills([...selectedSkills, id]);

          const newUnlockedSkills = [...unlockedSkills];
          data.SkillConnection
            .filter((connection) => {
              const [startLine, startPos] = connection.startPosition.split('-').map(Number);
              return (startLine * 12 + startPos) === id;
            })
            .forEach((connection) => {
              const [endLine, endPos] = connection.endPosition.split('-').map(Number);
              const endSkillId = endLine * 12 + endPos;
              if (!newUnlockedSkills.includes(endSkillId)) {
                newUnlockedSkills.push(endSkillId);
              }
            });

          setUnlockedSkills(newUnlockedSkills);
        }
      }
    }
  };

  return (
    <>
      <div id="skill-tree-container" className="min-w-[1500px] max-w-[2200px] bg-cover bg-center relative overflow-x-auto 2xl:overflow-visible" style={{ backgroundImage: `url('${data.backgroundImage}')` }}>
        <div className="grid grid-cols-12 gap-10 relative z-10 p-10">
          {Array.from({ length: 12 * 12 }, (_, i) => i + 1).map((id: number) => {
            const skill = data.skills && data.skills.find(skill => skill.line * 12 + skill.position === id);
            return (
              <div key={id} id={`skill-${id}`} className="relative size-10 group">
                {skill ? (
                  <SkillTreeItem
                    skill={skill}
                    isItemSelected={selectedSkills.includes(id)}
                    clickable={unlockedSkills.includes(skill.line * 12 + skill.position) && selectedSkills.length >= skill.costToActive}
                    handleSkillClick={() => handleSkillClick(id)}
                    selectedSkills={selectedSkills}
                  />
                ) : <>{session && session.user.type == "admin" && id}</>}
              </div>
            );
          })}
        </div>
        {data && <SkillConnections skillTree={data} selectedSkills={selectedSkills} />}
      </div>
    </>
  );
};

export default SkillTreeCalculator;
