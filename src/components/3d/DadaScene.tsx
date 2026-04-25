import React from 'react';
import { Canvas } from '@react-three/fiber';
import { DadaObject } from './DadaObject';
import * as THREE from 'three';
import { Environment, OrbitControls } from '@react-three/drei';

export const DadaScene: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <DadaObject 
          position={[-3, 2, 0]} 
          color={new THREE.Color(1.0, 0.2, 0.8)} 
          geometryType="sphere" 
          seed={10.5} 
        />
        <DadaObject 
          position={[3, -1, 2]} 
          color={new THREE.Color(0.2, 1.0, 0.2)} 
          geometryType="box" 
          seed={42.0} 
        />
        <DadaObject 
          position={[0, 0, -4]} 
          color={new THREE.Color(0.2, 0.4, 1.0)} 
          geometryType="torus" 
          seed={99.1} 
        />
        <DadaObject 
          position={[-4, -3, -2]} 
          color={new THREE.Color(1.0, 1.0, 0.0)} 
          geometryType="sphere" 
          seed={1.1} 
        />
        <DadaObject 
          position={[4, 3, -1]} 
          color={new THREE.Color(1.0, 0.4, 0.0)} 
          geometryType="torus" 
          seed={33.3} 
        />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
