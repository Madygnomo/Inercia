import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DadaShaderMaterial } from '../shaders/DadaShader';
import { useStore } from '../../store';

interface GlitchObjectProps {
  position: [number, number, number];
  color: THREE.Color;
  geometryType: 'box' | 'sphere' | 'torus';
  seed: number;
}

export const DadaObject: React.FC<GlitchObjectProps> = ({ position, color, geometryType, seed }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const geometry = useMemo(() => {
    switch (geometryType) {
      case 'box': return new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
      case 'sphere': return new THREE.SphereGeometry(1.5, 64, 64);
      case 'torus': return new THREE.TorusGeometry(1.2, 0.4, 64, 64);
      default: return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [geometryType]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollDepth: { value: 0 },
    uColor: { value: color },
    uSeed: { value: seed }
  }), [color, seed]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly update the shader's scroll depth
      materialRef.current.uniforms.uScrollDepth.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollDepth.value,
        scrollProgress,
        0.1
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={DadaShaderMaterial.vertexShader}
        fragmentShader={DadaShaderMaterial.fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

