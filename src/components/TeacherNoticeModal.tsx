import React from 'react';
import { Heart, MessageCircle, Phone, X, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TeacherNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherNoticeModal: React.FC<TeacherNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-amber-100/80 px-6 py-4 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
              💛
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950 font-gowun">
                많이 힘들 땐 혼자 고민하지 마세요
              </h3>
              <p className="text-xs text-amber-800">선생님과 어른들은 언제나 너를 도울 준비가 되어 있단다</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onClose();
            }}
            className="w-8 h-8 rounded-lg hover:bg-amber-200/60 flex items-center justify-center text-amber-900 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed text-slate-800">
              <p className="font-semibold text-amber-900 mb-1">
                너의 걱정과 마음은 아주 소중해요
              </p>
              친구나 가족, 성적 문제 때문에 마음이 너무 답답하거나 눈물이 날 때는
              담임 선생님이나 상담 선생님께 털어놓아 보세요. 선생님은 비밀을 지켜주고
              함께 좋은 방법을 찾아주실 거예요.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-slate-500">
              <MessageCircle className="w-4 h-4 text-amber-600" />
              선생님께 말 꺼내기가 쑥스러울 때는 이렇게 해봐요
            </h4>
            <ul className="text-xs space-y-1.5 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">1.</span>
                <span>작은 쪽지에 <strong className="text-slate-900">"선생님, 드릴 말씀이 있어요"</strong>라고 적어 쉬는 시간에 조용히 건네기</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">2.</span>
                <span>방과 후에 교실에 남아 선생님께 <strong className="text-slate-900">"잠깐 이야기해도 될까요?"</strong> 여쭤보기</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">3.</span>
                <span>학교 <strong className="text-slate-900">Wee 클래스(상담실)</strong> 선생님을 찾아가서 편안하게 이야기 나누기</span>
              </li>
            </ul>
          </div>

          {/* External Support Numbers */}
          <div className="border-t border-slate-100 pt-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <Phone className="w-4 h-4 text-indigo-600" />
              언제든 무료로 고민을 들어주는 따뜻한 전화
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900">청소년 전화 1388</div>
                <div className="text-[11px] text-slate-500">24시간 무료 / 전화 & 문자 상담 가능</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900">학교폭력 상담 117</div>
                <div className="text-[11px] text-slate-500">친구나 학교 고민 24시간 도우미</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>이 앱에 적은 걱정은 서버에 전송되지 않고 오직 이 기기에만 보관돼요.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              soundFx.playGentlePop();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-sm"
          >
            네, 기억할게요!
          </button>
        </div>
      </div>
    </div>
  );
};
