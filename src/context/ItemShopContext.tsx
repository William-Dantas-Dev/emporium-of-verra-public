"use client";
import { createContext, useContext } from 'react';

const ItemShopContext = createContext<any>(undefined);

export function ItemShopWrapper({ children } : { children: React.ReactNode}) {
  const name = "Item Shop";
  return (
    <ItemShopContext.Provider value={{
      name
    }}>
      {children}
    </ItemShopContext.Provider>
  )
}

export function useItemShopContext(){
  return useContext(ItemShopContext);
}