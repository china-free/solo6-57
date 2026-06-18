import { useStyleStore } from '@/store/useStyleStore';
import Slider from '@/components/common/Slider';
import ColorPicker from '@/components/common/ColorPicker';
import { Layers, Plus, Trash2, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShadowPanel() {
  const shadows = useStyleStore((state) => state.shadows);
  const activeShadowId = useStyleStore((state) => state.activeShadowId);
  const addShadow = useStyleStore((state) => state.addShadow);
  const removeShadow = useStyleStore((state) => state.removeShadow);
  const updateShadow = useStyleStore((state) => state.updateShadow);
  const setActiveShadow = useStyleStore((state) => state.setActiveShadow);

  const activeShadow = shadows.find((s) => s.id === activeShadowId);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">阴影设置</h3>
            <p className="text-xs text-slate-400">支持多层阴影叠加</p>
          </div>
        </div>
        <button
          onClick={addShadow}
          className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          添加
        </button>
      </div>

      {shadows.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {shadows.map((shadow, index) => (
            <div key={shadow.id} className="flex items-center gap-1">
              <button
                onClick={() => setActiveShadow(shadow.id)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2',
                  activeShadowId === shadow.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border border-purple-500/50'
                    : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700'
                )}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: shadow.color }} />
                阴影 {index + 1}
              </button>
              {shadows.length > 1 && (
                <button
                  onClick={() => removeShadow(shadow.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="删除阴影"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeShadow && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 p-3 bg-slate-900/40 rounded-xl">
            <button
              onClick={() => updateShadow(activeShadow.id, { type: 'outer' })}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                activeShadow.type === 'outer'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Sun className="w-4 h-4" />
              外阴影
            </button>
            <button
              onClick={() => updateShadow(activeShadow.id, { type: 'inner' })}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all',
                activeShadow.type === 'inner'
                  ? 'bg-slate-700 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Moon className="w-4 h-4" />
              内阴影
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Slider
              label="水平偏移"
              value={activeShadow.offsetX}
              min={-50}
              max={50}
              step={1}
              unit="px"
              onChange={(v) => updateShadow(activeShadow.id, { offsetX: v })}
            />
            <Slider
              label="垂直偏移"
              value={activeShadow.offsetY}
              min={-50}
              max={50}
              step={1}
              unit="px"
              onChange={(v) => updateShadow(activeShadow.id, { offsetY: v })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Slider
              label="模糊半径"
              value={activeShadow.blur}
              min={0}
              max={100}
              step={1}
              unit="px"
              onChange={(v) => updateShadow(activeShadow.id, { blur: v })}
            />
            <Slider
              label="扩展半径"
              value={activeShadow.spread}
              min={-30}
              max={50}
              step={1}
              unit="px"
              onChange={(v) => updateShadow(activeShadow.id, { spread: v })}
            />
          </div>

          <ColorPicker
            label="阴影颜色"
            value={activeShadow.color}
            onChange={(v) => updateShadow(activeShadow.id, { color: v })}
          />
        </div>
      )}

      {shadows.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>暂无阴影，点击上方按钮添加</p>
        </div>
      )}
    </div>
  );
}
