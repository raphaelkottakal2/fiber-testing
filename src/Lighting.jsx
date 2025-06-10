import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function () {
  const directionalLightRef = useRef(null);
  const lightGroup = useRef(null);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 2, "hotpink");
  useFrame(() => {
    // lightGroup.current.rotation.y += 0.01;
  });
  return (
    <>
      <ambientLight />
      <group ref={lightGroup}>
        <directionalLight
          ref={directionalLightRef}
          intensity={4}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={16}
          shadow-bias={-0.005}
        />
      </group>
      {/* <Environment preset="studio" background /> */}
      {/* <AccumulativeShadows
        temporal
        frames={100}
        color="black"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.75}
        opacity={2}
        scale={12}
      >
        <RandomizedLight
          intensity={Math.PI}
          amount={8}
          radius={4}
          ambient={0.5}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
    </>
  );
}
