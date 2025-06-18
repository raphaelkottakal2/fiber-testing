import * as THREE from "three";
import { PivotControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { DeviceOrientationControls } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

export default function () {
  const { scene } = useGLTF(
    "https://instamart-media-assets.swiggy.com/DeSo/test/fiber-testing/Player.glb?updatedAt=1747315104926"
  );
  const playerRef = useRef(null);
  useEffect(() => {
    const mesh = scene.getObjectByName("Player");
    if (!mesh) {
      console.error("Player mesh not found in the loaded model");
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }, [scene, playerRef.current]);

  const lineRef = useRef();
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 1));
  const zee = useRef(new THREE.Vector3(0, 0, 1));
  const anEuler = useRef(new THREE.Euler());
  const q0 = useRef(new THREE.Quaternion());
  const q1 = useRef(
    new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5))
  );

  const controls = useRef(null);

  useEffect(() => {
    // controls.current = new DeviceOrientationControls(playerRef.current);
    // controls.current.alphaOffset = -Math.PI / 2;
    const handelOrientationEvent = (event) => {
      const { alpha, beta, gamma } = event;
      const radBeta = THREE.MathUtils.degToRad(beta);
      const radGama = THREE.MathUtils.degToRad(gamma);
      const radAlpha = THREE.MathUtils.degToRad(alpha) - Math.PI / 2;

      anEuler.current.set(radBeta, radAlpha, -radGama, "YXZ"); // 'ZXY' for the device, but 'YXZ' for us
      playerRef.current.quaternion.setFromEuler(anEuler.current); // orient the device
      playerRef.current.quaternion.multiply(q1.current); // camera looks out the back of the device, not the top
      playerRef.current.quaternion.multiply(
        q0.current.setFromAxisAngle(zee.current, 0)
      ); // adjust for screen orientation

      // const lookAtVector = new THREE.Vector3(0, 0, -1);
      lookAtRef.current.set(0, 0, 1);
      lookAtRef.current.applyQuaternion(playerRef.current.quaternion);

      lookAtRef.current.multiplyScalar(3);
      lookAtRef.current.add(new THREE.Vector3(0, 1, 0));
    };
    addEventListener("deviceorientation", handelOrientationEvent);

    return () => {
      removeEventListener("deviceorientation", handelOrientationEvent);
    };
  }, []);
  useFrame(() => {
    const points = [];
    points.push(new THREE.Vector3(0, 1, 0));
    points.push(lookAtRef.current);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    lineRef.current.geometry = lineGeometry;

    // controls.current.update();
  });

  const points = [];
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(lookAtRef.current);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <>
      <RigidBody type="fixed" colliders="hull">
        {/* <mesh ref={playerRef}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh> */}
        <group>
          <primitive
            name="main-player"
            ref={playerRef}
            scale={[1, 1, 1]}
            object={scene}
          />
        </group>
        <line ref={lineRef} geometry={lineGeometry}>
          <lineBasicMaterial
            attach="material"
            color={"#ff0000"}
            linewidth={16}
            linecap={"round"}
            linejoin={"round"}
          />
        </line>
      </RigidBody>
    </>
  );
}
