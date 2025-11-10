import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

function Particles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  
  const particlesCount = 3000;
  
  // Create circular texture for round glowing points
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Create glow that will use vertex colors
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Create sphere distribution
      const radius = 2 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random sizes for particles
      sizes[i] = Math.random() * 0.15 + 0.05;
      
      // Blue and green colors with stronger intensity for glow
      const isBlue = Math.random() > 0.5;
      const colorIntensity = 0.8 + Math.random() * 0.2;
      
      if (isBlue) {
        // Bright blue particles
        colors[i3] = 0.2 * colorIntensity; // R
        colors[i3 + 1] = 0.6 * colorIntensity; // G
        colors[i3 + 2] = 1.0 * colorIntensity; // B
      } else {
        // Bright green particles
        colors[i3] = 0.2 * colorIntensity; // R
        colors[i3 + 1] = 1.0 * colorIntensity; // G
        colors[i3 + 2] = 0.5 * colorIntensity; // B
      }
    }
    
    return [positions, colors, sizes];
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Mouse interaction - rotate based on mouse position
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = mousePosition.y * 0.3;
      
      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
      
      // Add slow auto-rotation
      pointsRef.current.rotation.y += 0.002;
      
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
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        map={circleTexture}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleSphere = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="w-full h-full cursor-move" 
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ParticleSphere;
