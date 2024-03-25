# Holographic Material for React Three Fiber

A simple to use holographic material for threejs

<p align="center">
    <a href="https://threejs-holographic-material.vercel.app/" target="_blank"><img src="https://threejs-holographic-material.vercel.app/preview.jpg" width="100%"/></a>
</p>

Live link: <a href="https://threejs-holographic-material.vercel.app/" target="_blank">https://threejs-holographic-material.vercel.app/</a>

Code Sandbox example: <a href="https://codesandbox.io/p/sandbox/holographic-material-for-react-three-fiber-rpjgps" target="_blank">https://codesandbox.io/p/sandbox/holographic-material-for-react-three-fiber-rpjgps</a>

Code Sandbox simplest example: <a href="https://codesandbox.io/p/devbox/holographic-material-for-react-three-fiber-simple-example-hq24t2" target="_blank">https://codesandbox.io/p/devbox/holographic-material-for-react-three-fiber-simple-example-hq24t2</a>

# Introduction

Dive into a world of mesmerizing holographic wonders with the HolographicMaterial for React Three Fiber. This enchanting React component brings your virtual reality experiences to life, infusing them with a burst of vibrant colors, dynamic scanlines, and a touch of futuristic brilliance.

While this component operates independently of any post-processing, it achieves an enhanced visual appeal when coupled with bloom effects. The utilization of bloom proves particularly effective in rendering a captivating glow effect, especially in areas where overexposure is prevalent.

# HOW TO USE?

### 1: Download the Material

Create a new file with the contents of [this gist](https://gist.github.com/ektogamat/f33dce31ee3ab02ea68f7b7c18ecd016) on your project.

### 2: Import the material

```
import HolographicMaterial from "./HolographicMaterial";
```

### 3: Add this as a material for your mesh

```
...
<mesh>
 <sphereGeometry />
 <HolographicMaterial />
</mesh>
...

```

That's all that you need to use this component. Of course you can customize it as shown bellow.

# Properties

| Name               | Type    | Default     | Description                                                                                                             |
| ------------------ | ------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| fresnelAmount      | Number  | 0.45        | Controls the value of the Fresnel effect. Ranges from 0.0 to 1.0.                                                       |
| fresnelOpacity     | Number  | 1.0         | Controls the opacity of the Fresnel effect. Ranges from 0.0 to 1.0.                                                     |
| scanlineSize       | Number  | 8.0         | Controls the size of the scanlines. Ranges from 1 to 15.                                                                |
| hologramBrightness | Number  | 1.2         | Controls the brightness of the hologram. Ranges from 0.0 to 2.0.                                                        |
| signalSpeed        | Number  | 0.45        | Controls the speed of the signal effect. Ranges from 0.0 to 2.0.                                                        |
| hologramColor      | String  | "#51a4de"   | Specifies the color of the hologram. Use hexadecimal format.                                                            |
| enableBlinking     | Boolean | true        | Enables or disables the blinking effect. Defaults to true.                                                              |
| hologramOpacity    | Number  | 1.0         | Specifies the opacity of the hologram. Defaults to 1.0.                                                                 |
| enableBlinking     | Boolean | true        | Enables or disables the blinking effect. Defaults to true.                                                              |
| blinkFresnelOnly   | Boolean | true        | Enables or disables the blinking effect for the Fresnel only. Defaults to true.                                                      |
| side               | String  | "FrontSide" | Specifies side for the material, as String. Options are "FrontSide", "BackSide", "DoubleSide". Defaults to "FrontSide". |

Here is an example of how you can pass these props. If you pass any of those props, the default values will be overwritten.

```
<HolographicMaterial
    fresnelAmount={0.2}
    fresnelOpacity={0.15}
    hologramBrightness={0.7}
    scanlineSize={6}
    signalSpeed={2.3}
    hologramColor={"#ff0000"}
    hologramOpacity={1.0}
    blinkFresnelOnly={true}
    enableBlinking={true}
    enableAdditive={true}
    side={"FrontSide"}
/>
```

You can also use LEVA to create a panel, like in the demo, so you can tweak the parameters live.

```
  const holographicControls = useControls({
    fresnelAmount: { value: 0.45, min: 0.0, max: 1.0},
    fresnelOpacity: { value: 1.0,min: 0.0, max: 1.0},
    scanlineSize: { value: 8.0, min: 1.0, max: 15},
    hologramBrightness: { value: 1.2, min: 0.0, max: 2},
    signalSpeed: { value: 0.45, min: 0.0, max: 2},
    hologramOpacity: { value: 1.0, min: 0.0, max: 1.0},
    hologramColor: { value: "#51a4de"},
    enableBlinking: true,
    blinkFresnelOnly: true,
    enableAdditive: true,
    side: { options: ["FrontSide", "BackSide", "DoubleSide"] },
  });
```

Then you can just spread this object to use it in HolographicMaterial

```
 <HolographicMaterial  {...holographicControls} />
```

### Show, don't tell

Here you can [see a video with](https://www.youtube.com/watch?v=njJc-O_imb4) it in action and some options

### Next steps

- Adding an optional glitch effect
- Adding support for a vertex shader distortion glitch
- Adding support for video textures to be mapped as planes
- Convert the shader into a texture on runtime for better performance

### License

This component is an open-source creation released under the (MIT) license. While you're free to integrate and innovate with it, I would genuinely appreciate knowing when this HolographicMaterial component sparks creativity in your projects!

### Resources

Resources: [Threejs](https://threejs.org/), [WebGL](https://github.com/KhronosGroup/WebGL), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/), [React three post processing](https://github.com/pmndrs/react-postprocessing)

# Can you leave a star please?

Would be really appreciated if you are willing to give me a star here on GitHub 🎉 or buy me a coffee ☕ https://www.buymeacoffee.com/andersonmancini. The money will be used to produce more content about threejs or to buy new courses.
