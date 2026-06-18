import type { CSSProperties } from 'react';
import type { BorderConfig, ShadowConfig } from '@/types';

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

const generateBoxShadowCSS = (borders: BorderConfig[], shadows: ShadowConfig[]): string => {
  const allShadows: string[] = [];

  const enabledBorders = borders.filter((b) => b.enabled);
  const enabledShadows = shadows.filter((s) => s.enabled);

  const outerBorders = enabledBorders.filter((b) => b.type === 'outer');
  const innerBorders = enabledBorders.filter((b) => b.type === 'inner');

  const extraOuterBorders = outerBorders.slice(1);
  let outerAccumulated = outerBorders[0]?.width || 0;
  extraOuterBorders.forEach((border) => {
    const outerOffset = outerAccumulated + border.width / 2;
    allShadows.push(`0 0 0 ${outerOffset}px ${border.color}`);
    outerAccumulated += border.width;
  });

  enabledShadows
    .filter((s) => s.type === 'outer')
    .forEach((shadow) => {
      allShadows.push(generateShadowValue(shadow));
    });

  const reversedInner = [...innerBorders].reverse();
  let innerAccumulated = 0;
  reversedInner.forEach((border) => {
    const innerOffset = innerAccumulated + border.width / 2;
    allShadows.push(`inset 0 0 0 ${innerOffset}px ${border.color}`);
    innerAccumulated += border.width;
  });

  enabledShadows
    .filter((s) => s.type === 'inner')
    .forEach((shadow) => {
      allShadows.push(generateShadowValue(shadow));
    });

  if (allShadows.length === 0) return '  box-shadow: none;';
  return `  box-shadow: ${allShadows.join(',\n              ')};`;
};

const generatePrimaryBorderCSS = (borders: BorderConfig[]): string[] => {
  const lines: string[] = [];
  const enabledBorders = borders.filter((b) => b.enabled);

  if (enabledBorders.length === 0) {
    lines.push('  border: none;');
    lines.push('  border-radius: 0px;');
    return lines;
  }

  const outerBorders = enabledBorders.filter((b) => b.type === 'outer');
  const firstBorder = outerBorders.length > 0 ? outerBorders[0] : enabledBorders[0];

  lines.push(`  border: ${firstBorder.width}px ${firstBorder.style} ${firstBorder.color};`);
  lines.push(`  border-radius: ${firstBorder.radius}px;`);
  return lines;
};

const generateExtraBordersCSS = (borders: BorderConfig[]): string[] => {
  const lines: string[] = [];
  const enabledBorders = borders.filter((b) => b.enabled);
  const disabledBorders = borders.filter((b) => !b.enabled);
  const outerBorders = enabledBorders.filter((b) => b.type === 'outer');
  const innerBorders = enabledBorders.filter((b) => b.type === 'inner');

  if (outerBorders.length > 1) {
    lines.push('  /* 额外外边框 (通过 box-shadow 扩展实现) */');
    for (let i = 1; i < outerBorders.length; i++) {
      const border = outerBorders[i];
      const prevWidth = outerBorders
        .slice(0, i)
        .reduce((sum, b) => sum + b.width, 0);
      const gap = prevWidth;
      lines.push(
        `  /* 边框 ${i + 1}: ${border.width}px ${border.style} ${border.color} 间距: ${gap}px */`
      );
    }
  }

  if (innerBorders.length > 0) {
    lines.push('  /* 内边框 (通过 box-shadow inset 实现) */');
    innerBorders.forEach((border, idx) => {
      lines.push(
        `  /* 内边框 ${idx + 1}: ${border.width}px ${border.style} ${border.color} */`
      );
    });
  }

  if (disabledBorders.length > 0) {
    lines.push('  /* 已停用图层:');
    disabledBorders.forEach((border) => {
      lines.push(`     ${border.type}边框 ${border.width}px ${border.color} */`);
    });
  }

  return lines;
};

export const generateCSS = (borders: BorderConfig[], shadows: ShadowConfig[]): string => {
  const cssLines: string[] = [];
  cssLines.push('.element {');
  cssLines.push(...generatePrimaryBorderCSS(borders));

  const extraBorderNotes = generateExtraBordersCSS(borders);
  if (extraBorderNotes.length > 0) {
    cssLines.push(...extraBorderNotes);
  }

  cssLines.push(generateBoxShadowCSS(borders, shadows));
  cssLines.push('}');
  return cssLines.join('\n');
};

export interface PreviewStyles {
  boxShadow: string;
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
}

export const generatePreviewStyles = (borders: BorderConfig[], shadows: ShadowConfig[]): PreviewStyles => {
  const boxShadowParts: string[] = [];

  const enabledBorders = borders.filter((b) => b.enabled);
  const enabledShadows = shadows.filter((s) => s.enabled);

  const outerBorders = enabledBorders.filter((b) => b.type === 'outer');
  const innerBorders = enabledBorders.filter((b) => b.type === 'inner');

  const extraOuterBorders = outerBorders.slice(1);
  let outerAccumulated = outerBorders[0]?.width || 0;
  extraOuterBorders.forEach((border) => {
    const outerOffset = outerAccumulated + border.width / 2;
    boxShadowParts.push(`0 0 0 ${outerOffset}px ${border.color}`);
    outerAccumulated += border.width;
  });

  enabledShadows
    .filter((s) => s.type === 'outer')
    .forEach((shadow) => {
      boxShadowParts.push(generateShadowValue(shadow));
    });

  const reversedInner = [...innerBorders].reverse();
  let innerAccumulated = 0;
  reversedInner.forEach((border) => {
    const innerOffset = innerAccumulated + border.width / 2;
    boxShadowParts.push(`inset 0 0 0 ${innerOffset}px ${border.color}`);
    innerAccumulated += border.width;
  });

  enabledShadows
    .filter((s) => s.type === 'inner')
    .forEach((shadow) => {
      boxShadowParts.push(generateShadowValue(shadow));
    });

  const firstBorder =
    enabledBorders.find((b) => b.type === 'outer') || enabledBorders[0] || null;

  return {
    boxShadow: boxShadowParts.length > 0 ? boxShadowParts.join(', ') : 'none',
    borderWidth: firstBorder ? `${firstBorder.width}px` : '0px',
    borderStyle: firstBorder ? firstBorder.style : 'none',
    borderColor: firstBorder ? firstBorder.color : 'transparent',
    borderRadius: firstBorder ? `${firstBorder.radius}px` : '0px',
  };
};
