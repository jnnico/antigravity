import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ChokePattern } from "./ChokePattern";

export const Escena2: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene offset
  const sceneFrame = frame - 90; // Escena 2 starts at frame 90

  // Shot starts at sceneFrame 15
  const shotProgress = Math.min(1, Math.max(0, (sceneFrame - 15) / 100));

  // Entrances
  const textEntrance = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 15 },
  });
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
  const textY = interpolate(textEntrance, [0, 1], [-30, 0]);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-20 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Title Text */}
      <div
        className="text-center mt-6"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Controls Spread
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          Chokes alter the size and density of the shot pattern
        </p>
      </div>

      {/* Comparison Layout */}
      <div className="w-full max-w-4xl flex flex-col gap-6 my-auto">
        {/* Pattern 1: Wide Spread */}
        <div className="bg-stone-50 border border-stone-100 rounded-3xl p-4 flex items-center h-44 shadow-sm relative">
          <div className="absolute left-6 top-6 bg-stone-200 text-stone-700 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
            Wide Pattern (Open Choke)
          </div>
          <ChokePattern
            spreadWidth={110}
            progress={shotProgress}
            opacity={1}
            className="w-full h-full"
          />
        </div>

        {/* Pattern 2: Tight Spread */}
        <div className="bg-stone-50 border border-stone-100 rounded-3xl p-4 flex items-center h-44 shadow-sm relative">
          <div className="absolute left-6 top-6 bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
            Tight Pattern (Constricted Choke)
          </div>
          <ChokePattern
            spreadWidth={30}
            progress={shotProgress}
            opacity={1}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};
