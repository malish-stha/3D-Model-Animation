import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Dragon } from "./Dragon";
import { framerMotionConfig } from "../config";

export const Experience = (props) => {
  const { menuOpened } = props;
  const data = useScroll();

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue(menuOpened ? -5 : 0);
  const cameraLookAtX = useMotionValue(menuOpened ? 5 : 0);

  const [characterAnimation, setCharacterAnimation] = useState("run");

  useEffect(() => {
    // Delay the animation to ensure the model has loaded
    const animationTimeout = setTimeout(() => {
      if (section === 0) {
        setCharacterAnimation("run");
      } else if (section === 1) {
        setCharacterAnimation("run");
      } else if (section === 2) {
        setCharacterAnimation("stand");
      } else if (section === 3) {
        setCharacterAnimation("stand");
      }
    }, 100);

    return () => clearTimeout(animationTimeout);
  }, [section]);

  useEffect(() => {
    // Animate camera position and lookAt
    const animationTimeout = setTimeout(() => {
      animate(cameraPositionX, menuOpened ? -5 : 0, {
        ...framerMotionConfig,
      });
      animate(cameraLookAtX, menuOpened ? 5 : 0, {
        ...framerMotionConfig,
      });
    }, 1); // Delay the animation to ensure the model has loaded

    return () => clearTimeout(animationTimeout);
  }, [menuOpened]);

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <motion.group
        position={[0.1, 0.1, 2]}
        scale={menuOpened ? [1, 1, 1] : [0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            rotateX: menuOpened ? -0.2 : -1,
            rotateZ: -0.2,
          },
          1: {
            scaleX: 2,
            scaleY: 2,
            scaleZ: 2,
            x: 0.5,
            y: -0.2,

            rotateX: 0.1,
          },
        }}
      >
        <Dragon animation={characterAnimation} />
      </motion.group>
    </>
  );
};
