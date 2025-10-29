import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface SphereProps {
  position: [number, number, number];
}

function Sphere({ position }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.5 : 1;
      setScale((prev) => prev + (targetScale - prev) * 0.1);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={hovered ? "#22d3ee" : "#ffffff"}
        emissive={hovered ? "#22d3ee" : "#000000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const spheres: [number, number, number][] = [];

  // Create sphere positions in a globe pattern
  const radius = 3;
  const latitudes = 12;
  const longitudes = 24;

  for (let lat = 0; lat < latitudes; lat++) {
    const theta = (lat / latitudes) * Math.PI;
    for (let lon = 0; lon < longitudes; lon++) {
      const phi = (lon / longitudes) * Math.PI * 2;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      spheres.push([x, y, z]);
    }
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((position, index) => (
        <Sphere key={index} position={position} />
      ))}
    </group>
  );
}

const InteractiveGlobe = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Globe />
    </Canvas>
  );
};

export default InteractiveGlobe;
