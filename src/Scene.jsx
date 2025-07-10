import {
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  MeshReflectorMaterial,
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

export default function () {
  return (
    <>
      {/* <Pizza /> */}
      {/* <MaskTest /> */}
      <Player />
      <BoolTest />
      {/* <Ground /> */}
      {/* <Helpers /> */}
      <Lighting />
      {/* <Floor /> */}
      {/* <Gyroscope /> */}
    </>
  );
}
