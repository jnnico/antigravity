import React from "react";

// Modern flat SVG representing a shotgun silhouette
export const ShotgunSilhouette: React.FC<{ style?: React.CSSProperties; color?: string }> = ({
  style,
  color = "#5E6B5C",
}) => {
  return (
    <svg
      viewBox="0 0 800 200"
      width="100%"
      height="100%"
      style={{ display: "block", ...style }}
    >
      {/* Stock / Culata */}
      <path
        d="M 50,70 L 180,50 L 220,120 L 150,150 L 50,130 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Receiver / Recámara */}
      <rect x="220" y="75" width="140" height="45" rx="5" fill={color} />
      {/* Trigger / Gatillo */}
      <path
        d="M 230,120 C 230,140 260,140 260,120 L 255,120 C 255,130 240,130 240,120 Z"
        fill={color}
      />
      <path d="M 245,120 L 250,128 L 253,120 Z" fill={color} />
      {/* Forend / Guardamanos */}
      <rect x="355" y="80" width="180" height="35" rx="8" fill={color} opacity="0.9" />
      {/* Barrel / Cañón */}
      <rect x="360" y="82" width="410" height="20" fill={color} />
      {/* Muzzle Detail / Mira delantera */}
      <circle cx="765" cy="80" r="3" fill="#E28743" />
    </svg>
  );
};

// Flat representation of a gun barrel cross section (Choke Constriction)
export const ChokeConstrictionSvg: React.FC<{
  style?: React.CSSProperties;
  constriction: number; // 0 to 1
  label: string;
}> = ({ style, constriction, label }) => {
  // Radius of outer barrel = 70px
  // Radius of inner barrel = 50px - 15px * constriction
  const outerR = 70;
  const innerR = 50 - 15 * constriction;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-stone-100" style={style}>
      <svg viewBox="0 0 200 200" width="160" height="160">
        {/* Outer Steel Ring */}
        <circle cx="100" cy="100" r={outerR} fill="#5E6B5C" opacity="0.15" />
        {/* Steel Wall of Barrel */}
        <circle
          cx="100"
          cy="100"
          r={outerR}
          stroke="#5E6B5C"
          strokeWidth="12"
          fill="none"
        />
        {/* Constriction Ring (Actual Choke Insert) */}
        <circle
          cx="100"
          cy="100"
          r={innerR + 6}
          stroke="#E28743"
          strokeWidth="8"
          fill="none"
          opacity={constriction > 0 ? 0.9 : 0.1}
        />
        {/* Inner Space (Aperture) */}
        <circle cx="100" cy="100" r={innerR} fill="#F9F9F8" />
        {/* Dimensions or Text Inside */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fill="#2C3531"
          fontWeight="bold"
          fontSize="16"
          letterSpacing="1"
        >
          {label}
        </text>
      </svg>
      <div className="mt-4 text-center">
        <span className="text-sm font-semibold tracking-wider text-stone-500 uppercase">
          Constricción
        </span>
        <div className="text-lg font-bold text-stone-800">
          {(constriction * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};
