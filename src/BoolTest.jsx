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

  useEffect(() => {
    console.log(geoRef);
    gsap.to(splitRef.current.position, {
      delay: 1,
      duration: 1,
      x: 0.5,
      onUpdate: () => {
        geoRef.current.update();
      },
      onComplete: () => {
        geoRef.current.update();
        // mainMesh.current.geometry.center();
        mainMesh.current.geometry.translate(0.25, 0, 0);
        mainMesh.current.position.set(-0.25, 0, 0);
        console.log(mainMesh.current);
      },
    });
    gsap.to(mainMesh.current.rotation, {
      delay: 2,
      duration: 2,
      x: Math.PI * 2,
      y: Math.PI * 2,
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
          <Subtraction ref={splitRef} position={[1, 0, 0]} scale={[1, 1, 0.25]}>
            <boxGeometry />
            <meshStandardMaterial color="#ddaf65" />
          </Subtraction>
        </Geometry>
      </mesh>
    </>
  );
}
