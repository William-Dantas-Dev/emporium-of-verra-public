export interface Menu {
  id: number,
  title: string,
  src: string,
}

export interface ErrorMessage {
  name: string,
  message: string,
}

export interface CategoryType{
  id: number;
  name: string;
  imageUrl: string;
  visible: boolean;
}

export interface Mark {
  name: string;
  image: string;
  type: string;
  description: string;
  isFixed: boolean;
  lat: number;
  lng: number;
}

export interface MapType{
  id: number;
  name: string;
  image: string;
  mapMark: markType[];
}

export interface markType{
  id?: number;
  name: string;
  image: string;
  type: string;
  description: string;
  icon: string;
  isFixed: boolean;
  lat: number;
  lng: number;
  mapsId: number;
}

export interface CoreStats{
  id: number,
  name: string,
  value: number,
}

export interface ItemRaritiesStats{
  id: number,
  rarity: string,
  coreStats: CoreStats[],
}

export interface Item {
  id: number,
  name: string,
  type: string,
  level: number,
  image: string,
  description: string,
  itemRaritiesStats: ItemRaritiesStats[],
  createdAt: string,
  updatedAt: string,
}

export interface Status {
  id: number,
  name: string,
  value: string,
  createdAt: string,
  updatedAt: string,
}

export interface ItemSeller {
  id: number,
  additionalStats: Status[],
  item: Item,
  seller: string,
  enchant: string,
  rarity: string,
  price: number,
  server: string,
  biome: string,
  createdAt: string,
  updatedAt: string,
}

export interface SkillTree {
  id: number,
  name: string,
  description: string,
  backgroundImage: string,
  skills: SkillType[],
  type: string,
  SkillConnection: SkillConnection[],
  combos: Combo[];
  createdAt: string,
  updatedAt: string,
}

export interface Combo {
  name: string;
  steps: ComboStep[];
  description: string;
}

export interface ComboStep {
  image: string;
  description?: string;
}

export interface SkillType {
  id?: number,
  image: string,
	name: string,
	description: string,
	isActiveSkill: Boolean,
	isStartSkill: Boolean,
  costToActive: number,
	nivel: number,
	cooldown: number,
	manaCost: number,
	range: number,
	cost: number,
	castTime: number,
	line: number,
	position: number,
	skillPreview: string,
	isDefaultActive: Boolean,
	chooseableSkills: ChooseableSkills[],
	EffectSkills: [],
	skillTreeId: number,
  createdAt?: string,
  updatedAt?: string,
}

export interface SkillConnection {
  id: number,
  startPosition: string,
  midPosition: string,
  endPosition: string,
  startAnchor: string,
  endAnchor: string,
  skillTreeId: number,
}

export interface ChooseableSkills extends SkillType{
  
}

export interface EffectSkills extends SkillType{
  
}

export interface Coord {
  id: number;
  x: number;
  y: number;
}