import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Scene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#b97836" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default Scene