import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Create sphere distribution
      const radius = 2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Cyan/teal colors
      const colorIntensity = 0.5 + Math.random() * 0.5;
      colors[i3] = 0.08 * colorIntensity; // R
      colors[i3 + 1] = 0.72 * colorIntensity; // G
      colors[i3 + 2] = 0.65 * colorIntensity; // B
    }
    
    return [positions, colors];
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the sphere
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
      
      // Animate particles with wave effect
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Create wave distortion
        const wave = Math.sin(time * 0.5 + x * 0.5) * Math.cos(time * 0.3 + y * 0.5) * 0.1;
        const currentRadius = Math.sqrt(x * x + y * y + z * z);
        const targetRadius = 2 + wave;
        const scale = targetRadius / currentRadius;
        
        positions[i3] = x * (1 + (scale - 1) * 0.1);
        positions[i3 + 1] = y * (1 + (scale - 1) * 0.1);
        positions[i3 + 2] = z * (1 + (scale - 1) * 0.1);
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const ParticleSphere = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleSphere;
