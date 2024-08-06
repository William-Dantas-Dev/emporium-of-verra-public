"use client";
import { Footer, NavbarComponent, SkillTable, SkillTree } from '@/components';
import { SkillCalculatorAppWrapper } from '@/context/skillTreeContext';
import NextAuthSessionProvider from '@/providers/sessionProvider';

export default function Home() {
  return (
    <NextAuthSessionProvider>
      <SkillCalculatorAppWrapper>
        <NavbarComponent />
        <SkillTree />
        <SkillTable />
        <div className='mt-auto'/>
        <Footer />
      </SkillCalculatorAppWrapper>
    </NextAuthSessionProvider>
  );
}
