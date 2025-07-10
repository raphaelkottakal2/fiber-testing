import { Mask, useMask } from "@react-three/drei";

export default function () {
  const stencil = useMask(1, true);

  return (
    <>
      <Mask position={[0, 1, 0]} id={1} depthWrite={!true} colorWrite={!true}>
        <boxGeometry />
      </Mask>
      <mesh position={[0, 1, 0]} scale={[0.9, 0.9, 0.9]}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 64]} />
        <meshNormalMaterial {...stencil} />
      </mesh>
    </>
  );
}
