import {
  Geometry,
  Base,
  Addition,
  Subtraction,
  ReverseSubtraction,
  Intersection,
  Difference,
} from "@react-three/csg";
import * as THREE from "three";
import { gsap } from "gsap/dist/gsap";
import { PivotControls, TransformControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useGameState from "./useGameState";

const splitGap = 0.46;

function signedVolumeOfTriangle(p1, p2, p3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}

function getMeshVolume(geometry) {
  let sum = 0;
  const position = geometry.attributes.position;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  if (geometry.index) {
    // Indexed geometry
    const index = geometry.index;
    const faces = index.count / 3;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
      p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
      p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  } else {
    // Non-indexed geometry
    const faces = position.count / 3;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0);
      p2.fromBufferAttribute(position, i * 3 + 1);
      p3.fromBufferAttribute(position, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  return Math.abs(sum); // Volume is always positive
}

export default function () {
  const midPointVector = useGameState((state) => state.midPointVector);
  const rotaionAngle = useGameState((state) => state.rotaionAngle);

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
    // console.log(mainMesh.current.geometry);
    // console.log(getMeshVolume(mainMesh.current.geometry));
    // splitRef.current.geometry.translate(0.5, 0, 0);
    // splitRef.current.position.set(-0.25, 0, 0);
  }, []);

  useEffect(() => {
    // console.log(mainMesh.current.geometry);

    console.log(
      "Main Mesh",
      (getMeshVolume(mainMesh.current.geometry) / 0.05572195524406812) * 100
    );
    console.log(
      "Main Mesh 2",
      (getMeshVolume(mainMesh2.current.geometry) / 0.05572195524406812) * 100
    );

    // splitRef.current.geometry.translate(0.5, 0, 0);
    // splitRef.current.position.set(-0.25, 0, 0);
  }, [midPointVector, rotaionAngle]);

  // useEffect(() => {
  //   gsap.to(splitRef.current.position, {
  //     delay: 1,
  //     duration: 1,
  //     x: 0.5,
  //     onUpdate: () => {
  //       // geoRef.current.update();
  //     },
  //     onComplete: () => {
  //       geoRef.current.update();
  //       mainMesh.current.geometry.translate(0.5, 0, 0);
  //       mainMesh.current.position.set(-0.5, 0, 0);
  //     },
  //   });

  //   gsap.to(mainMesh.current.rotation, {
  //     delay: 2,
  //     duration: 1.5,
  //     // x: Math.PI * 2,
  //     y: (-30 * Math.PI) / 180,
  //     // z: Math.PI * 2,
  //     ease: "elastic.out(0.7,0.3)",
  //   });
  //   gsap.to(mainMesh.current.position, {
  //     delay: 2.1,
  //     duration: 0.25,
  //     x: -0.52,
  //     // z: Math.PI * 2,
  //     ease: "power1.inOut",
  //   });

  //   // second slice
  //   gsap.to(splitRef2.current.position, {
  //     delay: 1,
  //     duration: 1,
  //     x: -0.5,
  //     onUpdate: () => {
  //       // geoRef.current.update();
  //     },
  //     onComplete: () => {
  //       geoRef2.current.update();
  //       mainMesh2.current.geometry.translate(-0.5, 0, 0);
  //       mainMesh2.current.position.set(0.5, 0, 0);
  //     },
  //   });

  //   gsap.to(mainMesh2.current.rotation, {
  //     delay: 2,
  //     duration: 1.5,
  //     // x: Math.PI * 2,
  //     y: (30 * Math.PI) / 180,
  //     // z: Math.PI * 2,
  //     ease: "elastic.out(0.7,0.3)",
  //   });
  //   gsap.to(mainMesh2.current.position, {
  //     delay: 2.1,
  //     duration: 0.25,
  //     x: 0.52,
  //     // z: Math.PI * 2,
  //     ease: "power1.inOut",
  //   });
  // }, []);

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
          <group
            position={[midPointVector.x, midPointVector.y, 0]}
            rotation={[0, 0, rotaionAngle]}
          >
            <Addition
              ref={splitRef}
              position={[splitGap, 0, 0]}
              scale={[1, 2, 0.25]}
            >
              <boxGeometry />
              {/* <meshStandardMaterial color="green" /> */}
              <meshStandardMaterial color="green" transparent opacity={0.25} />
            </Addition>
          </group>
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
          <group
            position={[midPointVector.x, midPointVector.y, 0]}
            rotation={[0, 0, rotaionAngle]}
          >
            <Addition
              ref={splitRef2}
              position={[-splitGap, 0, 0]}
              scale={[1, 2, 0.25]}
            >
              <boxGeometry />
              {/* <meshStandardMaterial color="blue" /> */}
              <meshStandardMaterial color="blue" transparent opacity={0.25} />
            </Addition>
          </group>
        </Geometry>
      </mesh>
    </>
  );
}
