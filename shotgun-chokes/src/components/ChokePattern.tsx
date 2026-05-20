import React, { useMemo } from "react";

interface ChokePatternProps {
  spreadWidth: number; // Max vertical half-width at the target (e.g., 20 to 120)
  progress: number; // Dispersal progress from 0 to 1
  opacity: number;
  label?: string;
  className?: string;
}

// Generate deterministic coordinates for 100 pellets
const generatePellets = (count: number) => {
  const pellets = [];
  for (let i = 0; i < count; i++) {
    // Seeding deterministic pseudo-random numbers
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const seed2 = Math.sin(i * 78.233) * 43758.5453;
    const randR = Math.sqrt(seed1 - Math.floor(seed1)); // Concentrates pellets slightly in center
    const randTheta = (seed2 - Math.floor(seed2)) * 2 * Math.PI;
    
    pellets.push({ r: randR, theta: randTheta });
  }
  return pellets;
};

export const ChokePattern: React.FC<ChokePatternProps> = ({
  spreadWidth,
  progress,
  opacity,
  label,
  className = "",
}) => {
  const count = 70;
  const pellets = useMemo(() => generatePellets(count), [count]);

  const width = 800;
  const height = 150;
  const startX = 60;
  const startY = height / 2;
  const endX = startX + (width - startX) * progress;

  return (
    <div className={`relative w-full h-full flex flex-col justify-center ${className}`} style={{ opacity }}>
      {label && (
        <div className="absolute top-2 left-4 flex items-center gap-3">
          <span className="text-base font-bold text-stone-700 tracking-wide uppercase">
            {label}
          </span>
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ display: "block" }}
      >
        {/* Draw Spread Cone */}
        {progress > 0 && (
          <path
            d={`M ${startX} ${startY} 
                L ${endX} ${startY - spreadWidth * progress} 
                L ${endX} ${startY + spreadWidth * progress} 
                Z`}
            fill="#E28743"
            opacity={0.06 + 0.04 * (1 - progress)} // Thicker color near the barrel
          />
        )}

        {/* Outer boundaries of the cone */}
        {progress > 0 && (
          <>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={startY - spreadWidth * progress}
              stroke="#E28743"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={startY + spreadWidth * progress}
              stroke="#E28743"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          </>
        )}

        {/* Draw Barrel Tip */}
        <rect
          x={startX - 50}
          y={startY - 8}
          width="50"
          height="16"
          fill="#5E6B5C"
          rx="2"
        />

        {/* Draw Individual Pellets */}
        {progress > 0.02 &&
          pellets.map((pellet, i) => {
            // Pellets travel along the cone
            // X coordinate interpolates from startX to target endX
            const x = startX + (width - startX - 20) * progress * (0.8 + 0.2 * pellet.r);
            
            // Y coordinate spreads out proportional to its random R factor and the current progress
            const maxOffset = spreadWidth * progress * pellet.r;
            const y = startY + maxOffset * Math.sin(pellet.theta);

            // Scale opacity: pellets disappear or thin out over distance
            const pelletOpacity = Math.max(0, 1 - progress * 0.3);

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={2 + 1.5 * (1 - progress * 0.4)} // Slightly smaller as they go further
                fill="#E28743"
                opacity={pelletOpacity}
              />
            );
          })}
      </svg>
    </div>
  );
};
