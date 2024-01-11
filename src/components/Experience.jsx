import React, { useEffect, useState, lazy, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Dragon } from "./Dragon";
import { framerMotionConfig } from "../config";
const Island = lazy(() => import("./Island"));

export const Experience = (props) => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    let islandRotation = [0.4, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -5.5, -43.4];
    } else {
      screenScale = [0.5, 0.5, 0.5];

      screenPosition = [-3, 8, -55];
    }
    return [screenScale, screenPosition, islandRotation];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
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

      <hemisphereLight
        skyColor="#b1e1ff"
        groundColor="#000000"
        intensity={4}
        position={[0, 50, 0]}
      />

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
            y: -0.2,
            rotateX: menuOpened ? -0.2 : -1,
            rotateY: 1.4,
            rotateZ: 1,
          },
          1: {
            scaleX: 4,
            scaleY: 4,
            scaleZ: 4,
            x: 1,
            y: -3,

            rotateX: 0.1,
          },
        }}
      >
        <Dragon animation={characterAnimation} />
      </motion.group>
      <motion.group
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
      >
        {section === 0 && (
          <Island
            scale={islandScale}
            position={[1, 8, -50]}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        )}
      </motion.group>
    </>
  );
};
