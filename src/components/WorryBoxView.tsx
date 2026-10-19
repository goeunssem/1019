import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Clock,
  Sparkles,
  Trash2,
  Smile,
  Search,
  Filter,
  Check,
  Send,
  Lock,
} from 'lucide-react';
import { WorryItem, WorryCategory } from '../types/worry';
import { DOLL_CHARACTERS, DollSvg } from './WorryDolls';
import { soundFx } from '../utils/audio';

interface WorryBoxViewProps {
  worries: WorryItem[];
  onToggleAction: (id: string) => void;
  onToggleRelieved: (id: string) => void;
  onDeleteWorry: (id: string) => void;
  onNewWorryClick: () => void;
}

type FilterTab = 'all' | 'can_change' | 'cannot_change' | 'relieved';

export const WorryBoxView: React.FC<WorryBoxViewProps> = ({
  worries,
  onToggleAction,
  onToggleRelieved,
  onDeleteWorry,
  onNewWorryClick,
}) => {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filteredWorries = worries.filter((item) => {
    if (filter === 'can_change' && item.category !== 'can_change') return false;
    if (filter === 'cannot_change' && item.category !== 'cannot_change') return false;
    if (filter === 'relieved' && !item.isRelieved) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchContent = item.content?.toLowerCase().includes(q);
      const matchAction = item.actionStep?.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchAction) return false;
    }
    return true;
  });

  const handleActionCheck = (id: string, currentState?: boolean) => {
    if (!currentState) {
      soundFx.playCheerSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10B981', '#34D399', '#FBBF24'],
      });
    } else {
      soundFx.playGentlePop();
    }
    onToggleAction(id);
  };

  const handleReliefClick = (id: string, currentState?: boolean) => {
    if (!currentState) {
      soundFx.playCheerSound();
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EC4899', '#8B5CF6'],
      });
    } else {
      soundFx.playGentlePop();
    }
    onToggleRelieved(id);
  };

  const confirmDelete = (id: string) => {
    soundFx.playGentlePop();
    onDeleteWorry(id);
    setItemToDelete(null);
  };

  const canChangeCount = worries.filter((w) => w.category === 'can_change').length;
  const cannotChangeCount = worries.filter((w) => w.category === 'cannot_change').length;
  const relievedCount = worries.filter((w) => w.isRelieved).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Box Header & Stats Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-gowun">
                내 걱정 인형 상자
              </h2>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                총 {worries.length}개 보관 중
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              상자 속 인형들이 친구의 걱정을 안전하게 돌보고 있어요.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playGentlePop();
              onNewWorryClick();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 font-gowun"
          >
            <Sparkles className="w-4 h-4" />
            <span>새 걱정 넣기</span>
          </button>
        </div>

        {/* Stats summary banner */}
        <div className="grid grid-cols-3 gap-2 pt-4 text-center">
          <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
            <span className="text-[11px] font-bold text-emerald-800 block">내가 바꿀 수 있는 것</span>
            <span className="text-lg font-bold text-emerald-900 font-gowun">{canChangeCount}개</span>
          </div>
          <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-100">
            <span className="text-[11px] font-bold text-indigo-800 block">인형이 맡아둔 것</span>
            <span className="text-lg font-bold text-indigo-900 font-gowun">{cannotChangeCount}개</span>
          </div>
          <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100">
            <span className="text-[11px] font-bold text-amber-800 block">마음 편해진 걱정</span>
            <span className="text-lg font-bold text-amber-900 font-gowun">{relievedCount}개</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-amber-100/60 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => {
              soundFx.playGentlePop();
              setFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter === 'all'
                ? 'bg-white text-amber-950 font-bold shadow-xs'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            전체 ({worries.length})
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              setFilter('can_change');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter === 'can_change'
                ? 'bg-white text-emerald-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            바꿀 수 있는 것 ({canChangeCount})
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              setFilter('cannot_change');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter === 'cannot_change'
                ? 'bg-white text-indigo-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            인형이 지키는 것 ({cannotChangeCount})
          </button>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              setFilter('relieved');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              filter === 'relieved'
                ? 'bg-white text-amber-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            안심 완료 ({relievedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="걱정 제목 검색..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
      </div>

      {/* Worry Cards List */}
      {filteredWorries.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-amber-200/70 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-50 flex items-center justify-center text-3xl">
            ✨
          </div>
          <h3 className="text-base font-bold text-amber-950 font-gowun mb-1">
            해당하는 걱정이 없어요
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            상자가 깨끗하고 평온해요. 마음에 걸리는 일이 있다면 언제든 넣어보세요.
          </p>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onNewWorryClick();
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            새 걱정 적기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorries.map((item) => {
            const doll = DOLL_CHARACTERS.find((d) => d.id === item.dollId) || DOLL_CHARACTERS[0];
            const isCanChange = item.category === 'can_change';

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-5 border transition-all bg-white relative flex flex-col justify-between ${
                  item.isRelieved
                    ? 'border-amber-300 shadow-sm bg-linear-to-b from-amber-50/40 to-white'
                    : isCanChange
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : 'border-indigo-200 hover:border-indigo-300'
                }`}
              >
                <div>
                  {/* Top metadata row (No static pill clutter, clean unboxed metadata) */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isCanChange
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {isCanChange ? '내가 바꿀 수 있는 것' : '내가 바꿀 수 없는 것'}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-amber-700 font-medium">{item.emotion}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>

                  {/* Title and content */}
                  <div className="flex items-start gap-3 my-2">
                    <div className="shrink-0 p-1.5 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
                      <DollSvg dollId={doll.id} className="w-10 h-13 mx-auto" />
                      <span className="text-[9px] font-bold text-amber-900 block truncate max-w-10">
                        {doll.name}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900 font-gowun leading-snug">
                        {item.title}
                      </h3>
                      {item.content && (
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-3">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category Specific Content: Action Step or Comfort Note */}
                  {isCanChange && item.actionStep && (
                    <div
                      onClick={() => handleActionCheck(item.id, item.isActionCompleted)}
                      className={`mt-3 p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        item.isActionCompleted
                          ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                          : 'bg-emerald-50/50 border-emerald-200 text-slate-700 hover:bg-emerald-100/50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                          item.isActionCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-emerald-400'
                        }`}
                      >
                        {item.isActionCompleted && <Check className="w-3 h-3" />}
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-emerald-900 block">
                          나의 작은 실천:{' '}
                          {item.isActionCompleted && (
                            <span className="text-[10px] text-emerald-700 ml-1 font-normal">
                              (완료했어요! 🎉)
                            </span>
                          )}
                        </span>
                        <span className={item.isActionCompleted ? 'line-through text-slate-500' : ''}>
                          {item.actionStep}
                        </span>
                      </div>
                    </div>
                  )}

                  {!isCanChange && (
                    <div className="mt-3 p-3 rounded-xl bg-indigo-50/50 border border-indigo-200/60 text-xs text-indigo-900">
                      <span className="font-bold block mb-0.5">🛡️ 인형이 맡아두는 중</span>
                      <span className="text-[11px] text-indigo-800">
                        "내가 바꿀 수 없으니 상자에 묻어두고 편히 쉬렴."
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Relief Stamp button */}
                  <button
                    onClick={() => handleReliefClick(item.id, item.isRelieved)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      item.isRelieved
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900'
                    }`}
                  >
                    <Smile className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.isRelieved ? '마음이 편해졌어요! 💛' : '마음이 편해졌나요?'}</span>
                  </button>

                  {/* Peaceful Delete / Paper Airplane button */}
                  <button
                    onClick={() => setItemToDelete(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                    title="종이비행기로 날려보내기 (삭제)"
                    aria-label="걱정 날려보내기"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Local Storage Privacy Footer Note */}
      <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-amber-900">
        <Lock className="w-4 h-4 text-amber-700 shrink-0" />
        <div>
          <strong>안심 약속:</strong> 이 상자에 적은 모든 걱정은 오직 이 기기(컴퓨터/스마트폰)에만 저장되며, 외부 인터넷 서버나 타인에게 전송되지 않습니다.
        </div>
      </div>

      {/* Delete / Paper Airplane Fly Away Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-amber-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3 text-amber-800">
              <Send className="w-5 h-5 rotate-12" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-gowun mb-1">
              걱정을 종이비행기로 날려보낼까요?
            </h4>
            <p className="text-xs text-slate-600 mb-5">
              마음이 한결 가벼워졌다면 상자에서 꺼내 푸른 하늘로 자유롭게 날려보낼 수 있어요.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                상자에 둘래요
              </button>
              <button
                onClick={() => confirmDelete(itemToDelete)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-xs"
              >
                훨훨 날려보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
