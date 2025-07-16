import { gsap } from "gsap/dist/gsap";
import * as THREE from "three";
import {
  PivotControls,
  useGLTF,
  Mask,
  useMask,
  ContactShadows,
  DragControls,
  Outlines,
  Line,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { DeviceOrientationControls } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import useGameState from "./useGameState";

const handleOnePosition = new THREE.Vector3(0, 0.55, 0.1);
const handleTwoPosition = new THREE.Vector3(0, -0.55, 0.1);
const matrixOne = new THREE.Matrix4();
const matrixTwo = new THREE.Matrix4();
matrixOne.makeTranslation(handleOnePosition);
matrixTwo.makeTranslation(handleTwoPosition);
const vector = new THREE.Vector3();
const xAxis = new THREE.Vector3(0, 1, 0);

const radiusScalar = 0.56;

export default function ({ canvas, enabled = true }) {
  const updateMidPointVector = useGameState(
    (state) => state.updateMidPointVector
  );
  const updateRotationAngle = useGameState(
    (state) => state.updateRotationAngle
  );

  const handleOneRef = useRef(null);
  const handleTwoRef = useRef(null);
  const splitLineRef = useRef(null);
  const [points, setPoints] = useState([
    [handleOnePosition.x, handleOnePosition.y, handleOnePosition.z],
    [handleTwoPosition.x, handleTwoPosition.y, handleTwoPosition.z],
  ]);

  useEffect(() => {
    console.log(splitLineRef);
  }, []);

  // useEffect(() => {
  //   if (!canvas.current) return;
  //   console.log(canvas.current);
  //   const handleOnTap = (e) => {
  //     console.log("tap", e.touches[0]);
  //   };
  //   canvas.current.addEventListener("touchstart", handleOnTap);
  //   return () => {
  //     canvas.current.removeEventListener("touchstart", handleOnTap);
  //   };
  // }, [canvas]);

  const updateMidpointAndAngle = (isOne = true) => {
    const onePosition = new THREE.Vector3();
    onePosition.setFromMatrixPosition(matrixOne);

    const twoPosition = new THREE.Vector3();
    twoPosition.setFromMatrixPosition(matrixTwo);

    const distance = onePosition.distanceTo(twoPosition);

    if (distance < 0.15) {
      twoPosition.applyAxisAngle(
        new THREE.Vector3(0, 0, 1),
        ((isOne ? -16 : 16) * Math.PI) / 180
      );
      matrixOne.makeTranslation(twoPosition);
      setPoints([[twoPosition.x, twoPosition.y, twoPosition.z], points[1]]);
    }

    const midpoint = new THREE.Vector3();
    midpoint.addVectors(onePosition, twoPosition).divideScalar(2);
    updateMidPointVector(midpoint);
    const lineDirection = new THREE.Vector3().subVectors(
      onePosition,
      twoPosition
    );
    lineDirection.normalize();
    const angle = lineDirection.angleTo(xAxis);
    const angleInDegrees = THREE.MathUtils.radToDeg(angle);
    updateRotationAngle(lineDirection.x < 0 ? angle : -angle);
  };
  return (
    <>
      <DragControls
        axisLock="z"
        onDrag={(localMatrix) => {
          matrixOne.copy(localMatrix);
          const newPosition = vector;
          newPosition.setFromMatrixPosition(matrixOne);
          // newPosition.add(new THREE.Vector3(0, 0.5, 0));

          newPosition.normalize();
          newPosition.multiplyScalar(radiusScalar);

          newPosition.setZ(handleOnePosition.z);
          // newPosition.clampLength(0.5, 1);
          matrixOne.makeTranslation(newPosition);
          console.log(newPosition.x, newPosition.y);
          console.log(newPosition.length());
          setPoints([[newPosition.x, newPosition.y, newPosition.z], points[1]]);
        }}
        matrix={matrixOne}
        autoTransform={false}
        onDragEnd={() => {
          updateMidpointAndAngle();
        }}
      >
        <mesh ref={handleOneRef} scale={0.05}>
          <octahedronGeometry args={[1, 3]} />
          <meshStandardMaterial
            color={"green"}
            flatShading
            transparent
            opacity={0.75}
          />
        </mesh>
      </DragControls>

      <DragControls
        axisLock="z"
        onDrag={(localMatrix) => {
          matrixTwo.copy(localMatrix);
          const newPosition = vector;
          newPosition.setFromMatrixPosition(matrixTwo);

          newPosition.normalize();
          newPosition.multiplyScalar(radiusScalar);
          newPosition.setZ(handleTwoPosition.z);

          matrixTwo.makeTranslation(newPosition);
          setPoints([points[0], [newPosition.x, newPosition.y, newPosition.z]]);
        }}
        matrix={matrixTwo}
        autoTransform={false}
        onDragEnd={() => {
          updateMidpointAndAngle(false);
        }}
      >
        <mesh ref={handleTwoRef} scale={0.05}>
          <octahedronGeometry args={[1, 3]} />
          <meshStandardMaterial
            color={"blue"}
            flatShading
            transparent
            opacity={0.75}
          />
        </mesh>
      </DragControls>

      <Line
        dashScale={32}
        ref={splitLineRef}
        lineWidth={4}
        points={points}
        color={"black"}
        dashed
      />
    </>
  );
}
