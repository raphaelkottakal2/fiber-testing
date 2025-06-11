import * as THREE from "three";
import { PivotControls, useGLTF } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function () {
  const { scene } = useGLTF(
    "https://instamart-media-assets.swiggy.com/DeSo/test/fiber-testing/Player.glb?updatedAt=1747315104926"
  );
  const playerRef = useRef(null);
  const mainMesh = useMemo(() => {
    if (playerRef.current) {
      console.log("playerRef", playerRef);

      playerRef.current.material.transparent = true;
      playerRef.current.material.opaity = true;
      playerRef.current.material.needsUpdate = true;
      // playerRef.current.material.opacity = 0.5;
    }
    const mesh = scene.getObjectByName("Player");
    if (!mesh) {
      console.error("Player mesh not found in the loaded model");
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    console.log("mesh", mesh);
    return mesh;
  }, [scene, playerRef.current]);

  const originEuler = useRef(new THREE.Euler(0, 0, 0));
  const quaternionX = useRef(new THREE.Quaternion());
  const vectorX = useRef(new THREE.Vector3(1, 0, 0).normalize());
  const quaternionY = useRef(new THREE.Quaternion());
  const vectorY = useRef(new THREE.Vector3(0, 1, 0).normalize());
  const quaternionZ = useRef(new THREE.Quaternion());
  const vectorZ = useRef(new THREE.Vector3(0, 0, 1).normalize());
  const prevRef = useRef({
    prevAlpha: 0,
    prevBeta: 0,
    prevGamma: 0,
  });
  const rotationIsReady = useRef(false);

  useEffect(() => {
    const handelOrientationEvent = (event) => {
      const { alpha, beta, gamma } = event;
      const { prevAlpha, prevBeta, prevGamma } = prevRef.current;
      // console.log(gamma, prevGamma);
      // console.log("orientationValues", beta, playerRef.current);

      const radX = THREE.MathUtils.degToRad(beta);
      const radY = THREE.MathUtils.degToRad(gamma);
      const radZ = THREE.MathUtils.degToRad(alpha);
      // playerRef.current.rotation.set(radX - Math.PI / 2, radY, 0);

      playerRef.current.rotation.copy(originEuler.current);

      quaternionX.current.setFromAxisAngle(vectorX.current, radX - Math.PI / 2);
      playerRef.current.applyQuaternion(quaternionX.current);

      // quaternionY.current.setFromAxisAngle(vectorY.current, radY);
      // playerRef.current.applyQuaternion(quaternionY.current);

      // quaternionZ.current.setFromAxisAngle(vectorZ.current, radZ);
      // playerRef.current.applyQuaternion(quaternionZ.current);

      // quaternionY.current.setFromAxisAngle(
      //   vectorY.current,
      //   THREE.MathUtils.degToRad(gamma - prevGamma)
      // );
      // playerRef.current.applyQuaternion(quaternionY.current);

      // quaternionZ.current.setFromAxisAngle(
      //   vectorZ.current,
      //   THREE.MathUtils.degToRad(alpha - prevAlpha)
      // );
      // playerRef.current.applyQuaternion(quaternionY.current);

      prevRef.current = {
        prevAlpha: alpha,
        prevBeta: beta,
        prevGamma: gamma,
      };
    };
    addEventListener("deviceorientation", handelOrientationEvent);

    return () => {
      removeEventListener("deviceorientation", handelOrientationEvent);
    };
  }, []);
  return (
    <>
      <RigidBody type="fixed">
        {/* <mesh ref={playerRef}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh> */}
        <group>
          <primitive
            name="main-player"
            ref={playerRef}
            scale={[1, 1, 1]}
            object={mainMesh}
          />
        </group>
      </RigidBody>
    </>
  );
}
