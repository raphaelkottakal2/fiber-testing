import { MeshReflectorMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function ({ y = 0 }) {
  return (
    <>
      <RigidBody type="fixed">
        <mesh
          receiveShadow
          scale={[16, 16, 0.25]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, y, 0]}
        >
          <boxGeometry />
          {/* <meshStandardMaterial /> */}
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={0.9}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </RigidBody>
    </>
  );
}
