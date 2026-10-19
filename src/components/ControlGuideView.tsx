import React from 'react';
import { Sparkles, ArrowRight, Shield, HeartHandshake } from 'lucide-react';
import { CONTROL_EXAMPLES } from '../data/controlGuide';
import { DOLL_CHARACTERS, DollSvg } from './WorryDolls';
import { soundFx } from '../utils/audio';

interface ControlGuideViewProps {
  onStartWorry: () => void;
}

export const ControlGuideView: React.FC<ControlGuideViewProps> = ({ onStartWorry }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Hero explanation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70 text-center">
        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          마음 돋보기
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 mt-2 font-gowun">
          '내가 바꿀 수 있는 것'과 '바꿀 수 없는 것'의 마법
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
          걱정이 생겼을 때, 내가 바꿀 수 있는 일인지 아닌지 먼저 나눠보면
          마음의 불필요한 무게가 절반으로 줄어든답니다.
        </p>
      </div>

      {/* Two Column Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: 내가 바꿀 수 있는 것 */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 border-2 border-emerald-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🌱</span>
              <div>
                <h3 className="text-lg font-bold text-emerald-950 font-gowun">
                  내가 바꿀 수 있는 것
                </h3>
                <span className="text-xs text-emerald-700 font-semibold">내 손안의 별 (작은 실천)</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              나의 노력, 나의 말 한마디, 나의 연습으로 변화를 만들 수 있는 일들이에요.
              이곳에는 <strong>작은 실천 한 가지</strong>를 정해 용기를 내요!
            </p>

            <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-emerald-200">
              <div className="text-xs font-bold text-emerald-900 mb-1">대표적인 예시들:</div>
              <div className="text-xs text-slate-700 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span><strong>나의 연습:</strong> 내일 발표를 위해 거울 보고 3번 소리 내어 읽기</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span><strong>나의 말과 행동:</strong> 친구에게 먼저 "아까 미안했어" 말 걸어보기</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span><strong>미리 챙기기:</strong> 수업 준비물과 숙제를 가방에 전날 밤 넣어두기</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span>
                  <span><strong>도움 요청:</strong> 혼자 해결하기 어려울 때 선생님께 솔직히 여쭤보기</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-emerald-100/70 text-xs text-emerald-900 font-semibold text-center font-gowun">
            "우리가 할 수 있는 아주 작은 한 걸음부터 시작해요!"
          </div>
        </div>

        {/* Right: 내가 바꿀 수 없는 것 */}
        <div className="bg-indigo-50/50 rounded-3xl p-6 border-2 border-indigo-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">☁️</span>
              <div>
                <h3 className="text-lg font-bold text-indigo-950 font-gowun">
                  내가 바꿀 수 없는 것
                </h3>
                <span className="text-xs text-indigo-700 font-semibold">바람과 날씨 (인형에게 맡기기)</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              내가 아무리 애쓰고 걱정해도 내 힘으로는 어쩔 수 없는 일들이에요.
              이런 걱정은 <strong>내 탓이 아니므로</strong> 상자에 맡기고 마음을 편안히 놓아주세요.
            </p>

            <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-indigo-200">
              <div className="text-xs font-bold text-indigo-900 mb-1">대표적인 예시들:</div>
              <div className="text-xs text-slate-700 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>자연과 날씨:</strong> 현장체험학습 날 비가 올지 눈이 올지</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>다른 사람의 생각:</strong> 친구의 기분이나 남들이 나를 어떻게 볼지</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>이미 지나간 과거:</strong> 어제 한 실수나 어쩔 수 없었던 일</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✔</span>
                  <span><strong>규칙과 일정:</strong> 학교 정해진 시험 날짜나 일정</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-indigo-100/70 text-xs text-indigo-900 font-semibold text-center font-gowun">
            "바꿀 수 없는 일은 짊어지지 말고, 인형 상자에 맡겨요."
          </div>
        </div>
      </div>

      {/* Real Situation Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/70">
        <h3 className="text-lg font-bold text-amber-950 font-gowun mb-4">
          초등학생 친구들의 생생한 상황으로 살펴보기
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {CONTROL_EXAMPLES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.category === 'can_change'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {item.category === 'can_change' ? '내가 바꿀 수 있어요' : '내가 바꿀 수 없어요'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.tag}</span>
                </div>
                <h4 className="font-bold text-slate-900 font-gowun text-sm mb-1">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            soundFx.playGentlePop();
            onStartWorry();
          }}
          className="py-3.5 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 font-gowun"
        >
          <Sparkles className="w-4 h-4" />
          <span>내 걱정도 함께 나눠보기</span>
        </button>
      </div>
    </div>
  );
};
