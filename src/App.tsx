import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { WorryWizard } from './components/WorryWizard';
import { WorryBoxView } from './components/WorryBoxView';
import { ControlGuideView } from './components/ControlGuideView';
import { BreathingRoom } from './components/BreathingRoom';
import { BottomTeacherBanner } from './components/BottomTeacherBanner';
import { WorryItem } from './types/worry';
import {
  loadWorries,
  addWorry,
  toggleActionStep,
  toggleRelieved,
  deleteWorry,
} from './services/storage';
import { soundFx } from './utils/audio';
import { DOLL_CHARACTERS, DollSvg } from './components/WorryDolls';
import { WorryBoxGraphic } from './components/WorryBoxGraphic';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('write');
  const [worries, setWorries] = useState<WorryItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  useEffect(() => {
    setWorries(loadWorries());
  }, []);

  const handleWorrySaved = (newWorry: WorryItem) => {
    const updated = addWorry(newWorry);
    setWorries(updated);
  };

  const handleToggleAction = (id: string) => {
    const updated = toggleActionStep(id);
    setWorries(updated);
  };

  const handleToggleRelieved = (id: string) => {
    const updated = toggleRelieved(id);
    setWorries(updated);
  };

  const handleDeleteWorry = (id: string) => {
    const updated = deleteWorry(id);
    setWorries(updated);
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const canChangeCount = worries.filter((w) => w.category === 'can_change').length;
  const cannotChangeCount = worries.filter((w) => w.category === 'cannot_change').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        {/* Hero Banner for Write Tab */}
        {currentTab === 'write' && (
          <div className="mb-8 bg-linear-to-b from-amber-100/60 to-white/70 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs text-center relative overflow-hidden">
            {/* Friendly Mascot line-up */}
            <div className="flex justify-center items-end gap-2 sm:gap-4 mb-4">
              <DollSvg dollId="pogeun" className="w-12 h-16 sm:w-16 sm:h-20" />
              <DollSvg dollId="star" className="w-14 h-18 sm:w-18 sm:h-22" />
              <div className="px-2">
                <WorryBoxGraphic isOpen={false} itemCount={worries.length} className="w-28 h-22 sm:w-36 sm:h-28" />
              </div>
              <DollSvg dollId="sprout" className="w-14 h-18 sm:w-18 sm:h-22" />
              <DollSvg dollId="dalkom" className="w-12 h-16 sm:w-16 sm:h-20" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-gowun tracking-tight">
              마음속 걱정, 인형 상자에 쏙 맡겨보세요
            </h1>
            <p className="text-xs sm:text-sm text-amber-900/80 max-w-lg mx-auto mt-2 leading-relaxed">
              과테말라 전설 속 걱정 인형처럼, 잠들기 전 걱정을 인형에게 털어놓고 상자에 넣으면
              인형이 밤새 대신 걱정해 주어 편안하게 쉴 수 있답니다.
            </p>

            {/* Quick Helper Badges */}
            <div className="mt-4 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-600">
              <span className="bg-white/80 border border-amber-200 px-3 py-1 rounded-full font-medium">
                🌱 내가 바꿀 수 있는 것 → <strong>작은 실천 정하기</strong>
              </span>
              <span className="bg-white/80 border border-amber-200 px-3 py-1 rounded-full font-medium">
                ☁️ 바꿀 수 없는 것 → <strong>상자에 쏙 넣고 안심하기</strong>
              </span>
              <span className="bg-amber-100/90 text-amber-900 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                🔒 오직 이 기기에만 보관
              </span>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {currentTab === 'write' && (
          <WorryWizard
            onWorrySaved={handleWorrySaved}
            onGoToBox={() => setCurrentTab('box')}
          />
        )}

        {currentTab === 'box' && (
          <WorryBoxView
            worries={worries}
            onToggleAction={handleToggleAction}
            onToggleRelieved={handleToggleRelieved}
            onDeleteWorry={handleDeleteWorry}
            onNewWorryClick={() => setCurrentTab('write')}
          />
        )}

        {currentTab === 'guide' && (
          <ControlGuideView onStartWorry={() => setCurrentTab('write')} />
        )}

        {currentTab === 'breathe' && <BreathingRoom />}
      </main>

      {/* Mandatory Persistent Bottom Banner */}
      <BottomTeacherBanner />
    </div>
  );
}
