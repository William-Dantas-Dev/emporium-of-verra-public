import { SkillType } from '@/types';
import { PencilIcon, TrashIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react'

interface ShowSkillTableProps {
  title: string;
  skills: SkillType[];
  setPreviewUrl: (value: string) => void;
  setIsOpenPreviewModal: (value: boolean) => void;
}
const ShowSkillTable = ({title, skills, setPreviewUrl, setIsOpenPreviewModal } : ShowSkillTableProps) => {

  const replaceImageTags = (description: string) => {
    const imageTagRegex = /\{imageIcon\('(.*?)'\)\}/g;
    return description.replace(imageTagRegex, (match, p1) => `<img class='inline h-4 w-4' src='${p1}' alt='${p1}' />`);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-white">{title} ({skills.length})</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left sm:w-60 w-20">Skill</th>
              <th className="px-4 py-2 text-left w-20">Icon</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className={`px-4 py-2 text-right`}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-2">{skill.name}</td>
                <td className="px-4 py-2">
                  <img src={skill.image} alt={skill.name} className="w-10 h-10" />
                </td>
                <td className="px-4 py-2" dangerouslySetInnerHTML={{ __html: replaceImageTags(skill.description) }}></td>
                <td className={`text-right `}>
                  <button
                    onClick={() => { skill.skillPreview && setIsOpenPreviewModal(true); skill.skillPreview && setPreviewUrl(skill.skillPreview)}}
                    type="button"
                    className={`${!skill.skillPreview && "hidden"} place-self-end focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900`}
                  >
                    <VideoCameraIcon className='size-6' />
                  </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>  
    </>
  )
}

export default ShowSkillTable
