import {
  Geometry,
  Base,
  Addition,
  Subtraction,
  ReverseSubtraction,
  Intersection,
  Difference,
} from "@react-three/csg";
import { gsap } from "gsap/dist/gsap";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function () {
  const { scene } = useGLTF(
    "https://media-assets.swiggy.com/DeSo/Misc/fiber-test/pepp-pizza.glb?updatedAt=1752190375251"
  );
  const splitRef = useRef(null);
  const geoRef = useRef(null);
  const mainMesh = useRef(null);

  const splitRef2 = useRef(null);
  const geoRef2 = useRef(null);
  const mainMesh2 = useRef(null);

  useEffect(() => {
    gsap.to(splitRef.current.position, {
      delay: 1,
      duration: 1,
      x: 0.5,
      onUpdate: () => {
        // geoRef.current.update();
      },
      onComplete: () => {
        geoRef.current.update();
        mainMesh.current.geometry.translate(0.25, 0, 0);
        mainMesh.current.position.set(-0.25, 0, 0);
      },
    });
    gsap.to(mainMesh.current.rotation, {
      delay: 2,
      duration: 1,
      // x: Math.PI * 2,
      y: (-30 * Math.PI) / 180,
      // z: Math.PI * 2,
      ease: "power1.inOut",
    });
    gsap.to(mainMesh.current.position, {
      delay: 2,
      duration: 1,
      x: -0.5,
      // z: Math.PI * 2,
      ease: "power1.inOut",
    });

    // second slice
    gsap.to(splitRef2.current.position, {
      delay: 1,
      duration: 1,
      x: -0.5,
      onUpdate: () => {
        // geoRef.current.update();
      },
      onComplete: () => {
        geoRef2.current.update();
        mainMesh2.current.geometry.translate(-0.25, 0, 0);
        mainMesh2.current.position.set(0.25, 0, 0);
      },
    });
    gsap.to(mainMesh2.current.rotation, {
      delay: 2,
      duration: 1,
      // x: Math.PI * 2,
      y: (30 * Math.PI) / 180,
      // z: Math.PI * 2,
      ease: "power1.inOut",
    });
    gsap.to(mainMesh2.current.position, {
      delay: 2,
      duration: 1,
      x: 0.5,
      // z: Math.PI * 2,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <mesh ref={mainMesh}>
        <Geometry useGroups ref={geoRef}>
          {/* <Base scale={[1, 1, 1]}>
            <boxGeometry />
            </Base> */}
          <Base geometry={scene.children[0].geometry}>
            <meshStandardMaterial map={scene.children[0].material.map} />
            {/* <meshStandardMaterial /> */}
          </Base>
          <Subtraction
            ref={splitRef}
            position={[1, 0, 0]}
            scale={[1, 1, 0.25]}
            // rotation={[0, 0, Math.PI * 0.25]}
          >
            <boxGeometry />
            <meshStandardMaterial color="#73321f" />
          </Subtraction>
        </Geometry>
      </mesh>

      <mesh ref={mainMesh2}>
        <Geometry useGroups ref={geoRef2}>
          {/* <Base scale={[1, 1, 1]}>
            <boxGeometry />
            </Base> */}
          <Base geometry={scene.children[0].geometry}>
            <meshStandardMaterial map={scene.children[0].material.map} />
            {/* <meshStandardMaterial /> */}
          </Base>
          <Subtraction
            ref={splitRef2}
            position={[-1, 0, 0]}
            scale={[1, 1, 0.25]}
            // rotation={[0, 0, Math.PI * 0.25]}
          >
            <boxGeometry />
            <meshStandardMaterial color="#73321f" />
          </Subtraction>
        </Geometry>
      </mesh>
    </>
  );
}
