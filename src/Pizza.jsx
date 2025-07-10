import { gsap } from "gsap/dist/gsap";
import * as THREE from "three";
import { PivotControls, useGLTF, Mask, useMask } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { DeviceOrientationControls } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

export default function () {
  const { scene } = useGLTF(
    "https://media-assets.swiggy.com/DeSo/Misc/fiber-test/pep-pizza.glb?updatedAt=1752179413844"
  );
  const pizza1Ref = useRef(null);
  const pizza2Ref = useRef(null);
  const mask1Ref = useRef(null);
  const mask2Ref = useRef(null);
  const stencil1 = useMask(1, !true);
  const stencil2 = useMask(2, !true);
  const [hasMask, setHasMask] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setHasMask(true);
      gsap.to(mask1Ref.current.position, {
        duration: 1,
        x: -0.15,
        ease: "power1.inOut",
      });
      gsap.to(mask2Ref.current.position, {
        duration: 1,
        x: 0.15,
        ease: "power1.inOut",
      });
      gsap.to(pizza1Ref.current.position, {
        delay: 1,
        duration: 1,
        x: -0.03,
        ease: "power1.inOut",
      });
      gsap.to(pizza2Ref.current.position, {
        delay: 1,
        duration: 1,
        x: 0.03,
        ease: "power1.inOut",
      });
    }, 2000);
  }, []);

  useEffect(() => {
    const mesh = scene.getObjectByName("Object_2");
    if (!mesh) {
      console.error("Object_2 mesh not found in the loaded model");
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    gsap.to(pizza1Ref.current.scale, {
      duration: 1,
      x: 1,
      y: 1,
      z: 1,
      ease: "power2.inOut",
    });
    gsap.to(pizza1Ref.current.rotation, {
      duration: 1.5,
      x: Math.PI * 1.5,
      y: Math.PI * 2,
      ease: "power1.inOut",
    });

    gsap.to(pizza2Ref.current.scale, {
      duration: 1,
      x: 1,
      y: 1,
      z: 1,
      ease: "power2.inOut",
    });
    gsap.to(pizza2Ref.current.rotation, {
      duration: 1.5,
      x: Math.PI * 1.5,
      y: Math.PI * 2,
      ease: "power1.inOut",
    });
  }, [scene, pizza1Ref.current, pizza2Ref.current]);

  return (
    <>
      <group ref={pizza1Ref} scale={[0, 0, 0]} visible={!false}>
        {hasMask && (
          <Mask
            ref={mask1Ref}
            scale={[0.3, 0.3, 0.05]}
            position={[0, 0, 0]}
            id={1}
            depthWrite={!true}
            colorWrite={!true}
          >
            <boxGeometry />
          </Mask>
        )}
        <mesh geometry={scene.children[0].geometry}>
          <meshStandardMaterial
            map={scene.children[0].material.map}
            {...stencil1}
          />
        </mesh>
      </group>

      <group
        ref={pizza2Ref}
        scale={[0, 0, 0]}
        position={[0, 0, 0]}
        visible={!false}
      >
        {hasMask && (
          <Mask
            ref={mask2Ref}
            scale={[0.3, 0.3, 0.05]}
            position={[0, 0, 0]}
            id={2}
            depthWrite={!true}
            colorWrite={!true}
          >
            <boxGeometry />
          </Mask>
        )}
        <mesh geometry={scene.children[0].geometry}>
          <meshStandardMaterial
            map={scene.children[0].material.map}
            {...stencil2}
          />
        </mesh>
      </group>
    </>
  );
}
