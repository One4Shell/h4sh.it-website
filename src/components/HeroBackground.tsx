import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a plane with a custom shader or a wireframe mesh
    const geometry = new THREE.PlaneGeometry(20, 20, 40, 40);
    const material = new THREE.MeshBasicMaterial({
      color: '#10b981',
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -2;
    scene.add(mesh);

    camera.position.z = 5;
    camera.position.y = 1;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);

      // Animate vertices for a wave effect
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + elapsedTime) * 0.5 + Math.cos(y * 0.5 + elapsedTime) * 0.5;
      }
      geometry.attributes.position.needsUpdate = true;

      mesh.rotation.z = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 pointer-events-none opacity-40"
      style={{
        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
      }}
    />
  );
};
