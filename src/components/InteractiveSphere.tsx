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
  
  // Store original position
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  
  // Bright colors for hover
  const brightCyan = useMemo(() => new THREE.Color(0, 0.85, 1), []);
  const brightLime = useMemo(() => new THREE.Color(0.02, 1, 0.65), []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle pulse animation
      const pulseScale = 1 + Math.sin(time * 2 + phase) * 0.05;
      
      // Calculate distance to mouse position
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      const distanceToMouse = worldPosition.distanceTo(mousePosition);
      
      // Interaction radius settings
      const primaryRadius = 0.8; // Direct interaction
      const secondaryRadius = 2.0; // Ripple effect
      
      let targetScale = pulseScale;
      let targetEmissive = emissiveIntensity;
      let targetColor = baseColor;
      let pushStrength = 0;
      
      if (distanceToMouse < secondaryRadius) {
        if (distanceToMouse < primaryRadius) {
          // Primary effect - closest to mouse
          const intensity = 1 - (distanceToMouse / primaryRadius);
          targetScale = pulseScale + intensity * 2.5; // Scale up to 3.5x
          targetEmissive = emissiveIntensity + intensity * 7; // Up to 8
          targetColor = intensity > 0.5 ? brightCyan : brightLime;
          pushStrength = intensity * 0.3;
        } else {
          // Secondary ripple effect
          const intensity = 1 - ((distanceToMouse - primaryRadius) / (secondaryRadius - primaryRadius));
          targetScale = pulseScale + intensity * 0.8; // Scale up to 1.8x
          targetEmissive = emissiveIntensity + intensity * 2;
          targetColor = baseColor.clone().lerp(brightCyan, intensity * 0.3);
          pushStrength = intensity * 0.15;
        }
      }
      
      // Push away from mouse
      if (pushStrength > 0) {
        const pushDirection = worldPosition.clone().sub(mousePosition).normalize();
        const newPosition = originalPosition.clone().add(pushDirection.multiplyScalar(pushStrength));
        meshRef.current.position.lerp(newPosition, 0.15);
      } else {
        meshRef.current.position.lerp(originalPosition, 0.1);
      }
      
      // Smooth scale transition
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.15
      );
      
      // Smooth color and emissive transitions
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissive.lerp(targetColor, 0.15);
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
        emissiveIntensity={emissiveIntensity}
        metalness={0.3}
        roughness={0.4}
        toneMapped={false}
        flatShading={false}
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

  // Track mouse movement
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of entire group
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
      
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
      className="w-full h-[400px] md:h-[600px] lg:h-[700px] animate-in slide-in-from-bottom-8 slide-in-from-right-8 duration-1000 ease-out"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced Lighting for 3D depth and shading */}
        <ambientLight intensity={0.3} />
        <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#111111" />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" castShadow />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#0099ff" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 0, 3]} intensity={0.8} color="#00ffaa" />
        
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
