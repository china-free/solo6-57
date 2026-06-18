import type { CSSProperties } from 'react';
import type { BorderConfig, ShadowConfig } from '@/types';

const generateBorderCSS = (border: BorderConfig): string => {
  const lines: string[] = [];
  lines.push(`  border-width: ${border.width}px;`);
  lines.push(`  border-style: ${border.style};`);
  lines.push(`  border-color: ${border.color};`);
  lines.push(`  border-radius: ${border.radius}px;`);
  return lines.join('\n');
};

const generateShadowValue = (shadow: ShadowConfig): string => {
  const parts: string[] = [];
  if (shadow.type === 'inner') {
    parts.push('inset');
  }
  parts.push(`${shadow.offsetX}px`);
  parts.push(`${shadow.offsetY}px`);
  parts.push(`${shadow.blur}px`);
  parts.push(`${shadow.spread}px`);
  parts.push(shadow.color);
  return parts.join(' ');
};

const generateBoxShadowCSS = (shadows: ShadowConfig[]): string => {
  if (shadows.length === 0) return '  box-shadow: none;';
  const shadowValues = shadows.map(generateShadowValue);
  return `  box-shadow: ${shadowValues.join(',\n              ')};`;
};

export const generateCSS = (border: BorderConfig, shadows: ShadowConfig[]): string => {
  const cssLines: string[] = [];
  cssLines.push('.element {');
  cssLines.push(generateBorderCSS(border));
  cssLines.push(generateBoxShadowCSS(shadows));
  cssLines.push('}');
  return cssLines.join('\n');
};

export const generateBoxShadowString = (shadows: ShadowConfig[]): string => {
  if (shadows.length === 0) return 'none';
  return shadows.map(generateShadowValue).join(', ');
};

export const generateBorderStyleString = (border: BorderConfig): CSSProperties => {
  return {
    borderWidth: `${border.width}px`,
    borderStyle: border.style,
    borderColor: border.color,
    borderRadius: `${border.radius}px`,
  };
};
