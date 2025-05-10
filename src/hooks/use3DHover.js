import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const use3DHover = (options = {}) => {
  const meshRef = useRef();
  const targetRotation = useRef(new THREE.Euler());
  const currentRotation = useRef(new THREE.Euler());

  const {
    rotationSpeed = 0.1,
    hoverScale = 1.1,
    idleRotation = true,
    idleSpeed = 0.001,
  } = options;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Idle rotation
    if (idleRotation) {
      targetRotation.current.y += idleSpeed;
    }

    // Smooth rotation interpolation
    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      rotationSpeed
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      rotationSpeed
    );

    meshRef.current.rotation.set(
      currentRotation.current.x,
      currentRotation.current.y,
      0
    );
  });

  const onPointerMove = (event) => {
    if (!meshRef.current) return;

    const { point } = event;
    targetRotation.current.x = point.y * 0.5;
    targetRotation.current.y = point.x * 0.5;
  };

  const onPointerEnter = () => {
    if (!meshRef.current) return;

    meshRef.current.scale.setScalar(hoverScale);
    document.body.style.cursor = "pointer";
  };

  const onPointerLeave = () => {
    if (!meshRef.current) return;

    meshRef.current.scale.setScalar(1);
    targetRotation.current.set(0, 0, 0);
    document.body.style.cursor = "auto";
  };

  return {
    meshRef,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
  };
};

export default use3DHover;
