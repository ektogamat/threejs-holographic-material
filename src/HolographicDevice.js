import {
  useGLTF,
  Float,
} from "@react-three/drei";
import HoloPuck from "./HoloPuck";
import HolographicMaterial from "./HolographicMaterial";
import { useControls } from "leva";
import Walker from "./Walker";
import BB8 from "./BB8";

export default function HolographicDevice(props) {
  const { nodes } = useGLTF("/darth-transformed.glb");

  const holographicControls = useControls({
    fresnelAmount: { value: 0.45, min: 0.0, max: 1.0, label: "Fresnel Amount" },
    fresnelOpacity: {
      value: 1.0,
      min: 0.0,
      max: 1.0,
      label: "Fresnel Opacity",
    },
    scanlineSize: { value: 8.0, min: 1.0, max: 15, label: "Scanline size" },
    hologramBrightness: { value: 1.2, min: 0.0, max: 2, label: "Brightness" },
    signalSpeed: { value: 0.45, min: 0.0, max: 2, label: "Signal Speed" },
    hologramOpacity: { value: 1.0, min: 0.0, max: 1.0, label: "Holo Opacity" },
    hologramColor: { value: "#51a4de", label: "Holo Color" },
    enableBlinking: true,
    blinkFresnelOnly: true,
    enableAdditive: true,
    enabled: true,
    Model: { options: ["VADER", "BB8", "WALKER"] },
    side: { options: ["FrontSide", "BackSide", "DoubleSide"] },
  });

  return (
    <group {...props} dispose={null}>
      <Float
        rotationIntensity={0.3}
        floatIntensity={10}
        speed={2}
        floatingRange={[-0.03, 0.03]}
      >
        {holographicControls.Model === "VADER" ? (
          <mesh geometry={nodes.defaultMaterial.geometry} castShadow scale={0.035}>
            {holographicControls.enabled ? (
              <HolographicMaterial  {...holographicControls} />
            ) : (
              <meshPhysicalMaterial
                metalness={1}
                roughness={0.3}
                clearcoat={1}
                clearcoatRoughness={0.2}
                envMapIntensity={0.8}
                color={"black"}
              />
            )}
          </mesh>
        ) : holographicControls.Model === "BB8" ? (
          <BB8 scale={0.07} position={[0.5, 0, 0]} />
        ) : (
          <Walker holographicControls={holographicControls} />
        )}
      </Float>

      <HoloPuck scale={2.5} position={[0, -1.3, 0]} />
    </group>
  );
}

useGLTF.preload("/darth-transformed.glb");
