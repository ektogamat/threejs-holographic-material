import { CameraControls, Environment, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import SkyBox from './SkyBox'
import HolographicDevice from './HolographicDevice'
import PostProcessingEffects from './Effects'

export function App() {
  return (
    <>
    <Canvas camera={{ position: [0, 0, 32], fov: '35' }} gl={{ alpha: false, stencil: false, antialias: false, depth: false }} dpr={1}>
      <SkyBox />

      <CameraControls dollySpeed={0.1} dollyToCursor={true} maxDistance={35} minDistance={6} />
      <directionalLight position={[100, 10, 200]} intensity={3} />

      <Environment preset="apartment" />
      <HolographicDevice position={[0, -3.5, 0]} />

      <PostProcessingEffects />
    </Canvas>
    <Loader />
    </>
  )
}
