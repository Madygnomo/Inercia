import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { DadaObject } from './DadaObject';
import { ParticleField } from './ParticleField';
import * as THREE from 'three';
import { useStore } from '../../store';

const CameraController = () => {
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame((state) => {
    // Calculamos la profundidad total de la experiencia (Y va en negativo conforme bajamos)
    const MAX_DEPTH = -120; // 120 unidades de profundidad hacia abajo
    const targetY = scrollProgress * MAX_DEPTH;

    // Movimiento suave (easing) de la cámara hacia el objetivo
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Leve bamboleo basado en el tiempo
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  });

  return null;
};

export const DadaScene: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        
        {/* Campo de Partículas distribuidas a lo largo de toda la caída */}
        <ParticleField count={3000} startY={5} endY={-140} />
        
        {/* Generamos un "feed" de objetos distribuidos en el eje Y hacia abajo */}
        <group>
          {/* Nodo 0 (Inicio) */}
          <DadaObject position={[0, -2, 0]} color={new THREE.Color(1.0, 0.2, 0.8)} geometryType="sphere" seed={10} />
          
          {/* Nodo 1 */}
          <DadaObject position={[-3, -15, -2]} color={new THREE.Color(0.2, 1.0, 0.2)} geometryType="box" seed={42} />
          
          {/* Nodo 2 */}
          <DadaObject position={[3, -30, -4]} color={new THREE.Color(0.2, 0.4, 1.0)} geometryType="torus" seed={99} />
          
          {/* Nodo 3 */}
          <DadaObject position={[-2, -45, 1]} color={new THREE.Color(1.0, 1.0, 0.0)} geometryType="sphere" seed={1} />
          
          {/* Nodo 4 */}
          <DadaObject position={[4, -60, -3]} color={new THREE.Color(1.0, 0.4, 0.0)} geometryType="torus" seed={33} />

           {/* Nodo 5 */}
           <DadaObject position={[-4, -75, -1]} color={new THREE.Color(0.0, 1.0, 0.8)} geometryType="box" seed={77} />

           {/* Nodo 6 */}
           <DadaObject position={[2, -90, -5]} color={new THREE.Color(0.8, 0.2, 1.0)} geometryType="sphere" seed={55} />

           {/* Nodo 7 */}
           <DadaObject position={[-1, -105, 0]} color={new THREE.Color(1.0, 1.0, 1.0)} geometryType="torus" seed={88} />
        </group>
        
      </Canvas>
    </div>
  );
};

