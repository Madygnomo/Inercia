import * as THREE from 'three';

export const DadaShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uScrollDepth: { value: 0 },
    uColor: { value: new THREE.Color(1.0, 0.0, 1.0) },
    uSeed: { value: Math.random() * 100.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    uniform float uScrollDepth;
    uniform float uSeed;

    // Classic Perlin Noise computation
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec2 taylorInvSqrt(vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      
      // Jitter and displacement based on scroll depth (Frustration = Memory * Boredom)
      // High frequency noise when scroll depth is low (colorful chaos)
      // Flattens out as scroll deepens (darkness, inertia)
      float noiseFactor = (1.0 - uScrollDepth) * 2.0;
      vec2 noisePos = vec2(position.x * 2.0 + uTime + uSeed, position.y * 2.0 + uTime);
      float elevation = snoise(noisePos) * 0.2 * noiseFactor;
      
      vElevation = elevation;

      vec3 newPosition = position;
      newPosition.z += elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vElevation;

    uniform float uTime;
    uniform float uScrollDepth;
    uniform vec3 uColor;
    
    // Frustration = Memory * Boredom
    // Scroll depth is 0.0 to 1.0. We want it pitch black at 0.0 and 1.0.
    // It should bloom into color in the middle.

    void main() {
      // Base vibrant color mixed with elevation logic
      vec3 glitchColor = uColor + vec3(vElevation * 2.0, -vElevation, vElevation * 1.5);
      
      // Calculate intensity based on a sine wave (0 to PI)
      float intensity = sin(uScrollDepth * 3.14159265);
      
      // Final color computation
      vec3 finalColor = mix(vec3(0.0, 0.0, 0.0), glitchColor, intensity);
      
      // Optional: Add some Dadaist CRT scanlines
      float scanline = sin(vUv.y * 800.0 + uTime * 10.0) * 0.04 * intensity;
      finalColor -= scanline;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};
