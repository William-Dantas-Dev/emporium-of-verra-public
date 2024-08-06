import { CountdownTimer, Footer, NavbarComponent } from '@/components';

export default function Home() {
  const targetDate = new Date('2024-09-30T23:59:59');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:px-10 px-2 py-2">
      <NavbarComponent />
      <CountdownTimer targetDate={targetDate} />
      <Footer />
    </main>
  );
}
