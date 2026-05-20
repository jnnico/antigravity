import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Escena6: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 1200; // Escena 6 starts at frame 1200

  // Title entrance
  const titleEntrance = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 15 },
  });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [-20, 0]);

  // Staggered animations for rows (4 rows)
  // Each row starts showing 15 frames after the previous one
  const getRowEntrance = (index: number) => {
    return spring({
      frame: sceneFrame - 15 - index * 15,
      fps,
      config: { damping: 14, mass: 0.8 },
    });
  };

  const rowEntrances = [getRowEntrance(0), getRowEntrance(1), getRowEntrance(2), getRowEntrance(3)];

  const rows = [
    { name: "Cylinder", spread: "Wide", range: "Short (< 20m)", style: "bg-stone-50 text-stone-800" },
    { name: "Improved Cylinder", spread: "Medium-Wide", range: "Short-Med (20m - 25m)", style: "bg-stone-50 text-stone-800" },
    { name: "Modified", spread: "Medium", range: "Medium (25m - 35m)", style: "bg-stone-50 text-stone-800" },
    { name: "Full", spread: "Tight", range: "Long (35m+)", style: "bg-amber-50 text-amber-900 border-l-4 border-l-amber-500" },
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-16 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Title */}
      <div
        className="text-center mt-4"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Quick Summary
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          A comparative blueprint for quick reference
        </p>
      </div>

      {/* Infographic Table */}
      <div className="w-full max-w-4xl bg-white border border-stone-100 rounded-3xl p-8 my-auto shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 text-stone-400 text-sm font-black uppercase tracking-wider">
              <th className="pb-4 pl-4 w-1/3">CHOKE TYPE</th>
              <th className="pb-4 w-1/3">PATTERN SPREAD</th>
              <th className="pb-4 pr-4 w-1/3">EFFECTIVE RANGE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const entrance = rowEntrances[idx];
              const rOpacity = interpolate(entrance, [0, 1], [0, 1]);
              const rTranslateX = interpolate(entrance, [0, 1], [-20, 0]);

              return (
                <tr
                  key={idx}
                  className={`border-b border-stone-100 font-bold transition-all duration-300 ${row.style}`}
                  style={{
                    opacity: rOpacity,
                    transform: `translateX(${rTranslateX}px)`,
                  }}
                >
                  <td className="py-5 pl-4 text-lg font-black">{row.name}</td>
                  <td className="py-5 text-md text-stone-600">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E28743]" />
                      {row.spread}
                    </span>
                  </td>
                  <td className="py-5 pr-4 text-md text-stone-600">{row.range}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Balance empty block */}
      <div className="h-6" />
    </div>
  );
};
