import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PerspectiveBarrelSvg } from "./ShotgunSvg";

export const Escena3: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - 240; // Escena 3 inicia en el frame 240

  // 4 fases de 50 frames cada una (aprox 1.6s por choke)
  const activePhase = Math.floor(sceneFrame / 50);
  const constrainedPhase = Math.min(3, Math.max(0, activePhase));

  const labels = [
    { name: "Cilíndrico", constriction: 0.0, desc: "Sin constricción (0★). Dispersión inmediata y patrón amplio." },
    { name: "Cilíndrico Mejorado", constriction: 0.25, desc: "Constricción mínima (4★). Patrón de dispersión medio-amplio." },
    { name: "Modificado", constriction: 0.5, desc: "Constricción moderada (3★). Excelente balance entre rango y densidad." },
    { name: "Full", constriction: 1.0, desc: "Constricción máxima (1★). Alta densidad concentrada a largas distancias." },
  ];

  // Calculamos el frame relativo dentro de la fase actual (0 a 49)
  const phaseFrame = sceneFrame % 50;

  // Animación del tubo deslizando (choke insert) entrando en el cañón (0 a 1)
  // El choke se desliza hacia adentro durante los primeros 18 frames de la fase
  const slideSpring = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 12, mass: 0.7 },
  });
  const chokeSlideProgress = interpolate(slideSpring, [0, 1], [0, 1]);

  // El diámetro del choke interpolado suavemente
  const currentConstriction = labels[constrainedPhase].constriction;

  // Animación de aparición de textos
  const textSpring = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 12 },
  });
  const textOpacity = interpolate(textSpring, [0, 1], [0.3, 1]);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between items-center py-20 px-12"
      style={{ opacity, backgroundColor: "#F9F9F8" }}
    >
      {/* Título en Español */}
      <div className="text-center mt-6">
        <h1 className="text-6xl font-black text-stone-800 tracking-tight leading-none">
          Tipos de Chokes
        </h1>
        <p className="text-xl font-medium text-stone-500 mt-3 tracking-wide">
          Diferentes constricciones para adaptarse a cada distancia
        </p>
      </div>

      {/* Grid Central */}
      <div className="w-full max-w-4xl flex items-center justify-around my-auto gap-8">
        
        {/* LADO IZQUIERDO: Visualización en perspectiva del Cañón y el Choke deslizante */}
        <div className="flex-1 flex justify-center bg-white border border-stone-100 rounded-3xl p-6 shadow-sm h-80 items-center max-w-md">
          <PerspectiveBarrelSvg
            chokeSlideProgress={chokeSlideProgress}
            constrictionSize={currentConstriction}
            style={{ width: "350px", height: "260px" }}
          />
        </div>

        {/* LADO DERECHO: Tarjetas de información de chokes */}
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
                    {idx === 0 ? "Estrella: 5★" : idx === 1 ? "Estrella: 4★" : idx === 2 ? "Estrella: 3★" : "Estrella: 1★"}
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
