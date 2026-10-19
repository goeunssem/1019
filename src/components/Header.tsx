import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export type NavTab = 'write' | 'box' | 'guide' | 'breathe';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-amber-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => {
            soundFx.playGentlePop();
            onSelectTab('write');
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-amber-950 font-gowun whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors flex items-center gap-1.5 text-left"
        >
          <span className="text-xl">🧸</span>
          <span>마음 쏙! 걱정 인형 상자</span>
        </button>

        {/* Zone 2: Navigation Links (4 single-line text links) */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600 font-gowun overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onSelectTab('write');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
              currentTab === 'write'
                ? 'text-amber-900 border-b-2 border-amber-500 font-bold'
                : 'hover:text-amber-900'
            }`}
          >
            새 걱정 쓰기
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onSelectTab('box');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
              currentTab === 'box'
                ? 'text-amber-900 border-b-2 border-amber-500 font-bold'
                : 'hover:text-amber-900'
            }`}
          >
            걱정 상자 열기
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onSelectTab('guide');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
              currentTab === 'guide'
                ? 'text-amber-900 border-b-2 border-amber-500 font-bold'
                : 'hover:text-amber-900'
            }`}
          >
            분류 가이드
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onSelectTab('breathe');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
              currentTab === 'breathe'
                ? 'text-amber-900 border-b-2 border-amber-500 font-bold'
                : 'hover:text-amber-900'
            }`}
          >
            숨쉬기 방
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl text-amber-900 hover:bg-amber-100/70 border border-amber-200/60 transition-colors"
            title={isMuted ? '소리 켜기' : '소리 끄기'}
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
