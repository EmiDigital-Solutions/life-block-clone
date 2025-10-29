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
  
  // Random initial phase for varied animation
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  // Store original position and color
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const originalColor = useMemo(() => baseColor.clone(), [baseColor]);
  
  // White color for hover effect
  const whiteColor = useMemo(() => new THREE.Color(1, 1, 1), []);
  
  // Direction from sphere center (0,0,0) to this sphere's position
  const directionFromCenter = useMemo(() => {
    return originalPosition.clone().normalize();
  }, [originalPosition]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle pulse animation
      const pulseScale = 1 + Math.sin(time * 2 + phase) * 0.03;
      
      // Calculate distance to mouse position in 3D space
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      const distanceToMouse = worldPosition.distanceTo(mousePosition);
      
      // Interaction thresholds for ripple effect
      const primaryRadius = 0.6;    // Core interaction zone
      const secondaryRadius = 1.2;  // Medium ripple
      const tertiaryRadius = 1.8;   // Outer ripple
      
      let targetScale = pulseScale;
      let targetEmissive = emissiveIntensity;
      let targetColor = originalColor;
      let pushStrength = 0;
      
      if (distanceToMouse < tertiaryRadius) {
        if (distanceToMouse < primaryRadius) {
          // PRIMARY EFFECT - Dramatic change
          const intensity = 1 - (distanceToMouse / primaryRadius);
          targetScale = pulseScale + intensity * 2.0; // Scale up to 3x
          targetEmissive = 5.0 + intensity * 3.0; // Up to 8
          targetColor = whiteColor; // Pure white
          pushStrength = intensity * 1.2; // Strong push outward
        } else if (distanceToMouse < secondaryRadius) {
          // SECONDARY RIPPLE - Medium effect
          const intensity = 1 - ((distanceToMouse - primaryRadius) / (secondaryRadius - primaryRadius));
          targetScale = pulseScale + intensity * 1.0; // Scale up to 2x
          targetEmissive = emissiveIntensity + intensity * 2.5;
          targetColor = originalColor.clone().lerp(whiteColor, intensity * 0.7);
          pushStrength = intensity * 0.7;
        } else {
          // TERTIARY RIPPLE - Subtle effect
          const intensity = 1 - ((distanceToMouse - secondaryRadius) / (tertiaryRadius - secondaryRadius));
          targetScale = pulseScale + intensity * 0.3; // Scale up to 1.3x
          targetEmissive = emissiveIntensity + intensity * 1.0;
          targetColor = originalColor.clone().lerp(whiteColor, intensity * 0.3);
          pushStrength = intensity * 0.3;
        }
      }
      
      // CRITICAL: Push OUTWARD from center (0,0,0), not toward mouse
      if (pushStrength > 0) {
        const newPosition = originalPosition.clone().add(
          directionFromCenter.clone().multiplyScalar(pushStrength)
        );
        meshRef.current.position.lerp(newPosition, 0.1);
      } else {
        // Smooth return to original position
        meshRef.current.position.lerp(originalPosition, 0.1);
      }
      
      // Smooth scale transition
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.15
      );
      
      // Smooth color transitions
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.color.lerp(targetColor, 0.1);
      material.emissive.lerp(targetColor, 0.1);
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        targetEmissive,
        0.15
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={emissiveIntensity * 0.12}
        metalness={0.05}
        roughness={0.7}
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
    const count = 150; // Increased density from 100
    
    // Dark professional colors from auditor cards
    const colors = [
      { color: new THREE.Color(0.22, 0.25, 0.28), weight: 0.4 },  // dark charcoal #374151
      { color: new THREE.Color(0.15, 0.39, 0.92), weight: 0.3 },  // dark royal blue #2563EB
      { color: new THREE.Color(0.02, 0.59, 0.41), weight: 0.2 },  // dark emerald green #059669
      { color: new THREE.Color(0.90, 0.91, 0.92), weight: 0.1 },  // muted off-white #E5E7EB
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

  // Track mouse movement and rotate sphere
  useFrame((state) => {
    if (groupRef.current) {
      // CONTINUOUS SLOW ROTATION - never stops
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      
      // Update raycaster with mouse position
      raycaster.setFromCamera(mouse.current, camera);
      
      // Project mouse position to a plane at the sphere's depth
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      
      if (intersection) {
        mousePosition.current.copy(intersection);
      }
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
        {/* Dark, professional lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[10, 5, 10]} intensity={2.0} color="#ffffff" />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.2} color="#001a1a" />
        
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
