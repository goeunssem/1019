import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { DOLL_CHARACTERS, DollSvg } from './WorryDolls';
import { soundFx } from '../utils/audio';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'ready';

export const BreathingRoom: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('ready');
  const [timer, setTimer] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [selectedDollId, setSelectedDollId] = useState<string>('pogeun');

  const selectedDoll = DOLL_CHARACTERS.find((d) => d.id === selectedDollId) || DOLL_CHARACTERS[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Transition to next phase
          if (phase === 'ready' || phase === 'exhale') {
            soundFx.playBreathingTone('inhale');
            setPhase('inhale');
            return 4;
          } else if (phase === 'inhale') {
            soundFx.playBreathingTone('hold');
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            soundFx.playBreathingTone('exhale');
            setPhase('exhale');
            setCycleCount((c) => c + 1);
            return 4;
          }
          return 4;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  const togglePlay = () => {
    soundFx.playGentlePop();
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      soundFx.playBreathingTone('inhale');
      setTimer(4);
    } else {
      setIsActive(false);
    }
  };

  const resetBreathing = () => {
    soundFx.playGentlePop();
    setIsActive(false);
    setPhase('ready');
    setTimer(4);
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: '코로 숨을 천천히 들이마셔요...',
          subtitle: '배가 풍선처럼 볼록해지도록 깊게',
          color: 'text-emerald-700',
          scale: 'scale-125',
          bg: 'bg-emerald-100/70 border-emerald-300',
        };
      case 'hold':
        return {
          title: '숨을 잠시 편안하게 멈춰요...',
          subtitle: '마음속 생각을 잠시 쉬게 해줘요',
          color: 'text-amber-700',
          scale: 'scale-125',
          bg: 'bg-amber-100/70 border-amber-300',
        };
      case 'exhale':
        return {
          title: '입으로 천천히 후- 내쉬어요...',
          subtitle: '마음의 걱정도 함께 날려보내요',
          color: 'text-indigo-700',
          scale: 'scale-90',
          bg: 'bg-indigo-100/70 border-indigo-300',
        };
      default:
        return {
          title: '시작 버튼을 누르고 숨을 골라봐요',
          subtitle: '인형 친구와 함께 4초씩 천천히 숨을 쉬어요',
          color: 'text-slate-700',
          scale: 'scale-100',
          bg: 'bg-amber-50 border-amber-200',
        };
    }
  };

  const currentInfo = getPhaseInstruction();

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-gowun mb-2">
        <Wind className="w-3.5 h-3.5" />
        <span>토닥토닥 숨쉬기 방</span>
      </div>

      <h2 className="text-2xl font-bold text-amber-950 font-gowun mb-1">
        인형과 함께 마음 가라앉히기
      </h2>
      <p className="text-xs text-slate-500 mb-6">
        걱정이 파도처럼 밀려올 땐, 천천히 3번만 깊게 숨을 쉬어보세요.
      </p>

      {/* Choose buddy for breathing */}
      <div className="flex justify-center gap-2 mb-6">
        {DOLL_CHARACTERS.map((doll) => (
          <button
            key={doll.id}
            onClick={() => {
              soundFx.playGentlePop();
              setSelectedDollId(doll.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              selectedDollId === doll.id
                ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50'
            }`}
          >
            {doll.name}
          </button>
        ))}
      </div>

      {/* Animated breathing circle & doll */}
      <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
        {/* Pulsing outer aura */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 border-4 ${
            currentInfo.bg
          } ${isActive ? currentInfo.scale : 'scale-100'}`}
        />

        {/* Center Doll & Timer */}
        <div className="relative z-10 flex flex-col items-center">
          <DollSvg dollId={selectedDoll.id} className="w-20 h-26" />
          {isActive ? (
            <div className="text-3xl font-extrabold text-amber-950 mt-1 font-gowun">
              {timer}초
            </div>
          ) : (
            <div className="text-xs font-bold text-amber-800 mt-2 font-gowun">
              준비 완료
            </div>
          )}
        </div>
      </div>

      {/* Text feedback */}
      <div className="mb-6">
        <h3 className={`text-lg font-bold font-gowun transition-colors ${currentInfo.color}`}>
          {currentInfo.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">{currentInfo.subtitle}</p>
        {cycleCount > 0 && (
          <div className="mt-2 text-[11px] font-semibold text-emerald-700">
            🌱 벌써 {cycleCount}번의 깊은 숨을 쉬었어요! 마음이 편안해지고 있어요.
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={togglePlay}
          className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 font-gowun ${
            isActive
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-950'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              <span>잠시 멈추기</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>숨쉬기 시작하기</span>
            </>
          )}
        </button>

        <button
          onClick={resetBreathing}
          className="p-3 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          title="처음부터 다시하기"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
