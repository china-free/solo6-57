import { useStyleStore } from '@/store/useStyleStore';
import { generatePreviewStyles } from '@/utils/cssGenerator';

export default function PreviewBox() {
  const borders = useStyleStore((state) => state.borders);
  const shadows = useStyleStore((state) => state.shadows);

  const styles = generatePreviewStyles(borders, shadows);

  const outerBorders = borders.filter((b) => b.type === 'outer');
  const innerBorders = borders.filter((b) => b.type === 'inner');
  const firstBorder = outerBorders[0] || borders[0];

  return (
    <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl shadow-black/20">
      <div className="absolute top-4 left-4 px-3 py-1 bg-slate-700/50 rounded-lg text-xs font-medium text-slate-300">
        预览
      </div>

      <div
        className="w-full h-64 md:h-80 flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #334155 25%, transparent 25%), linear-gradient(-45deg, #334155 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #334155 75%), linear-gradient(-45deg, transparent 75%, #334155 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          backgroundColor: '#1e293b',
        }}
      >
        <div
          className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-white to-slate-100 transition-all duration-150"
          style={{
            borderWidth: styles.borderWidth,
            borderStyle: styles.borderStyle,
            borderColor: styles.borderColor,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
        {firstBorder && (
          <>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded border border-slate-500"
                style={{ backgroundColor: firstBorder.color }}
              />
              <span>主边框: {firstBorder.width}px</span>
            </div>
            <div className="w-px h-4 bg-slate-600" />
            <span>圆角: {firstBorder.radius}px</span>
          </>
        )}
        {outerBorders.length > 1 && (
          <>
            <div className="w-px h-4 bg-slate-600" />
            <span>额外外边框: {outerBorders.length - 1} 层</span>
          </>
        )}
        {innerBorders.length > 0 && (
          <>
            <div className="w-px h-4 bg-slate-600" />
            <span>内边框: {innerBorders.length} 层</span>
          </>
        )}
        {shadows.length > 0 && (
          <>
            <div className="w-px h-4 bg-slate-600" />
            <span>阴影: {shadows.length} 层</span>
          </>
        )}
      </div>
    </div>
  );
}
