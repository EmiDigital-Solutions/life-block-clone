import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import { Mesh, Group } from 'three';
import { Environment } from '@react-three/drei';

function HelixStrand({ offset = 0, color = "#6EA996" }: { offset?: number; color?: string }) {
  const groupRef = useRef<Group>(null);
  
  // Generate helix points
  const spheres = useMemo(() => {
    const points = [];
    const segments = 24;
    const radius = 1.2;
    const height = 4;
    
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 3 + offset; // 1.5 rotations
      const y = (t - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push({ x, y, z, scale: 0.12 + Math.sin(t * Math.PI) * 0.08 });
    }
    return points;
  }, [offset]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[point.scale, 16, 16]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            envMapIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectingBars() {
  const groupRef = useRef<Group>(null);
  
  const bars = useMemo(() => {
    const connections = [];
    const segments = 12;
    const radius = 1.2;
    const height = 4;
    
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const angle1 = t * Math.PI * 3;
      const angle2 = t * Math.PI * 3 + Math.PI;
      const y = (t - 0.5) * height;
      
      connections.push({
        pos1: [Math.cos(angle1) * radius, y, Math.sin(angle1) * radius],
        pos2: [Math.cos(angle2) * radius, y, Math.sin(angle2) * radius],
        y
      });
    }
    return connections;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => {
        const midX = (bar.pos1[0] + bar.pos2[0]) / 2;
        const midZ = (bar.pos1[2] + bar.pos2[2]) / 2;
        const length = Math.sqrt(
          Math.pow(bar.pos2[0] - bar.pos1[0], 2) + 
          Math.pow(bar.pos2[2] - bar.pos1[2], 2)
        );
        const angle = Math.atan2(bar.pos2[2] - bar.pos1[2], bar.pos2[0] - bar.pos1[0]);
        
        return (
          <mesh 
            key={i} 
            position={[midX, bar.y, midZ]}
            rotation={[0, -angle, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.03, 0.03, length, 8]} />
            <meshStandardMaterial
              color="#0A7FA5"
              roughness={0.3}
              metalness={0.2}
              envMapIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Helix() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Two helix strands */}
      <HelixStrand offset={0} color="#6EA996" />
      <HelixStrand offset={Math.PI} color="#0A7FA5" />
      
      {/* Connecting bars */}
      <ConnectingBars />
    </group>
  );
}

export function AnimatedHelix3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          
          {/* Environment for realistic reflections */}
          <Environment preset="studio" />
          
          {/* The Helix */}
          <Helix />
        </Suspense>
      </Canvas>
    </div>
  );
}
