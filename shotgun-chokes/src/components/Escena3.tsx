import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ChokeConstrictionSvg } from "./ShotgunSvg";

export const Escena3: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 240; // Escena 3 starts at frame 240

  // We have 4 phases, each lasting 50 frames (approx 1.6s)
  // Phase 1: 0 - 50 -> Cylinder (0%)
  // Phase 2: 50 - 100 -> Improved Cylinder (25%)
  // Phase 3: 100 - 150 -> Modified (50%)
  // Phase 4: 150 - 240 -> Full (100%)
  
  const activePhase = Math.floor(sceneFrame / 50);
  const constrainedPhase = Math.min(3, Math.max(0, activePhase));

  const labels = [
    { name: "Cylinder", constriction: 0.0, desc: "No constriction. Wide & immediate spread." },
    { name: "Improved Cylinder", constriction: 0.25, desc: "Slight constriction. Medium-wide spread." },
    { name: "Modified", constriction: 0.5, desc: "Moderate constriction. Balanced range and density." },
    { name: "Full", constriction: 1.0, desc: "Maximum constriction. Highly concentrated density at long distance." },
  ];

  // Smooth interpolation for constriction size between transitions
  const currentConstriction = interpolate(
    sceneFrame,
    [0, 50, 100, 150],
    [0.0, 0.25, 0.5, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animation for the text description fade-in
  const textSpring = spring({
    frame: sceneFrame % 50,
    fps,
    config: { damping: 12 },
  });
  const textOpacity = interpolate(textSpring, [0, 1], [0.3, 1]);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-20 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Title Text */}
      <div className="text-center mt-6">
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Types of Chokes
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          Different constrictions for different tactical needs
        </p>
      </div>

      {/* Main Layout (Split screen) */}
      <div className="w-full max-w-4xl flex items-center justify-around my-auto gap-8">
        {/* Left Side: Choke Visual */}
        <div className="flex-1 flex justify-center">
          <ChokeConstrictionSvg
            constriction={currentConstriction}
            label={labels[constrainedPhase].name}
            style={{ width: "260px", transform: "scale(1.15)" }}
          />
        </div>

        {/* Right Side: Choke Info cards */}
        <div className="flex-1 flex flex-col gap-4">
          {labels.map((item, idx) => {
            const isActive = idx === constrainedPhase;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-amber-500 border-amber-600 text-white shadow-md translate-x-2"
                    : "bg-white border-stone-100 text-stone-700 opacity-40 scale-95"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black tracking-wide">
                    {item.name}
                  </span>
                  <span className="text-xs font-black uppercase bg-black/10 px-2.5 py-1 rounded-full">
                    {(item.constriction * 100).toFixed(0)}% constr.
                  </span>
                </div>
                {isActive && (
                  <p
                    className="text-sm font-medium mt-2 leading-relaxed opacity-90"
                    style={{ opacity: textOpacity }}
                  >
                    {item.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};
