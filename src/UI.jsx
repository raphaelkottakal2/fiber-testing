import {
  Billboard,
  Cloud,
  Float,
  Text,
  useVideoTexture,
} from "@react-three/drei";

export default function () {
  const texture = useVideoTexture(
    "https://instamart-media-assets.swiggy.com/DeSo/2025-06/britannia-im-25/video_final.mp4?updatedAt=1750842161065"
  );
  return (
    <>
      <Billboard
        position={[-0.64, 0, 2]}
        // follow={true}
        // lockX={false}
        // lockY={false}
        // lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <Float speed={10}>
          <mesh position={[0, 4, -1]}>
            <planeGeometry />
            {/* <boxGeometry args={[1, 1, 1]} /> */}
            <meshBasicMaterial map={texture} />
          </mesh>
          <Text position={[0, -0.64, 0]} fontSize={0.15}>
            ...Trails
          </Text>
        </Float>
      </Billboard>
    </>
  );
}
