import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Loader, ScrollControls } from "@react-three/drei";
import Camera from "./Camera";
import Lights from "./Lights";
import TigerModel from "./TigerModel";

const Scene = ({ children, scrollPages = 1 }) => {
  return (
    <>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={scrollPages} damping={0.3}>
            <Camera />
            <Lights />
            {children || <TigerModel />}
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
