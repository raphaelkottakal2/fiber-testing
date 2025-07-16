import { animated, useSpring } from "@react-spring/three";
import { Trail } from "@react-three/drei";

const DEPLAY_DURATION = 500;

const ANIMATION_POSITIONS = {
  one: [-1, -2, -2],
  two: [1, -2, -2],
  three: [1, -2, 2],
  four: [-1, -2, 2],
};

export default function () {
  const [springs] = useSpring(() => ({
    from: {
      position: ANIMATION_POSITIONS.one,
    },
    to: [
      {
        position: ANIMATION_POSITIONS.two,
        delay: DEPLAY_DURATION,
      },
      {
        position: ANIMATION_POSITIONS.one,
      },

      {
        position: ANIMATION_POSITIONS.two,
        delay: DEPLAY_DURATION,
      },
      {
        position: ANIMATION_POSITIONS.three,
      },
      {
        position: ANIMATION_POSITIONS.four,
      },
      {
        position: ANIMATION_POSITIONS.three,
      },
      {
        position: ANIMATION_POSITIONS.two,
      },
      {
        position: ANIMATION_POSITIONS.one,
      },
      {
        position: ANIMATION_POSITIONS.two,
        delay: DEPLAY_DURATION,
      },
      {
        position: ANIMATION_POSITIONS.three,
      },
      {
        position: ANIMATION_POSITIONS.four,
      },
      {
        position: ANIMATION_POSITIONS.one,
      },
    ],
    config: {
      mass: 1,
      tension: 1000,
      friction: 40,
    },
    loop: true,
    // immediate: true,
  }));
  return (
    <>
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
        <animated.mesh {...springs}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </animated.mesh>
      </Trail>
    </>
  );
}
