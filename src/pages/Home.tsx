import BorderPanel from '@/components/BorderControls/BorderPanel';
import ShadowPanel from '@/components/BorderControls/ShadowPanel';
import PreviewBox from '@/components/Preview/PreviewBox';
import CodeOutput from '@/components/CodeOutput/CodeOutput';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">CSS 可视化调试工具</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            边框阴影生成器
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            通过直观的滑块和颜色选择器，实时调整 CSS 边框和阴影效果，一键复制生成的代码
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <PreviewBox />
            <CodeOutput />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <BorderPanel />
            <ShadowPanel />
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>拖动滑块即可实时预览效果 · 支持多层阴影叠加</p>
        </footer>
      </div>
    </div>
  );
}
