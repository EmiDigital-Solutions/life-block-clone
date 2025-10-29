import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SmallSphereProps {
  position: [number, number, number];
  index: number;
}

const SmallSphere = ({ position, index }: SmallSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Random initial phase for varied animation
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  // Random color assignment: white, cyan, or teal
  const baseColor = useMemo(() => {
    const colors = [
      new THREE.Color(1, 1, 1),      // white
      new THREE.Color(0, 1, 1),      // cyan
      new THREE.Color(0, 0.8, 0.8),  // teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time + phase + index * 0.1) * 0.1;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + phase) * 0.05;
      
      // Scale and color shift on hover
      const targetScale = hovered ? 1.5 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (hovered) {
        // Shift to cyan when hovered
        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(
          new THREE.Color(0, 1, 1),
          0.1
        );
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive.lerp(
          new THREE.Color(0, 0.5, 0.5),
          0.1
        );
      } else {
        // Return to base color
        (meshRef.current.material as THREE.MeshStandardMaterial).color.lerp(baseColor, 0.1);
        (meshRef.current.material as THREE.MeshStandardMaterial).emissive.lerp(
          new THREE.Color(0, 0, 0),
          0.1
        );
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
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={new THREE.Color(0, 0, 0)}
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

const SphereGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate positions for 60 small spheres arranged in sphere formation
  const spherePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 2;
    const count = 60;
    
    // Fibonacci sphere distribution for even spacing
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      positions.push([x, y, z]);
    }
    
    return positions;
  }, []);

  // Gentle rotation of entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {spherePositions.map((pos, index) => (
        <SmallSphere key={index} position={pos} index={index} />
      ))}
    </group>
  );
};

const InteractiveSphere = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] lg:h-[700px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={0.6} color="#00cccc" />
        
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
