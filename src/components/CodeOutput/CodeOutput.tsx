import { useState } from 'react';
import { useStyleStore } from '@/store/useStyleStore';
import { generateCSS } from '@/utils/cssGenerator';
import { Copy, Check, Code } from 'lucide-react';

export default function CodeOutput() {
  const borders = useStyleStore((state) => state.borders);
  const shadows = useStyleStore((state) => state.shadows);
  const [copied, setCopied] = useState(false);

  const cssCode = generateCSS(borders, shadows);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">CSS 代码</h3>
            <p className="text-xs text-slate-400">一键复制到剪贴板</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              复制代码
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 overflow-x-auto max-h-[320px] overflow-y-auto">
          <code className="text-sm font-mono text-slate-300 leading-relaxed">
            {cssCode.split('\n').map((line, index) => {
              let colorClass = 'text-slate-300';
              if (line.includes('.element')) colorClass = 'text-cyan-400 font-semibold';
              else if (line.includes('border:')) colorClass = 'text-purple-400';
              else if (line.includes('border-')) colorClass = 'text-purple-400';
              else if (line.includes('box-shadow')) colorClass = 'text-amber-400';
              else if (line.includes('outline')) colorClass = 'text-pink-400';
              else if (line.includes('}')) colorClass = 'text-slate-500';
              else if (line.trim().startsWith('/*')) colorClass = 'text-slate-500 italic';

              return (
                <div key={index} className="flex">
                  <span className="w-8 text-right pr-4 text-slate-600 select-none">
                    {index + 1}
                  </span>
                  <span className={colorClass}>{line || ' '}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
