import { useStyleStore } from '@/store/useStyleStore';
import Slider from '@/components/common/Slider';
import ColorPicker from '@/components/common/ColorPicker';
import Select from '@/components/common/Select';
import { Square, Plus, Trash2, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const borderStyleOptions = [
  { value: 'solid', label: '实线 (Solid)' },
  { value: 'dashed', label: '虚线 (Dashed)' },
  { value: 'dotted', label: '点线 (Dotted)' },
];

export default function BorderPanel() {
  const borders = useStyleStore((state) => state.borders);
  const activeBorderId = useStyleStore((state) => state.activeBorderId);
  const addBorder = useStyleStore((state) => state.addBorder);
  const removeBorder = useStyleStore((state) => state.removeBorder);
  const updateBorder = useStyleStore((state) => state.updateBorder);
  const setActiveBorder = useStyleStore((state) => state.setActiveBorder);

  const activeBorder = borders.find((b) => b.id === activeBorderId);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Square className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">边框设置</h3>
            <p className="text-xs text-slate-400">支持多层边框叠加</p>
          </div>
        </div>
        <button
          onClick={addBorder}
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      {borders.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {borders.map((border, index) => (
            <div key={border.id} className="flex items-center gap-1">
              <button
                onClick={() => setActiveBorder(border.id)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2',
                  activeBorderId === border.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border border-cyan-500/50'
                    : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700'
                )}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: border.color }} />
                边框 {index + 1}
                <span className="text-xs opacity-60">
                  {border.type === 'outer' ? '外' : '内'}
                </span>
              </button>
              {borders.length > 1 && (
                <button
                  onClick={() => removeBorder(border.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="删除边框"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeBorder && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 p-3 bg-slate-900/40 rounded-xl">
            <button
              onClick={() => updateBorder(activeBorder.id, { type: 'outer' })}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                activeBorder.type === 'outer'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Sun className="w-4 h-4" />
              外边框
            </button>
            <button
              onClick={() => updateBorder(activeBorder.id, { type: 'inner' })}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                activeBorder.type === 'inner'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Moon className="w-4 h-4" />
              内边框
            </button>
          </div>

          <Slider
            label="边框宽度"
            value={activeBorder.width}
            min={0}
            max={20}
            step={1}
            unit="px"
            onChange={(v) => updateBorder(activeBorder.id, { width: v })}
          />

          <Select
            label="边框样式"
            value={activeBorder.style}
            options={borderStyleOptions}
            onChange={(v) =>
              updateBorder(activeBorder.id, {
                style: v as typeof activeBorder.style,
              })
            }
          />

          <ColorPicker
            label="边框颜色"
            value={activeBorder.color}
            onChange={(v) => updateBorder(activeBorder.id, { color: v })}
          />

          <Slider
            label="圆角半径"
            value={activeBorder.radius}
            min={0}
            max={100}
            step={1}
            unit="px"
            onChange={(v) => updateBorder(activeBorder.id, { radius: v })}
          />
        </div>
      )}

      {borders.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Square className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>暂无边框，点击上方按钮添加</p>
        </div>
      )}
    </div>
  );
}
