import { OrbitControls } from "@react-three/drei";
import { Dragon } from "./Dragon";
import { useControls } from "leva";
// import { House } from "./House";

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "run",
      options: ["run", "skill01", "skill02"],
    },
  });
  return (
    <>
      {/* <OrbitControls /> */}
      {/* <House /> */}
      <group position-y={-1}>
        <Dragon animation={animation} />
      </group>

      <ambientLight intensity={1} />
    </>
  );
};
