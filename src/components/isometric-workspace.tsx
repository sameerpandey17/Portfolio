import React from 'react';

export const IsometricWorkspace: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`isometric-workspace-container ${className}`}>
      <svg
        viewBox="0 0 460 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="isometric-workspace-svg"
        aria-label="Isometric workspace illustration"
      >
        <defs>
          {/* Halftone dot pattern */}
          <pattern id="iso-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#1E3A8A" opacity="0.22" />
          </pattern>
        </defs>

        {/* Floor Grid / Shadow Base */}
        <polygon points="230,340 420,230 230,120 40,230" fill="url(#iso-dots)" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

        {/* Desk Shadow */}
        <polygon points="230,315 390,225 230,140 70,230" fill="#1E3A8A" opacity="0.08" />

        {/* Desk Structure */}
        {/* Front Left Leg */}
        <line x1="85" y1="230" x2="85" y2="305" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
        {/* Front Right Leg */}
        <line x1="375" y1="225" x2="375" y2="300" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
        {/* Center/Back Legs */}
        <line x1="230" y1="315" x2="230" y2="340" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <line x1="230" y1="140" x2="230" y2="215" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* Stretcher Bar */}
        <line x1="85" y1="285" x2="230" y2="320" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
        <line x1="230" y1="320" x2="375" y2="280" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />

        {/* Desk Slab (Thick top) */}
        {/* Underside */}
        <polygon points="85,238 230,323 375,238 375,228 230,313 85,228" fill="#E2D9CA" stroke="#1E3A8A" strokeWidth="2.5" />
        {/* Top Face */}
        <polygon points="230,135 375,225 230,310 85,220" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="3" />
        {/* Desk Texture Inlay */}
        <polygon points="230,150 355,225 230,295 105,220" fill="url(#iso-dots)" opacity="0.5" />

        {/* Laptop (Centered at 3/4 angle) */}
        {/* Laptop Base */}
        <polygon points="230,230 280,260 220,295 170,265" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2.5" />
        {/* Trackpad */}
        <polygon points="225,268 245,280 235,288 215,276" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="1.5" />
        {/* Keyboard area */}
        <polygon points="226,242 265,264 245,276 206,254" fill="#1E3A8A" opacity="0.15" stroke="#1E3A8A" strokeWidth="1" />
        
        {/* Laptop Screen (Open lid facing viewer) */}
        <polygon points="230,230 280,260 280,185 230,155" fill="#1E3A8A" stroke="#1E3A8A" strokeWidth="2.5" />
        {/* Screen Bezel Interior */}
        <polygon points="234,226 276,252 276,192 234,166" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="1.5" />
        {/* Code lines on Screen */}
        <line x1="240" y1="180" x2="265" y2="195" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        <line x1="244" y1="192" x2="270" y2="207" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" />
        <line x1="240" y1="204" x2="262" y2="217" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" />
        <line x1="248" y1="216" x2="272" y2="230" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

        {/* Potted Plant (Left desk corner) */}
        {/* Pot Shadow */}
        <ellipse cx="130" cy="205" rx="14" ry="7" fill="#1E3A8A" opacity="0.12" />
        {/* Pot Body */}
        <polygon points="120,195 140,195 136,215 124,215" fill="#E5484D" stroke="#1E3A8A" strokeWidth="2" />
        <ellipse cx="130" cy="195" rx="10" ry="4" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="1.5" />
        {/* Plant Stem & Leaves */}
        <path d="M 130 195 Q 125 175 118 165" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 118 165 Q 112 172 122 178 Z" fill="#1E3A8A" />
        <path d="M 130 190 Q 138 178 144 170" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 144 170 Q 148 178 138 182 Z" fill="#1E3A8A" />
        <path d="M 130 185 Q 128 160 132 152" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 132 152 Q 138 158 131 164 Z" fill="#E5484D" />

        {/* Ceramic Coffee Mug (Right desk corner) */}
        <ellipse cx="310" cy="255" rx="10" ry="5" fill="#1E3A8A" opacity="0.12" />
        <polygon points="302,238 318,238 316,254 304,254" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="2" />
        <ellipse cx="310" cy="238" rx="8" ry="3.5" fill="#1E3A8A" opacity="0.8" />
        {/* Mug Handle */}
        <path d="M 318 241 C 324 241, 324 250, 317 251" stroke="#1E3A8A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Steam curl */}
        <path d="M 309 232 Q 307 222 312 214" stroke="#1E3A8A" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" fill="none" opacity="0.6" />

        {/* Desk Viewfinder Corner Bracket Marks */}
        <path d="M 65 210 L 65 240 L 95 240" stroke="#1E3A8A" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M 395 210 L 395 240 L 365 240" stroke="#1E3A8A" strokeWidth="1.5" fill="none" opacity="0.5" />
        <line x1="230" y1="115" x2="230" y2="130" stroke="#E5484D" strokeWidth="2" strokeLinecap="round" />
        <text x="230" y="108" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="700" letterSpacing="0.1em" fontFamily="Inter Tight, sans-serif">
          STUDIO / 02
        </text>
      </svg>
    </div>
  );
};
