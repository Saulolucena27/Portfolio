import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

const TigerModel = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  // Animação de rotação contínua
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* Estrutura 3D estilizada */}
        <mesh ref={meshRef} scale={2.5}>
          {/* Icosaedro como base */}
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#b97836"
            wireframe
            emissive="#b97836"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Esferas orbitantes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 2,
              Math.sin((i / 6) * Math.PI * 2) * 2,
              0,
            ]}
          >
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial
              color="#e8a653"
              emissive="#e8a653"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Texto 3D */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          TIGER
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
      </Center>
    </group>
  );
};

export default TigerModel;
