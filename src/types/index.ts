export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export type BorderType = 'outer' | 'inner';

export interface BorderConfig {
  id: string;
  type: BorderType;
  width: number;
  style: BorderStyle;
  color: string;
  radius: number;
  enabled: boolean;
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
  enabled: boolean;
}

export interface StyleState {
  borders: BorderConfig[];
  activeBorderId: string | null;
  shadows: ShadowConfig[];
  activeShadowId: string | null;
}

export interface StyleActions {
  addBorder: () => void;
  removeBorder: (id: string) => void;
  updateBorder: (id: string, border: Partial<BorderConfig>) => void;
  setActiveBorder: (id: string | null) => void;
  toggleBorderEnabled: (id: string) => void;
  moveBorder: (id: string, direction: 'up' | 'down') => void;

  addShadow: () => void;
  removeShadow: (id: string) => void;
  updateShadow: (id: string, shadow: Partial<ShadowConfig>) => void;
  setActiveShadow: (id: string | null) => void;
  toggleShadowEnabled: (id: string) => void;
  moveShadow: (id: string, direction: 'up' | 'down') => void;
}
