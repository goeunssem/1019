import React from 'react';
import { DollCharacter } from '../types/worry';

export const DOLL_CHARACTERS: DollCharacter[] = [
  {
    id: 'pogeun',
    name: '포근이',
    title: '포근포근 털실 인형',
    description: '따뜻한 털실 목도리를 두르고, 슬픈 마음을 꼭 안아주는 다정한 친구예요.',
    colorName: 'amber',
    bgLight: 'bg-amber-50 border-amber-200 text-amber-900',
    textColor: 'text-amber-800',
    quote: '무거운 걱정은 내가 꼭 안고 있을 테니, 넌 오늘 편히 쉬렴.',
    comfortMessage: '그랬구나... 마음이 많이 무겁고 속상했겠다. 포근이가 꼭 안아줄게.',
  },
  {
    id: 'star',
    name: '별이',
    title: '반짝반짝 별빛 인형',
    description: '반짝이는 별 모자를 쓰고, 어두운 밤 두려운 생각을 환하게 밝혀줘요.',
    colorName: 'indigo',
    bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    textColor: 'text-indigo-800',
    quote: '깜깜한 밤에도 별빛처럼 널 환하게 비춰줄게. 넌 혼자가 아니야.',
    comfortMessage: '불안하고 떨렸던 마음, 나한테 다 말해줘서 고마워. 별빛으로 비춰줄게!',
  },
  {
    id: 'sprout',
    name: '초록이',
    title: '새싹 희망 인형',
    description: '머리에 푸른 새싹을 품고, 작은 용기와 실천을 응원해 주는 친구예요.',
    colorName: 'emerald',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    textColor: 'text-emerald-800',
    quote: '작은 새싹처럼 우리 한 걸음씩 천천히 해보면 돼!',
    comfortMessage: '잘하고 싶은 마음이 커서 더 걱정되었던 거야. 우리 차근차근 해보자.',
  },
  {
    id: 'dalkom',
    name: '달콤이',
    title: '달콤 분홍 위로 인형',
    description: '달콤한 솜사탕처럼 달래주고, 언제나 네 편이 되어 칭찬해 주는 친구예요.',
    colorName: 'rose',
    bgLight: 'bg-rose-50 border-rose-200 text-rose-900',
    textColor: 'text-rose-800',
    quote: '세상에서 가장 소중한 건 바로 너야. 언제나 네 편이야!',
    comfortMessage: '속상했던 마음 다 알아. 달콤이가 상자 안에서 든든하게 지켜줄게.',
  },
];

interface DollSvgProps {
  dollId: string;
  className?: string;
  animate?: boolean;
}

