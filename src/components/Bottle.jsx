import React, { useRef, useLayoutEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Bottle(props) {
  const group = useRef();
  
  // Load the new cosmetic tube OBJ model
  const obj = useLoader(OBJLoader, '/18-cosmetic_tube/TUBE_LOW_POLY.obj');

  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FDFBF7', // Off-white
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const capMaterial = new THREE.MeshPhysicalMaterial({
    color: '#D11A2A', // Luxury bright red
    roughness: 0.3,
    metalness: 0.2,
  });

  // Apply our luxury materials to the loaded model
  useLayoutEffect(() => {
    if (obj) {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material = bodyMaterial;
        }
      });
    }
  }, [obj]);

  useLayoutEffect(() => {
    if (!group.current) return;

    // Reset initial state (Hero Section - Bottle Left)
    group.current.position.set(-3, -0.5, 1);
    group.current.rotation.set(0.1, Math.PI * 0.2, 0.1);
    group.current.scale.set(1.2, 1.2, 1.2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth scrubbing
      }
    });

    // 1. Hero -> Ingredients Section (Bottle moves Right, tilts forward)
    tl.to(group.current.position, { x: 3.5, y: 0, z: 1, duration: 1 }, 0);
    tl.to(group.current.rotation, { x: 0.5, y: -Math.PI * 0.5, z: -0.2, duration: 1 }, 0);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 0);

    // 2. Ingredients -> SPF Section (Bottle moves Left, lays flat on its side)
    tl.to(group.current.position, { x: -2.5, y: -1, z: 3, duration: 1 }, 1);
    tl.to(group.current.rotation, { x: Math.PI * 0.4, y: Math.PI, z: 0, duration: 1 }, 1);
    tl.to(group.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }, 1);

    // 3. SPF -> Benefits Section (Bottle stands back up, Right side)
    tl.to(group.current.position, { x: 3, y: -0.5, z: 0, duration: 1 }, 2);
    tl.to(group.current.rotation, { x: 0, y: -Math.PI * 0.8, z: -0.1, duration: 1 }, 2);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 2);

    // 4. Benefits -> How to Apply Section (Bottle gets very close on the Left)
    tl.to(group.current.position, { x: -3, y: -0.5, z: 4, duration: 1 }, 3);
    tl.to(group.current.rotation, { y: Math.PI * 0.25, z: 0.2, duration: 1 }, 3);
    tl.to(group.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 }, 3);

    // 5. How to Apply -> Glossary Section (Bottle spins to the Right)
    tl.to(group.current.position, { x: 3, y: -0.5, z: 0, duration: 1 }, 4);
    tl.to(group.current.rotation, { y: Math.PI * 2.5, z: -0.1, duration: 1 }, 4);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 4);

    // 6. Glossary -> Reviews Section (Bottle moves Left)
    tl.to(group.current.position, { x: -3, y: -0.5, z: 1, duration: 1 }, 5);
    tl.to(group.current.rotation, { y: Math.PI * 0.5, z: 0.2, duration: 1 }, 5);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 5);

    // 7. Reviews -> FAQ Section (Bottle moves Right)
    tl.to(group.current.position, { x: 3, y: -0.5, z: 0, duration: 1 }, 6);
    tl.to(group.current.rotation, { y: -Math.PI * 0.5, z: -0.1, duration: 1 }, 6);
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 6);

    // 8. FAQ -> Checkout Section (Bottle moves up center, smaller scale, spins)
    tl.to(group.current.position, { x: 0, y: 2.5, z: -1, duration: 1 }, 7);
    tl.to(group.current.rotation, { x: 0.2, y: Math.PI * 4, z: 0, duration: 1 }, 7);
    tl.to(group.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1 }, 7);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* 
        We render the loaded OBJ here. 
        Reduced scale because the model was too big.
      */}
      <primitive object={obj} scale={0.015} position={[0, -1, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}
