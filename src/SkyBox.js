import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'

export default function SkyBox() {
  const texture = useTexture('/starwars_bg2.jpg')

  return (
    <mesh rotation={[0, -1.6, 0]}>
      <sphereGeometry castShadow={false} receiveShadow={false} args={[50, 16, 16]} />
      <meshBasicMaterial toneMapped={false} map={texture} side={BackSide} />
    </mesh>
  )
}
