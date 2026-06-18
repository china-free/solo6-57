import { create } from 'zustand';
import type { StyleState, StyleActions, BorderConfig, ShadowConfig } from '@/types';

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

const createDefaultBorder = (index: number = 0): BorderConfig => {
  const defaultColors = ['#06b6d4', '#a855f7', '#f59e0b', '#10b981', '#ef4444'];
  const offsets = [0, 4, 8, 12, 16];
  return {
    id: generateId(),
    type: 'outer',
    width: 2,
    style: 'solid',
    color: defaultColors[index % defaultColors.length],
    radius: index === 0 ? 12 : 12 + offsets[index % offsets.length],
  };
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

const initialBorders: BorderConfig[] = [createDefaultBorder(0)];
const initialShadows: ShadowConfig[] = [createDefaultShadow()];

export const useStyleStore = create<StyleState & StyleActions>((set) => ({
  borders: initialBorders,
  activeBorderId: initialBorders[0]?.id || null,
  shadows: initialShadows,
  activeShadowId: initialShadows[0]?.id || null,

  addBorder: () => {
    set((state) => {
      const newBorder = createDefaultBorder(state.borders.length);
      return {
        borders: [...state.borders, newBorder],
        activeBorderId: newBorder.id,
      };
    });
  },

  removeBorder: (id) =>
    set((state) => {
      const newBorders = state.borders.filter((b) => b.id !== id);
      const newActiveId =
        state.activeBorderId === id
          ? newBorders[newBorders.length - 1]?.id || null
          : state.activeBorderId;
      return {
        borders: newBorders,
        activeBorderId: newActiveId,
      };
    }),

  updateBorder: (id, border) =>
    set((state) => ({
      borders: state.borders.map((b) =>
        b.id === id ? { ...b, ...border } : b
      ),
    })),

  setActiveBorder: (id) =>
    set(() => ({
      activeBorderId: id,
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
