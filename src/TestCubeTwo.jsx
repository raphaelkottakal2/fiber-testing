import { animated, useSpring } from "@react-spring/three";
import { Cloud, Float, MeshWobbleMaterial, Trail } from "@react-three/drei";

const DEPLAY_DURATION = 100;

export default function () {
  const [springs, api] = useSpring(() => ({
    from: {
      position: [0, 0, 0],
    },
    to: [
      {
        position: [0, 1, 0],
        delay: DEPLAY_DURATION,
      },
      {
        position: [0, 0, 0],
      },
      {
        position: [0, 2, 0],
        delay: DEPLAY_DURATION,
      },
      {
        position: [0, -2, 0],
      },
      {
        position: [-1, -2, 0],
      },
      {
        position: [0, -2, 1],
      },
      {
        position: [0, -2, -1],
      },
      {
        position: [1, -2, 0],
      },
      {
        position: [0, 0, 0],
      },
    ],
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
    loop: true,
    // immediate: true,
  }));
  // console.log(springs, api);
  return (
    <>
      {/* <Float>
        <Cloud
          position={[0, 7, 0]}
          seed={10}
          fade={30}
          speed={0.1}
          growth={4}
          segments={40}
          volume={6}
          opacity={1}
          bounds={[4, 3, 1]}
          color={"grey"}
        />
      </Float> */}
      <Trail
        width={2} // Width of the line
        color={"orange"} // Color of the line
        length={2} // Length of the line
        decay={1} // How fast the line fades away
        local={false} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={8} // Number of frames to wait before next calculation
        target={undefined} // Optional target. This object will produce the trail.
        attenuation={(width) => width} // A function to define the width in each point along it.
      >
        <animated.mesh scale={0.4} {...springs}>
          {/* <boxGeometry /> */}
          {/* <octahedronGeometry args={[1, 4]} /> */}
          <torusKnotGeometry />
          {/* <meshStandardMaterial color={"green"} /> */}
          <MeshWobbleMaterial color={"green"} factor={1} speed={10} />
        </animated.mesh>
      </Trail>
    </>
  );
}
