import { Item, ItemSeller, Status } from '@/types';

export const filterItemsSellerPerStatus  = (selectedStatus: string[], itemsSellers : ItemSeller[]) => {
  const filterItems = selectedStatus.length > 0 ? itemsSellers?.filter((item : ItemSeller) => {
      const include = selectedStatus.every((selected) =>
        item.additionalStats.some((status : Status) => status.name === selected)
      );
      if(include) return item;
    }) : itemsSellers;
  return filterItems;
}

export const filterItemsSellerPerLevel  = (levelSelect: string, itemsSellers : ItemSeller[]) => {
  const filterItems = levelSelect != "all" ? itemsSellers.filter(item => {
    const levelSelected = levelSelect.replace("~", "").split(" ");
    if(item.item.level >= parseInt(levelSelected[0]) && item.item.level <= parseInt(levelSelected[2])){
      return item;
    }
  }) : itemsSellers;
  return filterItems;
}

export const filterItemsSellerPerEnchant = (enchantSelect: string, itemsSellers : ItemSeller[]) => {
  const filterPerEnchant = enchantSelect != "all" ? itemsSellers.filter(item => {
    if(item.enchant.toString() == enchantSelect) return item;
  }) : itemsSellers;
  return filterPerEnchant;
}

export const filterItemsSellerPerBiome = (biomeSelect: string, itemsSellers : ItemSeller[]) => {
  const filterPerBiome = biomeSelect != "all" ? itemsSellers.filter(item => {
      if(item.biome == biomeSelect) return item;
    }) : itemsSellers;
  return filterPerBiome;
}

export const filterItemsSellerPerRarity = (raritySelect: string, itemsSellers: ItemSeller[]) => {
  const filterPerRarity = raritySelect != "all" ? itemsSellers.filter(item => {
      if(item.rarity == raritySelect) return item;
    }) : itemsSellers;
  return filterPerRarity;
}

export const filterItemsSellerPerType = (typeSelect: string, itemsSellers: ItemSeller[]) => {
  const filterItems = typeSelect != "all" ? itemsSellers.filter(item => {
    if(item.item.type == typeSelect) return item;
  }) : itemsSellers;
  return filterItems;
}

export const filterItemsPerLevel  = (levelSelect: string, items : Item[]) => {
  const filterItems = levelSelect != "all" ? items.filter(item => {
    const levelSelected = levelSelect.replace("~", "").split(" ");
    if(item.level >= parseInt(levelSelected[0]) && item.level <= parseInt(levelSelected[2])){
      return item;
    }
  }) : items;
  return filterItems;
}

export const filterItemsPerType = (typeSelect: string, items: Item[]) => {
  const filterItems = typeSelect != "all" ? items.filter(item => {
    if(item.type == typeSelect) return item;
  }) : items;
  return filterItems;
}