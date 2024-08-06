"use client";
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Sidebar from '@/components/adminComponents/Sidebar';
import { SkillsTable } from '@/components/adminComponents';
import { SkillAdminCalculatorAppWrapper } from '@/context/skillTreeAdminContext';
import { useState } from 'react';
import SkillConnectionsTable from '@/components/adminComponents/ConnectionsTable';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stateSelect, setStateSelect] = useState<string>("Connections");

  async function logout() {
    await signOut({
      redirect: false
    });
    router.replace("/");
  }

  return (
    <SkillAdminCalculatorAppWrapper>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />
        <div className="flex-grow p-6 ml-60 text-black">
          <div className="flex justify-end mb-4">
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
          <div className='pt-2 bg-gray-800'>
            <button
              onClick={() => setStateSelect("Skills")}
              className={`px-4 py-2 ${stateSelect === "Skills" && "border-b-4 border-indigo-500"} text-white rounded`}
            >
              Skills
            </button>
            <button
              onClick={() => setStateSelect("Connections")}
              className={`px-4 py-2 ${stateSelect === "Connections" && "border-b-4 border-indigo-500"} text-white rounded`}
            >
              Connections
            </button>
          </div>
          <div className="text-black mt-4">
            {stateSelect === "Skills" && <SkillsTable />}
            {stateSelect === "Connections" && <SkillConnectionsTable />} {/* Renderize o componente de conexões */}
          </div>
        </div>
      </div>
    </SkillAdminCalculatorAppWrapper>
  );
}
