import { useState, Suspense, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import SplitControls from "./SplitControls";

function App() {
  const canvasRef = useRef(null);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas ref={canvasRef} shadows gl={{ stencil: false }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#000000"]} />
          <Physics>
            <Scene />
          </Physics>
          <OrbitControls
            // maxDistance={32}
            minDistance={1}
            enableRotate={!false}
          />
          {/* <SplitControls canvas={canvasRef} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
