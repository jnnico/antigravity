import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Escena5: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 900; // Escena 5 starts at frame 900

  // Animation timeline within scene
  const textEntrance = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 15 },
  });
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Distance scale line animation
  const scaleEntrance = spring({
    frame: sceneFrame - 15,
    fps,
    config: { damping: 12 },
  });
  const scaleWidth = interpolate(scaleEntrance, [0, 1], [0, 100]); // Percentage

  // We show 2 representing curves: Cylinder (Wide) and Full (Tight)
  // Animate the growth of the curves over 150 frames
  const curveProgress = Math.min(1, Math.max(0, (sceneFrame - 25) / 120));

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-16 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Title */}
      <div
        className="text-center mt-4"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Effective Distance
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          Chokes maintain pattern density over longer ranges
        </p>
      </div>

      {/* Main Diagram */}
      <div className="w-full max-w-4xl bg-white border border-stone-100 rounded-3xl p-8 my-auto shadow-sm relative flex flex-col justify-center h-80 overflow-hidden">
        
        {/* Draw Custom Graph */}
        <svg viewBox="0 0 800 200" className="w-full h-full">
          {/* Grid lines */}
          <line x1="100" y1="20" x2="100" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="250" y1="20" x2="250" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="400" y1="20" x2="400" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="550" y1="20" x2="550" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="700" y1="20" x2="700" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />

          {/* Left shotgun barrel source */}
          <rect x="0" y="75" width="40" height="20" fill="#5E6B5C" rx="2" />

          {/* Cylinder Curve (Wide Spread - fades out early) */}
          {curveProgress > 0 && (
            <>
              {/* Path of Cylinder Spread */}
              <path
                d={`M 40 85 
                    Q 250 ${85 - 120 * curveProgress} 550 ${85 - 200 * curveProgress}`}
                fill="none"
                stroke="#5E6B5C"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                opacity={interpolate(curveProgress, [0, 0.5, 1], [0.8, 0.4, 0.15])}
              />
              <path
                d={`M 40 85 
                    Q 250 ${85 + 120 * curveProgress} 550 ${85 + 200 * curveProgress}`}
                fill="none"
                stroke="#5E6B5C"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                opacity={interpolate(curveProgress, [0, 0.5, 1], [0.8, 0.4, 0.15])}
              />
            </>
          )}

          {/* Full Choke Curve (Tight Spread - keeps density long) */}
          {curveProgress > 0 && (
            <>
              {/* Path of Full Spread */}
              <path
                d={`M 40 85 
                    Q 250 ${85 - 35 * curveProgress} 700 ${85 - 75 * curveProgress}`}
                fill="none"
                stroke="#E28743"
                strokeWidth="4"
                opacity="0.95"
              />
              <path
                d={`M 40 85 
                    Q 250 ${85 + 35 * curveProgress} 700 ${85 + 75 * curveProgress}`}
                fill="none"
                stroke="#E28743"
                strokeWidth="4"
                opacity="0.95"
              />
            </>
          )}

          {/* Density Heatmap circles */}
          {/* Cylinder pattern fading early */}
          <g opacity={interpolate(curveProgress, [0.3, 0.8], [0.1, 0.8])}>
            <circle cx="250" cy="85" r="30" fill="#5E6B5C" opacity="0.1" />
            <circle cx="250" cy="85" r="30" stroke="#5E6B5C" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.4" />
            <text x="250" y="125" textAnchor="middle" fontSize="12" fontWeight="black" fill="#5E6B5C" opacity="0.8">CYLINDER SPREAD</text>
          </g>

          {/* Full pattern holding long */}
          <g opacity={interpolate(curveProgress, [0.6, 1], [0, 0.9])}>
            <circle cx="550" cy="85" r="16" fill="#E28743" opacity="0.2" />
            <circle cx="550" cy="85" r="16" stroke="#E28743" strokeWidth="2" fill="none" opacity="0.8" />
            <text x="550" y="125" textAnchor="middle" fontSize="12" fontWeight="black" fill="#E28743">FULL DENSITY</text>
          </g>

        </svg>

        {/* Distance Ruler at the bottom */}
        <div className="mt-4 border-t border-stone-200 pt-4 flex justify-between text-sm font-black text-stone-500 tracking-wider relative">
          <div className="absolute top-0 left-0 bg-amber-500 h-[2px]" style={{ width: `${scaleWidth}%` }} />
          <span>0 METERS</span>
          <span>15m (Short)</span>
          <span>30m (Medium)</span>
          <span>45m (Long)</span>
          <span>60m (Max)</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm font-semibold text-stone-500 uppercase tracking-widest bg-stone-100 px-6 py-2.5 rounded-full shadow-sm">
        Closed chokes keep pellets together at double the distance
      </div>
    </div>
  );
};
