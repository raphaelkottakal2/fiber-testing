import {
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  MeshReflectorMaterial,
} from "@react-three/drei";
import Helpers from "./Helpers";
import Player from "./Player";
import Lighting from "./Lighting";
import Floor from "./Floor";
import Gyroscope from "./Gyroscope";

export default function () {
  return (
    <>
      <Player />
      <Helpers />
      <Lighting />
      {/* <Floor /> */}
      {/* <Gyroscope /> */}
    </>
  );
}
