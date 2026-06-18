export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export interface BorderConfig {
  width: number;
  style: BorderStyle;
  color: string;
  radius: number;
}

export type ShadowType = 'outer' | 'inner';

export interface ShadowConfig {
  id: string;
  type: ShadowType;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
}

export interface StyleState {
  border: BorderConfig;
  shadows: ShadowConfig[];
  activeShadowId: string | null;
}

export interface StyleActions {
  updateBorder: (border: Partial<BorderConfig>) => void;
  addShadow: () => void;
  removeShadow: (id: string) => void;
  updateShadow: (id: string, shadow: Partial<ShadowConfig>) => void;
  setActiveShadow: (id: string | null) => void;
}
