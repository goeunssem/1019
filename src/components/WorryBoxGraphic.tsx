import React from 'react';

interface WorryBoxGraphicProps {
  isOpen?: boolean;
  isReceiving?: boolean;
  itemCount?: number;
  onClick?: () => void;
  className?: string;
}

export const WorryBoxGraphic: React.FC<WorryBoxGraphicProps> = ({
  isOpen = false,
  isReceiving = false,
  itemCount = 0,
  onClick,
  className = 'w-64 h-52',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${
        onClick ? 'cursor-pointer group transform transition hover:scale-[1.02]' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 240 190"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="120" cy="180" rx="90" ry="10" fill="#000000" fillOpacity="0.1" />

        {/* Box Base (Wooden Body) */}
        <path
          d="M30 90 L210 90 L195 170 Q120 178 45 170 Z"
          fill="#854D0E"
        />
        {/* Front wood grain planks */}
        <path
          d="M36 94 L204 94 L198 126 Q120 130 42 126 Z"
          fill="#A16207"
        />
        <path
          d="M42 128 Q120 132 198 128 L193 166 Q120 172 47 166 Z"
          fill="#92400E"
        />

        {/* Decorative corner metal straps */}
        <path d="M40 94 L50 94 L48 167 L38 164 Z" fill="#CA8A04" opacity="0.85" />
        <path d="M200 94 L190 94 L192 167 L202 164 Z" fill="#CA8A04" opacity="0.85" />
        <circle cx="44" cy="104" r="2" fill="#451A03" />
        <circle cx="43" cy="155" r="2" fill="#451A03" />
        <circle cx="196" cy="104" r="2" fill="#451A03" />
        <circle cx="197" cy="155" r="2" fill="#451A03" />

        {/* Box Interior (Visible if open) */}
        {isOpen ? (
          <g>
            {/* Interior back & depth */}
            <path
              d="M35 88 Q120 78 205 88 L198 122 Q120 126 42 122 Z"
              fill="#582C09"
            />
            {/* Warm golden glow from inside */}
            <ellipse cx="120" cy="98" rx="60" ry="20" fill="#FDE047" fillOpacity="0.45" />

            {/* Folded paper letters inside */}
            <rect x="75" y="96" width="35" height="20" rx="3" fill="#FFFBEB" stroke="#FDE68A" transform="rotate(-6 75 96)" />
            <rect x="125" y="94" width="38" height="22" rx="3" fill="#FEF2F2" stroke="#FECDD3" transform="rotate(8 125 94)" />
            <rect x="98" y="100" width="40" height="22" rx="3" fill="#ECFDF5" stroke="#A7F3D0" transform="rotate(2 98 100)" />

            {/* Lid open up */}
            <path
              d="M20 54 Q120 32 220 54 L212 88 Q120 72 28 88 Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="2"
            />
            <path
              d="M24 58 Q120 38 216 58 L210 74 Q120 56 30 74 Z"
              fill="#D97706"
            />
            {/* Hinge */}
            <rect x="60" y="80" width="16" height="10" rx="2" fill="#EAB308" />
            <rect x="164" y="80" width="16" height="10" rx="2" fill="#EAB308" />
          </g>
        ) : (
          <g>
            {/* Lid closed down */}
            <path
              d="M20 78 Q120 66 220 78 L214 98 Q120 90 26 98 Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="2"
            />
            <path
              d="M26 80 Q120 70 214 80 L210 94 Q120 86 30 94 Z"
              fill="#D97706"
            />
            {/* Metal handle / trim on lid */}
            <path
              d="M90 75 Q120 62 150 75"
              stroke="#EAB308"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* Lock Latch */}
        <g transform="translate(110, 86)">
          <rect x="0" y="0" width="20" height="24" rx="4" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="3" fill="#713F12" />
          <path d="M10 12 L10 18" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Label plate on box: '걱정 인형 상자' */}
        <g transform="translate(65, 134)">
          <rect x="0" y="0" width="110" height="24" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <text
            x="55"
            y="16"
            fill="#78350F"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Gowun Dodum, sans-serif"
          >
            걱정 인형 보관함
          </text>
        </g>

        {/* Receiving Letter Animation */}
        {isReceiving && (
          <g className="animate-bounce">
            <rect
              x="95"
              y="20"
              width="50"
              height="36"
              rx="4"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <path d="M97 22 L120 38 L143 22" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            <circle cx="120" cy="38" r="4" fill="#EF4444" />
          </g>
        )}
      </svg>

      {/* Item badge count */}
      {itemCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {itemCount}개의 안심
        </div>
      )}
    </div>
  );
};
