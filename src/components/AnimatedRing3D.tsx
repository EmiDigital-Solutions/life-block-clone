import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh } from 'three';
import { Environment } from '@react-three/drei';

function Ring() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow, elegant rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + 0.3;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
      <torusGeometry args={[1, 0.35, 64, 128]} />
      <meshStandardMaterial
        color="#6EA996"
        roughness={0.15}
        metalness={0.1}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

export function AnimatedRing3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          
          {/* Environment for realistic reflections */}
          <Environment preset="studio" />
          
          {/* The Ring */}
          <Ring />
        </Suspense>
      </Canvas>
    </div>
  );
}
