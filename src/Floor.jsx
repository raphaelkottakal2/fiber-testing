import { MeshReflectorMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function () {
  return (
    <>
      <RigidBody type="fixed">
        <mesh
          receiveShadow
          scale={[8, 8, 0.25]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.001, 0]}
        >
          <boxGeometry />
          <MeshReflectorMaterial
            resolution={256 * 2}
            transparent
            opacity={0.5}
          />
        </mesh>
      </RigidBody>
    </>
  );
}
