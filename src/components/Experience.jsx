// import { motion } from "framer-motion-3d";
// import { useEffect, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { animate, useMotionValue } from "framer-motion";
// import { useScroll } from "@react-three/drei";
// import { Dragon } from "./Dragon";

// export const Experience = (props) => {
//   const { menuOpened } = props;
//   const data = useScroll();

//   const [section, setSection] = useState(0);

//   const cameraPositionX = menuOpened ? -5 : 0;
//   const cameraLookAtX = menuOpened ? 5 : 0;

//   const [characterAnimation, setCharacterAnimation] = useState("run");

//   useEffect(() => {
//     setTimeout(() => {
//       if (section === 0) {
//         setCharacterAnimation("run");
//       } else if (section === 1) {
//         setCharacterAnimation("skill01");
//       } else if (section === 2) {
//         setCharacterAnimation("skill02");
//       } else if (section === 3) {
//         setCharacterAnimation("deaddown");
//       }
//     }, 100);
//   }, [section]);

//   useFrame((state) => {
//     let curSection = Math.floor(data.scroll.current * data.pages);

//     if (curSection > 3) {
//       curSection = 3;
//     }

//     if (curSection !== section) {
//       setSection(curSection);
//     }

//     state.camera.position.x = cameraPositionX;
//     state.camera.lookAt(cameraLookAtX, 0, 0);
//   });

//   return (
//     <>
//       <ambientLight intensity={1} />

//       <motion.group
//         position={[0.1, 0.1, 2]}
//         scale={menuOpened ? [1.5, 1.5, 1.5] : [0.9, 0.9, 0.9]}
//         rotation-y={-Math.PI / 4}
//       >
//         <Dragon animation={characterAnimation} />
//       </motion.group>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Dragon } from "./Dragon";
import { framerMotionConfig } from "../config"; // Assuming your config file is named "config.js"

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
        setCharacterAnimation("skill01");
      } else if (section === 2) {
        setCharacterAnimation("skill02");
      } else if (section === 3) {
        setCharacterAnimation("deaddown");
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
      >
        <Dragon animation={characterAnimation} />
      </motion.group>
    </>
  );
};
