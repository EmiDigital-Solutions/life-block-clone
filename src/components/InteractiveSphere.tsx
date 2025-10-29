import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SmallSphereProps {
  position: [number, number, number];
  index: number;
  size: number;
  baseColor: THREE.Color;
  emissiveIntensity: number;
  mousePosition: THREE.Vector3;
}

const SmallSphere = ({ position, index, size, baseColor, emissiveIntensity, mousePosition }: SmallSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Store original position and color
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const originalColor = useMemo(() => baseColor.clone(), [baseColor]);
  
  // Slightly lighter version for hover (not white, just lighter)
  const lighterColor = useMemo(() => {
    return baseColor.clone().lerp(new THREE.Color(0.4, 0.4, 0.4), 0.3);
  }, [baseColor]);
  
  // Direction from sphere center (0,0,0) to this sphere's position
  const directionFromCenter = useMemo(() => {
    return originalPosition.clone().normalize();
  }, [originalPosition]);

  useFrame(() => {
    if (meshRef.current) {
      // Calculate distance to mouse position in 3D space
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      const distanceToMouse = worldPosition.distanceTo(mousePosition);
      
      // Very gentle interaction radius
      const interactionRadius = 0.8;
      
      let targetScale = 1.0; // No pulse, constant size
      let targetEmissive = emissiveIntensity;
      let targetColor = originalColor;
      let pushStrength = 0;
      
      if (distanceToMouse < interactionRadius) {
        // SUBTLE gentle bump
        const intensity = 1 - (distanceToMouse / interactionRadius);
        targetScale = 1.0 + intensity * 0.2; // Scale up to 1.2x only
        targetEmissive = emissiveIntensity + intensity * 0.4; // Very subtle glow
        targetColor = originalColor.clone().lerp(lighterColor, intensity * 0.5); // Slightly lighter
        pushStrength = intensity * 0.2; // Gentle push outward (0.2 max)
      }
      
      // GENTLE push OUTWARD from center (0,0,0)
      if (pushStrength > 0) {
        const newPosition = originalPosition.clone().add(
          directionFromCenter.clone().multiplyScalar(pushStrength)
        );
        meshRef.current.position.lerp(newPosition, 0.06); // Slow smooth
      } else {
        // Smooth magnetic return
        meshRef.current.position.lerp(originalPosition, 0.06);
      }
      
      // Smooth scale transition
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.06
      );
      
      // Smooth color transitions
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(targetColor, 0.06);
      material.emissive.lerp(targetColor, 0.06);
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        targetEmissive,
        0.06
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={emissiveIntensity * 0.3}
        metalness={0.0}
        roughness={0.9}
        toneMapped={false}
      />
    </mesh>
  );
};

const SphereGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
  // Track mouse position in 3D space
  const mousePosition = useRef(new THREE.Vector3(999, 999, 999)); // Far away initially
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());
  
  // Generate spheres with positions, sizes, and colors
  const sphereData = useMemo(() => {
    const data: Array<{
      position: [number, number, number];
      size: number;
      color: THREE.Color;
      emissiveIntensity: number;
    }> = [];
    
    const radius = 2.5;
    const count = 180; // Dense packing
    
    // Very dark matte professional colors
    const colors = [
      { color: new THREE.Color(0.176, 0.216, 0.282), weight: 0.3 },  // #2D3748 dark slate
      { color: new THREE.Color(0.118, 0.227, 0.373), weight: 0.25 }, // #1E3A5F dark blue
      { color: new THREE.Color(0.067, 0.369, 0.349), weight: 0.25 }, // #115E59 dark teal
      { color: new THREE.Color(0.290, 0.337, 0.408), weight: 0.2 },  // #4A5568 dark gray
    ];
    
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      // Determine size - more small spheres for dense packing
      const rand = Math.random();
      let size: number;
      if (rand < 0.7) {
        size = 0.08 + Math.random() * 0.04; // small: 0.08-0.12 (70%)
      } else if (rand < 0.92) {
        size = 0.15 + Math.random() * 0.05; // medium: 0.15-0.2 (22%)
      } else {
        size = 0.25 + Math.random() * 0.08; // large: 0.25-0.33 (8%)
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
      
      // Calculate depth-based emissive intensity (lower for professional look)
      const normalizedZ = (z + radius) / (2 * radius); // 0 to 1, where 1 is front
      const emissiveIntensity = 0.3 + normalizedZ * 0.7; // 0.3 to 1.0 (reduced from 0.5-2.0)
      
      data.push({
        position: [x, y, z],
        size,
        color: selectedColor.clone(),
        emissiveIntensity,
      });
    }
    
    return data;
  }, []);

  // Smooth calm rotation only
  useFrame(() => {
    if (groupRef.current) {
      // CALM smooth rotation - no shaking
      groupRef.current.rotation.y += 0.001;
      // No x-axis wobble for calm effect
    }
  });

  // Mouse move handler
  const handlePointerMove = (event: PointerEvent) => {
    mouse.current.x = (event.clientX / size.width) * 2 - 1;
    mouse.current.y = -(event.clientY / size.height) * 2 + 1;
  };

  // Add event listener
  useMemo(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [size]);

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
          mousePosition={mousePosition.current}
        />
      ))}
    </group>
  );
};

const InteractiveSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden animate-in slide-in-from-bottom-8 slide-in-from-right-8 duration-1000 ease-out"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Minimal dark professional lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[8, 6, 8]} intensity={0.5} color="#ffffff" />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
        
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
