"use client";
import { Footer, RegisterForm } from '@/components';

export default function Page() {
  return (
    <div className="min-h-screen min-w-full flex flex-col bg-gray-900">
      <RegisterForm />
      <Footer />
    </div>
  );
}