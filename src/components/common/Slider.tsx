import { cn } from '@/lib/utils';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  className?: string;
}

export default function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = 'px',
  onChange,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <span className="text-sm font-mono text-cyan-400">
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 w-full rounded-full bg-slate-700/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-cyan-500/30 pointer-events-none transition-all duration-75"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
