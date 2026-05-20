import React from "react";

// Modern flat SVG representing a shotgun silhouette in 2D
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
      {/* Culata */}
      <path
        d="M 50,70 L 180,50 L 220,120 L 150,150 L 50,130 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Recámara */}
      <rect x="220" y="75" width="140" height="45" rx="5" fill={color} />
      {/* Gatillo */}
      <path
        d="M 230,120 C 230,140 260,140 260,120 L 255,120 C 255,130 240,130 240,120 Z"
        fill={color}
      />
      <path d="M 245,120 L 250,128 L 253,120 Z" fill={color} />
      {/* Guardamanos */}
      <rect x="355" y="80" width="180" height="35" rx="8" fill={color} opacity="0.9" />
      {/* Cañón */}
      <rect x="360" y="82" width="410" height="20" fill={color} />
      {/* Mira delantera */}
      <circle cx="765" cy="80" r="3" fill="#E28743" />
    </svg>
  );
};

// Beautiful 3/4 perspective muzzle drawing inspired by user images
// Shows the outer barrel, the inner choke sleeve, and its notches
export const PerspectiveBarrelSvg: React.FC<{
  style?: React.CSSProperties;
  chokeSlideProgress?: number; // 0 (hidden) to 1 (fully inserted)
  constrictionSize?: number;   // 0 (cylinder) to 1 (full choke)
}> = ({ style, chokeSlideProgress = 1, constrictionSize = 0 }) => {
  // Inner diameter of choke tube varies by constriction
  const innerRadius = 55 - 15 * constrictionSize;
  const outerChokeRadius = 60;

  // Animation of choke sliding into the barrel (translate on X/Y axis in 3D perspective)
  const slideOffset = (1 - chokeSlideProgress) * 160;

  return (
    <svg
      viewBox="0 0 400 300"
      width="100%"
      height="100%"
      style={{ display: "block", ...style }}
    >
      {/* Ambient shadow underneath */}
      <ellipse cx="200" cy="240" rx="140" ry="15" fill="#2C3531" opacity="0.08" />

      {/* Perspective Shotgun Body in background (simplified silhouette) */}
      <g opacity="0.35">
        <path d="M 80,180 L 120,130 L 125,150 L 95,190 Z" fill="#5E6B5C" />
        {/* Forend (Guardamanos) */}
        <path d="M 120,165 L 180,140 L 195,160 L 135,190 Z" fill="#8C7D70" />
      </g>

      {/* Main Barrel (Cañón) extending forward in perspective */}
      <path
        d="M 100,160 L 250,115 L 285,155 L 115,200 Z"
        fill="url(#barrelMetalGrad)"
      />
      {/* Top Sight Rib (Banda ventilada en perspectiva) */}
      <path
        d="M 98,157 L 248,112 L 250,114 L 100,159 Z"
        fill="#2C3531"
        opacity="0.6"
      />

      {/* Muzzle Flat Face / Corte frontal del cañón */}
      {/* Outer steel edge */}
      <ellipse cx="267" cy="135" rx="35" ry="20" fill="#2C3531" />
      {/* Core barrel hole (where choke goes) */}
      <ellipse cx="267" cy="135" rx="30" ry="16" fill="#1C211F" />

      {/* Sliding Choke Tube (El tubo intercambiable) */}
      {chokeSlideProgress > 0.01 && (
        <g style={{ transform: `translate(${slideOffset}px, ${-slideOffset * 0.3}px)` }}>
          {/* Shadow of sliding tube if not fully inserted */}
          {chokeSlideProgress < 0.99 && (
            <ellipse
              cx={267 + 2}
              cy={135 + 2}
              rx={outerChokeRadius * 0.45}
              ry={outerChokeRadius * 0.23}
              fill="#000"
              opacity="0.2"
            />
          )}

          {/* Body of the Choke Tube (visible extension when sliding in) */}
          {chokeSlideProgress < 0.95 && (
            <path
              d={`M ${267 - outerChokeRadius * 0.4} ${135 - outerChokeRadius * 0.22}
                  L ${267 - outerChokeRadius * 0.4 + 60} ${135 - outerChokeRadius * 0.22 - 15}
                  L ${267 + outerChokeRadius * 0.4 + 60} ${135 + outerChokeRadius * 0.22 - 15}
                  L ${267 + outerChokeRadius * 0.4} ${135 + outerChokeRadius * 0.22}
                  Z`}
              fill="url(#chokeMetalGrad)"
              opacity="0.9"
            />
          )}

          {/* Front face of the Choke Tube */}
          <ellipse
            cx={267}
            cy={135}
            rx={outerChokeRadius * 0.46}
            ry={outerChokeRadius * 0.24}
            fill="#8F9491"
            stroke="#2C3531"
            strokeWidth="1.5"
          />

          {/* Inner ring showing constriction opening */}
          <ellipse
            cx={267}
            cy={135}
            rx={innerRadius * 0.45}
            ry={innerRadius * 0.22}
            fill="#1E2321"
            stroke="#E28743"
            strokeWidth={constrictionSize > 0 ? "2" : "1"}
          />

          {/* Choke Notches (Las muescas de apriete del choke, inspiradas en las imágenes) */}
          {/* Top Notch */}
          <path
            d="M 264,115 L 270,115 L 269,119 L 265,119 Z"
            fill="#2C3531"
          />
          {/* Bottom Notch */}
          <path
            d="M 264,155 L 270,155 L 269,151 L 265,151 Z"
            fill="#2C3531"
          />
        </g>
      )}

      {/* Gradients */}
      <defs>
        <linearGradient id="barrelMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A524D" />
          <stop offset="50%" stopColor="#737D76" />
          <stop offset="100%" stopColor="#353D39" />
        </linearGradient>
        <linearGradient id="chokeMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8AEAB" />
          <stop offset="50%" stopColor="#D4DAD7" />
          <stop offset="100%" stopColor="#7E8481" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Flat representation of a gun barrel cross section (Choke Constriction)
export const ChokeConstrictionSvg: React.FC<{
  style?: React.CSSProperties;
  constriction: number; // 0 to 1
  label: string;
}> = ({ style, constriction, label }) => {
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
          fontSize="15"
          letterSpacing="0.5"
        >
          {label}
        </text>
      </svg>
      <div className="mt-4 text-center">
        <span className="text-xs font-bold tracking-wider text-stone-400 uppercase">
          Constricción
        </span>
        <div className="text-lg font-extrabold text-stone-800">
          {(constriction * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};
