import React, { useState, useEffect, useContext } from 'react';
import { SkillTreeAdminContext } from '@/context/skillTreeAdminContext';
import { SkillConnection, SkillTree } from '@/types';
import SkillConnectionModal from './modals/SkillConnectionModal';

const SkillConnectionsTable: React.FC = () => {
  const { skillsTreeData, removeSkillConnection } = SkillTreeAdminContext();
  const [selectedSkillTree, setSelectedSkillTree] = useState<SkillTree | null>(null);
  const [skillConnections, setSkillConnections] = useState<SkillConnection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkillConnection, setEditingSkillConnection] = useState<SkillConnection | null>(null);

  useEffect(() => {
    if (skillsTreeData?.length > 0) {
      const skillTree = skillsTreeData.find((st: SkillTree) => st.name === 'Bard') || null;
      setSelectedSkillTree(skillTree);
      if (skillTree) {
        setSkillConnections(skillTree.SkillConnection || []);
      }
    }
  }, [skillsTreeData]);

  const handleSkillTreeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const skillTreeId = parseInt(event.target.value, 10);
    const skillTree = skillsTreeData?.find((st: SkillTree) => st.id === skillTreeId) || null;
    setSelectedSkillTree(skillTree);
    skillTree.SkillConnection && setSkillConnections(skillTree.SkillConnection || []);
  };

  const handleEditSkillConnection = (skillConnection: SkillConnection) => {
    setEditingSkillConnection(skillConnection);
    setIsModalOpen(true);
  };

  const handleDeleteSkillConnection = (skillConnectionId: number) => {
    if (window.confirm(`Are you sure you want to delete this skill connection?`)) {
      removeSkillConnection(skillConnectionId);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-semibold">Skill Connections</h1>
        <select
          className="bg-gray-200 text-black px-4 py-2 rounded-md mr-auto ml-2"
          onChange={handleSkillTreeChange}
          value={selectedSkillTree?.id || ''}
        >
          {skillsTreeData && skillsTreeData.map((skillTree: SkillTree) => (
            <option key={skillTree.id} value={skillTree.id}>
              {skillTree.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setEditingSkillConnection(null);
            setIsModalOpen(true);
          }}
        >
          Add Skill Connection
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Start Position</th>
            <th className="py-2 px-4 border-b">Mid Position</th>
            <th className="py-2 px-4 border-b">End Position</th>
            <th className="py-2 px-4 border-b">Start Anchor</th>
            <th className="py-2 px-4 border-b">End Anchor</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skillConnections.map((skillConnection) => (
            <tr key={skillConnection.id} className="border-b">
              <td className="py-2 px-4">{skillConnection.startPosition || '...'}</td>
              <td className="py-2 px-4">{skillConnection.midPosition || '...'}</td>
              <td className="py-2 px-4">{skillConnection.endPosition || '...'}</td>
              <td className="py-2 px-4">{skillConnection.startAnchor || '...'}</td>
              <td className="py-2 px-4">{skillConnection.endAnchor || '...'}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleEditSkillConnection(skillConnection)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => skillConnection.id && handleDeleteSkillConnection(skillConnection.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <SkillConnectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          skillConnection={editingSkillConnection}
          actualSkillTreeId={selectedSkillTree ? selectedSkillTree.id : 0}
        />
      )}
    </div>
  );
};

export default SkillConnectionsTable;