export const DollSvg: React.FC<DollSvgProps> = ({ dollId, className = 'w-20 h-24', animate = false }) => {
  const animClass = animate ? 'animate-bounce duration-1000' : '';

  if (dollId === 'star') {
    return (
      <svg
        viewBox="0 0 100 130"
        className={`${className} ${animClass}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="별이 걱정 인형"
      >
        {/* Shadow */}
        <ellipse cx="50" cy="122" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
        {/* Legs */}
        <rect x="38" y="100" width="8" height="18" rx="4" fill="#3B82F6" />
        <rect x="54" y="100" width="8" height="18" rx="4" fill="#3B82F6" />
        <ellipse cx="42" cy="118" rx="5" ry="3" fill="#1E3A8A" />
        <ellipse cx="58" cy="118" rx="5" ry="3" fill="#1E3A8A" />
        {/* Body / Coat */}
        <path
          d="M32 60 Q50 56 68 60 L72 102 Q50 106 28 102 Z"
          fill="#4F46E5"
        />
        {/* Coat pattern */}
        <path d="M50 60 L50 103" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="50" cy="74" r="2.5" fill="#FBBF24" />
        <circle cx="50" cy="86" r="2.5" fill="#FBBF24" />
        {/* Arms */}
        <rect x="23" y="66" width="10" height="26" rx="5" transform="rotate(18 23 66)" fill="#4338CA" />
        <rect x="67" y="66" width="10" height="26" rx="5" transform="rotate(-18 67 66)" fill="#4338CA" />
        <circle cx="21" cy="90" r="4.5" fill="#FDE68A" />
        <circle cx="79" cy="90" r="4.5" fill="#FDE68A" />
        {/* Head */}
        <circle cx="50" cy="42" r="21" fill="#FDE68A" />
        {/* Cheeks */}
        <ellipse cx="40" cy="46" rx="3.5" ry="2" fill="#F87171" opacity="0.65" />
        <ellipse cx="60" cy="46" rx="3.5" ry="2" fill="#F87171" opacity="0.65" />
        {/* Eyes */}
        <circle cx="43" cy="40" r="2.2" fill="#1E293B" />
        <circle cx="57" cy="40" r="2.2" fill="#1E293B" />
        <circle cx="44" cy="39" r="0.8" fill="#FFFFFF" />
        <circle cx="58" cy="39" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M46 47 Q50 51 54 47" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />
        {/* Night Cap with Star */}
        <path d="M30 35 Q50 14 70 35 Q50 28 30 35 Z" fill="#312E81" />
        <path d="M50 20 L66 6 Q62 18 54 22 Z" fill="#3730A3" />
        {/* Golden Star ornament */}
        <polygon
          points="67,2 69,7 74,7 70,10 71,15 67,12 63,15 64,10 60,7 65,7"
          fill="#F59E0B"
        />
      </svg>
    );
  }

  if (dollId === 'sprout') {
    return (
      <svg
        viewBox="0 0 100 130"
        className={`${className} ${animClass}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="초록이 걱정 인형"
      >
        <ellipse cx="50" cy="122" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
        {/* Legs */}
        <rect x="38" y="100" width="8" height="18" rx="4" fill="#047857" />
        <rect x="54" y="100" width="8" height="18" rx="4" fill="#047857" />
        <ellipse cx="42" cy="118" rx="5" ry="3" fill="#064E3B" />
        <ellipse cx="58" cy="118" rx="5" ry="3" fill="#064E3B" />
        {/* Body / Overalls */}
        <path
          d="M32 60 Q50 57 68 60 L71 102 Q50 106 29 102 Z"
          fill="#10B981"
        />
        {/* Pocket */}
        <path d="M43 78 Q50 78 57 78 L56 89 Q50 93 44 89 Z" fill="#059669" />
        <path d="M47 81 L53 81" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
        {/* Arms holding heart */}
        <rect x="23" y="66" width="10" height="26" rx="5" transform="rotate(18 23 66)" fill="#059669" />
        <rect x="67" y="66" width="10" height="26" rx="5" transform="rotate(-18 67 66)" fill="#059669" />
        <circle cx="21" cy="90" r="4.5" fill="#FED7AA" />
        <circle cx="79" cy="90" r="4.5" fill="#FED7AA" />
        {/* Head */}
        <circle cx="50" cy="42" r="21" fill="#FED7AA" />
        {/* Cheeks */}
        <ellipse cx="40" cy="46" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
        <ellipse cx="60" cy="46" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
        {/* Eyes - smiling arcs */}
        <path d="M41 40 Q44 37 47 40" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M53 40 Q56 37 59 40" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        {/* Smile */}
        <path d="M46 47 Q50 52 54 47" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
        {/* Hair / Headband */}
        <path d="M30 35 Q50 24 70 35 Q50 31 30 35 Z" fill="#047857" />
        {/* Sprout on top */}
        <path d="M50 25 C50 15 42 12 39 15 C36 18 42 22 49 24" fill="#34D399" stroke="#059669" strokeWidth="1" />
        <path d="M50 25 C50 13 60 11 63 15 C66 19 58 23 51 24" fill="#10B981" stroke="#047857" strokeWidth="1" />
        <circle cx="50" cy="24" r="2.5" fill="#FBBF24" />
      </svg>
    );
  }

  if (dollId === 'dalkom') {
    return (
      <svg
        viewBox="0 0 100 130"
        className={`${className} ${animClass}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="달콤이 걱정 인형"
      >
        <ellipse cx="50" cy="122" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
        {/* Legs */}
        <rect x="38" y="100" width="8" height="18" rx="4" fill="#E11D48" />
        <rect x="54" y="100" width="8" height="18" rx="4" fill="#E11D48" />
        <ellipse cx="42" cy="118" rx="5" ry="3" fill="#9F1239" />
        <ellipse cx="58" cy="118" rx="5" ry="3" fill="#9F1239" />
        {/* Dress */}
        <path
          d="M32 60 Q50 56 68 60 L73 102 Q50 105 27 102 Z"
          fill="#FB7185"
        />
        {/* Polka dots */}
        <circle cx="42" cy="72" r="2" fill="#FFE4E6" />
        <circle cx="58" cy="74" r="2" fill="#FFE4E6" />
        <circle cx="49" cy="85" r="2.2" fill="#FFE4E6" />
        <circle cx="38" cy="94" r="1.8" fill="#FFE4E6" />
        <circle cx="62" cy="93" r="1.8" fill="#FFE4E6" />
        {/* Arms */}
        <rect x="23" y="66" width="10" height="26" rx="5" transform="rotate(18 23 66)" fill="#F43F5E" />
        <rect x="67" y="66" width="10" height="26" rx="5" transform="rotate(-18 67 66)" fill="#F43F5E" />
        <circle cx="21" cy="90" r="4.5" fill="#FFE4E6" />
        <circle cx="79" cy="90" r="4.5" fill="#FFE4E6" />
        {/* Head */}
        <circle cx="50" cy="42" r="21" fill="#FFE4E6" />
        {/* Cheeks */}
        <ellipse cx="39" cy="46" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
        <ellipse cx="61" cy="46" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6" />
        {/* Eyes */}
        <circle cx="43" cy="40" r="2.2" fill="#374151" />
        <circle cx="57" cy="40" r="2.2" fill="#374151" />
        <circle cx="44.2" cy="39" r="0.8" fill="#FFFFFF" />
        <circle cx="58.2" cy="39" r="0.8" fill="#FFFFFF" />
        {/* Smile */}
        <path d="M46 48 Q50 52 54 48" stroke="#BE123C" strokeWidth="1.8" strokeLinecap="round" />
        {/* Hair Bow */}
        <path
          d="M36 26 C30 20 28 32 38 31 Z"
          fill="#E11D48"
        />
        <path
          d="M64 26 C70 20 72 32 62 31 Z"
          fill="#E11D48"
        />
        <circle cx="50" cy="28" r="4" fill="#BE123C" />
      </svg>
    );
  }

  // Default: pogeun (포근이)
  return (
    <svg
      viewBox="0 0 100 130"
      className={`${className} ${animClass}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="포근이 걱정 인형"
    >
      <ellipse cx="50" cy="122" rx="28" ry="6" fill="#000000" fillOpacity="0.08" />
      {/* Legs */}
      <rect x="38" y="100" width="8" height="18" rx="4" fill="#B45309" />
      <rect x="54" y="100" width="8" height="18" rx="4" fill="#B45309" />
      <ellipse cx="42" cy="118" rx="5" ry="3" fill="#78350F" />
      <ellipse cx="58" cy="118" rx="5" ry="3" fill="#78350F" />
      {/* Body / Knitted Wool Sweater */}
      <path
        d="M31 60 Q50 56 69 60 L73 102 Q50 106 27 102 Z"
        fill="#F59E0B"
      />
      {/* Knit lines */}
      <path d="M37 72 Q50 75 63 72" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M36 82 Q50 85 64 82" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M38 92 Q50 95 62 92" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      {/* Scarf */}
      <path
        d="M32 54 Q50 63 68 54 Q72 58 68 62 Q50 70 32 62 Z"
        fill="#DC2626"
      />
      <rect x="55" y="60" width="8" height="18" rx="2" fill="#B91C1C" transform="rotate(10 55 60)" />
      {/* Arms */}
      <rect x="23" y="66" width="10" height="26" rx="5" transform="rotate(18 23 66)" fill="#D97706" />
      <rect x="67" y="66" width="10" height="26" rx="5" transform="rotate(-18 67 66)" fill="#D97706" />
      <circle cx="21" cy="90" r="4.5" fill="#FEF3C7" />
      <circle cx="79" cy="90" r="4.5" fill="#FEF3C7" />
      {/* Head */}
      <circle cx="50" cy="42" r="21" fill="#FEF3C7" />
      {/* Cheeks */}
      <ellipse cx="39" cy="46" rx="4" ry="2.2" fill="#F87171" opacity="0.65" />
      <ellipse cx="61" cy="46" rx="4" ry="2.2" fill="#F87171" opacity="0.65" />
      {/* Eyes */}
      <circle cx="43" cy="40" r="2.2" fill="#451A03" />
      <circle cx="57" cy="40" r="2.2" fill="#451A03" />
      <circle cx="44" cy="39" r="0.8" fill="#FFFFFF" />
      <circle cx="58" cy="39" r="0.8" fill="#FFFFFF" />
      {/* Nose and Smile */}
      <ellipse cx="50" cy="45" rx="2" ry="1.4" fill="#92400E" />
      <path d="M47 48 Q50 51 53 48" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />
      {/* Bear Ears */}
      <circle cx="34" cy="27" r="7" fill="#F59E0B" />
      <circle cx="34" cy="27" r="4" fill="#FDE68A" />
      <circle cx="66" cy="27" r="7" fill="#F59E0B" />
      <circle cx="66" cy="27" r="4" fill="#FDE68A" />
    </svg>
  );
};
