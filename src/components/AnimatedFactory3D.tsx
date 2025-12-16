import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Group } from 'three';
import { Environment, Float } from '@react-three/drei';

// Wireframe building block component
function WireframeBox({ 
  position, 
  size, 
  color = "#6EA996" 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Solid accent element
function SolidBox({ 
  position, 
  size, 
  color = "#0A7FA5" 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Scanning grid line that moves
function ScanLine() {
  const lineRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const y = Math.sin(state.clock.elapsedTime) * 1.8;
      lineRef.current.position.y = y;
    }
  });

  return (
    <group ref={lineRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 0.05]} />
        <meshBasicMaterial color="#0A7FA5" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Main factory structure
function Factory() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.1}>
        {/* Main factory building - center */}
        <WireframeBox position={[0, 0, 0]} size={[2.5, 1.8, 2]} color="#6EA996" />
        
        {/* Tall section - warehouse left */}
        <WireframeBox position={[-1.8, 0.6, 0]} size={[1.2, 3, 1.8]} color="#6EA996" />
        
        {/* Office wing right */}
        <WireframeBox position={[1.8, 0.3, 0]} size={[1.2, 2.4, 1.5]} color="#6EA996" />
        
        {/* Smokestack */}
        <SolidBox position={[-2.2, 2, 0.5]} size={[0.3, 1.2, 0.3]} color="#0A7FA5" />
        
        {/* Loading dock - highlighted */}
        <SolidBox position={[0, -0.7, 1.2]} size={[1.8, 0.4, 0.4]} color="#0A7FA5" />
        
        {/* Entrance door */}
        <SolidBox position={[1.8, -0.3, 0.9]} size={[0.5, 1.2, 0.15]} color="#0A7FA5" />
        
        {/* Roof accent */}
        <WireframeBox position={[0, 1.1, 0]} size={[2.7, 0.15, 2.2]} color="#0A7FA5" />
        <WireframeBox position={[-1.8, 2.3, 0]} size={[1.4, 0.15, 2]} color="#0A7FA5" />
        
        {/* Ground grid */}
        <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7, 7, 14, 14]} />
          <meshBasicMaterial color="#6EA996" wireframe transparent opacity={0.2} />
        </mesh>
        
        {/* Scanning effect */}
        <ScanLine />
        
        {/* Audit checkpoint markers - glowing corners */}
        {[
          [-2.8, -1, 1.3],
          [2.8, -1, 1.3],
          [-2.8, -1, -1.3],
          [2.8, -1, -1.3],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#0A7FA5"
              emissive="#0A7FA5"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function AnimatedFactory3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [6, 4, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 8, 5]} intensity={1.2} />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />
          <pointLight position={[0, 6, 0]} intensity={0.4} color="#ffffff" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* The Factory */}
          <Factory />
        </Suspense>
      </Canvas>
    </div>
  );
}
