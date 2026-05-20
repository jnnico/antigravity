import "./index.css";
import { Composition } from "remotion";
import { ShotgunChokesVideo } from "./ShotgunChokesVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="shotgun-chokes"
        component={ShotgunChokesVideo}
        durationInFrames={1650}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
