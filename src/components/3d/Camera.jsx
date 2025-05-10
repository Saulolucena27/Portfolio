import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

const Camera = () => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame(() => {
    // Move camera based on scroll
    const offset = scroll.offset;
    
    camera.position.y = -offset * 5;
    camera.position.z = 5 + offset * 2;
    camera.rotation.x = offset * 0.5;
  });
  
  return null;
};

export default Camera;