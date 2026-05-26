import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { Bottle } from './Bottle';
import { TubeCluster } from './TubeCluster';

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          {/* Subtle floating particles for a premium atmosphere */}
          <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.3} color="#D11A2A" />
          
          <Bottle />
          <TubeCluster />
          
          <Environment preset="city" />
          
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
