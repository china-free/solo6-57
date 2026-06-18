import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const presetColors = [
  '#06b6d4',
  '#a855f7',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#3b82f6',
  '#f472b6',
  '#1e293b',
  '#ffffff',
  '#000000',
];

export default function ColorPicker({
  label,
  value,
  onChange,
  className,
}: ColorPickerProps) {
  const isHex = value.startsWith('#') && (value.length === 7 || value.length === 4);

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-slate-300 block">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-lg border-2 border-slate-600 cursor-pointer hover:border-cyan-400 transition-colors"
            style={{ backgroundColor: isHex ? value : '#ffffff' }}
          />
          <input
            type="color"
            value={isHex ? value : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm font-mono bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              'w-6 h-6 rounded-md border-2 transition-all hover:scale-110',
              value.toLowerCase() === color.toLowerCase()
                ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                : 'border-slate-600 hover:border-slate-500'
            )}
            style={{ backgroundColor: color }}
            aria-label={`选择颜色 ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
