import { create } from 'zustand';
import type { StyleState, StyleActions, BorderConfig, ShadowConfig } from '@/types';

const defaultBorder: BorderConfig = {
  width: 2,
  style: 'solid',
  color: '#06b6d4',
  radius: 12,
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

const createDefaultShadow = (): ShadowConfig => ({
  id: generateId(),
  type: 'outer',
  offsetX: 0,
  offsetY: 4,
  blur: 20,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.25)',
});

const initialShadows: ShadowConfig[] = [createDefaultShadow()];

export const useStyleStore = create<StyleState & StyleActions>((set) => ({
  border: defaultBorder,
  shadows: initialShadows,
  activeShadowId: initialShadows[0]?.id || null,

  updateBorder: (border) =>
    set((state) => ({
      border: { ...state.border, ...border },
    })),

  addShadow: () => {
    const newShadow = createDefaultShadow();
    set((state) => ({
      shadows: [...state.shadows, newShadow],
      activeShadowId: newShadow.id,
    }));
  },

  removeShadow: (id) =>
    set((state) => {
      const newShadows = state.shadows.filter((s) => s.id !== id);
      const newActiveId =
        state.activeShadowId === id
          ? newShadows[newShadows.length - 1]?.id || null
          : state.activeShadowId;
      return {
        shadows: newShadows,
        activeShadowId: newActiveId,
      };
    }),

  updateShadow: (id, shadow) =>
    set((state) => ({
      shadows: state.shadows.map((s) =>
        s.id === id ? { ...s, ...shadow } : s
      ),
    })),

  setActiveShadow: (id) =>
    set(() => ({
      activeShadowId: id,
    })),
}));
