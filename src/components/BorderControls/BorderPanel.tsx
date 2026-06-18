import { useStyleStore } from '@/store/useStyleStore';
import Slider from '@/components/common/Slider';
import ColorPicker from '@/components/common/ColorPicker';
import Select from '@/components/common/Select';
import { Square } from 'lucide-react';

const borderStyleOptions = [
  { value: 'solid', label: '实线 (Solid)' },
  { value: 'dashed', label: '虚线 (Dashed)' },
  { value: 'dotted', label: '点线 (Dotted)' },
];

export default function BorderPanel() {
  const border = useStyleStore((state) => state.border);
  const updateBorder = useStyleStore((state) => state.updateBorder);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl shadow-black/20">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Square className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">边框设置</h3>
          <p className="text-xs text-slate-400">调整边框样式和圆角</p>
        </div>
      </div>

      <div className="space-y-5">
        <Slider
          label="边框宽度"
          value={border.width}
          min={0}
          max={20}
          step={1}
          unit="px"
          onChange={(v) => updateBorder({ width: v })}
        />

        <Select
          label="边框样式"
          value={border.style}
          options={borderStyleOptions}
          onChange={(v) => updateBorder({ style: v as typeof border.style })}
        />

        <ColorPicker
          label="边框颜色"
          value={border.color}
          onChange={(v) => updateBorder({ color: v })}
        />

        <Slider
          label="圆角半径"
          value={border.radius}
          min={0}
          max={100}
          step={1}
          unit="px"
          onChange={(v) => updateBorder({ radius: v })}
        />
      </div>
    </div>
  );
}
