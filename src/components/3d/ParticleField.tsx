import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store';

export const ParticleField: React.FC<{ count: number, startY: number, endY: number }> = ({ count, startY, endY }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  // Generamos las posiciones de las partículas en un cilindro/túnel vertical
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorTheme = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribuidas a lo largo del eje Y
      const y = startY + Math.random() * (endY - startY);
      
      // En un radio aleatorio (x, z)
      const radius = 2 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Colores iniciales variados (Dadaísmo)
      colorTheme.setHSL(Math.random(), 0.8, 0.6);
      col[i3] = colorTheme.r;
      col[i3 + 1] = colorTheme.g;
      col[i3 + 2] = colorTheme.b;
    }
    return [pos, col];
  }, [count, startY, endY]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotación suave global de las partículas
      pointsRef.current.rotation.y += delta * 0.05;

      // Hacemos que la opacidad del material de partículas baje a medida que el scroll baja
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      const targetOpacity = 1.0 - Math.pow(scrollProgress, 1.5);
      
      // Interpolación suave para el color y la opacidad
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
      
      // Si el scroll está casi al 100% (fondo), todo es negro
      if (scrollProgress > 0.9) {
          mat.color.lerp(new THREE.Color(0x000000), 0.05);
      } else {
          mat.color.setHex(0xffffff);
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
