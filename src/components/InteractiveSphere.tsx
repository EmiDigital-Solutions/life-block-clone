import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SmallSphereProps {
  position: [number, number, number];
  index: number;
  size: number;
  baseColor: THREE.Color;
  emissiveIntensity: number;
}

const SmallSphere = ({ position, index, size, baseColor, emissiveIntensity }: SmallSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random initial phase for varied animation
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle pulse animation
      const pulseScale = 1 + Math.sin(time * 2 + phase) * 0.05;
      
      // Scale on hover
      const targetScale = hovered ? 1.3 : pulseScale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (hovered) {
        // Brighten and push outward slightly when hovered
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0;
      } else {
        // Return to base emissive intensity
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = emissiveIntensity;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={emissiveIntensity}
        metalness={0.1}
        roughness={0.2}
        toneMapped={false}
      />
    </mesh>
  );
};

const SphereGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate spheres with positions, sizes, and colors
  const sphereData = useMemo(() => {
    const data: Array<{
      position: [number, number, number];
      size: number;
      color: THREE.Color;
      emissiveIntensity: number;
    }> = [];
    
    const radius = 2.5;
    const count = 100;
    
    // Color palette matching reference
    const colors = [
      { color: new THREE.Color(1, 1, 1), weight: 0.4 },        // white
      { color: new THREE.Color(0, 0.85, 1), weight: 0.3 },     // cyan
      { color: new THREE.Color(0, 1, 0.61), weight: 0.2 },     // lime/green
      { color: new THREE.Color(0.02, 1, 0.65), weight: 0.1 },  // teal
    ];
    
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      // Determine size - 60% small, 30% medium, 10% large
      const rand = Math.random();
      let size: number;
      if (rand < 0.6) {
        size = 0.08 + Math.random() * 0.04; // small: 0.08-0.12
      } else if (rand < 0.9) {
        size = 0.15 + Math.random() * 0.05; // medium: 0.15-0.2
      } else {
        size = 0.25 + Math.random() * 0.1; // large: 0.25-0.35
      }
      
      // Pick color based on weights
      const colorRand = Math.random();
      let selectedColor = colors[0].color;
      let cumulativeWeight = 0;
      for (const colorData of colors) {
        cumulativeWeight += colorData.weight;
        if (colorRand <= cumulativeWeight) {
          selectedColor = colorData.color;
          break;
        }
      }
      
      // Calculate depth-based emissive intensity (brighter in front, dimmer in back)
      const normalizedZ = (z + radius) / (2 * radius); // 0 to 1, where 1 is front
      const emissiveIntensity = 0.5 + normalizedZ * 1.5; // 0.5 to 2.0
      
      data.push({
        position: [x, y, z],
        size,
        color: selectedColor.clone(),
        emissiveIntensity,
      });
    }
    
    return data;
  }, []);

  // Slow rotation of entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {sphereData.map((data, index) => (
        <SmallSphere
          key={index}
          position={data.position}
          index={index}
          size={data.size}
          baseColor={data.color}
          emissiveIntensity={data.emissiveIntensity}
        />
      ))}
    </group>
  );
};

const InteractiveSphere = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] lg:h-[700px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced Lighting for depth */}
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 8]} intensity={1.5} color="#00D9FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00FF9D" />
        <pointLight position={[0, 8, 0]} intensity={1.0} color="#FFFFFF" />
        <pointLight position={[0, -8, 0]} intensity={0.6} color="#06FFA5" />
        
        {/* Sphere Group */}
        <SphereGroup />
        
        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveSphere;
