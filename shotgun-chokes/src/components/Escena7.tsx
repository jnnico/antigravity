import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Escena7: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 1500; // Escena 7 starts at frame 1500

  // Text entrance spring animation
  const textSpring = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 16, mass: 1 },
  });

  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textScale = interpolate(textSpring, [0, 1], [0.95, 1]);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center items-center py-20 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      <div
        className="text-center max-w-2xl px-6 flex flex-col items-center justify-center gap-6"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
        }}
      >
        {/* Modern decorative visual element */}
        <div className="w-12 h-1 bg-amber-500 rounded-full mb-2" />

        <h1 className="text-5xl font-black text-stone-800 tracking-tight leading-snug">
          Elige tu choke según la distancia
        </h1>
        
        <p className="text-xl font-medium text-stone-400 max-w-lg mt-2 leading-relaxed">
          Usa el Cilíndrico para objetivos cercanos y el Full para máxima precisión a larga distancia.
        </p>

        {/* Brand / Footer signature */}
        <div className="mt-12 text-xs font-black tracking-widest text-stone-300 uppercase">
          Serie de Balística de Escopeta
        </div>
      </div>
    </div>
  );
};
