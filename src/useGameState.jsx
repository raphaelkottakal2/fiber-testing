import { create } from "zustand";
import * as THREE from "three";

export default create((set) => ({
  midPointVector: new THREE.Vector3(),
  updateMidPointVector: (newVector) =>
    set(() => ({ midPointVector: newVector })),
  rotaionAngle: 0,
  updateRotationAngle: (newAngle) => set(() => ({ rotaionAngle: newAngle })),
}));
