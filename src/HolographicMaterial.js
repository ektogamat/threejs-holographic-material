/**
 * Holographic material component by Anderson Mancini - Dec 2023.
 */

import React, { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Color, FrontSide, AdditiveBlending } from "three";

/**
 * @param {Number} fresnelAmount - Controls the value of the Fresnel effect. Ranges from 0.0 to 1.0.
 * @param {Number} fresnelOpacity - Controls the opacity of the Fresnel effect. Ranges from 0.0 to 1.0.
 * @param {Number} scanlineSize - Controls the size of the scanlines. Ranges from 1 to 15.
 * @param {Number} hologramBrightness - Controls the brightness of the hologram. Ranges from 0.0 to 2.0.
 * @param {Number} signalSpeed - Controls the speed of the signal effect. Ranges from 0.0 to 2.0.
 * @param {String} hologramColor - Specifies the color of the hologram. Use hexadecimal format.
 * @param {Boolean} enableBlinking - Enables or disables the blinking effect. Defaults to true.
 */

export default function HolographicMaterial({
    fresnelAmount = 0.45,
    fresnelOpacity = 1.0,
    scanlineSize = 8.0,
    hologramBrightness = 1.2,
    signalSpeed = 0.45,
    hologramColor = "#51a4de",
    enableBlinking = true,
    }) {

  const HolographicMaterial = shaderMaterial(
    {
      time: 0,
      fresnelOpacity: fresnelOpacity,
      fresnelAmount:fresnelAmount,
      scanlineSize: scanlineSize,
      hologramBrightness: hologramBrightness,
      signalSpeed: signalSpeed,
      hologramColor: new Color(hologramColor),
      enableBlinking: enableBlinking,
    },
    /*GLSL */
    `
      #define STANDARD
      varying vec3 vViewPosition;
      #ifdef USE_TRANSMISSION
      varying vec3 vWorldPosition;
      #endif
    
      varying vec2 vUv;
      varying vec4 vPos;
      varying vec3 vNormalW;
      varying vec3 vPositionW;

      #include <uv_pars_vertex>
      #include <displacementmap_pars_vertex>
      #include <color_pars_vertex>
      #include <fog_pars_vertex>
      #include <normal_pars_vertex>
      #include <morphtarget_pars_vertex>
      #include <skinning_pars_vertex>
      #include <shadowmap_pars_vertex>
      #include <logdepthbuf_pars_vertex>
      #include <clipping_planes_pars_vertex>

      void main() {
        
        #include <uv_vertex>

        #include <color_vertex>
        #include <morphcolor_vertex>
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
      
        vec3 newPosition = position;

        #include <defaultnormal_vertex>
        #include <normal_vertex>
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <displacementmap_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <clipping_planes_vertex>
        vViewPosition = - mvPosition.xyz;

        #include <worldpos_vertex>
        #include <shadowmap_vertex>
        #include <fog_vertex>
        #ifdef USE_TRANSMISSION
          vWorldPosition = worldPosition.xyz;
        #endif

        mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;

        vUv = uv;
        vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
        vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);
        vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );
        
        gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );

      }`,
    /*GLSL */
    ` 
      varying vec2 vUv;
      varying vec3 vPositionW;
      varying vec4 vPos;
      varying vec3 vNormalW;
      
      uniform float time;
      uniform float fresnelOpacity;
      uniform float scanlineSize;
      uniform float fresnelAmount;
      uniform float signalSpeed;
      uniform float hologramBrightness;
      uniform bool enableBlinking;
      uniform vec3 hologramColor;

      float flicker( float amt, float time ) {return clamp( fract( cos( time ) * 43758.5453123 ), amt, 1.0 );}
      float random(in float a, in float b) { return fract((cos(dot(vec2(a,b) ,vec2(12.9898,78.233))) * 43758.5453)); }

      void main() {
        vec2 vCoords = vPos.xy;
        vCoords /= vPos.w;
        vCoords = vCoords * 0.5 + 0.5;
        vec2 myUV = fract( vCoords );

        // Defines hologram main color
        vec4 hologramColor = vec4(hologramColor, mix(hologramBrightness, vUv.y, 0.5));

        // Add scanlines
        float scanlines = 10.;
        scanlines += 20. * sin(time *signalSpeed * 20.8 - myUV.y * 60. * scanlineSize);
        scanlines *= smoothstep(1.3 * cos(time *signalSpeed + myUV.y * scanlineSize), 0.78, 0.9);
        scanlines *= max(0.25, sin(time *signalSpeed) * 1.0);        
        
        // Scanlines offsets
        float r = random(vUv.x, vUv.y);
        float g = random(vUv.y * 20.2, 	vUv.y * .2);
        float b = random(vUv.y * .9, 	vUv.y * .2);

        // Scanline composition
        hologramColor += vec4(r*scanlines, b*scanlines, r, 1.0) / 84.;
        vec4 scanlineMix = mix(vec4(0.0), hologramColor, hologramColor.a);

        // Calculates fresnel
        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
        float fresnelEffect = dot(viewDirectionW, vNormalW) * (1.6 - fresnelOpacity/2.);
        fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0., fresnelOpacity);

        // Blinkin effect
        //Suggested by Octano - https://x.com/OtanoDesign?s=20
        float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
        float blink = flicker(blinkValue, time * signalSpeed * .02);
    
        // Final shader composition
        gl_FragColor = vec4( scanlineMix.rgb + fresnelEffect * blink, 1.0);

      }`,
  );

  extend({ HolographicMaterial });

  useFrame((state, delta) => {
    ref.current.time += delta;
  });

  const ref = useRef();

  return (
    <holographicMaterial
      key={HolographicMaterial.key}
      side={FrontSide}
      transparent={true}
      blending={AdditiveBlending}
      ref={ref}
    />
  );
}
