import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TubeCluster() {
  const containerGroup = useRef();
  const obj = useLoader(OBJLoader, '/18-cosmetic_tube/TUBE_LOW_POLY.obj');

  const bodyMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FDFBF7',
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), []);

  // Create clones so we can render multiple instances of the same OBJ safely
  const tubes = useMemo(() => {
    return Array.from({ length: 8 }).map(() => {
      const clone = obj.clone();
      clone.traverse((child) => {
        if (child.isMesh) {
          child.material = bodyMaterial;
        }
      });
      return clone;
    });
  }, [obj, bodyMaterial]);

  // Spread them out in a wide ring surrounding the center
  const positions = [
    [-4, 3, -2], [4, 3, -2],
    [-5, -1, 1], [5, -1, 1],
    [-3, -4, 0], [3, -4, 0],
    [-6, 2, -1], [6, 2, -1]
  ];

  // Random rotations to make it look dynamic and scattered
  const rotations = useMemo(() => positions.map(() => [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  ]), []);

  // "All have different different size"
  const targetScales = useMemo(() => positions.map(() => 0.005 + Math.random() * 0.012), []);

  useLayoutEffect(() => {
    if (!containerGroup.current) return;

    const ctx = gsap.context(() => {
      containerGroup.current.children.forEach((child, i) => {
        // Start them completely invisible/scaled to 0
        child.scale.set(0, 0, 0);

        // Pop in with an elastic bounce when the checkout section appears
        gsap.to(child.scale, {
          x: targetScales[i],
          y: targetScales[i],
          z: targetScales[i],
          duration: 1.5 + Math.random() * 0.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".checkout",
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous subtle floating effect
        gsap.to(child.position, {
          y: positions[i][1] + (Math.random() * 0.8 + 0.4),
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
        
        // Continuous slow tumbling
        gsap.to(child.rotation, {
          x: rotations[i][0] + 0.5,
          y: rotations[i][1] + 0.5,
          z: rotations[i][2] + 0.5,
          duration: 4 + Math.random() * 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
    });

    return () => ctx.revert();
  }, [tubes]);

  return (
    <group ref={containerGroup}>
      {tubes.map((tube, i) => (
        <group key={i} position={positions[i]} rotation={rotations[i]}>
          <primitive object={tube} />
        </group>
      ))}
    </group>
  );
}
