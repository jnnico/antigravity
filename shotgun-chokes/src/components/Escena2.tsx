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

  // Offset de la escena (inicia en frame 90)
  const sceneFrame = frame - 90;

  // Animación del disparo en el frame 15
  const shotProgress = Math.min(1, Math.max(0, (sceneFrame - 15) / 100));

  // Entradas de texto
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
      {/* Título en Español */}
      <div
        className="text-center mt-6"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Controla la Dispersión
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          El choke altera el tamaño y la densidad del plomeo de los perdigones
        </p>
      </div>

      {/* Grid de Comparación */}
      <div className="w-full max-w-4xl flex flex-col gap-6 my-auto">
        {/* Patrón 1: Dispersión Amplia */}
        <div className="bg-stone-50 border border-stone-100 rounded-3xl p-4 flex items-center h-44 shadow-sm relative">
          <div className="absolute left-6 top-6 bg-stone-200 text-stone-700 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
            Dispersión Amplia (Choke Abierto)
          </div>
          <ChokePattern
            spreadWidth={110}
            progress={shotProgress}
            opacity={1}
            className="w-full h-full"
          />
        </div>

        {/* Patrón 2: Dispersión Cerrada */}
        <div className="bg-stone-50 border border-stone-100 rounded-3xl p-4 flex items-center h-44 shadow-sm relative">
          <div className="absolute left-6 top-6 bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
            Dispersión Concentrada (Choke Cerrado)
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
