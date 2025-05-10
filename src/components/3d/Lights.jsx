import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Lights = () => {
  const light1Ref = useRef();
  const light2Ref = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate lights
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time) * 3;
      light1Ref.current.position.z = Math.cos(time) * 3;
    }
    
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time) * 3;
      light2Ref.current.position.z = Math.sin(time) * 3;
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight 
        ref={light1Ref}
        position={[5, 5, 5]} 
        intensity={1} 
        color="#b97836"
      />
      <pointLight 
        ref={light2Ref}
        position={[-5, 5, -5]} 
        intensity={0.5} 
        color="#e8a653"
      />
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.5}
        castShadow
      />
    </>
  );
};

export default Lights;