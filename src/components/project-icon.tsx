import React from 'react';

interface ProjectIconProps {
  type: 'aivoa' | 'visionlink' | 'calorupee' | 'nutrisync';
  className?: string;
}

export const ProjectIcon: React.FC<ProjectIconProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'aivoa':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`project-isometric-icon ${className}`}
          aria-label="AIVOA QMS Deviation Copilot Shield Icon"
        >
          {/* Outer Isometric Shield / Terminal Tile */}
          <polygon points="32,6 56,16 56,38 32,54 8,38 8,16" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="32,54 56,38 56,44 32,60 8,44 8,38" fill="#E2D9CA" stroke="#1E3A8A" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Inner Accent Crest */}
          <polygon points="32,13 48,20 48,35 32,46 16,35 16,20" fill="none" stroke="#E5484D" strokeWidth="1.5" strokeLinejoin="round" />
          {/* LangGraph Node Cluster */}
          <circle cx="32" cy="22" r="3" fill="#E5484D" />
          <circle cx="23" cy="30" r="2.2" fill="#1E3A8A" />
          <circle cx="41" cy="30" r="2.2" fill="#1E3A8A" />
          <circle cx="32" cy="38" r="2.5" fill="#1E3A8A" />
          {/* Directed Graph Edges */}
          <line x1="32" y1="25" x2="23" y2="28" stroke="#1E3A8A" strokeWidth="1.2" />
          <line x1="32" y1="25" x2="41" y2="28" stroke="#1E3A8A" strokeWidth="1.2" />
          <line x1="23" y1="32" x2="32" y2="36" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="1 1" />
          <line x1="41" y1="32" x2="32" y2="36" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="1 1" />
          {/* Checkmark verification badge */}
          <circle cx="48" cy="14" r="5" fill="#1E3A8A" />
          <polyline points="46,14 47.5,15.5 50.5,12.5" stroke="#F0E9DD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'visionlink':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`project-isometric-icon ${className}`}
          aria-label="VisionLink Face Mesh HUD Icon"
        >
          {/* Outer Isometric diamond tile */}
          <polygon points="32,6 58,21 32,36 6,21" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="2" />
          <polygon points="32,36 58,21 58,28 32,43 6,28 6,21" fill="#E2D9CA" stroke="#1E3A8A" strokeWidth="1.5" />
          {/* Face mesh node lines */}
          <circle cx="32" cy="18" r="2" fill="#E5484D" />
          <circle cx="23" cy="22" r="1.5" fill="#1E3A8A" />
          <circle cx="41" cy="22" r="1.5" fill="#1E3A8A" />
          <circle cx="28" cy="27" r="1.5" fill="#1E3A8A" />
          <circle cx="36" cy="27" r="1.5" fill="#1E3A8A" />
          <circle cx="32" cy="31" r="1.8" fill="#E5484D" />
          {/* Mesh connecting wires */}
          <line x1="32" y1="18" x2="23" y2="22" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="1 1" />
          <line x1="32" y1="18" x2="41" y2="22" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="1 1" />
          <line x1="23" y1="22" x2="28" y2="27" stroke="#1E3A8A" strokeWidth="1" />
          <line x1="41" y1="22" x2="36" y2="27" stroke="#1E3A8A" strokeWidth="1" />
          <line x1="28" y1="27" x2="32" y2="31" stroke="#1E3A8A" strokeWidth="1" />
          <line x1="36" y1="27" x2="32" y2="31" stroke="#1E3A8A" strokeWidth="1" />
          {/* Floating emoji HUD target circle */}
          <circle cx="46" cy="14" r="5" fill="#1E3A8A" />
          <path d="M 44 14 Q 46 16 48 14" stroke="#F0E9DD" strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="44.5" cy="13" r="0.6" fill="#F0E9DD" />
          <circle cx="47.5" cy="13" r="0.6" fill="#F0E9DD" />
        </svg>
      );

    case 'calorupee':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`project-isometric-icon ${className}`}
          aria-label="CaloRupee Plate and Currency Icon"
        >
          {/* Isometric plate tile */}
          <ellipse cx="32" cy="24" rx="24" ry="13" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="2" />
          <ellipse cx="32" cy="27" rx="24" ry="13" fill="#E2D9CA" stroke="#1E3A8A" strokeWidth="1.5" opacity="0.6" />
          {/* Inner plate rim */}
          <ellipse cx="32" cy="24" rx="16" ry="8.5" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Nutritional quadrants */}
          <line x1="16" y1="24" x2="48" y2="24" stroke="#1E3A8A" strokeWidth="1" opacity="0.4" />
          <line x1="32" y1="15.5" x2="32" y2="32.5" stroke="#1E3A8A" strokeWidth="1" opacity="0.4" />
          {/* Macro indicators */}
          <circle cx="26" cy="21" r="2.5" fill="#E5484D" />
          <circle cx="38" cy="21" r="2" fill="#1E3A8A" />
          <circle cx="32" cy="27" r="2" fill="#1E3A8A" opacity="0.6" />
          {/* Isometric Rupee Coin Badge */}
          <polygon points="46,32 58,38 46,44 34,38" fill="#1E3A8A" stroke="#1E3A8A" strokeWidth="1.5" />
          <polygon points="46,44 58,38 58,41 46,47 34,41 34,38" fill="#0F172A" />
          {/* Rupee symbol on coin */}
          <text x="46" y="40" fill="#F0E9DD" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            ₹
          </text>
        </svg>
      );

    case 'nutrisync':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`project-isometric-icon ${className}`}
          aria-label="NutriSync RL Graph Icon"
        >
          {/* Isometric base grid */}
          <polygon points="32,8 56,22 32,36 8,22" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="2" />
          <polygon points="32,36 56,22 56,26 32,40 8,26 8,22" fill="#E2D9CA" stroke="#1E3A8A" strokeWidth="1.5" />
          {/* RL State Branching Graph */}
          {/* Root Agent Node */}
          <polygon points="32,14 36,16 32,18 28,16" fill="#E5484D" stroke="#1E3A8A" strokeWidth="1" />
          {/* Left Decision Path */}
          <line x1="32" y1="18" x2="22" y2="24" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="22" cy="24" r="2.2" fill="#1E3A8A" />
          <line x1="22" y1="24" x2="16" y2="30" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="1 1" />
          <circle cx="16" cy="30" r="1.8" fill="#F0E9DD" stroke="#1E3A8A" strokeWidth="1.2" />
          {/* Right Decision Path (Optimal policy reward) */}
          <line x1="32" y1="18" x2="42" y2="24" stroke="#E5484D" strokeWidth="1.8" />
          <circle cx="42" cy="24" r="2.5" fill="#E5484D" />
          <line x1="42" y1="24" x2="48" y2="30" stroke="#E5484D" strokeWidth="1.5" />
          <circle cx="48" cy="30" r="2.5" fill="#1E3A8A" stroke="#E5484D" strokeWidth="1" />
          {/* Reward Flag */}
          <path d="M 48 30 L 48 23 L 53 25 L 48 27" fill="#E5484D" stroke="#1E3A8A" strokeWidth="0.8" />
        </svg>
      );
  }
};
