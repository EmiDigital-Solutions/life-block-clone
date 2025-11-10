import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleGlobe = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create particle positions on a sphere
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 2000;
    const radius = 3;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push(x, y, z);
    }
    
    return new Float32Array(temp);
  }, []);

  // Create wave pattern lines
  const lines = useMemo(() => {
    const temp = [];
    const segments = 50;
    const rings = 30;
    const radius = 3;

    // Create horizontal rings
    for (let ring = 0; ring < rings; ring++) {
      const phi = (ring / rings) * Math.PI;
      const ringRadius = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);

      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI * 2;
        const theta2 = ((i + 1) / segments) * Math.PI * 2;

        const x1 = ringRadius * Math.cos(theta1);
        const z1 = ringRadius * Math.sin(theta1);
        const x2 = ringRadius * Math.cos(theta2);
        const z2 = ringRadius * Math.sin(theta2);

        temp.push(x1, y, z1, x2, y, z2);
      }
    }

    // Create vertical lines
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      
      for (let ring = 0; ring < rings - 1; ring++) {
        const phi1 = (ring / rings) * Math.PI;
        const phi2 = ((ring + 1) / rings) * Math.PI;

        const r1 = radius * Math.sin(phi1);
        const y1 = radius * Math.cos(phi1);
        const r2 = radius * Math.sin(phi2);
        const y2 = radius * Math.cos(phi2);

        const x1 = r1 * Math.cos(theta);
        const z1 = r1 * Math.sin(theta);
        const x2 = r2 * Math.cos(theta);
        const z2 = r2 * Math.sin(theta);

        temp.push(x1, y1, z1, x2, y2, z2);
      }
    }

    return new Float32Array(temp);
  }, []);

  // Animate particles and wave
  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Add subtle floating animation to particles
        const length = Math.sqrt(x * x + y * y + z * z);
        const offset = Math.sin(time * 2 + i * 0.01) * 0.05;
        
        positions[i] = x * (1 + offset / length);
        positions[i + 1] = y * (1 + offset / length);
        positions[i + 2] = z * (1 + offset / length);
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Wave animation on the net
        const length = Math.sqrt(x * x + y * y + z * z);
        const wave = Math.sin(time * 3 + x * 0.5 + y * 0.5 + z * 0.5) * 0.1;
        
        positions[i] = x * (1 + wave / length);
        positions[i + 1] = y * (1 + wave / length);
        positions[i + 2] = z * (1 + wave / length);
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00d4ff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Wave net */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff88" transparent opacity={0.6} />
      </lineSegments>
    </>
  );
};

const AnimatedParticleSphere = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleGlobe />
      </Canvas>
    </div>
  );
};

export default AnimatedParticleSphere;
