import {
  Bloom,
  EffectComposer,
  HueSaturation,
  TiltShift2,
  Vignette
} from "@react-three/postprocessing";

export default function PostProcessingEffects() {
  return (
    <>
      <EffectComposer multisampling={4} disableNormalPass>
        <TiltShift2 blur={0.6} taper={0.8} />
        <Bloom
          luminanceThreshold={0.35}
          mipmapBlur
          radius={0.4}
          intensity={1}
        />
        <Bloom
          luminanceThreshold={0.1}
          mipmapBlur
          radius={0.5}
          intensity={0.6}
        />
        <Vignette darkness={0.55} />
        <HueSaturation hue={0.2} saturation={0.1} />
      </EffectComposer>
    </>
  );
}
