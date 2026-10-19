import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ArrowLeft, Check, HelpCircle, Wind, CheckCircle2 } from 'lucide-react';
import { WorryCategory, EmotionType, WorryItem } from '../types/worry';
import { DOLL_CHARACTERS, DollSvg } from './WorryDolls';
import { WorryBoxGraphic } from './WorryBoxGraphic';
import { CONTROL_EXAMPLES, ACTION_SUGGESTIONS } from '../data/controlGuide';
import { soundFx } from '../utils/audio';

interface WorryWizardProps {
  onWorrySaved: (worry: WorryItem) => void;
  onGoToBox: () => void;
}

const EMOTIONS: EmotionType[] = [
  '걱정돼요',
  '불안해요',
  '속상해요',
  '두려워요',
  '부끄러워요',
  '화나요',
  '답답해요',
  '외로워요',
];

export const WorryWizard: React.FC<WorryWizardProps> = ({ onWorrySaved, onGoToBox }) => {
  // Steps: 1: Write, 2: Doll Empathy, 3: Classify, 4: Action/Let-go, 5: Deposited Success
  const [step, setStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('걱정돼요');
  const [selectedDollId, setSelectedDollId] = useState<string>('pogeun');
  const [category, setCategory] = useState<WorryCategory | null>(null);
  const [actionStep, setActionStep] = useState<string>('');
  const [showExamples, setShowExamples] = useState<boolean>(false);

  // Animation states
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [breatheCount, setBreatheCount] = useState<number>(0);

  const selectedDoll = DOLL_CHARACTERS.find((d) => d.id === selectedDollId) || DOLL_CHARACTERS[0];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    soundFx.playGentlePop();
    setStep(2);
  };

  const handleGoToClassify = () => {
    soundFx.playGentlePop();
    setStep(3);
  };

  const handleSelectCategory = (cat: WorryCategory) => {
    soundFx.playGentlePop();
    setCategory(cat);
    if (cat === 'can_change' && !actionStep) {
      setActionStep(ACTION_SUGGESTIONS[0]);
    }
    setStep(4);
  };

  const handleDepositToBox = () => {
    if (!category) return;
    soundFx.playWoodenTap();
    setIsBoxOpen(true);
    setIsReceiving(true);

    setTimeout(() => {
      soundFx.playTuckChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899'],
      });

      const newWorry: WorryItem = {
        id: `worry-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        emotion: selectedEmotion,
        dollId: selectedDollId,
        category,
        actionStep: category === 'can_change' ? actionStep.trim() : undefined,
        isActionCompleted: false,
        isRelieved: false,
        createdAt: new Date().toISOString(),
      };

      onWorrySaved(newWorry);
      setIsReceiving(false);
      setIsBoxOpen(false);
      setStep(5);
    }, 1200);
  };

  const resetForm = () => {
    soundFx.playGentlePop();
    setTitle('');
    setContent('');
    setSelectedEmotion('걱정돼요');
    setSelectedDollId('pogeun');
    setCategory(null);
    setActionStep('');
    setStep(1);
    setBreatheCount(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2 font-gowun">
          <span className={step >= 1 ? 'text-amber-800 font-bold' : ''}>1. 걱정 적기</span>
          <span>·</span>
          <span className={step >= 2 ? 'text-amber-800 font-bold' : ''}>2. 인형의 맞이</span>
          <span>·</span>
          <span className={step >= 3 ? 'text-amber-800 font-bold' : ''}>3. 바꿀 수 있을까?</span>
          <span>·</span>
          <span className={step >= 4 ? 'text-amber-800 font-bold' : ''}>
            {category === 'can_change' ? '4. 작은 실천' : '4. 마음 놓기'}
          </span>
          <span>·</span>
          <span className={step === 5 ? 'text-amber-800 font-bold' : ''}>5. 상자에 쏙!</span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Write Worry */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              마음 털어놓기
            </span>
            <h2 className="text-2xl font-bold text-amber-950 mt-2 font-gowun">
              어떤 걱정이 마음을 무겁게 하나요?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              걱정을 글로 적어두면 마음이 한결 가벼워져요. 비밀은 이 기기에만 보관돼요.
            </p>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-6">
            {/* Emotion Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 font-gowun">
                지금 내 마음의 기분은 어떤가요?
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map((emo) => {
                  const isSelected = selectedEmotion === emo;
                  return (
                    <button
                      type="button"
                      key={emo}
                      onClick={() => {
                        soundFx.playGentlePop();
                        setSelectedEmotion(emo);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                          : 'bg-amber-50 text-slate-700 hover:bg-amber-100 border border-amber-200/60'
                      }`}
                    >
                      {emo}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title / Worry summary */}
            <div>
              <label htmlFor="worry-title" className="block text-xs font-bold text-slate-700 mb-1.5 font-gowun">
                걱정의 한 줄 제목 <span className="text-amber-600">*</span>
              </label>
              <input
                id="worry-title"
                type="text"
                required
                maxLength={60}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 내일 발표할 때 목소리가 떨릴까 봐 걱정돼요"
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/30 text-slate-800 placeholder:text-slate-400 text-sm font-medium"
              />
            </div>

            {/* Detailed content */}
            <div>
              <label htmlFor="worry-content" className="block text-xs font-bold text-slate-700 mb-1.5 font-gowun">
                더 자세한 이야기 (선택 사항)
              </label>
              <textarea
                id="worry-content"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="어떤 일이 있었는지, 왜 마음이 불안한지 편하게 적어보세요."
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/30 text-slate-800 placeholder:text-slate-400 text-sm resize-none"
              />
            </div>

            {/* Choose Worry Doll Friend */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 font-gowun">
                어떤 걱정 인형 친구에게 맡길까요?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DOLL_CHARACTERS.map((doll) => {
                  const isSelected = selectedDollId === doll.id;
                  return (
                    <div
                      key={doll.id}
                      onClick={() => {
                        soundFx.playGentlePop();
                        setSelectedDollId(doll.id);
                      }}
                      className={`p-3 rounded-2xl cursor-pointer text-center border transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-300'
                          : 'border-slate-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <DollSvg dollId={doll.id} className="w-14 h-18 mx-auto" />
                      <div className="mt-2">
                        <div className="text-xs font-bold text-slate-900 font-gowun">{doll.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{doll.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!title.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 font-gowun"
              >
                <span>인형에게 걱정 털어놓기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2: Doll Receives with Empathy */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="inline-block p-4 rounded-full bg-amber-50 mb-3">
            <DollSvg dollId={selectedDoll.id} className="w-24 h-32 mx-auto" animate />
          </div>

          <h3 className="text-xl font-bold text-amber-950 font-gowun mb-1">
            "{selectedDoll.name}" 친구가 꼭 안아주었어요
          </h3>
          <p className="text-xs text-amber-700 font-medium mb-4">{selectedDoll.quote}</p>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-left mb-6 relative">
            <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md mb-2 inline-block">
              {selectedDoll.name}의 한마디
            </span>
            <p className="text-sm sm:text-base font-gowun text-slate-800 leading-relaxed">
              "{title}" 때문에 마음이 정말 많이 무거웠겠다. 나한테 이렇게 용기 내어 털어놓아 줘서 정말 고마워.
              너 혼자만 고민하게 두지 않을 테니 걱정 마!
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 mb-6">
            💡 걱정 인형 상자의 마법: 우리가 함께 <strong className="text-slate-900">"내가 바꿀 수 있는 것"</strong>과 <strong className="text-slate-900">"내가 바꿀 수 없는 것"</strong>으로 나눠보면 마음이 훨씬 단단해진단다.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                soundFx.playGentlePop();
                setStep(1);
              }}
              className="py-3 px-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>수정하기</span>
            </button>
            <button
              onClick={handleGoToClassify}
              className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 font-gowun"
            >
              <span>어디에 해당하는지 함께 분류해보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Classify: Can I change it or not? */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              함께 생각해보는 시간
            </span>
            <h2 className="text-2xl font-bold text-amber-950 mt-2 font-gowun">
              이 걱정은 어디에 해당할까요?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              내가 바꿀 수 있는 것엔 '작은 용기'를, 바꿀 수 없는 것엔 '마음 내려놓기'를 선물해요.
            </p>
          </div>

          {/* Current Worry Reminder */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <DollSvg dollId={selectedDoll.id} className="w-12 h-16 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-amber-800 font-semibold">내 걱정</span>
              <h4 className="text-sm font-bold text-slate-900 truncate font-gowun">{title}</h4>
              {content && <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{content}</p>}
            </div>
          </div>

          {/* Two Big Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* 1. 내가 바꿀 수 있는 것 */}
            <div
              onClick={() => handleSelectCategory('can_change')}
              className="group p-5 rounded-2xl border-2 border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 cursor-pointer transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🌱</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    내 손안의 힘
                  </span>
                </div>
                <h3 className="text-base font-bold text-emerald-950 font-gowun mb-1.5 group-hover:text-emerald-700 transition-colors">
                  내가 바꿀 수 있는 것
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  내가 연습하거나, 친구에게 사과하거나, 선생님께 질문하고 미리 준비할 수 있는 일이에요.
                </p>
                <div className="bg-white/90 rounded-xl p-2.5 text-[11px] text-slate-700 border border-emerald-200/50 space-y-1">
                  <div className="font-semibold text-emerald-900">✨ 이런 것들이에요:</div>
                  <div>· 나의 생각과 마음가짐</div>
                  <div>· 나의 사과와 따뜻한 말 한마디</div>
                  <div>· 시험 공부와 발표 연습하기</div>
                  <div>· 선생님께 용기 내어 도움 청하기</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>작은 실천 정하러 가기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. 내가 바꿀 수 없는 것 */}
            <div
              onClick={() => handleSelectCategory('cannot_change')}
              className="group p-5 rounded-2xl border-2 border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 cursor-pointer transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">☁️</span>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    인형에게 맡기기
                  </span>
                </div>
                <h3 className="text-base font-bold text-indigo-950 font-gowun mb-1.5 group-hover:text-indigo-700 transition-colors">
                  내가 바꿀 수 없는 것
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  날씨, 다른 친구의 마음이나 표정, 이미 지나가 버린 어제의 실수처럼 내 힘으로는 어쩔 수 없는 일이에요.
                </p>
                <div className="bg-white/90 rounded-xl p-2.5 text-[11px] text-slate-700 border border-indigo-200/50 space-y-1">
                  <div className="font-semibold text-indigo-900">🛡️ 이런 것들이에요:</div>
                  <div>· 소풍날 비가 올지 안 올지</div>
                  <div>· 다른 사람의 생각이나 감정</div>
                  <div>· 어제 이미 일어난 실수나 사건</div>
                  <div>· 학교 규칙이나 시험 날짜</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-200/60 flex items-center justify-between text-xs font-bold text-indigo-700">
                <span>인형에게 맡기고 마음 놓기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Toggle Example Help */}
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => {
                soundFx.playGentlePop();
                setShowExamples(!showExamples);
              }}
              className="text-xs text-amber-800 font-semibold flex items-center gap-1.5 hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              <span>어떻게 분류해야 할지 헷갈린다면? (도움말 예시 보기)</span>
            </button>

            {showExamples && (
              <div className="mt-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2 text-xs">
                {CONTROL_EXAMPLES.map((ex, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-100">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        ex.category === 'can_change'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {ex.category === 'can_change' ? '바꿀 수 있음' : '바꿀 수 없음'}
                    </span>
                    <div>
                      <strong className="text-slate-900 block">{ex.title}</strong>
                      <span className="text-slate-600">{ex.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-start">
            <button
              onClick={() => {
                soundFx.playGentlePop();
                setStep(2);
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전으로</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Action Step (if can_change) OR Letting-go Ritual (if cannot_change) */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 animate-in fade-in duration-200">
          {category === 'can_change' ? (
            <div>
              {/* Category: CAN CHANGE -> Choose 1 small action */}
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  내가 바꿀 수 있는 걱정
                </span>
                <h2 className="text-2xl font-bold text-amber-950 mt-2 font-gowun">
                  오늘 해볼 수 있는 작은 실천 한 가지!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                  너무 거창하지 않아도 돼요. 1분, 5분 안에 할 수 있는 아주 작은 행동 하나가 용기를 만들어줘요.
                </p>
              </div>

              {/* Action Suggestions Chips */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-2 font-gowun">
                  추천 실천 아이디어 (눌러서 선택할 수 있어요)
                </label>
                <div className="space-y-2">
                  {ACTION_SUGGESTIONS.map((sugg, idx) => {
                    const isSelected = actionStep === sugg;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          soundFx.playGentlePop();
                          setActionStep(sugg);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{sugg}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Action Input */}
              <div className="mb-6">
                <label htmlFor="custom-action" className="block text-xs font-bold text-slate-700 mb-1.5 font-gowun">
                  직접 내 말로 적고 싶다면:
                </label>
                <input
                  id="custom-action"
                  type="text"
                  maxLength={80}
                  value={actionStep}
                  onChange={(e) => setActionStep(e.target.value)}
                  placeholder="예: 밥 먹고 방에 들어가서 숙제 1장 먼저 끝내기"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Doll Encouragement */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 mb-6">
                <DollSvg dollId={selectedDoll.id} className="w-12 h-16 shrink-0" />
                <p className="text-xs text-emerald-950 leading-relaxed font-gowun">
                  "{selectedDoll.name}: 실천을 정한 것만으로도 이미 반은 성공했어! 실천을 끝마치면 상자에서 신나게 체크할 수 있어."
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Category: CANNOT CHANGE -> Letting Go & Breathing */}
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full">
                  내가 바꿀 수 없는 걱정
                </span>
                <h2 className="text-2xl font-bold text-amber-950 mt-2 font-gowun">
                  인형에게 맡기고 마음을 편안히 내려놓아요
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                  이 일은 네 탓이 아니에요. 내 손으로 바꿀 수 없는 일은 인형 상자에 쏙 넣고 잊어버려도 돼요.
                </p>
              </div>

              {/* Comforting Card */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 mb-6 text-center">
                <DollSvg dollId={selectedDoll.id} className="w-20 h-26 mx-auto mb-2" />
                <h4 className="text-base font-bold text-indigo-950 font-gowun">
                  "이제 이 걱정은 내가 밤새 꼬옥 안고 지켜줄게"
                </h4>
                <p className="text-xs text-indigo-800 mt-1">
                  너는 따뜻한 이불 속에서 푹 자고, 내일 찾아올 즐거운 일들을 생각하렴.
                </p>
              </div>

              {/* Interactive Calm Down Breathing Widget */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-900 mb-2 font-gowun">
                  <Wind className="w-4 h-4 text-amber-600" />
                  <span>마음 가라앉히기: 후- 하고 심호흡 해볼까요?</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">
                  단추를 누를 때마다 깊은 숨을 내쉬어 보세요. ({breatheCount}/3회 완료)
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      soundFx.playBreathingTone('exhale');
                      setBreatheCount((prev) => Math.min(3, prev + 1));
                    }}
                    className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    🍃 천천히 숨 내쉬기
                  </button>
                  {breatheCount >= 3 && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" /> 마음이 한결 편해졌어요!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Deposit Button to Box */}
          <div className="space-y-3">
            <button
              onClick={handleDepositToBox}
              className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 font-gowun transform active:scale-98"
            >
              <Sparkles className="w-5 h-5" />
              <span>걱정 인형 상자에 쏙 넣기!</span>
            </button>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <button
                onClick={() => {
                  soundFx.playGentlePop();
                  setStep(3);
                }}
                className="hover:text-slate-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>분류 다시 하기</span>
              </button>
              <span>🔒 오직 이 기기에만 보관돼요</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Deposited Success Screen */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 text-center animate-in zoom-in-95 duration-300">
          <div className="mb-4">
            <WorryBoxGraphic isOpen={isBoxOpen} isReceiving={isReceiving} className="w-48 h-40 mx-auto" />
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            상자에 안전하게 쏙 들어갔어요!
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 mt-3 font-gowun">
            오늘 밤은 걱정 없이 푹 자도 돼
          </h2>

          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            "{selectedDoll.name}" 친구가 상자 안에서 걱정을 든든하게 맡아주고 있어요.
            {category === 'can_change' ? (
              <span className="block mt-1 font-semibold text-emerald-700">
                정해둔 작은 실천: "{actionStep}"
              </span>
            ) : (
              <span className="block mt-1 text-indigo-700">
                바꿀 수 없는 걱정은 상자 속에 묻어두고 편히 쉬어요.
              </span>
            )}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                soundFx.playGentlePop();
                onGoToBox();
              }}
              className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all font-gowun"
            >
              내 걱정 인형 상자 열어보기
            </button>
            <button
              onClick={resetForm}
              className="py-3 px-6 rounded-2xl border border-amber-300 hover:bg-amber-50 text-amber-900 font-bold text-sm transition-all font-gowun"
            >
              다른 걱정도 털어놓기
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            기록은 컴퓨터나 휴대폰 안에만 안전하게 남아있고 인터넷으로 나가지 않아요.
          </div>
        </div>
      )}
    </div>
  );
};
