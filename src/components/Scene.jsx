import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { Bottle } from './Bottle';
import { TubeCluster } from './TubeCluster';

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        
        {/* Dark Cinematic Lighting */}
        <ambientLight intensity={0.2} color="#ffffff" />
        
        {/* Key light - Bright white for sharp reflections */}
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={2.5} castShadow color="#ffffff" />
        
        {/* Fill light - Subtle gold/cream */}
        <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#C9A227" />
        
        {/* Ambient background glow - Gold */}
        <pointLight position={[0, 0, -3]} intensity={3} color="#C9A227" distance={15} />

        <Suspense fallback={null}>
          {/* Gold luxury particles */}
          <Sparkles count={300} scale={15} size={2.5} speed={0.3} opacity={0.6} color="#C9A227" />
          
          <Bottle />
          
          {/* We will hide TubeCluster or style it dark too, but let's just omit it for cleaner portfolio focus, or keep it dark */}
          {/* <TubeCluster /> */}
          
          <Environment preset="city" />
          
          {/* Sharp realistic shadow */}
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.8} 
            scale={20} 
            blur={1.5} 
            far={4.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
