import { Dragon } from "./Dragon";
import { useControls } from "leva";
import { motion } from "framer-motion-3d";
import { useThree } from "@react-three/fiber";

export const Experience = (props) => {
  const { section } = props;
  const { animation } = useControls({
    animation: {
      value: "run",
      options: ["run", "skill01", "skill02", "atk01", "deaddown"],
    },
  });

  return (
    <>
      <ambientLight intensity={1} />
      <motion.group>
        <motion.group
          position={[0.1, 0.1, 2]}
          scale={[0.9, 0.9, 0.9]}
          rotation-y={-Math.PI / 4}
        >
          <Dragon
            animation={
              section === 0
                ? "run"
                : section === 1
                ? "skill02"
                : section === 2
                ? "atk01"
                : section === 3
                ? "deaddown"
                : "run"
            }
          />
        </motion.group>
      </motion.group>
    </>
  );
};
