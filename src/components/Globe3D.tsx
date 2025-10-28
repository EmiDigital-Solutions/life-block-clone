import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Auditor marker locations (lat, long in degrees)
const auditorLocations = [
  { id: 1, lat: 51.5074, lon: -0.1278, name: 'London' }, // Europe
  { id: 2, lat: 48.8566, lon: 2.3522, name: 'Paris' }, // Europe
  { id: 3, lat: 35.6762, lon: 139.6503, name: 'Tokyo' }, // Asia
  { id: 4, lat: 31.2304, lon: 121.4737, name: 'Shanghai' }, // Asia
  { id: 5, lat: 40.7128, lon: -74.0060, name: 'New York' }, // Americas
  { id: 6, lat: -23.5505, lon: -46.6333, name: 'São Paulo' }, // Americas
  { id: 7, lat: -1.2921, lon: 36.8219, name: 'Nairobi' }, // Africa
  { id: 8, lat: 25.2048, lon: 55.2708, name: 'Dubai' }, // Middle East
  { id: 9, lat: 19.0760, lon: 72.8777, name: 'Mumbai' }, // South Asia
  { id: 10, lat: -33.8688, lon: 151.2093, name: 'Sydney' }, // Oceania
];

// Convert lat/lon to 3D coordinates on sphere
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

interface MarkerProps {
  position: THREE.Vector3;
  isActive: boolean;
}

const Marker = ({ position, isActive }: MarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.2);
    }
  });

  return (
    <group position={position}>
      {/* Pin base */}
      <mesh ref={meshRef} visible={isActive}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>
      
      {/* Glow effect */}
      {isActive && (
        <mesh scale={1.5}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const [activeMarkers, setActiveMarkers] = useState<Set<number>>(new Set());
  
  // Rotate globe continuously
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001; // 360° in ~20 seconds
    }
  });

  // Manage marker appearances
  useEffect(() => {
    const showRandomMarker = () => {
      const availableIds = auditorLocations
        .map(loc => loc.id)
        .filter(id => !activeMarkers.has(id));
      
      if (availableIds.length === 0) return;
      
      const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];
      
      setActiveMarkers(prev => new Set([...prev, randomId]));
      
      // Remove marker after 2-3 seconds
      const duration = 2000 + Math.random() * 1000;
      setTimeout(() => {
        setActiveMarkers(prev => {
          const next = new Set(prev);
          next.delete(randomId);
          return next;
        });
      }, duration);
    };

    // Initial markers
    const initialTimeout = setTimeout(showRandomMarker, 500);
    
    // Continuous marker appearance
    const interval = setInterval(() => {
      if (activeMarkers.size < 3) {
        showRandomMarker();
      }
    }, 1500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [activeMarkers]);

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#1a2332"
          emissive="#0a0f1a"
          emissiveIntensity={0.2}
          shininess={10}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Rim light (cyan glow) */}
      <Sphere args={[2.02, 64, 64]}>
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Markers */}
      {auditorLocations.map((location) => {
        const position = latLonToVector3(location.lat, location.lon, 2.05);
        return (
          <Marker
            key={location.id}
            position={position}
            isActive={activeMarkers.has(location.id)}
          />
        );
      })}
    </group>
  );
};

const Globe3D = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Canvas for 3D Globe */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#00D9FF" />
        
        {/* Globe and markers */}
        <Globe />
      </Canvas>

      {/* Floating animation wrapper */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 blur-3xl bg-cyan-400/5 scale-150 -z-10" />
    </div>
  );
};

export default Globe3D;
