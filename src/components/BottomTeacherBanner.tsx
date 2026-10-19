import React, { useState } from 'react';
import { HeartHandshake, ChevronRight } from 'lucide-react';
import { TeacherNoticeModal } from './TeacherNoticeModal';
import { soundFx } from '../utils/audio';

export const BottomTeacherBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    soundFx.playGentlePop();
    setIsModalOpen(true);
  };

  return (
    <>
      <footer
        className="fixed bottom-0 left-0 right-0 z-40 bg-amber-50/95 backdrop-blur-md border-t border-amber-200/80 shadow-md py-2.5 px-4"
        role="region"
        aria-label="선생님 상담 안내"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-200/70 text-amber-800 shrink-0">
              <HeartHandshake className="h-4 w-4" />
            </span>
            <p className="text-xs sm:text-sm font-medium text-amber-950 truncate font-gowun">
              많이 힘들면 선생님께 꼭 이야기해요
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg border border-amber-300/60 transition-colors whitespace-nowrap shrink-0"
            title="선생님께 말하는 방법 보기"
          >
            <span>상담 안내</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      <TeacherNoticeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
