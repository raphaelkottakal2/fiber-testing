import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function () {
  // const orientationV3 = useRef(new THREE.Vector3());
  // const vectorHead = useRef(null);
  useEffect(() => {
    console.log("mount");

    const handelOrientationEvent = (event) => {
      console.log("orientationValues", orientationV3.current);
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      console.log("vectorHead", vectorHead.current);
      const { alpha, beta, gamma } = event;
      const euler = new THREE.Euler(alpha, gamma, beta, "ZYX");

      orientationV3.current.set(0, beta, 0);
      orientationV3.current.normalize();
      orientationV3.current.addScalar(1.5);

      // orientationV3.current.applyEuler(euler);
      vectorHead.current.position.copy(orientationV3.current);
    };
    addEventListener("deviceorientation", handelOrientationEvent);
  }, []);
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>

      <mesh
        ref={vectorHead}
        // scale={[1, 1, 1]}
        // position={[
        //   orientationValues.current.alpha,
        //   orientationValues.current.beta,
        //   orientationValues.current.gamma,
        // ]}
      >
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  );
}
