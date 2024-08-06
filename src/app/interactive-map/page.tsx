import { InteractiveMapAppWrapper } from '@/context/InteractiveMapContext';
import dynamic from 'next/dynamic';
const MapWithNoSSR = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Home() {
  return (
    <InteractiveMapAppWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between sm:px-10 px-2">
        <div className="h-screen flex flex-col">
          <MapWithNoSSR/>
        </div>
      </main>
    </InteractiveMapAppWrapper>
  );
}
