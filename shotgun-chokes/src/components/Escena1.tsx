import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ShotgunSilhouette } from "./ShotgunSvg";

export const Escena1: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada elástica de la escopeta
  const shotgunEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const shotgunX = interpolate(shotgunEntrance, [0, 1], [-400, 0]);

  // Animación del disparo en el frame 25
  const shotFrame = frame - 25;
  const shotProgress = Math.max(0, shotFrame / 20); // 0 a 1 en 20 frames

  const flashScale = interpolate(shotProgress, [0, 0.1, 1], [0, 1.5, 3]);
  const flashOpacity = interpolate(shotProgress, [0, 0.1, 0.8, 1], [0, 1, 0.8, 0]);

  // Animaciones del texto
  const textEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });
  const textY = interpolate(textEntrance, [0, 1], [50, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-20 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Título en Español */}
      <div
        className="text-center mt-10"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          ¿Para qué sirve el choke de una escopeta?
        </h1>
        <p className="text-xl font-medium text-stone-500 tracking-wider uppercase mt-4">
          Una Guía Visual e Infográfica
        </p>
      </div>

      {/* Visual de la Escopeta y el Disparo */}
      <div className="relative w-full max-w-4xl flex items-center justify-center h-64">
        {/* Destello del disparo plano (ámbar/naranja) */}
        {shotFrame > 0 && (
          <div
            className="absolute left-[72%] top-[41%] w-32 h-32 rounded-full border-4 border-amber-500 bg-amber-400"
            style={{
              transform: `translate(-50%, -50%) scale(${flashScale})`,
              opacity: flashOpacity,
              filter: "blur(2px)",
            }}
          />
        )}

        <div
          className="w-full"
          style={{
            transform: `translateX(${shotgunX}px)`,
          }}
        >
          <ShotgunSilhouette />
        </div>
      </div>

      {/* Espacio para balance visual */}
      <div className="h-10" />
    </div>
  );
};
