import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

function Particles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  
  const particlesCount = 3000;
  
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
      
      // Blue and green colors
      const isBlue = Math.random() > 0.5;
      const colorIntensity = 0.6 + Math.random() * 0.4;
      
      if (isBlue) {
        // Blue particles
        colors[i3] = 0.1 * colorIntensity; // R
        colors[i3 + 1] = 0.5 * colorIntensity; // G
        colors[i3 + 2] = 1.0 * colorIntensity; // B
      } else {
        // Green particles
        colors[i3] = 0.1 * colorIntensity; // R
        colors[i3 + 1] = 0.9 * colorIntensity; // G
        colors[i3 + 2] = 0.4 * colorIntensity; // B
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
      
      // Convert mouse position to 3D space
      const mouse3D = new THREE.Vector3(
        mousePosition.x * 3,
        mousePosition.y * 3,
        2
      );
      
      // Animate particles with wave effect and mouse interaction
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const sizesAttr = pointsRef.current.geometry.attributes.size.array as Float32Array;
      
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
        
        // Calculate distance to mouse in 3D space
        const particlePos = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        const distance = particlePos.distanceTo(mouse3D);
        
        // Pulsating size effect
        const basePulse = Math.sin(time * 2 + i * 0.1) * 0.02 + 1;
        
        // Mouse proximity effect - particles zoom out when mouse is near
        const maxDistance = 2;
        const mouseInfluence = Math.max(0, 1 - distance / maxDistance);
        const zoomEffect = 1 + mouseInfluence * 2; // Particles grow up to 3x when mouse is close
        
        // Apply both effects to size
        sizesAttr[i] = sizes[i] * basePulse * zoomEffect;
        
        // Push particles away from mouse
        if (mouseInfluence > 0) {
          const pushStrength = mouseInfluence * 0.3;
          const direction = particlePos.sub(mouse3D).normalize();
          positions[i3] += direction.x * pushStrength;
          positions[i3 + 1] += direction.y * pushStrength;
          positions[i3 + 2] += direction.z * pushStrength;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
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
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
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
