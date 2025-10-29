import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Particle sphere component
function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate sphere particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3); // 3000 particles
    const radius = 2.5;
    
    for (let i = 0; i < 3000; i++) {
      // Fibonacci sphere distribution for even particle spacing
      const phi = Math.acos(-1 + (2 * i) / 3000);
      const theta = Math.sqrt(3000 * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, []);
  
  // Animate rotation
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D9FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Animated auditor markers
function AuditorMarkers() {
  const markerRefs = useRef<THREE.Mesh[]>([]);
  
  // Marker positions on globe (lat/long converted to 3D)
  const markerPositions = useMemo(() => {
    const radius = 2.55;
    const locations = [
      { lat: 52, lng: 13 },   // Europe (Berlin)
      { lat: 35, lng: 139 },  // Asia (Tokyo)
      { lat: -1, lng: 36 },   // Africa (Nairobi)
      { lat: 40, lng: -74 },  // Americas (New York)
      { lat: 25, lng: 55 },   // Middle East (Dubai)
      { lat: 28, lng: 77 },   // South Asia (Delhi)
    ];
    
    return locations.map(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    });
  }, []);
  
  useFrame((state) => {
    markerRefs.current.forEach((marker, i) => {
      if (marker) {
        // Pulsing animation
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.3;
        marker.scale.set(scale, scale, scale);
        
        // Opacity fade in/out
        if (marker.material instanceof THREE.MeshBasicMaterial) {
          marker.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.4;
        }
      }
    });
  });
  
  return (
    <group>
      {markerPositions.map((pos, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) markerRefs.current[index] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.8}
          />
          {/* Glow ring */}
          <mesh scale={1.5}>
            <ringGeometry args={[0.1, 0.12, 32]} />
            <meshBasicMaterial
              color="#00D9FF"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

// Rim light effect
function RimLight() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00D9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066FF" />
    </>
  );
}

// Main component
export const ParticleGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <RimLight />
        <ParticleSphere />
        <AuditorMarkers />
        
        {/* Outer glow sphere */}
        <Sphere args={[2.6, 64, 64]}>
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};
