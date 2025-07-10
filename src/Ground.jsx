import { gsap } from "gsap/dist/gsap";
import * as THREE from "three";
import {
  PivotControls,
  useGLTF,
  Mask,
  useMask,
  ContactShadows,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { DeviceOrientationControls } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

export default function () {
  return (
    <>
      <mesh
        position={[0, -0.01, 0]}
        scale={[20, 20, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <ContactShadows
        // frames={1}
        scale={10}
        position={[0, 0, 0]}
        blur={4}
        opacity={1}
      />
    </>
  );
}
