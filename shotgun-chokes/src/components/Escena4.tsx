import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ChokePattern } from "./ChokePattern";

export const Escena4: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 480; // Escena 4 inicia en el frame 480

  // Animaciones de entrada escalonada para los 4 carriles (staggered)
  const stagger = (index: number) => {
    return spring({
      frame: sceneFrame - index * 6,
      fps,
      config: { damping: 14, mass: 0.6 },
    });
  };

  const activeEntrances = [stagger(0), stagger(1), stagger(2), stagger(3)];

  // El disparo se propaga a partir del frame 30 de la escena
  const shotProgress = Math.min(1, Math.max(0, (sceneFrame - 30) / 180));

  const chokes = [
    { name: "Cilíndrico (5★)", spread: 120, colorClass: "bg-stone-200 text-stone-700" },
    { name: "Cilíndrico Mejorado (4★)", spread: 85, colorClass: "bg-stone-200 text-stone-700" },
    { name: "Modificado (3★)", spread: 55, colorClass: "bg-stone-200 text-stone-700" },
    { name: "Full / Choque Pleno (1★)", spread: 25, colorClass: "bg-amber-500 text-white" },
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-10 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Título en Español */}
      <div className="text-center mt-2">
        <h1 className="text-5xl font-black text-stone-800 tracking-tight leading-none">
          Comparación en Paralelo
        </h1>
        <p className="text-base font-semibold text-stone-500 mt-2 tracking-wide uppercase">
          Visualización de la dispersión y densidad del plomeo a la misma distancia
        </p>
      </div>

      {/* 4 Carriles Horizontales */}
      <div className="w-full max-w-5xl flex flex-col gap-4 my-auto">
        {chokes.map((choke, idx) => {
          const entrance = activeEntrances[idx];
          const itemOpacity = interpolate(entrance, [0, 1], [0, 1]);
          const itemTranslateY = interpolate(entrance, [0, 1], [30, 0]);

          return (
            <div
              key={idx}
              className="bg-white border border-stone-100 rounded-2xl h-[120px] flex items-center relative shadow-sm overflow-hidden"
              style={{
                opacity: itemOpacity,
                transform: `translateY(${itemTranslateY}px)`,
              }}
            >
              {/* Etiqueta del Carril */}
              <div className={`absolute left-4 top-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider z-10 ${choke.colorClass}`}>
                {choke.name}
              </div>

              {/* Animación del Patrón */}
              <ChokePattern
                spreadWidth={choke.spread}
                progress={shotProgress}
                opacity={1}
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>

      {/* Texto de información inferior */}
      <div className="text-center text-xs font-semibold text-stone-400 uppercase tracking-widest">
        La cantidad de perdigones es idéntica. El choke solo altera el área de dispersión.
      </div>
    </div>
  );
};
