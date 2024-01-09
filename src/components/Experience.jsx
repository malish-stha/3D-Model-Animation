import { OrbitControls } from "@react-three/drei";
import { Dragon } from "./Dragon";
import { AmbientLight } from "three";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <group position-y={-1}>
        {" "}
        <Dragon />
      </group>

      <ambientLight intensity={1} />
    </>
  );
};
