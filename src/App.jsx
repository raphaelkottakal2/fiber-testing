import { useState, Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 8] }}
      >
        <Suspense>
          <color attach="background" args={["#000000"]} />
          <Physics>
            <Scene />
          </Physics>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
