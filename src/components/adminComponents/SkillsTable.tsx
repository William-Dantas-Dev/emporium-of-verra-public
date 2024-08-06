import React, { useState, useEffect } from 'react';
import { SkillTreeAdminContext } from '@/context/skillTreeAdminContext';
import { SkillTree, SkillType } from '@/types';
import { SkillModal } from './modals';

const SkillsTable: React.FC = () => {
  const { skillsTreeData, removeSkill } = SkillTreeAdminContext();
  const [selectedSkillTree, setSelectedSkillTree] = useState<SkillTree | null>(null);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillType | null>(null);

  useEffect(() => {
    if (skillsTreeData && skillsTreeData.length > 0) {
      const skillTree = skillsTreeData.find((st: SkillTree) => st.name === 'Bard') || null;
      setSelectedSkillTree(skillTree);
      if (skillTree) {
        setSkills(skillTree.skills);
      }
    }
  }, [skillsTreeData]);

  const handleSkillTreeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const skillTreeId = parseInt(event.target.value, 10);
    const skillTree = skillsTreeData.find((st: SkillTree) => st.id === skillTreeId) || null;
    setSelectedSkillTree(skillTree);
    if (skillTree) {
      setSkills(skillTree.skills);
    }
  };

  const replaceImageTags = (description: string) => {
    const imageTagRegex = /\{imageIcon\('(.*?)'\)\}/g;
    return description.replace(imageTagRegex, (match, p1) => `<img class='inline h-4 w-4' src='${p1}' alt='${p1}' />`);
  };

  const handleEditSkill = (skill: SkillType) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDeleteSkill = (skillId: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete this skill ${name}?`)) {
      removeSkill(skillId);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <select
          className="bg-gray-200 text-black px-4 py-2 rounded-md mr-auto ml-2"
          onChange={handleSkillTreeChange}
          value={selectedSkillTree?.id || ''}
        >
          <option value="">Select Skill Tree</option>
          {skillsTreeData && skillsTreeData.map((skillTree: SkillTree) => (
            <option key={skillTree.id} value={skillTree.id}>
              {skillTree.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setEditingSkill(null);
            setIsModalOpen(true);
          }}
        >
          Add Skill
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Cooldown</th>
            <th className="py-2 px-4 border-b">Mana Cost</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id} className="border-b">
              <td className="py-2 px-4">
                <img src={skill.image} alt={skill.name} className="w-10 h-10 object-cover mr-2" />
              </td>
              <td className="py-2 px-4">{skill.name || '...'}</td>
              <td className="py-2 px-4">
                {skill.description ? (
                  <div dangerouslySetInnerHTML={{ __html: replaceImageTags(skill.description) }} />
                ) : '...'}
              </td>
              <td className="py-2 px-4">{skill.cooldown || '...'}</td>
              <td className="py-2 px-4">{skill.manaCost || '...'}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleEditSkill(skill)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => skill.id && handleDeleteSkill(skill.id, skill.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skill Modal */}
      {isModalOpen && (
        <SkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skill={editingSkill}
        />
      )}
    </div>
  );
};

export default SkillsTable;
