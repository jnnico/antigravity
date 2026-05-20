import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Escena1 } from "./components/Escena1";
import { Escena2 } from "./components/Escena2";
import { Escena3 } from "./components/Escena3";
import { Escena4 } from "./components/Escena4";
import { Escena5 } from "./components/Escena5";
import { Escena6 } from "./components/Escena6";
import { Escena7 } from "./components/Escena7";

// Helper to calculate smooth cross-fade opacity between scenes
const getSceneOpacity = (
  frame: number,
  start: number,
  end: number,
  transition: number = 10
): number => {
  if (frame < start || frame > end) {
    return 0;
  }
  // Fade-in transition
  if (frame >= start && frame < start + transition) {
    return interpolate(frame, [start, start + transition], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  // Fade-out transition
  if (frame > end - transition && frame <= end) {
    return interpolate(frame, [end - transition, end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  return 1;
};

export const ShotgunChokesVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Define transition timings
  const opacityS1 = getSceneOpacity(frame, 0, 90);
  const opacityS2 = getSceneOpacity(frame, 90, 240);
  const opacityS3 = getSceneOpacity(frame, 240, 480);
  const opacityS4 = getSceneOpacity(frame, 480, 900);
  const opacityS5 = getSceneOpacity(frame, 900, 1200);
  const opacityS6 = getSceneOpacity(frame, 1200, 1500);
  const opacityS7 = getSceneOpacity(frame, 1500, 1650);

  return (
    <AbsoluteFill className="bg-[#F9F9F8]">
      {/* Scene 1: Intro (0-3s) */}
      {opacityS1 > 0 && <Escena1 opacity={opacityS1} />}

      {/* Scene 2: Basic Concept (3-8s) */}
      {opacityS2 > 0 && <Escena2 opacity={opacityS2} />}

      {/* Scene 3: Chokes constriction (8-16s) */}
      {opacityS3 > 0 && <Escena3 opacity={opacityS3} />}

      {/* Scene 4: Side-by-Side core comparison (16-30s) */}
      {opacityS4 > 0 && <Escena4 opacity={opacityS4} />}

      {/* Scene 5: Effective Distance (30-40s) */}
      {opacityS5 > 0 && <Escena5 opacity={opacityS5} />}

      {/* Scene 6: Quick summary table (40-50s) */}
      {opacityS6 > 0 && <Escena6 opacity={opacityS6} />}

      {/* Scene 7: Conclusion/Outro (50-55s) */}
      {opacityS7 > 0 && <Escena7 opacity={opacityS7} />}
    </AbsoluteFill>
  );
};
