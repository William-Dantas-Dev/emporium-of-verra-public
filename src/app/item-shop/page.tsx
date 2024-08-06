import { FilterForm, Footer, NavbarComponent, UnderConstruction } from '@/components';
import { ItemShopWrapper } from '@/context/ItemShopContext';

export default function Home() {
  return (
    <ItemShopWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between sm:px-10 px-2 py-2">
        <NavbarComponent />
        {/* <FilterForm /> */}
        <UnderConstruction page={"Item Shop"} />
        <Footer />
      </main>
    </ItemShopWrapper>
  );
}
