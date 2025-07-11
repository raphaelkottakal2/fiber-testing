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
        // camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0.5, 0.25] }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}
        gl={{ stencil: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#000000"]} />
          <Physics>
            <Scene />
          </Physics>
          <OrbitControls
            maxDistance={32}
            minDistance={1}
            enableRotate={!false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
