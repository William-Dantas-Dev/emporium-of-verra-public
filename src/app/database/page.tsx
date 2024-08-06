"use client";
import { DatabaseFilterForm, Footer, NavbarComponent } from '@/components';

export default function Page() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-10 px-2 py-2">
      <NavbarComponent />
      <DatabaseFilterForm />
      <div className='mt-auto'/>
      <Footer />
    </div>
  );
}