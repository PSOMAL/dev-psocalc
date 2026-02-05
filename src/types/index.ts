export type AreaId = "head" | "arm" | "torso" | "leg";

export interface Area {
  id: AreaId;
  value: number;
  valueSet: boolean;
  palms: number;
  redness: number;
  rednessSet: boolean;
  thickness: number;
  thicknessSet: boolean;
  scaling: number;
  scalingSet: boolean;
  done: boolean;
}

export interface AreaContextType {
  areas: Area[];
  setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
}

export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface TranslationData {
  categories: Category[];
  translation: Record<string, string | string[]>;
  generalInfo: Record<string, string>;
  mathematicalFoundation: Record<string, string>;
  disclaimer: Record<string, string>;
}

export interface TranslationContextType {
  t: TranslationData;
  locale: string;
  changeLanguage: (locale: string) => void;
}

export interface ImageConfig {
  id: "redness" | "thickness" | "scaling";
  titleKey: string;
  src: string[];
}

export interface PentagonPosition {
  top: string;
  left: string;
}

export interface SideConfig {
  top: number;
  left: number;
  rotate: string;
}

export interface MaxSizeEntry {
  width?: number;
  height?: number;
  top?: number;
  left?: number | SideConfig;
  backgroundPositionY?: number;
  rotate?: string;
  scalingSize?: number;
  pentagonPositions?: PentagonPosition[];
  right?: SideConfig;
}

export type MaxSizes = Record<AreaId, MaxSizeEntry>;

export interface PasiResult {
  totalPasi: number;
  areaScores: Record<string, number>;
}

export interface ZPasiResult {
  totalZPasi: number;
  areaScores: Record<string, number>;
}

export interface BsaResult {
  totalBsa: number;
  areaScores: Record<string, number>;
}
