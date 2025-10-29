import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SphereProps {
  position: [number, number, number];
  color: string;
}

const Sphere = ({ position, color }: SphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.8 : 1;
      setScale((prev) => THREE.MathUtils.lerp(prev, targetScale, 0.1));
      meshRef.current.scale.setScalar(scale);
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
        color={hovered ? "#06b6d4" : color}
        emissive={hovered ? "#06b6d4" : color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const GlobeStructure = () => {
  const spheres = useMemo(() => {
    const temp = [];
    const radius = 2;
    const count = 150;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Randomly assign colors - cyan or white
      const color = Math.random() > 0.6 ? "#06b6d4" : "#ffffff";

      temp.push({
        position: [x, y, z] as [number, number, number],
        color,
      });
    }
    return temp;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, index) => (
        <Sphere key={index} position={sphere.position} color={sphere.color} />
      ))}
    </group>
  );
};

const InteractiveGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <GlobeStructure />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveGlobe;
