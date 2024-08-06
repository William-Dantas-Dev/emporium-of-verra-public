import { CategoryType, Menu } from '@/types';

export const Menus: Menu[] = [
  { id: 1, title: "Item Shop",  src: "/item-shop"},
  { id: 2, title: "Interactive Map",  src: "/interactive-map"},
  { id: 3, title: "Skill Calculator",  src: "/skill-calculator"},
  { id: 4, title: "Database",  src: "/database"},
  { id: 5, title: "Guide",  src: "/guide"},
]

export const statusOptions: string[] = [
  "Attack Speed",
  "Health Regeneration",
  "Magical Accuracy",
  "Magical Casting Speed",
  "Magical Critical Chance",
  "Magical Critical Power",
  "Magical Disable Accuracy",
  "Magical Disable Evasion",
  "Magical Mitigation",
  "Magical Power",
  "Max Health",
  "Max Mana",
  "Mana Regeneration",
  "Physical Accuracy",
  "Physical Critical Chance",
  "Physical Critical Power",
  "Physical Disable Accuracy",
  "Physical Disable Evasion",
  "Physical Evasion",
  "Physical Mitigation",
  "Physical Penetration",
  "Physical Power",
  "Physical Speed",
  "Physical Disable Accuracy",
  "Physical Critical Chance",
];

export const itemsTypes: {group: string, options: Array<string>}[] =
[
  {
    group: "-- Weapons --",
    options: [
      "Axe",
      "Shortbow",
      "Longbow",
      "Club",
      "Dagger",
      "Hammer",
      "Lance",
      "Mace",
      "Orb",
      "Polearm/Halberd",
      "Scepter",
      "Spellbook",
      "Staff",
      "Sword",
      "2H Sword",
      "Wand",
    ]
  },
  {
    group: "-- Armor --",
    options: [
      "Helmet",
      "Shoulder",
      "Cloaks/Cape",
      "Chest Armor",
      "Wrist",
      "Glove",
      "Belt",
      "Pant",
      "Boot",
    ]
  },
  {
    group: "-- Jewels --",
    options: [
      "Necklace",
      "Earring",
      "Ring"
    ]
  },
  {
    group: "-- Pets --",
    options: [
      "Mounts",
      "Combat Pet",
      "Farming Pet",
    ]
  }
]

export const levels: string[] = [
  "1 ~ 10",
  "11 ~ 20",
  "21 ~ 30",
  "31 ~ 40",
  "41 ~ 50"
]

export const enchants: string[] = Array.from({length: 10}, (_, i) => `+${i + 1}`);

export const rarity: string[] =[
  "Poor",
  "Common",
  "Uncommon",
  "Rare",
  "Heroic",
  "Epic",
  "Legendary",
  "Artifact"
];

export const servers: {group: string, options: Array<string>}[] =
[
  {
    group: "-- NA --",
    options: [
      "NA-1",
      "NA-2",
      "NA-3",
      "NA-4",
    ]
  },
  {
    group: "-- SA --",
    options: [
      "SA-1",
      "SA-2",
      "SA-3",
      "SA-4",
    ]
  },
]

export const biomes: string[] = [
  'Riverlands',
  'Badlands',
  'Flood Plains',
  'Forest',
  'Jungle',
  'Sandsquall Desert',
  'Snowy Mountains',
  'Tabletop Mountains',
  'Tropics',
  'Tundra',
  'Volcano Area',
  'Underrealm'
];

export const markCategories: CategoryType[] = [
  { id: 1, name: 'Nodes', imageUrl: '/mapIcons/PinNodes.png', visible: true},
  { id: 2, name: 'Castles', imageUrl: '/mapIcons/PinCastles.png', visible: true},
  { id: 3, name: 'Dungeons', imageUrl: '/mapIcons/PinDungeons.png', visible: true},
  { id: 4, name: 'Boss', imageUrl: '/mapIcons/PinBoss.png', visible: true},
  { id: 5, name: 'POI', imageUrl: '/mapIcons/PinPOI.png', visible: true},
  { id: 6, name: 'Mining', imageUrl: '/mapIcons/PinMining.png', visible: true},
  { id: 7, name: 'Gathering', imageUrl: '/mapIcons/PinGathering.png', visible: true},
];

export const markTypes: string[] = [
  'Nodes',
  'Castles',
  'Dungeons',
  'Boss',
  'POI',
  'Mining',
  'Gathering',
]

export const allArchetypes: string[] = [
  "Bard",
  "Cleric",
  "Fighter",
  "Mage",
  "Ranger",
  "Rogue",
  "Summoner",
  "Tank",
]

export const allWeapons: string[] = [
  "Shortbow",
  "Wand",
  "Greatsword",
]