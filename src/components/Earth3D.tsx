import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the earth
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Realistic slow rotation
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#1e40af"
        emissiveIntensity={0.3}
        roughness={0.7}
        metalness={0.2}
      />
      {/* Grid pattern to simulate continents */}
      <meshBasicMaterial
        attach="material"
        transparent
        opacity={0.3}
        wireframe
        color="#60a5fa"
      />
    </Sphere>
  );
};

const Earth3D = ({ width = "100%", height = "400px" }: { width?: string; height?: string }) => {
  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.5} />
        
        {/* Directional light to simulate sun */}
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Point light for glow effect */}
        <pointLight position={[0, 0, 5]} intensity={1} color="#60a5fa" />
        
        {/* The Earth */}
        <EarthSphere />
        
        {/* Glow effect - outer sphere */}
        <Sphere args={[2.8, 32, 32]}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Allow manual rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;
