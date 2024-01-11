import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import islandScene from "../assets/models/3D/island.glb";

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });
  return (
    <a.group ref={islandRef} {...props}>
      <group position={[-42.281, -1.801, 11.779]} rotation={[0, -0.185, 0]}>
        <mesh
          geometry={nodes.Final_Bridge1_SF_Bridge_Mat001_0.geometry}
          material={materials["SF_Bridge_Mat.001"]}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Roof_Final_0.geometry}
          material={materials.SF_Roof_Final}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Roof_Final_0_1.geometry}
          material={materials.SF_Roof_Final}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Roof_Final_0_2.geometry}
          material={materials.SF_Roof_Final}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Roof_Final_0_3.geometry}
          material={materials.SF_Roof_Final}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Rocks_Mat_0.geometry}
          material={materials.SF_Rocks_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Windows_Mat_0.geometry}
          material={materials.SF_Windows_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_1.geometry}
          material={materials.SF_Windows_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_2.geometry}
          material={materials.SF_Windows_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Bush_Mat_0.geometry}
          material={materials.SF_Bush_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0.geometry}
          material={materials.SF_TreeWood_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0_1.geometry}
          material={materials.SF_TreeWood_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_TreeLeaf_Mat_0.geometry}
          material={materials.SF_TreeLeaf_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_HouseSupport_Mat_0.geometry}
          material={materials.SF_HouseSupport_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_HouseJoins_Mat_0.geometry}
          material={materials.SF_HouseJoins_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Chimney_Mat_0.geometry}
          material={materials.SF_Chimney_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_CutRock_Mat_0.geometry}
          material={materials.SF_CutRock_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Stalagmites_Mat_0.geometry}
          material={materials.SF_Stalagmites_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_WoodTex_Mat_0.geometry}
          material={materials.SF_WoodTex_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_PlasterTex_Mat_0.geometry}
          material={materials.SF_PlasterTex_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_StoneBrick_Mat_0.geometry}
          material={materials.SF_StoneBrick_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Island_Mat_0.geometry}
          material={materials.SF_Island_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_LampGlass_Mat_0.geometry}
          material={materials.SF_LampGlass_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Lamp_Mat_0.geometry}
          material={materials.SF_Lamp_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Candle_Mat_0.geometry}
          material={materials.SF_Candle_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Grass_Mat_0.geometry}
          material={materials.SF_Grass_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Rail_Mat_0.geometry}
          material={materials.SF_Rail_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0.geometry}
          material={materials.SF_GrassCards_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_1.geometry}
          material={materials.SF_GrassCards_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_2.geometry}
          material={materials.SF_GrassCards_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_3.geometry}
          material={materials.SF_GrassCards_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Sack_Mat_0.geometry}
          material={materials.SF_Sack_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_MineCart_Mat_0.geometry}
          material={materials.SF_MineCart_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Bridge_Mat_0.geometry}
          material={materials.SF_Bridge_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Door_Mat_0.geometry}
          material={materials.SF_Door_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Water_Mat_0.geometry}
          material={materials.SF_Water_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_Final_Water001_0.geometry}
          material={materials["Final_Water.001"]}
        />
        <mesh
          geometry={nodes.Final_Bridge1_Final_Rocks2_Mat_0.geometry}
          material={materials.Final_Rocks2_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_Black_0.geometry}
          material={materials.Black}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_ButterFly_Mat_0.geometry}
          material={materials.SF_ButterFly_Mat}
        />
        <mesh
          geometry={nodes.Final_Bridge1_SF_Lillypad_Mat_0.geometry}
          material={materials.SF_Lillypad_Mat}
        />
      </group>
    </a.group>
  );
};

// useGLTF.preload(islandScene);
export default Island;
