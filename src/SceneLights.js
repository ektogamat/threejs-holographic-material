export default function SceneLights() {

    return (
      <directionalLight
        shadow-mapSize={1024}
        shadow-bias={-0.0001}
        shadow-normalBias={0.1}
        shadow-camera-near={0.1}
        shadow-camera-far={60}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        castShadow
        position={[-8, 18, 5]}
        intensity={1}
      />
    )
  }
  