import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import worldMapGlobe from '@/assets/world-map-globe.png';

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, worldMapGlobe);

  // Rotate the earth realistically
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Realistic slow rotation
    }
  });

  return (
    <>
      {/* Main Earth with dotted map texture */}
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Outer glow sphere */}
      <Sphere args={[2.7, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
};

const Earth3D = ({ width = "100%", height = "400px" }: { width?: string; height?: string }) => {
  return (
    <div style={{ width, height, position: 'relative' }}>
      {/* Animated background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[80%] h-[80%] rounded-full bg-blue-500/20 blur-3xl animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.8} />
        
        {/* Directional light to simulate sun */}
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        
        {/* Blue accent lights */}
        <pointLight position={[-5, 0, 5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[5, 0, 5]} intensity={1.5} color="#60a5fa" />
        
        {/* The Earth with dotted map */}
        <EarthSphere />
        
        {/* Allow manual rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;
