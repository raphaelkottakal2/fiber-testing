import {
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  MeshReflectorMaterial,
  Sky,
  Stars,
} from "@react-three/drei";
import Helpers from "./Helpers";
import Player from "./Player";
import Pizza from "./Pizza";
import Lighting from "./Lighting";
import Floor from "./Floor";
import Gyroscope from "./Gyroscope";
import Ground from "./Ground";
import MaskTest from "./MaskTest";
import BoolTest from "./BoolTest";
import TestCube from "./TestCube";
import TestCubeTwo from "./TestCubeTwo";
import UI from "./UI";
import Camera from "./Camera";

export default function () {
  return (
    <>
      {/* <fog attach="fog" color="#000000" near={10} far={16} /> */}
      {/* <Pizza /> */}
      {/* <MaskTest /> */}
      {/* <Player /> */}
      {/* <BoolTest /> */}
      {/* <Ground /> */}
      <Helpers />
      <Lighting />
      <Floor y={-3} />
      <TestCube />
      <TestCubeTwo />
      <UI />
      {/* <Gyroscope /> */}
      <Camera />
      <Sky sunPosition={[0, 0.1, -1]} turbidity={0.1} />
      {/* <Stars /> */}
    </>
  );
}
