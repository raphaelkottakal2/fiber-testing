import { Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";

export default function () {
  return (
    <>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
          labelColor="white"
        />
      </GizmoHelper>
      <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} />
    </>
  );
}
