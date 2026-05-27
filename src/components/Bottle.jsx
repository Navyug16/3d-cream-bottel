import React, { useRef, useLayoutEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Bottle(props) {
  const group = useRef();
  const innerGroup = useRef();
  
  // Continuous slow rotation & Mouse Parallax
  useFrame((state) => {
    if (innerGroup.current) {
      // Base slow rotation
      innerGroup.current.rotation.y += 0.002;
      
      // Mouse follow parallax
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      // Smooth interpolation for mouse follow
      innerGroup.current.rotation.x += 0.05 * (targetY - innerGroup.current.rotation.x);
      innerGroup.current.rotation.z += 0.05 * (targetX - innerGroup.current.rotation.z);
    }
  });

  // Load the cosmetic tube OBJ model
  const obj = useLoader(OBJLoader, '/18-cosmetic_tube/TUBE_LOW_POLY.obj');

  // Luxury Dark & Gold Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#050505', // Deep black/dark grey
    roughness: 0.15,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const capMaterial = new THREE.MeshPhysicalMaterial({
    color: '#C9A227', // Luxury Gold
    roughness: 0.2,
    metalness: 1.0,
    clearcoat: 0.5,
  });

  // Apply materials to the loaded model
  useLayoutEffect(() => {
    if (obj) {
      let i = 0;
      obj.traverse((child) => {
        if (child.isMesh) {
          if (i === 1 || child.name.toLowerCase().includes('cap')) {
            child.material = capMaterial;
          } else {
            child.material = bodyMaterial;
          }
          i++;
        }
      });
    }
  }, [obj]);

  useLayoutEffect(() => {
    if (!group.current) return;

    // SECTION 1: Hero - Bottle Right side, majestic
    group.current.position.set(3, -0.5, 1);
    group.current.rotation.set(0.1, -Math.PI * 0.2, -0.1);
    group.current.scale.set(1.5, 1.5, 1.5);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // smoother scrubbing
      }
    });

    // We have 8 main sections now + footer. We divide animation steps into roughly 8 parts.
    
    // SECTION 2: Product Story - Moves Left
    tl.to(group.current.position, { x: -3, y: 0, z: 2, duration: 1 }, 0);
    tl.to(group.current.rotation, { x: 0.2, y: Math.PI * 0.5, z: 0.1, duration: 1 }, 0);
    tl.to(group.current.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 1 }, 0);

    // SECTION 3: Why Soléa - Features (Center, slightly laid back)
    tl.to(group.current.position, { x: 0, y: -1, z: 1, duration: 1 }, 1);
    tl.to(group.current.rotation, { x: Math.PI * 0.25, y: Math.PI * 1.5, z: 0, duration: 1 }, 1);
    tl.to(group.current.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 1 }, 1);

    // SECTION 4: Ingredients - Moves Right
    tl.to(group.current.position, { x: 4, y: 0, z: 0, duration: 1 }, 2);
    tl.to(group.current.rotation, { x: 0, y: Math.PI * 2.2, z: -0.1, duration: 1 }, 2);
    
    // SECTION 5/6: Marquee & Experience - Moves Left
    tl.to(group.current.position, { x: -3, y: -0.5, z: 1, duration: 1 }, 3);
    tl.to(group.current.rotation, { x: 0.1, y: Math.PI * 0.7, z: 0.1, duration: 1 }, 3);

    // SECTION 7: How to Use - Moves Right
    tl.to(group.current.position, { x: 3.5, y: 0, z: 2, duration: 1 }, 4);
    tl.to(group.current.rotation, { x: 0.2, y: Math.PI * 1.8, z: -0.1, duration: 1 }, 4);

    // SECTION 8: Reviews - Moves Center, small
    tl.to(group.current.position, { x: 0, y: 1.5, z: -2, duration: 1 }, 5);
    tl.to(group.current.rotation, { x: 0.1, y: Math.PI * 2.5, z: 0, duration: 1 }, 5);
    tl.to(group.current.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1 }, 5);

    // SECTION 9: Final CTA - Epic Center zoom
    tl.to(group.current.position, { x: 0, y: 1, z: 3.5, duration: 1 }, 6);
    tl.to(group.current.rotation, { x: 0.1, y: Math.PI * 4, z: 0, duration: 1 }, 6);
    tl.to(group.current.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1 }, 6);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={innerGroup}>
        <primitive object={obj} scale={0.015} position={[0, -1, 0]} rotation={[0, 0, 0]} />
      </group>
    </group>
  );
}
